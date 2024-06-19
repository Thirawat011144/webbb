
import InternshipOrTeaching from '../../views/listInternship-teaching/InternshipOrTeaching.vue'
import ListInternshiped from '../../views/listInternship-teaching/ListInternshiped.vue'
import Internshiped from '../../views/listInternship-teaching/Internshiped.vue'
import Teachinged from '../../views/listInternship-teaching/Teachinged.vue'

const routeInternshipAndTeaching = [
    {
        path: '/internship-teaching',
        name: 'internship-teaching',
        component: InternshipOrTeaching
    },
    {
        path: '/internshiped',
        name: 'internshiped',
        component: ListInternshiped
    }
    ,
    {
        path: '/internshiped-list',
        name: 'internshiped-list',
        component: Internshiped
    }
    ,
    {
        path: '/teachinged-list',
        name: 'teachinged-list',
        component: Teachinged
    }
]

export default routeInternshipAndTeaching