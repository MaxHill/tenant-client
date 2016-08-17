import Vue from 'vue';
import moment from 'moment';
// import Bus from './bus';

export default {

    resource: Vue,
    loginUrl: 'authenticate',
    user: {
        authenticated: false,
        data: {}
    },

    /**
     * Send login request and set token on success
     * @param  {Object} credentials Credentials to use when logging in.
     * @return {Promise}            Login response.
     */
    login(credentials) {
        return new Promise((resolve, reject) => {
            this.resource.http.post(
                this.loginUrl,
                credentials
            ).then(response => {
                let data = response.data.data;
                localStorage.setItem('token', data.token);
                localStorage.setItem('timeout', data.timeout);

                this.user.authenticated = true;
                this.user.data = data.user.data;
                // eslint-disable-next-line
                Vue.http.headers.common['Authorization'] = data.token;

                resolve(response);
            }, error => {
                reject(error);
            });
        });
    },

    /**
     * Logout user.
     * @return {Boolean} Returns true on successfull logout.
     */
    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('timeout');
        this.user.authenticated = false;
        this.user.data = {};

        return true;
    },

    /**
     * Check if user is authenticated.
     * @return {Boolean} True if is authenticated.
     */
    checkAuth() {
        let jwt = localStorage.getItem('token');
        let timeout = moment(localStorage.getItem('timeout'));
        let now = moment();

        if (jwt && timeout.diff(now, 'seconds') > 0) {
            this.user.authenticated = true;
            return true;
        }
        this.logout();
        return false;
    }

};
