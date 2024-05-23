import config from '../../config';

import UserIndex from '@/views/user/UserIndex.vue';

const routeUser = [
  {
    path: '/user-index',
    name: 'user-index',
    component: UserIndex,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem(config.token_name);
      if (!token) {
        next('/login');
      } else {
        next();
      }
    }
  },
]

export default routeUser;