import Auth from '../../../src/Auth';
import Vue from 'vue';

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

    it('should be able to login', () => {
        let post = sandbox.spy(auth.resource.http, 'post');
        let credentials = {email: 'test@email.com', password: 'secret'};

        auth.login(credentials);

        expect(post.calledWith(auth.loginUrl, credentials)).to.equal(true);
    });

    it('should set Authorization header on successfull login', () => {
        let callback = sinon.spy();
        let post = sandbox.stub(auth.resource.http, 'post');
        let credentials = {email: 'test@email.com', password: 'secret'};

        post.returns(Promise.resolve({
            data: {
                data: {token: 'FAKETOKEN', timeout: '2017-01-01 00:00:00'}
            }
        }));

        let login = auth.login(credentials).then(callback);

        return Promise.all([login]).then(() => {
            // eslint-disable-next-line
            let token = Vue.http.headers.common['Authorization'];

            expect(token).to.equal('FAKETOKEN');
            expect(callback.called).to.equal(true);
        }, () => {
            throw new Error('Login promise got rejected.');
        });
    });

    it('should be able to check if logged in', () => {
        sandbox.stub(localStorage, 'getItem').returns('FAKETOKEN');
        // Return different for getting timeout
        let loggedIn = auth.checkAuth();

        expect(loggedIn).to.equal(true);
    });
});
