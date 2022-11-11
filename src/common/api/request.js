import axios from 'axios'
// import store from '@/store'
// import router from '@/router'
axios.defaults.baseURL = process.env.VUE_APP_BASE_API

export default{
	common:{
		method:"POST",
		data:{},
		params:{}
	},
	
	$axios(options={}){
		
		options.method=options.method ||this.common.method;
		options.data=options.data ||this.common.data;
		options.params=options.params ||this.common.params;
		
		//是否是登录状态
		// if( options.headers.token ){
		//     options.headers.token = store.state.user.token;
		//     if( !options.headers.token ){
		//        router.push('/login');
		//    }
		// }
		
		return axios(options).then(v=>{
			// let data=v.data.data
			
			return new Promise((res,rej)=>{
				// 数据不存在返回错误
				if(!v){
					return rej();
				}else{
					res(v)
				}
			})
		})
		
	}
	
}

