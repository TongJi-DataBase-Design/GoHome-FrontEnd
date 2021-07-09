<!--
  注册页面
  by：汪明杰
  最近更新时间：7/7 23:40
-->

<template>
    <div>
      <el-image
      style="width:100%; height: 100px"
      :src="require('@/assets/registerHeader.png')"
      ></el-image>
      <div style="margin-bottom: 5%;width: 75%;margin-left: 12%;">
        <el-divider>
          <strong style="font-size: xx-large;">注册</strong>
        </el-divider>
      </div>
      <div style="width: 30%;margin-left: 35%;">
        <el-form 
        ref="form" 
        :model="form" 
        >
            <el-form-item>
              <el-input 
              v-model="form.name"
              placeholder="昵称"
              ></el-input>
            </el-form-item>
            <el-form-item>
                <el-input 
                v-model="form.password"
                placeholder="密码(6-16个字符组成，区分大小写)"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-input 
                v-model="form.phone"
                placeholder="填写常用手机号"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-input 
                v-model="form.verifyCode" 
                style="width: 50%;"
                placeholder="请输入短信验证码"
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
                <el-button type="primary" @click="submitForm">注册</el-button>
            </el-form-item>
        </el-form>
      </div>
    </div>
</template>
<script>  
import { testToken,customerRegister,phoneUnique } from '@/api/customer'
import {sendMessage} from '@/api/public'
export default {
  data() {
    return {
      form: {
        name: '',
        password:'',
        phone:'',
        verifyCode:''
      },
      correctCode:'',
      canSendMessage:true, //发送验证码按钮状态
      waitingTime:60, //剩余需要等待的时间
      messageButtonName:'获取验证码',
      messageIsSend:false,//验证码尚未被发送
      licenseAccept:false,//是否同意协议
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    submitForm(){
      /*
      各种检验环节
      */
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


      //判断二维码是否正确
      //待完成

      let param={
        prenumber:'+86',
        phonenumber:this.form.phone,
        password:this.form.password,
        username:this.form.name
      }
      console.log(param)



      //判断完成，注册
      customerRegister(param).then(response=>{
        console.log(response)
      })
    },
    isLegalPhone(){
        /*
        判断输入的手机号是否合法
        */
        var myreg = /^1[3|4|5|7|8|9][0-9]{9}$/;
        if (!myreg.test(this.form.phone)) {
            console.log('手机号格式不正确')
            return false;
        } 
        else {
            console.log('手机号格式正确')
            return true;
        }
        
        
    }
    ,
    getCode(){
      /*
      testToken().then(response => {
        this.getMessage=response.data
        console.log('get请求测试:',this.getMessage)
      }).catch((error)=>{
        this.$message({
            message: error,
            type: 'warning'
          });
        console.log('error',error)
      })
      return;
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
        phonenumber:this.form.phone,
      }
      
      console.log('param',param);
      phoneUnique(param).then(response=>{
        //判断手机号是否被注册过
        if (response.data.phoneunique){
          console.log('该手机号尚未被注册过')
        }
        else{
          this.$message.error('该手机号已存在!');
          return;
        }
      }).catch(error=>{
        this.$message.error('发生异常，请稍后再试');
        return;
      })

      //暂时禁止发短信
      var waitingForMessage=setInterval(()=>{
        console.log('hello');
        this.canSendMessage=false;
        this.waitingTime-=1;
        this.messageButtonName='请等待'+this.waitingTime+'s';
        if(this.waitingTime<=0){
          clearInterval(waitingForMessage);
          this.canSendMessage=true;
          this.messageButtonName='获取验证码';
        }
      },100)
      
      //更新参数
      param= {
        prenumber:'+86',
        phonenumber:this.form.phone,
        state:'0'
      }

      //手机号未被注册过，则发送验证码
      sendMessage(param).then(response=>{
        if(response.data.sendstate){
          console.log('成功发送验证码')
        }
        else{
          this.$message.error('发送失败，请稍后尝试重新发送');
        }

      })

      //已经完成发送验证码步骤
      this.messageIsSend=true;
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
</style>