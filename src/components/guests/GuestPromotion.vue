<template>
  <div class="container">
    <div class="vld-parent">
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
      this.$store.commit("LOADING", true);
      this.$http.get(url).then((response) => {
        this.$store.commit("LOADING", false);
        this.createRandomCard(response.data.products);
      });
    },
    createRandomCard(data) {
      const len = data.length;
      while (this.randomCards.length < 6) {
        const r = Math.floor(Math.random() * len);
        // 因為 push 到陣列內的物件是傳參考，所以 indexOf 是找的到參考的
        if (this.randomCards.indexOf(data[r]) === -1) {
          this.randomCards.push(data[r]);
        }
      }
      this.randomCards = this.randomCards.map((item) => {
        const obj = {};
        obj.title = item.title;
        obj.imgUrl = item.imgUrl;
        obj.flipped = false;
        obj.found = false;
        return obj;
      });
      const newRandomCards = JSON.parse(JSON.stringify(this.randomCards));
      this.randomCards = newRandomCards.concat(this.randomCards);
      this.shuffleRandomCards();
    },
    // 洗牌，將陣列內的物件資料打亂
    shuffleRandomCards() {
      this.randomCards.sort(() => Math.random());
    },
    // 翻牌
    flippedCard(card) {
      if (!card.flipped || !card.found) {
        // 用來記錄目前翻牌數量
        const flippedLen = this.randomCards.filter(flipcard => flipcard.flipped).length;
        // 翻第一張牌
        if (flippedLen === 0) {
          card.flipped = true;
          // 翻第二張牌，場上已經翻開一張牌
        } else if (flippedLen === 1) {
          card.flipped = true;
          this.checkSameCards();
        }
      }
    },
    // 檢查翻開的卡是否相同
    checkSameCards() {
      const flippedCards = this.randomCards.filter(card => card.flipped);
      if (flippedCards[0].title === flippedCards[1].title) {
        flippedCards[0].found = true;
        flippedCards[1].found = true;
        this.checkFoundCards();
      }
      setTimeout(() => {
        flippedCards[0].flipped = false;
        flippedCards[1].flipped = false;
      }, 1000);
    },
    // 檢查全部的卡是不是都被找到了
    checkFoundCards() {
      const allCardsLen = this.randomCards.length;
      const foundCardsLen = this.randomCards.filter(card => card.found).length;
      if (allCardsLen === foundCardsLen) {
        this.getRandomCoupon();
      }
    },
    // 送出隨機的優惠卷
    getRandomCoupon() {
      const r = Math.floor(Math.random() * this.coupons.length);
      this.randomCoupon = this.coupons[r];
      setTimeout(() => {
        this.gameOver();
      }, 2000);
    },
    gameOver() {
      this.gameover = true;
      localStorage.setItem("coupon", JSON.stringify(this.randomCoupon));
    }
  },
  created() {
    this.getData();
  }
};
</script>
