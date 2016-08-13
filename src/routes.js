import NotFound from './views/NotFound';
import Login from './views/Login';
import Home from './views/Home';
import Hello from './views/Hello';

export default {
    '/': {
        component: Home
    },
    'hello': {
        component: Hello,
        name: 'dashboard'
    },
    'login': {
        component: Login
    },
    '*': {
        component: NotFound
    }
};
