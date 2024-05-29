// import config from '../../../config';

import UserIndex from '@/views/user/UserIndex.vue';
import { checkAuth } from './authRouterFunction';
import formTraining from '../../components/user/formTraining.vue'
import DataStudent from '../../views/user/DataStudent.vue'
const routeUser = [
  {
    path: '/user-index',
    name: 'user-index',
    component: UserIndex,
    beforeEnter: checkAuth,
    children: [
      {
      path: 'form',
      name:'form',
      component: formTraining
      },
      {
        path:'data-student',
        name:'data-student',
        component:DataStudent
      }
    ]
  },
]

export default routeUser;