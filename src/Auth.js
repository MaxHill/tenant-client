import Vue from 'vue';
// import Bus from './bus';

const LOGIN_URL = 'authenticate';

export default {

    // User object will let us check authentication status
    user: {
        authenticated: false,
        data: {}
    },

    // Send a request to the login URL and save the returned JWT
    login(credentials) {
        Vue.http.post(LOGIN_URL, credentials).then(data => {
            data = data.data.data;
            localStorage.setItem('token', data.token);
            localStorage.setItem('timeout', data.timeout);

            this.user.authenticated = true;
            // eslint-disable-next-line
            Vue.http.headers.common['Authorization'] = data.token;

            console.log('Logged in.. redirect');
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
        let jwt = localStorage.getItem('id_token');
        // var timeout = localStorage.getItem('timeout');

        if (jwt) {
            this.user.authenticated = true;
        } else {
            this.user.authenticated = false;
        }
    },

    // The object to be passed as a header for authenticated requests
    getAuthHeader() {
        return 'Bearer ' + localStorage.getItem('id_token');
    }
};
