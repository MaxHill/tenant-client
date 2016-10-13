import Repository from './repository';

export default class extends Repository {
    constructor() {
        super('associations');
    }

    /**
     * Override Update request.
     * @param  {Object} data Data to persist including resource id.
     * @return {Promise} Promise with error handled.
     */
    update(data) {
        this.successMessage = 'Successfully updated';

        delete data.id;
        return this.resource
            .update(data)
            .then(this.emitSuccess.bind(this))
            .catch(this.emitError);
    }
}
