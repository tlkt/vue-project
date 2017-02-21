/**
 * Created by root on 17-2-14.
 */
import Home from './components/Home.vue'
import Login from './components/login/Login.vue'
import ParkInfo from './components/parkinfo/Parkinfo.vue'
import Default from './components/public/Default.vue'
import ParkInfoForm from './components/parkinfo/Parkinfo_form.vue'

export default [
    {
        path:'/home',
        name:'home',
        component:Home
    },
    {
        path:'/login',
        name:'login',
        component:Login
    },
    {
        path:'/parkinfo',
        name:'parkinfo',
        component:ParkInfo
    },
    {
        path:'/parkinfoform',
        name:'parkinfoform',
        component:ParkInfoForm
    },
    {
        path:'*',
        name:'default',
        component:Default
    }
]
