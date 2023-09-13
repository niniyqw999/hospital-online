//定义用户相关的仓库
import { defineStore } from "pinia";
//引入获取验证码的请求方法
import { reqCode,reqUserLogin } from "@/api/hospital";
import type { LoginData,UserLoginResponseData,UserInfo } from "@/api/hospitaltype";
import type { UserState } from "./interface/detailtype";

const useUserStore = defineStore('User',{
    state:():UserState=>{
        return{
            visiable:false,//用于控制登录组件的dialog显示与隐藏
            code:'',
            userInfo:JSON.parse(localStorage.getItem('USERINFO')as string)||{}//存储用户信息
        }
    },
    actions:{
        //获取验证码方法
        async getCode(phone:string){
            //携带手机号码向服务器获取验证码
            let result:any= await reqCode(phone)
            if(result.code=200){
                this.code=result.data
                return 'ok'
            }else{
                return Promise.reject(new Error('result.message'))
            }
        },
        //用户手机号码登录的方法
        async userLogin(loginData:LoginData){
            let result:UserLoginResponseData= await reqUserLogin(loginData)
            if(result.code=200){
               this.userInfo=result.data 
               //本地存储持久化用户信息
               localStorage.setItem('USERINFO',JSON.stringify(this.userInfo))
               return 'ok'
            }else{
                return Promise.reject(new Error(result.message))
            }  
        },
        //退出登录的方法
        logout(){
            this.userInfo={name:'',token:''}
            localStorage.removeItem('USERINFO')
        },
        //查询微信扫码的接口（看本地存储是否存储数据）
        queryState(){
            //开启定时器与每隔一段事件问本地是否拥有用户信息
            let timer=setInterval(()=>{
                //本地存储已有数据说明扫码成功
                if(localStorage.getItem('USERINFO')){
                    //关闭对话框
                    this.visiable=false
                    this.userInfo=JSON.parse(localStorage.getItem('USERINFO') as string)
                    clearInterval(timer)
                }
            },1000)
        }
    },
    getters:{

    }
})
export default useUserStore