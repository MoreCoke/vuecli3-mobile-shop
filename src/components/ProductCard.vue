<template>
  <div class="product-card">
    <div class="product-brand bg-cover" :style="compileBrandImg(card['category'])"></div>
    <div class="product-img" :style="{backgroundImage:`url(${card.imgUrl})`}" @click="goProductDetail(card['id'])"></div>
    <div class="product-title">
      {{card.title}}
      <div class = "product-type">{{classifyType(card['unit'])}}</div>
    </div>
    <div class="product-textzone">
      <div><small>原價 : </small><span class="price-origin">{{card.origin_price | currency}}</span></div>
      <div class="price-sale"><small>特價 : </small>{{card.price | currency}}</div>
    </div>
    <a href="#" class="product-btn btn-primary" @click.prevent="goProductDetail(card['id'])">瞭解更多</a>
  </div>
</template>
<script>
export default {
  props: ["card"],
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  },
  methods: {
    // 根據品牌替換logo
    compileBrandImg(brand) {
      return {
        backgroundImage: `url(${this.publicPath}img/${brand}.svg)`
      };
    },
    // 根據單位編譯商品種類
    classifyType(unit) {
      let type;
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
    // 取得商品id進入商品細節頁面
    goProductDetail(productid) {
      this.$router.push({
        name: "Productdetail",
        params: { id: productid }
      });
    }
  }
};
</script>
