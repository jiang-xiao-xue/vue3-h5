<!--
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-07-08 15:15:44
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-07-29 17:24:05
 * @FilePath: \my-vue3-h5\src\views\register\login.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="login bg-login" v-loading = "loading" jxx-loading-text='别急嘛~'
	jxx-loading-background='rgba(0, 0, 0, .4)'>
    <div class="info-box info-login">
      <div class="label-form">
        <p>用户名</p>
        <input type="text" v-model="username" maxlength="20">
      </div>
      <div class="label-form">
        <p>密码</p>
        <input type="password" v-model="password" maxlength="20">
      </div>
    </div>
    <div class="btn" @click="login">登录</div>
  </div>
</template>
<!-- <script>
  export default {
    name :'Login'
  }
</script> -->
<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue'
const { ctx } = getCurrentInstance();
const that = ctx.$.appContext.config.globalProperties;
const loading = ref<boolean>(false);
onMounted(() => {
  // loading.value = true
})
let username = ref<String>('')
let password = ref<String>('')

const login = function() {
  console.log(username.value);
  if (!username.value) {
    console.log('请填写用户名');
    that.$toast({
        value: '请填写用户名',
        duration: 2000, // 如果大于0则不必使用destory方法
        background: '#000',
        color: '#fff'
    })
  } else if(!password.value) {
     that.$toast({
        value: '请填写密码',
        duration: 2000, // 如果大于0则不必使用destory方法
        background: '#000',
        color: '#fff'
    })
  } else {
    let putObj = {
      'userName': username.value,
      'password': password.value
    }
    that.$request.post('common.login', putObj).then((res: any) => {
      console.log(res);
      localStorage.setItem('authorization', JSON.stringify(res.data.token));//将token存储起来
      username.value = ''
      password.value = ''
    })
  }
}
</script>


<style  lang="scss">
.login {
  width: 100%;
  height: 87.5vh;
  color: $font-color;
  padding-top: 100px;
  // font-size: 24px;
  .info-box {
    padding-top: 70px;
    width: 300px;
    height: 300px;
    margin: 0 auto;
    border-radius: 20px;
    .label-form {
      width: 270px;
      margin: 20px auto;
      font-size: 20px;
      input {
        width: 250px;
        height: 30px;
        margin-top: 20px;
        border-radius: 10px;
        border: 1px solid $border-color;
        outline: none;
      }
    }
  }
  .btn {
    width: 300px;
    height: 50px;
    margin: 40px auto;
    background: $btn-color;
    border-radius: 20px;
    text-align: center;
    line-height: 50px;
    font-size: 26px;
  }
}
</style>