import Vue from 'vue';
import VueResource from 'vue-resource';
import Repository from '../../../src/repository/Repository';

// Setup test repository
Vue.use(VueResource);
class TestRepo extends Repository {
    constructor() {
        super('test');
    }
}

describe('Repository', () => {
    let repo;

    beforeEach(() => {
        repo = new TestRepo();
    });

    it('should be initialized with custom path', () => {
        expect(repo.path).to.equal('test');
    });

    it('should be able to get all', () => {
        let resource = sinon.spy(repo.resource, 'get');
        let response = repo.get();

        expect(resource.calledWith({})).to.equal(true);
        expect(response.then).to.be.a('function');
    });

    it('should be able to get one', () => {
        let resource = sinon.spy(repo.resource, 'get');
        let response = repo.get(1);

        expect(resource.calledWith({id: 1})).to.equal(true);
        expect(response.then).to.be.a('function');
    });

    it('should be able to create', () => {
        let resource = sinon.spy(repo.resource, 'save');
        let response = repo.create({name: 'test'});

        expect(resource.calledWith({name: 'test'})).to.equal(true);
        expect(response.then).to.be.a('function');
    });

    it('should be able to update', () => {
        let data = {id: 1, name: 'test'};
        let resource = sinon.spy(repo.resource, 'update');
        let response = repo.update(data);

        expect(resource.calledWith({id: 1}, data)).to.equal(true);
        expect(response.then).to.be.a('function');
    });

    it('should be able to delete', () => {
        let resource = sinon.spy(repo.resource, 'delete');
        let response = repo.delete(1);

        expect(resource.calledWith(1)).to.equal(true);
        expect(response.then).to.be.a('function');
    });

    it('should be able to paginate', () => {
        let resource = sinon.spy(repo.resource, 'get');
        let response = repo.page(2).get();

        expect(resource.calledWith({page: 2})).to.equal(true);
        expect(response.then).to.be.a('function');
    });

    it('should be able to include', () => {
        let resource = sinon.spy(repo.resource, 'get');
        let response = repo.include(['users']).get();

        expect(resource.calledWith({include: ['users']})).to.equal(true);
        expect(response.then).to.be.a('function');
    });

    it('should be able to include and paginate', () => {
        let resource = sinon.spy(repo.resource, 'get');
        let response = repo.include(['users']).page(2).get();

        expect(resource.calledWith(
            {
                include: ['users'],
                page: 2
            })).to.equal(true);
        expect(response.then).to.be.a('function');
    });

    it('should be able to include, paginate and set custom parameters', () => {
        let resource = sinon.spy(repo.resource, 'get');
        let response = repo
            .include(['users'])
            .page(2)
            .get(null, {test: 'test'});

        expect(resource.calledWith(
            {
                include: ['users'],
                page: 2,
                test: 'test'
            })).to.equal(true);
        expect(response.then).to.be.a('function');
    });

    it('should handle error', () => {
        let emitSpy = sinon.stub(repo, 'emitError');
        // Stub resource methods
        [
            sinon.stub(repo.resource, 'get'),
            sinon.stub(repo.resource, 'save'),
            sinon.stub(repo.resource, 'update'),
            sinon.stub(repo.resource, 'delete')
        ].forEach(stub => {
            // Return rejected promises
            stub.returns(Promise.reject('Rejected from test'));
        });

        // Call repo methods (all will be rejected)
        let promises = [
            repo.get(),
            repo.create(),
            repo.update({id: 1}),
            repo.delete(1)
        ];

        // Make assertions after all promises have been rejected.
        return Promise.all(promises).then(() => {
            sinon.assert.callCount(emitSpy, 4);
        }, () => {
            throw new Error('All promises was not rejected/resolved');
        });
    });

    it('should handle success', () => {
        let emitSpy = sinon.stub(repo, 'emitSuccess');
        // Stub resource methods
        [
            sinon.stub(repo.resource, 'save'),
            sinon.stub(repo.resource, 'update'),
            sinon.stub(repo.resource, 'delete')
        ].forEach(stub => {
            // Return resolved promises
            stub.returns(Promise.resolve('Rejected from test'));
        });

        // Call repo methods (all will be resolve)
        let promises = [
            repo.create(),
            repo.update({id: 1}),
            repo.delete(1)
        ];

        // Make assertions after all promises have been rejected.
        return Promise.all(promises).then(() => {
            sinon.assert.callCount(emitSpy, 3);
        }, () => {
            throw new Error('All promises was not rejected/resolved');
        });
    });

    it('should be able to use double success handlers when creating', () => {
        let emitSpy = sinon.stub(repo, 'emitSuccess')
            .returns(Promise.resolve('Resolved from test'));

        sinon
            .stub(repo.resource, 'save')
            .returns(Promise.resolve('Resolved from test'));

        return repo.create({id: 1}).then(data => {
            expect(data).to.equal('Resolved from test');
            sinon.assert.callCount(emitSpy, 1);
        });
    });

    it('should be able to use double success handlers when updating', () => {
        let emitSpy = sinon.stub(repo, 'emitSuccess')
            .returns(Promise.resolve('Resolved from test'));

        sinon
            .stub(repo.resource, 'update')
            .returns(Promise.resolve('Resolved from test'));

        return repo.update({id: 1}).then(data => {
            expect(data).to.equal('Resolved from test');
            sinon.assert.callCount(emitSpy, 1);
        });
    });

    it('should be able to use double success handlers when deleting', () => {
        let emitSpy = sinon.stub(repo, 'emitSuccess')
            .returns(Promise.resolve('Resolved from test'));

        sinon
            .stub(repo.resource, 'delete')
            .returns(Promise.resolve('Resolved from test'));

        return repo.delete({id: 1}).then(data => {
            expect(data).to.equal('Resolved from test');
            sinon.assert.callCount(emitSpy, 1);
        });
    });
});
