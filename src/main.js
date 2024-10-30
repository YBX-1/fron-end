

import { createApp } from 'vue'
import App from './App.vue'
import "./style.css"
import ElementUI from 'element-plus'; 
let app = createApp(App);
app.use(ElementUI);
// 将路由文件注册到全局
// 挂载根实例
app.mount('#app')