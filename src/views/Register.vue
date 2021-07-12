<!--
  顾客注册页面
  by：汪明杰
-->

<template>
    <div
    >
      <el-image
      :src="require('@/assets/registerImg/registerPic.png')"
      style="
      position: absolute;
      width: 20%;
      right: 0;
      bottom: 0;
      "
      ></el-image>
      <el-image
      :src="require('@/assets/registerImg/registerCloud.png')"
      style="
      position: absolute;
      width: 10%;
      right: 1%;
      top:3%;
      "
      ></el-image>
      <el-container
      style="height: 100%;"
      >
        <!--走马灯展示图片-->
        <el-main 
        >
        
        <el-carousel 
        :interval="3600" 
        type="card"
        height="580px"
        >
          <el-carousel-item v-for="(item,index) in showImage" :key="index"
          style="height: auto;margin-top: 5%;opacity: 0.8;">
            <h3>{{item.name}}</h3>
            <el-image :src="item.image"
            fit="contain"
            style="
            box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
            border: 1px solid #e5e5e5;
            "
            >
            </el-image>
          </el-carousel-item>
        </el-carousel>

        </el-main>
        <el-aside
        style="
        width: 36%;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        opacity: 0.9;
        ">
          
        <div style="margin-bottom: 5%;width: 75%;margin-left: 12%;margin-top: 20%;">
          <el-divider>
            <strong style="font-size: xx-large;">注册</strong>
          </el-divider>
        </div>
          <el-form 
            ref="form" 
            style="margin-right: 15%;margin-top: 15%;margin-left: 15%;"
            >
                <el-form-item>
                  <el-input 
                  v-model="name"
                  placeholder="昵称"
                  maxlength="10"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input 
                    v-model="password"
                    placeholder="密码(6-16个字符组成，区分大小写)"
                    maxlength="16"
                    minlength="6"
                    type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input 
                    v-model="phone"
                    placeholder="填写常用手机号"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input 
                    v-model="verifyCode" 
                    style="width: 50%;"
                    placeholder="请输入短信验证码"
                    maxlength="6"
                    ></el-input>
                    <el-button 
                    type='primary' 
                    style="margin-left: 5%;" 
                    @click="getCode"
                    :disabled="!canSendMessage"
                    >
                      {{messageButtonName}}
                    </el-button>
                </el-form-item>
                <!--相关事项-->
                <el-form-item>
                  <el-checkbox 
                  v-model="licenseAccept"
                  >
                    我已同意
                    <el-link 
                    type="primary"
                    :underline="false"
                    >
                    <router-link target="_blank" :to="{path:'/license'}">
                      《归宿平台用户使用协议》
                    </router-link>
                    </el-link>
                  </el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button 
                    type="primary" 
                    @click="submitForm"
                    style="width: 40%;"
                    plain
                    >注册</el-button>
                </el-form-item>
            </el-form>
        </el-aside>
      </el-container>  

    </div>
