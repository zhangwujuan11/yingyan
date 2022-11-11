import request from '@/common/api/devrequest'
import axios from 'axios'





// 获取用户信息
export function userinfor(data){
	return request({
		url:'/user/'+data.orgId+"/"+data.username ,
	})
}

// 普通超级管理员添加组织
export function addadmin(data){
  return request({
    url:"/user",
    method:'post',
    data
  })
}

//更新激活状态
export function ActivationState(data){
	return request({
		url:'/user',
		method:'put',
		data
	})
}

//获取组织下申请激活用户列表
export function adminList(data){
	return request({
		url:'/user/getOrgActivationList/'+data.orgId+"/"+2,
		method:'get',
		data
	})
}

//获取组织下已激活用户列表
export function listEd(data){
	return request({
		url:'/user/getOrgActivationList/'+data.orgId+"/"+1,
		method:'get',
		data
	})
}

// 获取身份标识
export function identity(data){
	return axios({
		url:'https://1to2to3.cn/rds2/service/query',
		method:'post',
		data:{
				"auth": 2,
				"project": "eagle_eye",
				"table": "sys_role",
				"conditions": {
					"fields": [],
					"query": {}
				}
			}
	})
}

//解析token
export function authorities(data){
	return axios({
		url:'https://1to2to3.cn/super-login/sys/me',
		method:'post',
		headers:{Authorization:'bearer'+' '+data}
	})
}


// 删除设备
export function delroot(data){
	return request({
		url:'/device/' + data.DeviceId,
		method:'DELETE',
		data
	})
}


// 添加日志
export function journal(data){
	return axios({
		url:'https://1to2to3.cn/authentication/log',
		method:'post',
		headers:{Authorization:'bearer'+' '+ JSON.parse( localStorage.getItem('urlUserinfor') ).token},
		data
	})
}

// 获取日志
export function getjournal(data){
	return axios({
		url:'https://1to2to3.cn/authentication/log/list',
		method:'post',
		headers:{Authorization:'bearer'+' '+ JSON.parse( localStorage.getItem('urlUserinfor') ).token},
		data
	})
}


