import Vue from 'vue'
import VueRouter from 'vue-router'
import Administr from '../views/Administr.vue'

Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: "/administr",
    children:[
        		  {
        			  path:"/",
        			  name: 'index',
        			  component:()=>import("../views/administer/Index.vue")
        		  },
        		  {
        			  path:"member",
        			  name: 'member',
        			  component:()=>import("../views/administer/Member.vue"),
					   meta: {
					          keepAlive: true
					        }
        		  },
        		  {
        			  path:"role",
        			  name: 'role',
        			  component:()=>import("../views/administer/Role.vue")
        		  },
        		  {
        			  path:"privileges",
        			  name: 'privileges',
        			  component:()=>import("../views/administer/Privileges.vue")
        		  },
        		  {
        			  path:"ability",
        			  name: 'ability',
        			  component:()=>import("../views/administer/Ability.vue")
        		  },
				  {
					  path:'nodata',
					  name:'nodata',
					  component:()=>import("@/views/administer/Nodata.vue")
				  },
				  {
					  path:'device',
					  name:'device',
					  component:()=>import("@/views/administer/Root.vue")
				  },
				  {
					  path:'journal',
					  name:'journal',
					  component:()=>import("@/views/administer/JournalList.vue")
				  }
    ],
    component: Administr,
  },
  {
    path: "/",
    redirect:'/administr'
  },
  {
	 path: "/home",
	 name:'home',
	 component:()=>import('@/views/HomeView.vue')
  },
  {
    path: '/unnormal',
    name: 'unnormal',
    component: () => import('../views/Unnormal.vue')
  },
  
  {
  	  path: '/video',
  	  name: 'video',
  	  component: () => import('../views/Video.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
