import Vue from 'vue';
import Bus from '../bus';

export default class {
    constructor(path = '') {
        let vue = new Vue({});
        this.path = path;
        this.resource = vue.$resource(this.path);
    }

    get(id) {
        if (typeof id !== 'undefined') {
            return this.resource.get({id: id}).catch(this.emitError);
        }
        return this.resource.get().catch(this.emitError);
    }

    save(data) {
        return this.resource.save(data).catch(this.emitError);
    }
    // save
    // update
    // put
    // patch
    // delete

    emitError(error) {
        Bus.$emit('Notification_error', error);
    }
}
