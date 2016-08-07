import NotFound from './views/NotFound';
import Home from './views/Home';
import Hello from './views/Hello';

export default {
    '/': {
        component: Home
    },
    'hello': {
        component: Hello
    },
    '*': {
        component: NotFound
    }
};
