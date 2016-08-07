import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import routes from './routes';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = 'tenant.dev';

const Router = new VueRouter({history: true});

Router.map(routes);

Router.start({
    components: {App}
}, 'body');
