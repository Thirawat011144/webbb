import HomeView from '../views/HomeView.vue';
import News from '../components/news/News.vue';

const routeHome = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        children:[
          {
            path:'news',
            name:'news',
            component:News
          }
        ]
      },
]

export default routeHome