import NotFound from './views/NotFound';
import Login from './views/Login';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import Settings from './views/Settings';
import Users from './views/Users';
import Association from './views/Association';
import Residence from './views/Residence';

export default {
    '/': {
        component: Home
    },
    'dashboard': {
        component: Dashboard,
        name: 'dashboard'
    },
    'settings': {
        component: Settings,
        name: 'settings',
        subRoutes: {
            '/': {
                component: Association
            },
            '/users': {
                component: Users
            },
            '/residence': {
                component: Residence
            }
        }
    },
    'login': {
        component: Login
    },
    '*': {
        component: NotFound
    }
};
