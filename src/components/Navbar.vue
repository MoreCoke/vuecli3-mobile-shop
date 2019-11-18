<template>
  <div>
    <!-- <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow">
      <router-link class="navbar-brand" to="/guest/home">速達通訊</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#mynav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mynav">
        <ul class="navbar-nav px-3">
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent>最新消息</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent>優惠活動</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent>關於我們</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/guest/productlist/全部品牌">商品列表</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="signin">後台管理</a>
          </li>
        </ul>
      </div>
    </nav>-->
    <nav class="customnav navbar-expand-lg">
      <router-link class="logo" to="/guest/home">
        <img :src="logo" width="100px" alt />速達通訊
      </router-link>
      <button
        class="navbar-toggler ml-auto"
        data-target="#mynav"
        data-toggle="collapse"
        type="button"
        @click="objClass.open = !objClass.open"
      >
        <div class="animated-icon" :class="objClass">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <div class="collapse navbar-collapse" id="mynav">
        <ul class="customnav-group">
          <li>
            <a href="#" @click.prevent="toPromotion">優惠活動</a>
          </li>
          <li>
            <a href="#" @click.prevent="toAboutUs">關於我們</a>
          </li>
          <li>
            <a href="#" @click.prevent="toProductList">商品列表</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      logo: require("@/assets/img/logo.png"),
      objClass: {
        open: false
      },
    };
  },
  methods: {
    toProductList() {
      this.$router.push("/guest/productlist/全部品牌");
      this.hideNavbar();
    },
    toAboutUs(){
      this.$router.push("/guest/aboutus");
      this.hideNavbar();
    },
    toPromotion(){
      this.$router.push("/guest/promotion");
      this.hideNavbar();
    },
    navAnimation() {
      $(window).scroll(function() {
        $(".customnav").toggleClass("scrolled", $(this).scrollTop() > 20);
      });
    },
    hideNavbar() {
      $("#mynav").collapse("hide");
      this.objClass.open = false;
    }
  },
  mounted() {
    this.navAnimation();
  }
};
</script>