</template>
<script>  
import { testToken,customerRegister,phoneUnique } from '@/api/customer'
import {sendMessage} from '@/api/public'
import axios from 'axios'
export default {
  data() {
    return {
      name: '',
      password:'',
      phone:'',
      verifyCode:'',
      correctCode:'',
      canSendMessage:true, //发送验证码按钮状态
      waitingTime:60, //剩余需要等待的时间
      messageButtonName:'获取验证码',
      messageIsSend:false,//验证码尚未被发送
      licenseAccept:false,//是否同意协议

      //走马灯数据
      showImage:[
        {
          name:'带上行李，一起去探索中国大好河山吧!',
          image:require('@/assets/registerImg/travelPic.png'),
        },
        {
          name:'订一间民宿，尝试各种美味',
          image:require('@/assets/registerImg/travelFood.png')
        },
        {
          name:'无论去哪里，都要记得带上你爱的人',
          image:require('@/assets/registerImg/travelLove.png')
        },
        {
          name:'打造一间属于自己的民宿吧！',
          image:require('@/assets/registerImg/houseDecorate.png')
        },
        {
          name:'广告位招租！！',
          image:require('@/assets/registerImg/advertise.png')
        },
      ]
    }
  },
  watch:{
    phone(newPhone,oldPhone){
      console.log('phone is changed.')
      this.messageIsSend=false;
      this.verifyCode='';
      this.correctCode='';
      this.waitingTime=0;
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    cookieTest(){
      //cookie test
      var params = new URLSearchParams();
      params.append('prenumber', '+86');       //你要传给后台的参数值 key/value
      params.append('phonenumber', '09876543210');
      params.append('password', 'ajttql');
      axios.post('http://8.136.17.54:6001/api/login/customer', params).then(function (response) {
        console.log(response);//请求正确时执行的代码
        let all = document.cookie
        console.log(all)
      }).catch(function (response) {
        console.log(response);//发生错误时执行的代码
      })

      return;
    },
    submitForm(){
      /*
      各种检验环节
      */

      //检验是否同意协议
      if(!this.licenseAccept){
        this.$message({
          message: '请同意《归宿平台用户使用协议》',
          type: 'warning'
        });
        return;
      }

      //检验是否填写了昵称
      if(this.name===''){
        this.$message({
          message: '请填写用户昵称',
          type: 'warning'
        });
        return;
      }

      //判断是否输入了手机号
      if(!this.isLegalPhone()){
        this.$message({
          message: '请输入正确的手机号',
          type: 'warning'
        });
        return false;
      }
      console.log('你提交了注册申请！')

      //检验是否完成发送验证码的步骤
      if (!this.messageIsSend){
        this.$message({
          message: '请先发送验证码',
          type: 'warning'
        });
        return false;
      }

      //判断验证码是否正确
      if(this.correctCode!=this.verifyCode){
        this.$message({
          message: '验证码输入错误',
          type: 'warning'
        });
        return false;
      }

      //获取注册信息
      let param={
        prenumber:'+86',
        phonenumber:this.phone,
        password:this.password,
        username:this.name
      }

      //判断完成，注册
      customerRegister(param).then(response=>{
        console.log(response)
        if(response.data.registerState){
            this.$message({
                message: '成功注册账号！',
                type: 'success'
            });

            //跳转到首页
            this.$router.push('/'); 

            //打开登录界面
            startLogin();
        }
        else{
            this.$message({
                message: '注册失败，请稍后再试',
                type: 'warning'
            });
            return;
        }
      }).catch(error=>{
          this.$message.error('发生异常，请稍后再试');
          return;
      })
    },
    isLegalPhone(){
        /*
        判断输入的手机号是否合法
        */
        var myreg = /^1[3|4|5|7|8|9][0-9]{9}$/;
        if (!myreg.test(this.phone)) {
            console.log('手机号格式不正确')
            return false;
        } 
        else {
            console.log('手机号格式正确')
            return true;
        }
    },
    getCode(){
      /*
      发送验证码
      */

      //判断是否输入了手机号
      if(!this.isLegalPhone()){
        this.$message({
          message: '请输入正确的手机号',
          type: 'warning'
        });
        return false;
      }
      //首先判断手机号是否已被注册
      let param= {
        prenumber:'+86',
        phonenumber:this.phone,
      }
      
      console.log('param',param);
      phoneUnique(param).then(response=>{
        console.log('状态：',response.data.phoneunique)
        //判断手机号是否被注册过
        if (response.data.phoneunique){
          console.log('该手机号尚未被注册过')

          //暂时禁止发短信
          this.waitingTime=60;
          var waitingForMessage=setInterval(()=>{
            this.canSendMessage=false;
            this.waitingTime-=1;
            this.messageButtonName='请等待'+this.waitingTime+'s';
            if(this.waitingTime<=0){
              clearInterval(waitingForMessage);
              this.canSendMessage=true;
              this.messageButtonName='获取验证码';
              this.waitingTime=60;
            }
          },600)
          
          //更新参数
          param= {
            prenumber:'+86',
            phonenumber:this.phone,
            state:'0'
          }

          //手机号未被注册过，则发送验证码
          sendMessage(param).then(response=>{
            if(response.data.sendstate){
              console.log('成功发送验证码')

              //读取回复中的验证码内容
              this.correctCode=response.data.code;

              //已经完成发送验证码步骤
              this.messageIsSend=true;
            }
            else{
              this.$message({
                message: '发送失败，请稍后尝试重新发送',
                type: 'error'
              });
            }

          })
        }
        else{
          console.log('该手机号已经被注册过')
          this.$message({
            message: '该手机已被注册',
            type: 'warning'
          });
          return;
        }
      }).catch(error=>{
        this.$message.error('发生异常，请稍后再试');
        return;
      })
  
    }
  }
}
</script>

<style scoped>
.router-link-active{
  background-color: green;
  font-size: larger;
  color: aliceblue

}
.el-carousel__item{
  background-color:#ffffff;
  width: 30%;
  left: 10%;
  height: 220px;
}
.el-carousel__item .Carousel{
   border-bottom: 1px solid #f1f4f8;
}
.el-main{
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  background-image: url('../assets/registerImg/travelBackgound.png');
  background-size: 75%;
  background-position: 40% 150%;
  background-repeat: no-repeat;
}



</style>