<template>
  <div class="mt-3">
    <div class="vld-parent">
    </div>
    <Cart class="shopping-right" />
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <GuestSidebar />
        </div>
        <div class="col-md-9 h-100">
          <div class="product-bar">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item" v-for="(item,index) in productType" :key="index">
                <a
                  class="nav-link"
                  data-toggle="pill"
                  @click.prevent="getTargetProductList(item,index)"
                  :class="{ 'active': index === currentTypeIndex}"
                >{{item}}</a>
              </li>
            </ul>
          </div>
          <div class="row">
            <div class="col-sm-4" v-for="(item,index) in showProducts" :key="index">
              <ProductCard :card="item" />
            </div>
          </div>
          <div v-if="showNoProduct" class="noproduct mb-3">
            <i class="far fa-2x fa-dizzy mb-3"></i>目前沒有相關商品!!
          </div>
          <Pagination :prop-page="pagination" @pageData="productsPagination" v-if="!showNoProduct" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GuestSidebar from "../GuestSidebar";
import ProductCard from "../ProductCard";
import Pagination from "../Pagination";
import Cart from "../Cart";

export default {
  components: {
    GuestSidebar,
    ProductCard,
    Pagination,
    Cart
  },
  data() {
    return {
      products: [],
      pagination: {
        current_page: null,
        total_pages: null,
        has_pre: null,
        has_next: null
      },
      pageMaxCard: 9,
      productType: ["全部商品", "手機", "手錶", "耳機"],
      targetProducts: [],
      showProducts: [],
      currentTypeIndex: 0
    };
  },
  methods: {
    classifyType(unit) {
      let type = unit;
      switch (unit) {
        case "台":
          type = "手機";
          break;
        case "支":
          type = "手錶";
          break;
        case "組":
          type = "耳機";
          break;
        default:
          break;
      }
      return type;
    },
    // 取得所有商品資料
    getData() {
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      const vm = this;
      vm.$store.commit("LOADING", true);
      vm.$http.get(url).then((response) => {
        vm.products = response.data.products;
        vm.$store.commit("LOADING", false);
        vm.getTargetProductList(vm.homeProductTypeIndex["type"], vm.homeProductTypeIndex["index"]);
      });
    },
    // 撈所有資料到前端，依品牌和商品類型分類商品
    /* eslint-disable prefer-destructuring */
    getTargetProductList(type, index) {
      const vm = this;
      const brand = vm.$route.params.brand;
      if (brand === "全部品牌") {
        if (type === "全部商品") {
          vm.targetProducts = vm.products.slice(0);
          vm.currentTypeIndex = 0;
        } else {
          vm.targetProducts = vm.products.filter(
            item => type === vm.classifyType(item["unit"])
          );
          vm.currentTypeIndex = index;
        }
      } else if (brand !== "全部品牌") { // 原本是else，因應no-lonely-if改寫
        if (type === "全部商品") {
          vm.targetProducts = vm.products.filter(
            item => brand === item.category
          );
          vm.currentTypeIndex = 0;
        } else {
          vm.targetProducts = vm.products.filter(
            item => brand === item.category && type === vm.classifyType(item["unit"])
          );
          vm.currentTypeIndex = index;
        }
      }
      vm.productsPagination();
    },
    /* eslint-enable prefer-destructuring */
    // 根據選擇品牌商品數量做分頁
    /* eslint-disable no-unused-expressions */
    productsPagination(page = 1) {
      const vm = this;
      vm.pagination.total_pages = Math.ceil(
        vm.targetProducts.length / vm.pageMaxCard
      );
      vm.pagination.current_page = page;
      vm.pagination.current_page < vm.pagination.total_pages
        ? (vm.pagination.has_next = true)
        : (vm.pagination.has_next = false);
      vm.pagination.current_page > 1
        ? (vm.pagination.has_pre = true)
        : (vm.pagination.has_pre = false);
      vm.getCurrentProductList(page);
    },
    /* eslint-enable no-unused-expressions */
    // 根據當前頁數回傳對應商品，一頁最多9個商品
    getCurrentProductList(page) {
      const vm = this;
      const startcard = (page - 1) * 9;
      const endcard = page * 9;
      vm.showProducts = vm.targetProducts.slice(startcard, endcard);
    }
  },
  computed: {
    showNoProduct() {
      return (
        typeof this.showProducts !== "undefined"
        && this.showProducts.length === 0
      );
    },
    homeProductTypeIndex() {
      return this.$store.state.homeProductTypeIndex;
    }
  },
  watch: {
    $route() {
      this.getTargetProductList("全部商品", 0);
    }
  },
  created() {
    this.getData();
  }
};
</script>
