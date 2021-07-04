<template>
    <div style="width: 50%;">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="昵称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="验证码">
                <el-input v-model="form.verifyCode" style="width: 50%;"></el-input>
                <el-button type='primary' style="margin-left: 5%;" @click="getCode">获取验证码</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">注册</el-button>
              </el-form-item>
        </el-form>
    </div>
</template>
  <script>
    import { testToken } from '@/api/customer'
    export default {
      data() {
        return {
          form: {
            name: '',
            password:'',
            phone:'',
            verifyCode:''
          },
          correctCode:''
        }
      },
      methods: {
        onSubmit() {
          console.log('submit!');
        },
        submitForm(){
            console.log('你提交了注册申请！')
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
            
        },
        getCode(){
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
              phonenumber:'09876543211',
            }
            
            cusomerLogin(param).then(response=>{
                //判断是否登录成功
                if (response.data.phoneunique){
                }
                else{
                  this.$message.error('该手机号已存在!');
                }
            })

            console.log('获取验证码')
        }
      }
    }
  </script>