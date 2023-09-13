<template>
<div class="hospital">
  <!-- 左侧导航区 -->
<div class="menu">
      <div class="top">
        <el-icon><home-filled /></el-icon>
        <span> / 医院信息</span>
      </div>
      <el-menu :default-active="route.path" class="el-menu-vertical-demo">
        <el-menu-item index="/hospital/register" @click="changeActive('/hospital/register')">
          <el-icon><setting /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item index="/hospital/detail" @click="changeActive('/hospital/detail')">
          <el-icon><icon-menu /></el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item index="/hospital/notice" @click="changeActive('/hospital/notice')">
          <el-icon><document /></el-icon>
          <span>预约须知</span>
        </el-menu-item>
        <el-menu-item index="/hospital/close" @click="changeActive('/hospital/close')">
          <el-icon><info-filled /></el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item index="/hospital/search" @click="changeActive('/hospital/search')">
          <el-icon><search /></el-icon>
          <span>查询/取消</span>
        </el-menu-item>
      </el-menu>
</div>
<!-- 右侧内容展示区域：路由组件展示位置 -->
<div class="content">
  <!-- 子路由展示 -->
  <router-view></router-view>
</div>
</div>
</template>
<script lang="ts" setup>
import {Document,Menu as IconMenu,InfoFilled,Setting,Search,HomeFilled} from '@element-plus/icons-vue'
import { onMounted } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import useDetailStore from '@/store/hospitalDetail'
//获取仓库对象
let detailStore = useDetailStore()
let router = useRouter()
let route = useRoute()
//左侧菜单点击跳转子路由
const changeActive=(path:string)=>{
  router.push({
    path,
    query:{hoscode:route.query.hoscode}
  })
}
//组件挂载完毕通知pinia仓库发请求获取医院详情，存储于仓库中
onMounted(()=>{
  //获取医院详情数据
  detailStore.getHospital(route.query.hoscode as string)
  //获取医院科室数据
  detailStore.getDepartment(route.query.hoscode as string)
})
</script>

<style scoped lang="scss">
.hospital{
  display: flex;
  .menu{
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top{
      color: #7f7f7f;
    }
  }
  .content{
    flex: 8;
  }
}
</style>