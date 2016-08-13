import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import routes from './routes';
import VueResource from 'vue-resource';
import Auth from './Auth';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = 'http://tenant.dev';

const Router = new VueRouter({history: true});

Router.map(routes);
Router.beforeEach(({to, next}) => {
    let re = /\/login|\/(?!.)/;
    if (!Auth.checkAuth() && !re.test(to.path)) {
        Router.go('/login');
        return true;
    }

    next();
});
Router.start({
    components: {App}
}, 'body');
