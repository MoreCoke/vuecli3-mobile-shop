<template>
  <div class="list-group custom-sticky product-sidebar mb-3">
    <router-link v-for="(item,index) in brandList" :key="`brand-${index}`" :to="`/guest/productlist/${item.path}`" class="list-group-item"
      :class="{active:isActive(item.path)}">{{item.name}}</router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      brandList: [
        {
          path: "全部品牌",
          name: "全部品牌"
        },
        {
          path: "apple",
          name: "Apple"
        },
        {
          path: "pixel",
          name: "Pixel"
        },
        {
          path: "samsung",
          name: "Samsung"
        },
        {
          path: "huawei",
          name: "Huawei"
        },
        {
          path: "oppo",
          name: "Oppo"
        },
        {
          path: "sony",
          name: "Sony"
        },
        {
          path: "xiaomi",
          name: "小米"
        },
        {
          path: "asus",
          name: "ASUS"
        }
      ]
    };
  },
  methods: {
    isActive(brand) {
      return brand === this.$route.params.brand;
    }
  }
};
</script>