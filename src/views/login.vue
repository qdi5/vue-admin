<template>
  <div class="login-wrapper">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" auto-complete="on" label-position="left">
      <div class="title-wrapper">
        <h3 class="title">登&nbsp;&nbsp;录</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container"></span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container"></span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
        >
        </el-input>
      </el-form-item>
      <el-button :loading="loading" type="primary" class="login-btn"  @click.native.prevent="handleLogin">Login</el-button>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { validUsername } from 'utils/validate'
export default {
  name: 'Login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false
    }
  },
  methods: {
    // 这里映射的时候，要带上vuex的命名空间
    ...mapActions(['user/login']),
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          //  调用vuex里登录的action
          this['user/login']({
            username: this.loginForm.username,
            password: this.loginForm.password
          }).then(response => {
            // 登录成功后，跳转到指定页面或首页
            this.$router.push({ path: this.redirect || '/' }, () => {})
          }).catch(error => {
            console.log(error)
          }).finally(() => {
            console.log('finally 啦')
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  },
  watch: {
    $route: {
      handler (route) {
        // 记录跳转到登录页时，携带的登录成功后需要重定向的路由地址
        this.redirect = route.query && route.query.redirect
      },
      // handler将会在侦听开始之后被立即调用
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  .login-btn {
    width: 100%;
    margin-bottom: 30px;
  }
}

</style>
