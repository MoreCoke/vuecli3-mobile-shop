<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide
        class="bg-cover carousel-height"
        v-for="(item,index) in swiperData"
        :key="`swiper-${index}`"
        :style="item.imgpath"
      >
        <div class="ad-news justify-content-center justify-content-md-end align-items-start">
          <div class="frosted-zone">
            <div class="frosted-zone-inner">
              <h2 class="headtitle mb-2">{{item.title}}</h2>
              <h5 class="subtitle">{{item.text}}</h5>
            </div>
          </div>
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <section class="py-1 container-fluid">
      <!-- <a href="#" class="service" @click.prevent v-for="(item,index) in serviceItem" :key="index">
        <div class="service-item bg-cover" :style="item.imgpath">
          <div class="service-textzone">
            <h4 class="service-title">{{item.title}}</h4>
            <h5 class="service-subtitle">{{item.text}}</h5>
          </div>
        </div>
      </a>-->
      <router-link class="service" :to="otherbgc[1].routerPath">
        <div class="service-discount bg-cover" :style="otherbgc[1].imgpath">
          <div class="service-textzone">
            <h4 class="service-title">{{otherbgc[1].title}}</h4>
            <h5 class="service-subtitle">{{otherbgc[1].text}}</h5>
          </div>
        </div>
      </router-link>
      <router-link
        class="service"
        v-for="(item,index) in serviceItem"
        :key="`product-${index}`"
        to="/guest/productlist/全部品牌"
        @click.native="emitProductType(item['typeName'],item['typeIndex'])"
      >
        <div class="service-item bg-cover" :style="item.imgpath">
          <div class="service-textzone">
            <h4 class="service-title">{{item.title}}</h4>
            <h5 class="service-subtitle">{{item.text}}</h5>
          </div>
        </div>
      </router-link>
    </section>
    <section class="bg-cover p-5 iphone-bgc">
      <div class="text-right">
        <div class="headtitle text-white">為你而活，非你莫屬</div>
        <div class="subtitle text-white">邀您一同共享跨世代的喜悅。</div>
      </div>
    </section>
    <section class="container-fluid mb-8">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="topic">最新商品</div>
          <div class="row">
            <div class="col-md-4" v-for="(item,index) in newProduct" :key="`newProduct-${index}`">
              <router-link class="text-decoration-none" :to="item.routerpath">
                <ad-product :adcard="item" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-success">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mb-5">
            <div class="topic">汰舊換新</div>
            <div class="row">
              <div class="col-4" v-for="(item,index) in random" :key="`renew-${index}`">
                <router-link
                  class="renew-product bg-cover"
                  :title="item.title"
                  :to="`/guest/productdetail/${item.id}`"
                  :style="{backgroundImage:`url(${item.imgUrl})`}"
                ></router-link>
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-4">
            <div class="renew">
              <div class="renew-imgzone">
                <div class="renew-img bg-cover"></div>
              </div>
            </div>
            <div class="topic">這裡總有款適合您的手機!</div>
          </div>
        </div>
      </div>
    </section>
    <section class="p-4">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <img class="renew-imgcenter" :src="otherbgc[0].imgpath" alt />
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-6">
                <div class="py-5 renew-textzone">
                  <i class="fas fa-3x fa-user-md text-success"></i>
                  <h3>現場評估</h3>
                  <p>由我們專業人員評估您的舊手機使用狀態計算折舊。</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="py-5 renew-textzone">
                  <i class="fas fa-3x fa-hand-holding-usd text-success"></i>
                  <h3>現金折扣</h3>
                  <p>舊手機型號越新，折抵越高，最高可享$12,000!</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="py-5 renew-textzone">
                  <i class="fas fa-3x fa-diagnoses text-success"></i>
                  <h3>款式多樣</h3>
                  <p>安卓、蘋果手機通通都有，任君挑選!</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="py-5 renew-textzone">
                  <i class="fas fa-3x fa-child text-success"></i>
                  <h3>回收舊機</h3>
                  <p>我們會幫您的舊手機找到新的主人,或是送回原廠分解零件，環保利用!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import $ from "jquery";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import adProduct from "../AdProductCard";
