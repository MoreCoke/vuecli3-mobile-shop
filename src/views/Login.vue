<template>
  <div>
    <Alert />
    <form class="form-login" @submit.prevent="signin">
      <router-link class="login" to="/guest/home">
        <img class="login-img" :src="`${publicPath}img/logo.png`" />
        <span class="login-title">速達通訊</span>
      </router-link>
      <h1 class="h3 mb-3 font-weight-normal text-center">後台管理系統</h1>
      <label for="inputEmail" class="text-primary h5 mb-2">電子信箱</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control mb-3"
        placeholder="請輸入信箱"
        v-model="user.username"
        required
        autofocus
      />
      <label for="inputPassword" class="text-primary h5 mb-2">管理者密碼</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control mb-3"
        placeholder="請輸入密碼"
        v-model="user.password"
        required
      />
      <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2019-2020</p>
    </form>
  </div>
</template>

<script>
import Alert from "@/components/AlertMessage";

export default {
  components: {
    Alert
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    signin() {
      const api = `${process.env.VUE_APP_APIPATH}admin/signin`;
      const vm = this;
      this.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          vm.$router.push("/admin/products");
          vm.$store.dispatch("updateMessage", { message: response.data.message, status: "success" });
        } else {
          vm.$store.dispatch("updateMessage", { message: response.data.message, status: "warning" });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
