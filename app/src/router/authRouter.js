import Register from '../views/auth/Register.vue';
import LoginEvaluation from '../views/auth/LoginEvaluation.vue'
import Login from '@/views/auth/Login.vue';
import RegisterTeacher from '@/views/auth/RegisterTeacher.vue';
import RegisterEvaluation from '@/views/auth/RegisterEvaluation.vue'
import ChoiceLogin from '@/views/auth/ChoiceLogin.vue'
import LoginStudent from '@/views/auth/LoginStudent.vue'
import LoginTeacher from '@/views/auth/LoginTeacher.vue'


const routerAuth = [
  {
    path: '/login-teacher',
    name: 'login-teacher',
    component: LoginTeacher
  }
  ,
  {
    path: '/login-student',
    name: 'login-student',
    component: LoginStudent
  }
  ,
  {
    path: '/login-choice',
    name: 'login-choice',
    component: ChoiceLogin
  }
  ,
  {
    path: '/login-evaluation',
    name: 'login-evaluation',
    component: LoginEvaluation
  }
  ,
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