<template>
  <div>
    <!-- <ElementTest></ElementTest> -->

    <!-- KForm -->
    <k-form :model="model" :rules="rules" ref="loginForm">
      <k-form-item label="用户名" prop="username">
        <KInput v-model="model.username" placeholder="请输入用户名"></KInput>  
      </k-form-item>     
      <k-form-item>
        <button @click="onLogin">登录</button>
      </k-form-item>
    </k-form> 
  </div>
</template>

<script>
import ElementTest from '@/components/form/ElementTest.vue'
import KInput from '@/components/form/KInput.vue';
import KFormItem from './KFormItem.vue';
import KForm from './KForm.vue';

  
  export default {
    components: {
      ElementTest,
      KInput,
      KFormItem,
        KForm,
    },
    data() {
      return {
        model: {
          username: 'tom'
        },
        rules: {
          username: [{required: true, message: '用户名为必填项'}]
        }
      }
    },
    methods: {
      onLogin() {
        this.$refs.loginForm.validate(isValidate => {
          this.$notice({
            title: "社会你杨哥喊你来搬砖",
            message: isValidate ? "请求登录!" : "校验失败！",
            duration: 1000
          });
          
          // const notice = create(Notice, {
          //   title: "社会你杨哥喊你来搬砖",
          //   message: isValidate ? "请求登录!" : "校验失败！",
          //   duration: 1000
          // })
          // notice.show();
          // if (isValidate) {
          //   console.log('submit login');
          // } else {
          //   alert('校验失败，请重试')
          // }
        })
      }
    }
  }
</script>

<style scoped>

</style>