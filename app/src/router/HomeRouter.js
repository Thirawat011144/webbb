import HomeView from '../views/HomeView.vue';
import TeacherIndex from '@/views/teacher/index.vue'
const routeHome = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
      },
    {
      path:'/teacher-index',
      name:'teacher-home',
      component:TeacherIndex
    }
]

export default routeHome