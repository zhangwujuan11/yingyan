import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  userorgid:null,//机构id
	  adminusername:'',//用户名
	  token:'',//身份
  },
  getters: {
  },
  mutations: {
	  USER_IMG(state,user){
		  state.userorgid=user.orgId
		  state.adminusername=user.adminUsername
		  state.token=user.token
		 
	  }
  },
  actions: {
  },
  modules: {
  }
})
