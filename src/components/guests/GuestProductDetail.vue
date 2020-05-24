<template>
  <div class="container-fluid my-4">
    <div class="vld-parent">
    </div>
    <Cart class="shopping-left" @delcart="getCartData" :addCart="cartProductsNum" />
    <div class="row">
      <div class="col-md-4 d-flex align-items-center">
        <div class="detail-img bg-cover" :style="productImg"></div>
      </div>
      <div class="col-md-8">
        <div class="row mb-4">
          <div class="col-lg-8">
            <div class="detail-title mb-3">
              <router-link
                class="detail-brand mr-3"
                v-if="product.category"
                :to="`/guest/productlist/${product.category}`"
                :style="productBrandImg"
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
                  <a href="#" @click.prevent="qty = qty - 1" :class="{'cart-disable': qty < 2}">
                    <i class="fas fa-minus"></i>
                  </a>
                  <input type="number" :min="1" :max="3" v-model.number="qty" />
                  <a href="#" @click.prevent="qty = qty + 1" :class="{'cart-disable': qty > 2}">
                    <i class="fas fa-plus"></i>
                  </a>
                </div>
                <span
                  class="detail-current-price mr-3"
                  v-if="qty < 4"
                >目前金額: {{product.price * qty | currency}}</span>
                <span class="detail-current-price mr-3" v-else>單次消費限購3台!</span>
              </div>
              <button class="btn btn-primary" @click="checkCart(product['id'],qty)" :disabled="product.id === effect.currentLoading">
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
                  v-if="cartProductsNum === 0"
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
                    <button class="btn btn-outline-info" @click="delCartData(item.id,true)" :disabled="item.id === effect.currentLoading">
                      <i class="fas fa-spinner fa-spin" v-if="item.id === effect.currentLoading"></i>
                      <i class="fas fa-trash-alt" v-else></i>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
            <div class="cart-total">
              <span class="mr-2">總計金額:{{cartProducts.total | currency}}</span>
              <button
                class="btn btn-info mt-3 mt-xl-0"
                :disabled="cartProductsNum === 0"
                @click="toOrderCheck"
              >
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
      publicPath: process.env.BASE_URL,
      product: {},
      random: [],
      cartProducts: {},
      cartProductsNum: null,
      qty: 1,
      effect: {
        currentLoading: ""
      }
    };
  },
  methods: {
    // 取得產品細節資料
    getProductDetail() {
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      this.$store.commit("LOADING", true);
      this.$http.get(url).then((response) => {
        this.product = response.data.product;
        this.getRandomProduct();
        this.$store.commit("LOADING", false);
      });
    },
    // 取得隨機商品
    getRandomProduct() {
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      this.$http.get(url).then((response) => {
        const { products } = response.data;
        const len = products.length;
        this.random = [];
        while (this.random.length < 3) {
          const r = Math.floor(Math.random() * len);
          if (this.random.indexOf(products[r]) === -1 && this.product.id !== products[r].id) {
            this.random.push(products[r]);
          }
        }
      });
    },
    // 取得當前購物車資料
    getCartData() {
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.get(url).then((response) => {
        this.cartProducts = response.data.data;
        this.cartProductsNum = response.data.data.carts.length;
      });
    },
    // 將商品和購買數量加入購物車
    addToCart(id, qty) {
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      // 如果購買數量直接超過 3 的話
      if (qty > 3) {
        qty = 3;
        this.$store.dispatch("updateMessage", { message: "每款商品限購3個", status: "warning" });
      }
      const cart = {
        product_id: id,
        qty
      };
      this.effect.currentLoading = id;
      this.$http.post(url, { data: cart }).then((response) => {
        this.getCartData();
        this.effect.currentLoading = "";
        this.$store.dispatch("updateMessage", { message: response.data.message, status: "success" });
      });
    },
    // 根據id刪除當前商品
    delCartData(id, showmessage) {
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      this.effect.currentLoading = id;
      this.$http.delete(url).then((response) => {
        this.getCartData();
        this.effect.currentLoading = "";
        if (showmessage) {
          this.$store.dispatch("updateMessage", { message: response.data.message, status: "warning" });
        }
      });
    },
    // 檢查購物車是否有相同商品
    checkCart(id, qty) {
      let productNum = qty;
      const sameProduct = this.cartProducts.carts.find(
        item => item.product.id === id
      );
      // 如果購物車有相同商品
      if (typeof sameProduct !== "undefined") {
        productNum += sameProduct.qty;
        // 如果想購買數量和購物車內的商品相加後大於 3
        if (productNum > 3) {
          this.$store.dispatch("updateMessage", { message: "每款商品限購3個", status: "warning" });
        } else {
          this.delCartData(sameProduct.id, false);
          this.addToCart(id, productNum);
        }
      } else {
        this.addToCart(id, qty);
      }
    },
    // 使用正規表達將商品介紹的文字進行渲染
    regexpSetting(txt) {
      return txt
        .replace(/(.{1,}\n\b)/g, "<span class='description-title'>$1</span>")
        .replace(/\n/g, "<br>");
    },
    // 進入結帳頁面
    toOrderCheck() {
      if (this.cartProductsNum > 0) {
        this.$router.push("/guest/productorder/check");
      }
    }
  },
  computed: {
    productImg() {
      return {
        backgroundImage: `url(${this.product.imgUrl})`
      };
    },
    // 根據品牌替換logo
    productBrandImg() {
      return {
        backgroundImage: `url(${this.publicPath}img/${this.product.category}.svg)`
      };
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
