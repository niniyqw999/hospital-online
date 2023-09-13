import { createApp } from 'vue'
import App from '@/App.vue'
//引入清楚默认样式
import '@/style/reset.scss'
//引入全局组件顶部和底部
import Top from '@/components/Top.vue'
import Bottom from '@/components/Bottom.vue'
import Login from '@/components/Login.vue'
import Visitor from '@/components/Visitor.vue'
import router from './router'
//引入element-plus插件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//引入pinia仓库
import pinia from '@/store'

const app = createApp(App)

app.component('Top', Top)
app.component('Bottom', Bottom)
app.component('Login', Login)
app.component('Visitor', Visitor)
app.use(router)
app.use(ElementPlus)
app.use(pinia)

//引入路由鉴权的文件
import './permisstion'

app.mount('#app')