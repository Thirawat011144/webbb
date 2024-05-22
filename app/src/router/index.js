import { createRouter, createWebHistory } from 'vue-router';
import config from '../../config';

import HomeView from '../views/HomeView.vue';
import Register from '../views/auth/Register.vue';
import Login from '@/views/auth/Login.vue';
import AdminIndex from '@/views/admin/AdminIndex.vue';
import UserIndex from '@/views/user/UserIndex.vue';
import Search from '../views/admin/Search.vue';
import News from '../components/news/News.vue';


import FormCreateNews from '../components/news/CreateNews.vue';
import ListNews from '../components/news/ListNews.vue'
import EditNews from '../components/news/EditNews.vue'

import Cr2 from '../views/admin/list-student/Cr2.vue';
import Ec2 from '../views/admin/list-student/Ec2.vue';
import Ec4 from '../views/admin/list-student/Ec4.vue';

import EditCr2 from '../views/admin/edit-student/EditCr2.vue';
import EditEc2 from '../views/admin/edit-student/EditEc2.vue';
import EditEc4 from '../views/admin/edit-student/EditEc4.vue';

import Cr2Req from '../views/admin/list-student-request/Cr2Req.vue';
import Ec2Req from '../views/admin/list-student-request/Ec2Req.vue';
import Ec4Req from '../views/admin/list-student-request/Ec4Req.vue';

import Cr2Active from "../views/admin/list-student-active/Cr2Active.vue";
import Ec2Active from "../views/admin/list-student-active/Ec2Active.vue";
import Ec4Active from "../views/admin/list-student-active/Ec4Active.vue";

import Cr2Success from "../views/admin/list-student-success/Cr2Success.vue";
import Ec2Success from "../views/admin/list-student-success/Ec2Success.vue";
import Ec4Success from "../views/admin/list-student-success/Ec4Success.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
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
  {
    path: '/admin-index',
    name: 'admin-index',
    component: AdminIndex,
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem(config.role_name);
      const token = localStorage.getItem(config.token_name);
      if (!token) {
        next('login');
      } else {
        if (role === 'admin') {
          next();
        } else if (role === 'user') {
          next('user-index');
        } else {
          next('login');
        }
      }
    },
    children: [
      {
        path: 'list-cr2',
        name: 'list-cr2',
        component: Cr2,
      },
      {
        path: 'list-ec2',
        name: 'list-ec2',
        component: Ec2
      },
      {
        path: 'list-ec4',
        name: 'list-ec4',
        component: Ec4,
      },
      {
        path: 'cr2-req',
        name: 'cr2-req',
        component: Cr2Req
      },
      {
        path: 'cr2-active',
        name: 'cr2-active',
        component: Cr2Active
      },
      {
        path: 'cr2-success',
        name: 'cr2-success',
        component: Cr2Success
      },
      {
        path: 'Ec2-req',
        name: 'Ec2-req',
        component: Ec2Req
      },
      {
        path: 'Ec2-active',
        name: 'Ec2-active',
        component: Ec2Active
      },
      {
        path: 'Ec2-success',
        name: 'Ec2-success',
        component: Ec2Success
      },
      {
        path: 'Ec4-req',
        name: 'Ec4-req',
        component: Ec4Req
      },
      {
        path: 'Ec4-active',
        name: 'Ec4-active',
        component: Ec4Active
      },
      {
        path: 'Ec4-success',
        name: 'Ec4-success',
        component: Ec4Success
      },
      {
        path: 'search',
        name: 'search',
        component: Search
      },
      {
        path:'create-news',
        name:'create-news',
        component:FormCreateNews
      },
      {
        path:'list-news',
        name:'list-news',
        component:ListNews
      },
      {
        path:'edit-news/:id',
        name:'edit-news',
        component:EditNews
      }
    ]
  }
  ,
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
  {
    path: '/edit-cr2/:id',
    name: 'edit-cr2',
    component: EditCr2
  },
  {
    path: '/edit-ec2/:id',
    name: 'edit-ec2',
    component: EditEc2
  },
  {
    path: '/edit-ec4/:id',
    name: 'edit-ec4',
    component: EditEc4
  },
  {
    path:'/news',
    name:'news',
    component:News
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});




export default router;