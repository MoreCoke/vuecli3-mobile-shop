<template>
  <div class="dropdown shopping-cart">
    <button class="shopping-btn" @click="showCartList = !showCartList">
      <i class="fas fa-shopping-cart fa-3x"></i>
      <span class="badge badge-pill badge-danger">{{cartProductsNum}}</span>
    </button>
    <div class="dropdown-menu" :class="{show:showCartList}">
      <div class="p-3">
        <h5 class="font-weight-bold">購物清單</h5>
        <div class="shopping-scroll my-3">
          <table class="table">
            <thead v-if="cartProductsNum >0">
              <th></th>
              <th>購買明細</th>
              <th>價格</th>
            </thead>
            <tbody>
              <tr v-if="cartProductsNum ===0">
                <td>目前尚無選購商品!</td>
                <td></td>
                <td></td>
              </tr>
              <tr v-for="(item,index) in cartProducts.carts" :key="`cart-${index}`">
                <td>
                  <router-link
                    class="shopping-img"
                    :to="`/guest/productdetail/${item.product.id}`"
                    :style="{backgroundImage:`url(${item.product.imgUrl})`}"
                  ></router-link>
                </td>
                <td>
                  <h4 class="mb-2">{{item.product.title}}</h4>
                  <p>共{{item.qty}}{{item.product.unit}}</p>
                </td>
                <td>
                  <p>{{item.final_total | currency}}</p>
                  <button class="mt-3 btn btn-outline-info" @click="delCartData(item.id)">
                    <i class="fas fa-spinner fa-spin" v-if="item.id === effect.currentLoading"></i>
                    <i class="fas fa-trash-alt" v-else></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="shopping-total">總計金額: {{cartProducts.total | currency}}</div>
        <button class="btn btn-primary btn-block" :disabled="cartProductsNum === 0" @click="toOrderCheck">
          <i class="fas fa-shopping-cart mr-2"></i>結帳去
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  props: ["addCart"],
  data() {
    return {
      cartProducts: {},
      cartProductsNum: null,
      showCartList: false,
      effect: {
        isLoading: false,
        currentLoading: ""
      }
    };
  },
  methods: {
    getCartData() {
      let vm = this;
      let url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      vm.$http.get(url).then(response => {
        vm.cartProducts = response.data.data;
        vm.cartProductsNum = response.data.data.carts.length;
      });
    },
    delCartData(id) {
      let vm = this;
      let url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.effect.currentLoading = id;
      vm.$http.delete(url).then(response => {
        vm.getCartData();
        vm.effect.currentLoading = "";
        vm.$bus.$emit("message:push", response.data.message, "warning");
        vm.$emit("delcart");
      });
    },
    toOrderCheck(){
      if(this.cartProductsNum>0){
        this.$router.push("/guest/productorder/check");
      }
    }
  },
  watch: {
    addCart() {
      this.getCartData();
    }
  },
  created() {
    this.getCartData();
  }
};
</script>