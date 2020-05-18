<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <div class="topic">訂購人資料</div>
    <div class="my-5 row justify-content-center">
      <form class="col-md-10" @submit.prevent="sentOrderData">
        <div class="form-row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="username">訂購人姓名*</label>
              <input
                type="text"
                class="form-control"
                name="name"
                id="username"
                placeholder="請輸入姓名"
                v-model="form.user.name"
                v-validate="'required'"
                :class="{'is-invalid': errors.has('name')}"
              />
              <span
                class="text-danger"
                v-if="errors.has('name')"
              >{{errors.first('name').replace(/name/,'名字')}}</span>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="usertel">訂購人電話*</label>
              <input
                type="tel"
                class="form-control"
                name="tel"
                id="usertel"
                placeholder="請輸入電話"
                v-model="form.user.tel"
                v-validate="'required|digits:10'"
                :class="{'is-invalid': errors.has('tel')}"
              />
              <span
                class="text-danger"
                v-if="errors.has('tel')"
              >{{errors.first('tel').replace(/tel/,'電話號碼')}}</span>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="useremail">Email*</label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="useremail"
            placeholder="請輸入 Email"
            v-model="form.user.email"
            v-validate="'required|email'"
            :class="{'is-invalid': errors.has('email')}"
          />
          <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
        </div>

        <div class="form-group">
          <label for="useraddress">訂購人地址*</label>
          <input
            type="text"
            class="form-control"
            name="address"
            id="useraddress"
            placeholder="請輸入地址"
            v-model="form.user.address"
            v-validate="'required'"
            :class="{'is-invalid': errors.has('address')}"
          />
          <span class="text-danger" v-if="errors.has('address')">地址不得留空</span>
        </div>
        <div class="form-group">
          <label for="comment">備註(選填)</label>
          <textarea
            name
            id="comment"
            class="form-control"
            cols="20"
            rows="5"
            v-model="form.message"
          ></textarea>
        </div>

        <div class="d-flex justify-content-between my-3">
          <button class="btn btn-primary btn-lg" @click="toOrderCheck">
            上一步
            <i class="fas fa-hand-point-left"></i>
          </button>
          <button class="btn btn-primary btn-lg">
            送出訂單
            <i class="fas fa-hand-point-right"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    };
  },
  methods: {
    sentOrderData() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      this.$validator.validate().then((valid) => {
        if (valid) {
          vm.$store.commit("LOADING", true);
          vm.$http.post(url, { data: vm.form }).then((response) => {
            if (response.data.success) {
              vm.$bus.$emit("message:push", response.data.message, "success");
              vm.toOrderFinished(response.data.orderId);
            } else {
              vm.$bus.$emit("message:push", response.data.message, "warning");
            }
            vm.$store.commit("LOADING", false);
          });
        } else {
          vm.$bus.$emit("message:push", "表單尚未完成", "warning");
        }
      });
    },
    toOrderCheck() {
      this.$router.push("/guest/productorder/check");
    },
    toOrderFinished(id) {
      this.$router.push({
        path: "/guest/productorder/finished",
        query: { orderid: id }
      });
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
};
</script>
<style lang="scss" scope>
label {
  margin-bottom: 1rem;
}
</style>
