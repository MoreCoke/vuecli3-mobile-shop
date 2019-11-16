<template>
  <div class="container-fluid my-4">
    <div class="vld-parent">
      <loading :active.sync="effect.isLoading"></loading>
    </div>
    <Cart class="shopping-left" @delcart="getCartData" :addCart="cartProductsNum" />
    <div class="row">
      <div class="col-md-4 d-flex align-items-center">
        <div class="detail-img bg-cover" :style="{backgroundImage:`url(${product.imgUrl})`}"></div>
      </div>
      <div class="col-md-8">
        <div class="row mb-4">
          <div class="col-lg-8">
            <div class="detail-title mb-3">
              <router-link
                class="detail-brand mr-3"
                :to="`/guest/productlist/${product.category}`"
                :style="classifyBrand()"
                v-if="product.category"
              ></router-link>
              <span>{{product.title}}</span>
            </div>
            <div class="detail-badge badge-primary p-2 mb-3">
              <i class="fas fa-thumbs-up"></i>
              商品特色
            </div>
            <p
              class="detail-content mb-3"
              v-if="product.content"
              v-html="regexpSetting(product['content'])"
            ></p>
            <p class="detail-sale mb-3">
              特價: {{product.price | currency}}
              <span>原價: {{product.origin_price | currency}}</span>
            </p>
            <div class="d-flex align-items-start align-items-md-center">
              <div class="d-flex flex-column flex-md-row">
                <div class="cart-group mr-3 mb-2 mb-md-0">
                  <a href="#" @click.prevent="qty=qty-1" :class="{'cart-disable': qty<2}">
                    <i class="fas fa-minus"></i>
                  </a>
                  <input type="number" :min="1" :max="3" v-model.number="qty" />
                  <a href="#" @click.prevent="qty=qty+1" :class="{'cart-disable': qty>2}">
                    <i class="fas fa-plus"></i>
                  </a>
                </div>
                <span
                  class="detail-current-price mr-3"
                  v-if="qty<4"
                >目前金額: {{product.price*qty | currency}}</span>
                <span class="detail-current-price mr-3" v-else>單次消費限購3台!</span>
              </div>
              <button class="btn btn-primary" @click="checkCart(product['id'],qty)">
                <i class="fas fa-spinner fa-spin" v-if="product.id === effect.currentLoading"></i>
                <i class="fas fa-shopping-cart pr-2" v-else></i>
                加入購物車
              </button>
            </div>
          </div>
          <div class="col-lg-4 d-none d-lg-block">
            <h4 class="cart-title">
              <i class="fas fa-gift mr-2"></i>購物清單
            </h4>
            <ul class="cart-list">
              <li>
                <div
                  class="cart-nothing"
                  v-if="cartProducts.carts && cartProducts.carts.length === 0"
                >尚無商品</div>
              </li>
              <li v-for="(item,index) in cartProducts.carts" :key="`cart-${index}`">
                <div class="cart-listitem">
                  <div class="d-flex mb-3 mb-xl-0">
                    <router-link
                      class="listitem-img mr-2"
                      :to="`/guest/productdetail/${item.product.id}`"
                      :style="{backgroundImage:`url(${item.product.imgUrl})`}"
                      :title="item.product.title"
                    ></router-link>
                    <div class="mr-2">
                      <h4 class="listitem-title mb-2">{{item.product.title}}</h4>
                      <p
                        class="listitem-info"
                      >{{item.product.price|currency}} 共{{item.qty}}{{item.product.unit}}</p>
                    </div>
                  </div>
                  <div class="w-100 d-flex justify-content-end align-items-center">
                    <span class="listitem-total mr-3">{{item.total | currency}}</span>
                    <button class="btn btn-outline-info" @click="delCartData(item.id,true)">
                      <i class="fas fa-spinner fa-spin" v-if="item.id === effect.currentLoading"></i>
                      <i class="fas fa-trash-alt" v-else></i>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
            <div class="cart-total">
              <span class="mr-2">總計金額:{{cartProducts.total | currency}}</span>
              <button class="btn btn-info mt-3 mt-xl-0" :disabled="cartProductsNum === 0" @click="toOrderCheck">
                <i class="fas fa-cash-register mr-2"></i>結帳去
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="topic mb-5">商品描述</div>
      <p
        class="detail-content"
        v-if="product.description"
        v-html="regexpSetting(product['description'])"
      ></p>
      <div class="topic mb-5">其他熱門商品</div>
      <div class="row">
        <div class="col-sm-4" v-for="(item,index) in random" :key="`random-${index}`">
          <ProductCard :card="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductCard from "../ProductCard";
