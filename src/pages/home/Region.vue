<template>
    <div class="region">
      <div class="content">
        <div class="left">地区:</div>
        <ul>
          <li :class="{active:RegionFlag==''}" @click="changeRegion('')">全部</li>
          <li v-for="item in RegionArr" :class="{active:RegionFlag==item.value}" :key="item.value" @click="changeRegion(item.value)">{{item.name}}</li>
        </ul>
      </div>
    </div>
</template>
  
<script setup lang="ts">
import { reqHospitalLevelAndRegion } from '@/api/home';
import { onMounted,ref } from 'vue';
import type { HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr } from '@/api/type';

//存储地区数据
let RegionArr=ref<HospitalLevelAndRegionArr>([])
//地区高亮的响应式数据
let RegionFlag=ref<string>('')
onMounted(() => {
  getRegion()
})
//获取地区的数据
const getRegion=async()=>{
  let result:HospitalLevelAndRegionResponseData =await reqHospitalLevelAndRegion('beijin')
  //存储全部地区的数据
  if(result.code==200){
    RegionArr.value=result.data
  }
}
//点击不同区域按钮的回调
const changeRegion=(region:string)=>{
  RegionFlag.value=region
  //给父组件传递区域的参数
  $emit('getRegion',region)
}

let $emit=defineEmits(['getRegion'])
</script>
  
<style scoped lang="scss">
  .region {
    color: #7f7f7f;
    margin-top: 20px;
    .content {
      display: flex;
      .left {
        margin-right: 10px;
        width: 50px;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          margin-right: 10px;
          margin-bottom: 10px;
          &.active {
            color: #55a6fe;
          }
        }
        li:hover {
          color: #55a6fe;
        }
      }
    }
  }
</style>
  @/api/hometype