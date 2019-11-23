<template>
  <div class="product-card">
    <div class="product-brand bg-cover" :style="classifyBrand(card['category'])"></div>
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
  methods: {
    classifyBrand(brand) {
      return {
        backgroundImage: `url(/img/${brand}.svg)`
      };
    },
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
    goProductDetail(productid) {
      this.$router.push({
        name: "Productdetail",
        params: { id: productid }
      });
    }
  }
};
</script>
