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

        expect(resource.calledWith({}, {params: {page: 2}})).to.equal(true);
        expect(response.then).to.be.a('function');
    });

    it('should be able to include', () => {
        let resource = sinon.spy(repo.resource, 'get');
        let response = repo.include(['users']).get();

        expect(resource.calledWith(
            {},
            {
                params: {
                    include: ['users']
                }
            })).to.equal(true);
        expect(response.then).to.be.a('function');
    });

    it('should be able to include and paginate', () => {
        let resource = sinon.spy(repo.resource, 'get');
        let response = repo.include(['users']).page(2).get();

        expect(resource.calledWith(
            {},
            {
                params: {
                    include: ['users'],
                    page: 2
                }
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
            {},
            {
                params: {
                    include: ['users'],
                    page: 2,
                    test: 'test'
                }
            })).to.equal(true);
        expect(response.then).to.be.a('function');
    });
});
