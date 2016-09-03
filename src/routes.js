import NotFound from './views/NotFound';
import Login from './views/Login';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import Settings from './views/Settings';
import UserList from './views/user/List';
import UserEdit from './views/user/Edit';
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
                component: UserList,
                name: 'user-list'
            },
            '/users/:id': {
                component: UserEdit,
                name: 'user-edit'
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