export default {
  components: {
    swiper,
    swiperSlide,
    adProduct
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        autoplay: {
          disableOnInteraction: false
        }
      },
      swiperData: [
        {
          imgpath: {
            backgroundImage:
              "url(https://images.unsplash.com/photo-1543409743-b5ed0eb0c5b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)"
          },
          title: "OPPO R17",
          text: "夜的美比白天溫柔，全面升級超有感。"
        },
        {
          imgpath: {
            backgroundImage:
              "url(https://images.unsplash.com/photo-1551355738-1875b6664915?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1225&q=80)"
          },
          title: "Google Pixel 3",
          text: "全新Google智慧助理隨你差遣。"
        },
        {
          imgpath: {
            backgroundImage:
              "url(https://images.unsplash.com/photo-1570976278927-39de20093775?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)"
          },
          title: "iPhone 11 Pro",
          text: "相機、顯示器、效能，一切如Pro其名。"
        },
        {
          imgpath: {
            backgroundImage:
              "url(https://images.unsplash.com/photo-1551261752-c4d1f4faa041?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)"
          },
          title: "Samsung Galaxy S10",
          text: "123度超廣角鏡頭，突破視野極限。"
        }
      ],
      otherbgc: [
        {
          imgpath: require("@/assets/img/hweil_p30pro.png")
        },
        {
          imgpath: {
            backgroundImage: "url(" + require("@/assets/img/6.jpg") + ")"
          },
          title: "優惠折扣",
          text: "玩小遊戲抽折扣!",
          routerPath: "/guest/promotion"
        }
      ],
      serviceItem: [
        {
          imgpath: {
            backgroundImage: "url(" + require("@/assets/img/3.jpg") + ")"
          },
          title: "3C手機",
          text: "款式多樣，應有盡有。",
          typeIndex: 1,
          typeName: "手機"
        },
        {
          imgpath: {
            backgroundImage: "url(" + require("@/assets/img/2.jpg") + ")"
          },
          title: "智慧手錶",
          text: "紀錄健康動起來!",
          typeIndex: 2,
          typeName: "手錶"
        },
        {
          imgpath: {
            backgroundImage: "url(" + require("@/assets/img/1.jpg") + ")"
          },
          title: "無線藍芽耳機",
          text: "輕便小巧，簡單生活。",
          typeIndex: 3,
          typeName: "耳機"
        },
        {
          imgpath: {
            backgroundImage: "url(" + require("@/assets/img/7.jpg") + ")"
          },
          title: "所有商品",
          text: "種類豐富，應有盡有!",
          typeIndex: 0,
          typeName: "全部商品"
        }
      ],
      newProduct: [
        {
          name: "iPhone 11 Pro",
          text: "後置三鏡頭 | 5.8 吋 OLED",
          routerpath: "/guest/productdetail/-LseWhNSDZAaoE-L2VqN",
          imgpath: {
            backgroundImage:
              "url(" + require("@/assets/img/iphone11pro.jpg") + ")"
          },
          logo: {
            backgroundImage: "url(" + require("@/assets/img/apple.svg") + ")"
          }
        },
        {
          name: "Sony Xperia 5 ",
          text: "眼控對焦 | 八核心處理",
          routerpath: "/guest/productdetail/-LrnKPvMhdwPiRhofsjQ",
          imgpath: {
            backgroundImage:
              "url(" + require("@/assets/img/xperia-5-primary.png") + ")"
          },
          logo: {
            backgroundImage: "url(" + require("@/assets/img/sony.svg") + ")"
          }
        },
        {
          name: "Samsung Galaxy Note 10 Plus",
          text: "八核心處理器 | O 極限螢幕",
          routerpath: "/guest/productdetail/-Lse_PHBDKpMPI5kunSH",
          imgpath: {
            backgroundImage:
              "url(" +
              require("@/assets/img/samsung_galaxy_note10_plus.jpg") +
              ")"
          },
          logo: {
            backgroundImage: "url(" + require("@/assets/img/samsung.svg") + ")"
          }
        }
      ],
      random: []
    };
  },
  methods: {
    getData() {
      let url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products/all`;
      let vm = this;
      vm.$http.get(url).then(response => {
        vm.getRandomProduct(...response.data.products);
      });
    },
    emitProductType(type, index) {
      let vm = this;
      this.$nextTick(() => {
        vm.$bus.$emit("HomeProductTypeIndex", type, index);
      });
    },
    getRandomProduct(...data) {
      let vm = this;
      let len = data.length;
      while (vm.random.length < 9) {
        let r = Math.floor(Math.random() * len);
        if (vm.random.indexOf(data[r]) === -1 && data[r].unit === "台") {
          vm.random.push(data[r]);
        }
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>