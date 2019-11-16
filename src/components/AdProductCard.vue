<template>
  <div class="ad-card">
    <div class="ad-outline">
      <div class="ad-brand" :style="adcard.logo"></div>
      <div class="ad-img" :style="adcard.imgpath"></div>
    </div>
    <div class="ad-textzone">
      <div class="ad-title">{{adcard.name}}</div>
      <div class="ad-text">{{adcard.text}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props:['adcard'],
}
</script>