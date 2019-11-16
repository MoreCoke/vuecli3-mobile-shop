<template>
  <div class="mt-3">
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <Cart class="shopping-right"/>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <GuestSidebar />
        </div>
        <div class="col-md-9 h-100">
          <div class="product-bar">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <!-- <li class="nav-item">
                <a
                  class="nav-link active"
                  data-toggle="pill"
                  @click="getTargetProductList('全部商品')"
                >全部商品</a>
              </li>-->
              <!-- <li class="nav-item">
                <a class="nav-link" data-toggle="pill">手機</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="pill">手錶</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="pill">耳機</a>
              </li>-->
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
          <div v-if="showNoProduct" class="noproduct mb-3"><i class="far fa-2x fa-dizzy mb-3"></i>目前沒有相關商品!!</div>
          <Pagination :prop-page="pagination" @pageData="productsPagination" v-if="!showNoProduct"/>
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
      isLoading: false,
      currentTypeIndex: 0,
      emitData: {
        type: '全部商品',
        index: 0
      }
    };
  },
  methods: {
    classifyType(unit) {
      let type =unit;
      switch(type){
        case '台':
          return '手機';
        case '支':
          return '手錶';
        case '組':
          return '耳機';
      }
    },
    //取得所有商品資料
    getData() {
      let url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products/all`;
      let vm = this;
      vm.isLoading = true;
      vm.$http.get(url).then(response => {
        vm.products = response.data.products;
        vm.isLoading = false;
        vm.getTargetProductList(vm.emitData["type"], vm.emitData["index"]);
        // vm.getTargetProductList("全部商品",0);
      });
    },
    //撈所有資料到前端，依品牌和商品類型分類商品
    getTargetProductList(type, index) {
      let vm = this;
      let brand = vm.$route.params.brand;
      if (brand === "全部品牌") {
        if (type === "全部商品") {
          vm.targetProducts = vm.products.slice(0);
          vm.currentTypeIndex = 0;
        } else {
          vm.targetProducts = vm.products.filter(item => type === vm.classifyType(item['unit']));
          vm.currentTypeIndex = index;
        }
      } else {
        if (type === "全部商品") {
          vm.targetProducts = vm.products.filter(
            item => brand === item.category
          );
          vm.currentTypeIndex = 0;
        } else {
          vm.targetProducts = vm.products.filter(
            item => brand === item.category && type === vm.classifyType(item['unit'])
          );
          vm.currentTypeIndex = index;
        }
      }
      vm.productsPagination();
    },
    //根據選擇品牌商品數量做分頁
    productsPagination(page = 1) {
      let vm = this;
      vm.pagination.total_pages = Math.ceil(
        vm.targetProducts.length / vm.pageMaxCard
      );
      vm.pagination.current_page = page;
      vm.pagination.current_page < vm.pagination.total_pages
        ? (vm.pagination.has_next = true)
        : (vm.pagination.has_next = false);
      1 < vm.pagination.current_page
        ? (vm.pagination.has_pre = true)
        : (vm.pagination.has_pre = false);
      vm.getCurrentProductList(page);
    },
    //根據當前頁數回傳對應商品，一頁最多9個商品
    getCurrentProductList(page) {
      let vm = this;
      let startcard = (page - 1) * 9;
      let endcard = page * 9;
      vm.showProducts = vm.targetProducts.slice(startcard, endcard);
    },
  },
  computed:{
    showNoProduct(){
      return (typeof this.showProducts !=='undefined' && this.showProducts.length===0)
    }
  },
  watch: {
    $route() {
      this.getTargetProductList("全部商品", 0);
    }
  },
  created() {
    let vm = this;
    this.getData();
    this.$bus.$on("HomeProductTypeIndex", (type, index) => {
      vm.emitData.type = type;
      vm.emitData.index = index;
    });
  },
  beforeDestroy() {
    this.$bus.$off("HomeProductTypeIndex");
  }
};
</script>