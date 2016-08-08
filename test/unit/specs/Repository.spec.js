import Vue from 'vue';
import VueResource from 'vue-resource';
import Repository from '../../../src/repository/repository';

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

        expect(resource.called).to.equal(true);
        expect(response.then).to.be.a('function');
    });

    it('should be able to get one', () => {
        let resource = sinon.spy(repo.resource, 'get');
        let response = repo.get(1);

        expect(resource.calledWith({id: 1})).to.equal(true);
        expect(response.then).to.be.a('function');
    });

    it('should be able to save', () => {
        let resource = sinon.spy(repo.resource, 'save');
        let response = repo.save({name: 'test'});

        expect(resource.calledWith({name: 'test'})).to.equal(true);
        expect(response.then).to.be.a('function');
    });
});
