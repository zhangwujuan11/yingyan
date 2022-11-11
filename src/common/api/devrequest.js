import axios from 'axios'


const server = axios.create({
  baseURL:process.env.VUE_APP_BASE_API,
  withCredentials: false, // 上次设置是true的时候连接不了'http://10.10.10.139:7800'
  timeout: 8000
})
export default server