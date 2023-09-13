<template>
    <div class="search">
      <el-autocomplete
        clearable
        placeholder="请你输入医院名称"
        v-model="hosname" 
        :fetch-suggestions="fetchData"
        :trigger-on-focus="false"
        @select="goDetail"
      />
      <el-button type="primary" size="default" :icon="Search">搜索</el-button>
    </div>
  </template>
  
  <script setup lang="ts">
  //引入element-plus提供图标
  import { Search } from "@element-plus/icons-vue";
  import { ref } from "vue";
  import { reqHospitalInfo } from "@/api/home";
  import type { HospitalInfo} from "@/api/type";
  import { useRouter } from "vue-router";
  //收集搜索的医院关键字
  let hosname = ref<string>('')
  //创建路由对象
  let router=useRouter()
  //顶部组件的回调
  const fetchData=async(keyword:string,cb:any)=>{
    let result:HospitalInfo = await reqHospitalInfo(keyword)
    //整理数据变成组件需要的数据格式
    let showData=result.data.map(item=>{
      return {
        value:item.hosname,//展示医院名字
        hoscode:item.hoscode//存储医院编码
      }
    })
    //给组件提供展示的数组
    cb(showData)
  }
  //点击搜索出来的某个数据转到详情
  const goDetail=(item:any)=>{
    //携带query参数医院的编码
    router.push({
      path:'/hospital/register',
      query:{hoscode:item.hoscode}
      
    })
  }
  </script>
  <style scoped lang="scss">
  .search {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
  
    ::v-deep(.el-input__wrapper) {
      width: 600px;
      margin-right: 10px;
    }
  }
  </style>
  @/api/hometype