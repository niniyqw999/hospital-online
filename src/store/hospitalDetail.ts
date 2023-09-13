import {defineStore} from 'pinia'
import { reqHospitalDeparment, reqHospitalDetail } from '@/api/hospital'
import type { HospitalDetail } from '@/api/hospitaltype'
import type {DetailState} from '@/store/interface/detailtype'
import type { HosPitalDetail,DeparmentResponseData,DeparmentArr } from "@/api/hospitaltype";

const useDetailStore = defineStore('Detail',{
    state:():DetailState =>{
        return{
            //医院详情的数据
            hospitalInfo:({} as HosPitalDetail),
            //存储医院科室数据
            deparmentArr:[]
        }
    },
    actions:{
        //获取医院详情的方法
        async getHospital(hoscode:string){
            let result:HospitalDetail=await reqHospitalDetail(hoscode)
            if(result.code==200){
                this.hospitalInfo=result.data
            }
        },
        //获取医院科室的方法
        async getDepartment(hoscode:string){
            let result:DeparmentResponseData =await reqHospitalDeparment(hoscode)
            if(result.code==200){
                this.deparmentArr=result.data
            }
        }
    },
    getters:{

    }
})

export default useDetailStore