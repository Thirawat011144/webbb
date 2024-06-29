import HomeEvaluation from '../../views/evaluation/HomeEvaluation.vue'
import InformationEvaluation from '../../views/evaluation/InformationEvaluation.vue'
import ListStudentTEC4 from '../../views/evaluation/list-student/ListStudentTEC4.vue'
import ListEvaluationOne from '../../views/evaluation/list-student-evaluation-one/ListEvaluationOne.vue'
import EvaluationOne from '../../views/evaluation/evaluation-one/EvaluationOne.vue'

import ListEvaluationTwo from '../../views/evaluation/list-student-evaluation-one/ListEvaluationTwo.vue'
import EvaluationTwo from '../../views/evaluation/evaluation-one/EvaluationTwo.vue'

import ListEvaluationThree from '../../views/evaluation/list-student-evaluation-one/ListEvaluationThree.vue'
import EvaluationThree from '../../views/evaluation/evaluation-one/EvaluationThree.vue'

// import DataTEC4 from '../../views/evaluation/data-evaluation/DataTEC4.vue'

const routeEvaluation = [
    {
        path: '/home-evaluation',
        name: 'home-evaluation',
        component: HomeEvaluation,
        children: [

            // {
            //     path: 'data-tec4/:id',
            //     name: 'data-tec4/:id',
            //     component: DataTEC4,
            // },
            {
                path: 'evaluation-three/:id',
                name: 'evaluation-three/:id',
                component: EvaluationThree,
            },
            {
                path: 'list-evaluation-three',
                name: 'list-evaluation-three',
                component: ListEvaluationThree,
            },
            {
                path: 'evaluation-two/:id',
                name: 'evaluation-two/:id',
                component: EvaluationTwo,
            },
            {
                path: 'list-evaluation-two',
                name: 'list-evaluation-two',
                component: ListEvaluationTwo,
            },
            {
                path: 'evaluation',
                name: 'evaluation',
                component: InformationEvaluation,
            },
            {
                path: 'student-ev-tec4',
                name: 'student-ev-tec4',
                component: ListStudentTEC4
            },
            {
                path: 'list-evaluation-one',
                name: 'list-evaluation-one',
                component: ListEvaluationOne
            }
            ,
            {
                path: 'evaluation-one/:id',
                name: 'evaluation-one/:id',
                component: EvaluationOne
            }
        ]
    },
]

export default routeEvaluation