import Vue from 'vue';
import Bus from '../Bus';

export default class {

    constructor(path = '') {
        let vue = new Vue();

        this.data = {
            page: false,
            include: false
        };
        this.path = path;
        this.resource = vue.$resource(this.path + '{/id}');
    }

    /**
     * Get request.
     * @param  {Number} id Id of resource to get, if blank get all.
     * @param  {Object} parameters Url parameters.
     * @return {Promise} Promise with error handled.
     */
    get(id = false, parameters = {}) {
        if (id) {
            parameters.id = id;
        }
        let request = this.buildUrlParameters(parameters);

        return this.resource
            .get(request)
            .catch(this.emitError);
    }

    /**
     * Create request.
     * @param  {Object} data Data to persist.
     * @return {Promise} Promise with error handled.
     */
    create(data) {
        return this.resource
            .save(data)
            .then(data => {
                this.emitSuccess(data, 'Succesfuly created');
            })
            .catch(this.emitError);
    }

    /**
     * Update request.
     * @param  {Object} data Data to persist including resource id.
     * @return {Promise} Promise with error handled.
     */
    update(data) {
        return this.resource
            .update({id: data.id}, data)
            .then(data => {
                this.emitSuccess(data, 'Succesfuly updated');
            })
            .catch(this.emitError);
    }

    /**
     * Delete request.
     * @param  {Number} id Id of resource to be deleted.
     * @return {Promise} Promise with error handled.
     */
    delete(id) {
        return this.resource
            .delete(id)
            .then(data => {
                this.emitSuccess(data, 'Succesfuly deleted');
            })
            .catch(this.emitError);
    }

    /**
     * Set the page url parameter.
     * @param  {Number} page Page number.
     * @return {Class} Self for further chaining.
     */
    page(page) {
        this.data.page = page;

        return this;
    }

    /*
     * Iclude relationship
     * @param {Array} relations Relation name.
     * @return {Class} Self for further chaining.
     */
    include(relations = []) {
        this.data.include = relations;

        return this;
    }

    /**
     * Build up url parameters object with repository data properties.
     * @param  {Object} data Base data to append to.
     * @return {Object} Built parameter data object.
     */
    buildUrlParameters(data = {}) {
        Object.keys(this.data).forEach(key => {
            if (!data.hasOwnProperty(key) && this.data[key]) {
                data[key] = this.data[key];
            }
        });

        return data;
    }

    /**
     * Emit error to the application.
     * @param  {object} error Error object given from the api.
     * @return {Promise} Returns the rejected promise.
     */
    emitError(error) {
        Bus.$emit('Notification_error', error);
        return Promise.reject(error);
    }

    /**
     * Emit success to the application.
     * @param  {object} success Promise data to pass along.
     * @param  {object} message Success message to display.
     * @return {Promise} Returns resolved promise.
     */
    emitSuccess(success, message) {
        Bus.$emit('Notification_success', message);
        return Promise.resolve(success);
    }
}
