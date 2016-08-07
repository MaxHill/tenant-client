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
        let request = repo.get();

        expect(request).to.equal(false);
    });
});
