import Auth from '../../../src/Auth';
import Vue from 'vue';
import moment from 'moment';

describe('Auth component', () => {
    let sandbox;
    let auth;

    beforeEach(() => {
        auth = Object.create(Auth);
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should be able to login and set Auth header', () => {
        let callback = sinon.spy();
        let post = sandbox.stub(auth.resource.http, 'post');
        let credentials = {email: 'test@email.com', password: 'secret'};
        let setItem = sinon.spy(localStorage, 'setItem');

        post.returns(Promise.resolve({
            data: {
                data: {
                    token: 'FAKETOKEN',
                    timeout: '2017-01-01 00:00:00',
                    user: {
                        data: {
                            name: 'Test user'
                        }
                    }
                }
            }
        }));

        let login = auth.login(credentials).then(callback);

        return Promise.all([login]).then(() => {
            // eslint-disable-next-line
            let token = Vue.http.headers.common['Authorization'];

            expect(post.calledWith(auth.loginUrl, credentials)).to.equal(true);
            expect(token).to.equal('FAKETOKEN');
            expect(auth.user.data.name).to.equal('Test user');
            expect(callback.called).to.equal(true);
            expect(setItem.callCount).to.equal(3);
        }, () => {
            throw new Error('Login promise got rejected.');
        });
    });

    it('should be able to check if logged in', () => {
        let timeout = moment()
            .add(1, 'hours')
            .format('YYYY-MM-DD H:m:s');
        let ls = sandbox.mock(localStorage);
        ls.expects('getItem').withArgs('token').returns('FAKETOKEN');
        ls.expects('getItem').withArgs('timeout').returns(timeout);
        ls.expects('getItem').withArgs('user').returns({name: 'Test User'});

        let loggedIn = auth.checkAuth();

        expect(loggedIn).to.equal(true);
        expect(auth.user.authenticated).to.equal(true);
        expect(auth.user.data.name).to.equal('Test User');
    });

    it('should not count as logged in if timout reached', () => {
        let timeout = moment()
            .subtract(1, 'seconds')
            .format('YYYY-MM-DD H:m:s');
        let ls = sandbox.mock(localStorage);
        ls.expects('getItem').withArgs('token').returns('FAKETOKEN');
        ls.expects('getItem').withArgs('timeout').returns(timeout);

        let loggedIn = auth.checkAuth();

        expect(loggedIn).to.equal(false);
        expect(auth.user.authenticated).to.equal(false);
    });

    it('should be able to logout', () => {
        auth.user.authenticated = true;
        auth.user.data = {name: 'Test Name'};
        let remove = sinon.spy(localStorage, 'removeItem');

        auth.logout();

        expect(remove.calledWith('id_token')).to.equal(true);
        expect(remove.calledWith('timeout')).to.equal(true);
        expect(auth.user.authenticated).to.equal(false);
        expect(Object.keys(auth.user.data).length).to.equal(0);
    });
});
