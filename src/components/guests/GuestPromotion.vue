<template>
  <div class="container">
    <div class="vld-parent">
      <loading :active.sync="effect.isLoading"></loading>
    </div>
    <EndGame :active="gameover" :coupon="randomCoupon.title" />
    <div class="topic">優惠小遊戲</div>

    <div class="rule-text">
      <p>
        遊戲規則:
        <br />點選配對相同的卡片，完成遊戲後隨機發送
        <br />折扣碼並將該折扣送至結帳頁面，輸入折扣
        <br />碼就能使用啦!
      </p>
    </div>

    <div class="row my-4">
      <div class="col-6 col-md-3" v-for="(card,index) in randomCards" :key="`random-${index}`">
        <div class="d-flex justify-content-center">
          <div
            class="playcard"
            :class="{flipped : card.flipped,found : card.found}"
            @click="flippedCard(card)"
          >
            <div class="back"></div>

            <div class="front" :style="{backgroundImage:`url(${card.imgUrl})`}"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EndGame from "../EndGame";
export default {
  components: {
    EndGame
  },
  data() {
    return {
      random: [],
      randomCards: [],
      coupons: [
        {
          title: "95折折價券",
          code: "iloveflash"
        },
        {
          title: '8折折價券',
          code: 'bhgynbmvgt'
        },
        {
          title:'85折折價券',
          code:'jkughjukj'
        },
        {
          title:'9折折價券',
          code:'asdfedfrgd'
        }
      ],
      randomCoupon: {},
      gameover: false,
      effect: {
        isLoading: false
      }
    };
  },
  methods: {
    getData() {
      let url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products/all`;
      let vm = this;
      vm.effect.isLoading = true;
      vm.$http.get(url).then(response => {
        vm.effect.isLoading = false;
        vm.getRandom(...response.data.products);
      });
    },
    // getCoupons(page = 1) {
    //   let url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`; //'https://vue-course-api.hexschool.io/api/morecoke/products?page=:page';
    //   let vm = this;
    //   vm.effect.isLoading = true;
    //   this.$http.get(url).then(response => {
    //     vm.effect.isLoading = false;
    //     vm.coupons = response.data.coupons;
    //   });
    // },
    getRandom(...data) {
      let vm = this;
      let len = data.length;
      let newData = data.map(function(item) {
        let obj = {};
        obj.title = item.title;
        obj.imgUrl = item.imgUrl;
        obj.flipped = false;
        obj.found = false;
        return obj;
      });
      while (vm.random.length < 6) {
        let r = Math.floor(Math.random() * len);
        if (vm.random.indexOf(newData[r]) === -1) {
          vm.random.push(newData[r]);
        }
      }
      vm.createRandomCard();
    },
    createRandomCard() {
      let vm = this;
      let len = vm.random.length;
      while (vm.randomCards.length < 6) {
        let r = Math.floor(Math.random() * len);
        if (vm.randomCards.indexOf(vm.random[r]) === -1) {
          vm.randomCards.push(vm.random[r]);
        }
      }
      let newRandomCards = JSON.parse(JSON.stringify(vm.randomCards));
      vm.randomCards = newRandomCards.concat(vm.randomCards);
      vm.shuffleRandomCards();
    },
    shuffleRandomCards() {
      this.randomCards.sort(() => Math.random());
    },
    flippedCard(card) {
      let vm = this;
      let flippedLen;
      if (card.flipped || card.found) return;
      else {
        flippedLen = this.randomCards.filter(card => card.flipped).length;
        if (flippedLen == 0) {
          card.flipped = true;
        } else if (flippedLen == 1) {
          card.flipped = true;
          vm.checkSameCards();
        }
      }
    },
    checkSameCards() {
      let vm = this;
      let flippedCards = this.randomCards.filter(card => card.flipped);
      if (flippedCards[0].title === flippedCards[1].title) {
        flippedCards[0].found = true;
        flippedCards[1].found = true;
        vm.checkFoundCards();
      }
      setTimeout(() => {
        flippedCards[0].flipped = false;
        flippedCards[1].flipped = false;
      }, 1000);
    },
    checkFoundCards() {
      let vm = this;
      let allCardsLen = vm.randomCards.length;
      let foundCardsLen = vm.randomCards.filter(card => card.found).length;
      if (allCardsLen === foundCardsLen) {
        vm.getRandomCoupon();
      }
    },
    getRandomCoupon() {
      let vm = this;
      let r = Math.floor(Math.random() * vm.coupons.length);
      vm.randomCoupon = vm.coupons[r];
      setTimeout(() => {
        vm.gameOver();
      }, 2000);
    },
    gameOver() {
      let vm = this;
      vm.gameover = true;
      // vm.$bus.$emit('message:push', `恭喜你獲得${vm.randomCoupon.title}`, 'success');
      localStorage.setItem("coupon", JSON.stringify(vm.randomCoupon));
    }
  },
  created() {
    this.getData();
    // this.getCoupons();
  }
};
</script>