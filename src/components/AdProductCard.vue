<template>
  <div class="ad-card">
    <div class="ad-outline">
      <div class="ad-brand" :style="compileImgPath(adcard.logo)"></div>
      <div class="ad-img" :style="compileImgPath(adcard.img)"></div>
    </div>
    <div class="ad-textzone">
      <div class="ad-title">{{adcard.name}}</div>
      <div class="ad-text">{{adcard.text}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["adcard"],
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  },
  methods: {
    // 重新編譯圖片路徑
    compileImgPath(path) {
      return { backgroundImage: `url(${this.publicPath}img/${path})` };
    }
  }
};
</script>
