import { createRouter, createWebHistory } from 'vue-router';

import routeHome from './HomeRouter'
import routeAuth from './authRouter'
import routeAdmin from './admin/adminRouter';
import routeUser from './user/userRouter';
import routeEditAdmin from './admin/EditAdminRouter'
import routeNews from './newsRouter'
import routeTeacher from './teacher/TeacherRouter'
import routeEstablishment from './Establishment';

const routes = [
  ...routeHome,
  ...routeAuth,
  ...routeAdmin,
  ...routeUser,
  ...routeEditAdmin,
  ...routeNews,
  ...routeTeacher,
  ...routeEstablishment
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;