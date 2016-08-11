import Vue from 'vue';
import moment from 'moment';
// import Bus from './bus';

export default {

    resource: Vue,
    loginUrl: 'authenticate',

    // User object will let us check authentication status
    user: {
        authenticated: false
    },

    // Send a request to the login URL and save the returned JWT
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
                // eslint-disable-next-line
                Vue.http.headers.common['Authorization'] = data.token;

                resolve(response);
            }, error => {
                reject(error);
            });
        });
    },

    // To log out, we just need to remove the token
    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('timeout');
        this.user.authenticated = false;
        this.user.data = {};
    },

    checkAuth() {
        let jwt = localStorage.getItem('token');
        let timeout = moment(localStorage.getItem('timeout'));
        let now = moment();

        if (jwt && timeout.diff(now, 'seconds') > 0) {
            this.user.authenticated = true;
            return true;
        }
        this.user.authenticated = false;
        return false;
    },

    // The object to be passed as a header for authenticated requests
    getAuthHeader() {
        return 'Bearer ' + localStorage.getItem('id_token');
    }
};
