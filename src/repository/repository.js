import Vue from 'vue';
import Bus from '../bus';

export default class {
    constructor() {
        let vue = new Vue({});
        this.path = '';
        this.resource = vue.$resource(this.path);
    }

    get() {
        return this.resource.get().catch(this.emitError);
    }
    // post
    // save
    // put
    // patch
    // delete

    emitError(error) {
        Bus.$emit('Notification_error', error);
    }
}
