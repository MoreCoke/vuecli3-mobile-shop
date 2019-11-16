<template>
  <div
    class="endgame justify-content-center align-items-center"
    :class="{'d-flex':active,'d-none':!active}"
  >
    <div class="endgame-news">
      <div class="endgame-content">
        <div class="endgame-text">
          結束遊戲!
          <br />
          <span>恭喜你獲得</span>
          <br />
          <span class="coupon-name">{{coupon}}</span>
          <button class="btn btn-info btn-block mt-4" @click="toProductList">購物去<i class="fas fa-shopping-basket ml-3"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["active", "coupon"],
  methods:{
    toProductList(){
      this.$router.push('/guest/productlist/全部品牌');
    }
  }
};
</script>