import Cart from "../Cart";
export default {
  components: {
    ProductCard,
    Cart
  },
  data() {
    return {
      product: {},
      random: [],
      cartProducts: {},
      cartProductsNum: null,
      qty: 1,
      effect: {
        isLoading: false,
        currentLoading: ""
      }
    };
  },
  methods: {
    //取得產品細節資料
    getProductDetail() {
      let vm = this;
      let id = vm.$route.params.id;
      let url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/product/${id}`;
      vm.effect.isLoading = true;
      vm.$http.get(url).then(response => {
        vm.product = response.data.product;
        // vm.images.normal_size[0].url = vm.product.imgUrl;
        vm.getData();
        vm.effect.isLoading = false;
      });
    },
    //取得全部商品
    getData() {
      let url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products/all`;
      let vm = this;
      let products = [];
      vm.$http.get(url).then(response => {
        products = response.data.products;
        vm.getRandomProduct(...products);
      });
    },
    //從全部商品抽取隨機商品
    getRandomProduct(...data) {
      let vm = this;
      let len = data.length;
      vm.random = [];
      while (vm.random.length < 3) {
        let r = Math.floor(Math.random() * len);
        if (vm.random.indexOf(data[r]) === -1 && vm.product.id !== data[r].id) {
          vm.random.push(data[r]);
        }
      }
    },
    //根據品牌替換logo
    classifyBrand() {
      return {
        backgroundImage:
          "url(" + require(`@/assets/img/${this.product.category}.svg`) + ")"
      };
    },
    //取得當前購物車資料
    getCartData() {
      let vm = this;
      let url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      vm.$http.get(url).then(response => {
        vm.cartProducts = response.data.data;
        vm.cartProductsNum = response.data.data.carts.length;
      });
    },
    //將商品和購買數量加入購物車
    addToCart(id, qty) {
      let vm = this;
      let url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      if (qty > 3) {
        qty = 3;
        vm.$bus.$emit("每款商品限購3個", "warning");
      }
      const cart = {
        product_id: id,
        qty
      };
      vm.effect.currentLoading = id;
      vm.$http.post(url, { data: cart }).then(response => {
        vm.getCartData();
        vm.effect.currentLoading = "";
        vm.$bus.$emit("message:push", response.data.message, "success");
      });
    },
    //根據id刪除當前商品
    delCartData(id, showmessage) {
      let vm = this;
      let url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.effect.currentLoading = id;
      vm.$http.delete(url).then(response => {
        vm.getCartData();
        vm.effect.currentLoading = "";
        if (showmessage) {
          vm.$bus.$emit("message:push", response.data.message, "warning");
        }
      });
    },
    //檢查購物車是否有相同商品
    checkCart(id, qty) {
      let vm = this;
      let sameProductNum = qty;
      let sameProduct = vm.cartProducts.carts.find(
        item => item.product.id === id
      );
      //如果購物車有相同商品
      if (typeof sameProduct !== "undefined") {
        sameProductNum += sameProduct.qty;
        if (sameProductNum > 3) {
          sameProductNum = 3;
          vm.$bus.$emit("message:push", "每款商品限購3個", "warning");
        } else {
          vm.delCartData(sameProduct.id, false);
          vm.addToCart(id, sameProductNum);
        }
      } else {
        vm.addToCart(id, qty);
      }
    },
    regexpSetting(txt) {
      return txt
        .replace(/(.{1,}\n\b)/g, "<span class='description-title'>$1</span>")
        .replace(/\n/g, "<br>");
    },
    toOrderCheck() {
      if (this.cartProductsNum > 0) {
        this.$router.push("/guest/productorder/check");
      }
    }
  },
  watch: {
    $route() {
      this.getProductDetail();
    }
  },
  created() {
    this.getProductDetail();
    this.getCartData();
  }
};
</script>