import Register from '../views/auth/Register.vue';
import Login from '@/views/auth/Login.vue';
import RegisterTeacher from '@/views/auth/RegisterTeacher.vue';
import RegisterEvaluation from '@/views/auth/RegisterEvaluation.vue'

const routerAuth = [
  {
    path: '/register-evaluation',
    name: 'register-evaluation',
    component: RegisterEvaluation
  }
  ,
  {
    path: '/register',
    name: 'register',
    component: Register
  }
  ,
  {
    path: '/teacher-register',
    name: 'teacher-register',
    component: RegisterTeacher
  }
  ,
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

export default routerAuth