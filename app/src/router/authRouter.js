import Register from '../views/auth/Register.vue';
import Login from '@/views/auth/Login.vue';

const routerAuth = [
    {
        path: '/register',
        name: 'register',
        component: Register
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
]

export default routerAuth