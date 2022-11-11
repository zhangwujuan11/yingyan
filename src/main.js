import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import axios from 'axios'
import VConsole from 'vconsole';
 let vConsole = new VConsole();



//公共css文件
import '@/assets/comm.css';
// 淘宝无线适配
import '@/assets/js/flexible';

// mint-ui
import { Checklist } from 'mint-ui';
import { Popup } from 'mint-ui';
import { Tabbar, TabItem ,Navbar} from 'mint-ui';
import { TabContainer, TabContainerItem } from 'mint-ui';
import { Actionsheet } from 'mint-ui';

Vue.component(Actionsheet.name, Actionsheet);
import 'mint-ui/lib/style.css';
import { Button } from 'mint-ui';
Vue.component(Button.name, Button);
Vue.component(Checklist.name, Checklist);
Vue.component(Popup.name, Popup);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);



// tcplayer
import { TcPlayer } from '@/assets/js/test.js'
Vue.prototype.TcPlayer = TcPlayer


// click300延迟
// import fastClick from 'fastclick'
// fastClick.attach(document.body)



//滚动
new Vue({
  router,
  store,
 
  render: h => h(App)
}).$mount('#app')

