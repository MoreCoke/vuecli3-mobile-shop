<template>
  <div class="container">
    <div class="vld-parent">
    </div>
    <ul class="step my-4">
      <li class="step-check" :class="{'done': step==='check'}">
        <span class="step-icon">
          <i class="fas fa-2x fa-user-check"></i>
        </span>
        <span class="step-text">訂單確認</span>
      </li>
      <li class="step-credit" :class="{'done': step==='info'}">
        <span class="step-icon">
          <i class="far fa-2x fa-credit-card"></i>
        </span>
        <span class="step-text">資料輸入</span>
      </li>
      <li class="step-finished" :class="{'done': step==='finished'}">
        <span class="step-icon">
          <i class="fas fa-2x fa-truck-moving"></i>
        </span>
        <span class="step-text">訂單成立</span>
      </li>
    </ul>
    <OrderCheck v-if="step==='check'" :cartData="cartProducts" @updateCart="getCartData" />
    <OrderInfo v-if="step==='info'" />
    <OrderFinished v-if="step==='finished'" />
  </div>
</template>
<script>
import OrderCheck from "../OrderCheck";
import OrderInfo from "../OrderInfo";
import OrderFinished from "../OrderFinished";

export default {
  components: {
    OrderCheck,
    OrderInfo,
    OrderFinished
  },
  data() {
    return {
      step: this.$route.params.step,
      cartProducts: {},
      effect: {
        currentLoading: "",
        couponLoading: false
      }
    };
  },
  methods: {
    // 取得當前購物車資料
    getCartData() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$store.commit("LOADING", true);
      vm.$http.get(url).then((response) => {
        vm.cartProducts = response.data.data;
        vm.$store.commit("LOADING", false);
      });
    },
    // 追蹤當前結帳步驟，用來渲染相對應的組件
    checkStep() {
      this.step = this.$route.params.step;
    }
  },
  watch: {
    $route() {
      this.checkStep();
    }
  },
  created() {
    this.getCartData();
  }
};
</script>
