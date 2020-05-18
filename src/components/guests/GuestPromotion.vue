<template>
  <div class="container">
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
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
          title: "8折折價券",
          code: "bhgynbmvgt"
        },
        {
          title: "85折折價券",
          code: "jkughjukj"
        },
        {
          title: "9折折價券",
          code: "asdfedfrgd"
        }
      ],
      randomCoupon: {},
      gameover: false
    };
  },
  methods: {
    getData() {
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      const vm = this;
      vm.$store.commit("LOADING", true);
      vm.$http.get(url).then((response) => {
        vm.$store.dispatch("updateLoading", false);
        vm.getRandom(...response.data.products);
      });
    },
    getRandom(...data) {
      const vm = this;
      const len = data.length;
      const newData = data.map((item) => {
        const obj = {};
        obj.title = item.title;
        obj.imgUrl = item.imgUrl;
        obj.flipped = false;
        obj.found = false;
        return obj;
      });
      while (vm.random.length < 6) {
        const r = Math.floor(Math.random() * len);
        if (vm.random.indexOf(newData[r]) === -1) {
          vm.random.push(newData[r]);
        }
      }
      vm.createRandomCard();
    },
    createRandomCard() {
      const vm = this;
      const len = vm.random.length;
      while (vm.randomCards.length < 6) {
        const r = Math.floor(Math.random() * len);
        if (vm.randomCards.indexOf(vm.random[r]) === -1) {
          vm.randomCards.push(vm.random[r]);
        }
      }
      const newRandomCards = JSON.parse(JSON.stringify(vm.randomCards));
      vm.randomCards = newRandomCards.concat(vm.randomCards);
      vm.shuffleRandomCards();
    },
    shuffleRandomCards() {
      this.randomCards.sort(() => Math.random());
    },
    flippedCard(card) {
      const vm = this;
      let flippedLen;
      if (!card.flipped || !card.found) {
        flippedLen = this.randomCards.filter(flipcard => flipcard.flipped).length;
        if (flippedLen === 0) {
          card.flipped = true;
        } else if (flippedLen === 1) {
          card.flipped = true;
          vm.checkSameCards();
        }
      }
    },
    checkSameCards() {
      const vm = this;
      const flippedCards = this.randomCards.filter(card => card.flipped);
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
      const vm = this;
      const allCardsLen = vm.randomCards.length;
      const foundCardsLen = vm.randomCards.filter(card => card.found).length;
      if (allCardsLen === foundCardsLen) {
        vm.getRandomCoupon();
      }
    },
    getRandomCoupon() {
      const vm = this;
      const r = Math.floor(Math.random() * vm.coupons.length);
      vm.randomCoupon = vm.coupons[r];
      setTimeout(() => {
        vm.gameOver();
      }, 2000);
    },
    gameOver() {
      const vm = this;
      vm.gameover = true;
      // vm.$bus.$emit("message:push", `恭喜你獲得${vm.randomCoupon.title}`, "success");
      localStorage.setItem("coupon", JSON.stringify(vm.randomCoupon));
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  created() {
    this.getData();
    // this.getCoupons();
  }
};
</script>
