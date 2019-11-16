<template>
  <div>
    <div class="row">
      <div class="col-lg-4">
        <div class="coupon">
          <div class="coupon-content">
            <div class="coupon-title" @click="toggleCoupon">
              點我領折扣!
              <i class="fas fa-hand-point-down blink"></i>
            </div>
            <div class="coupon-text">
              <span>有效期限</span>
              <p>
                {{getToday}}
                <span>23:59分止</span>
              </p>
            </div>
            <div class="input-group mt-4">
              <input type="text" class="form-control" placeholder="請輸入折扣代碼" v-model="couponCode" />
              <div class="input-group-append">
                <button class="btn btn-info" @click="useCoupon">
                  確認
                  <i class="fas fa-spinner fa-spin" v-if="effect.couponLoading"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="coupon-inside">
            <i class="fas fa-3x fa-ticket-alt"></i>
            <p v-html="getCouponData">
              <!-- 請輸入95折扣碼:
              <br />iloveflash-->
            </p>
            <div class="d-flex justify-content-between align-items-end w-100">
              <div class="barcode">
                <div class="barcode-num">1 234 56 78 999</div>
              </div>
              <div>
                數量有限，
                <br />先拿先贏
              </div>
            </div>
          </div>
        </div>
        <div class="horizontial-coupon">
          <div class="coupon-content">
            <div class="coupon-title">
              <span v-html="getCouponData"></span>
              <i class="fas fa-hand-point-down"></i>
            </div>
            <div class="coupon-text">
              <span>有效期限</span>
              <p>
                {{getToday}}
                <span>23:59分止</span>
              </p>
            </div>
            <div class="input-group mt-4 mx-auto w-md-50">
              <input type="text" class="form-control" placeholder="請輸入折扣代碼" v-model="couponCode" />
              <div class="input-group-append">
                <button class="btn btn-info" @click="useCoupon">
                  確認
                  <i class="fas fa-spinner fa-spin" v-if="effect.couponLoading"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="order mb-3">
          <table class="order-table">
            <thead>
              <th></th>
              <th>購買明細</th>
              <th>價格</th>
              <th></th>
            </thead>
            <tbody>
              <tr v-for="(item,index) in cartData.carts" :key="`cart-${index}`">
                <td>
                  <router-link
                    class="shopping-img"
                    :to="`/guest/productdetail/${item.product.id}`"
                    :style="{backgroundImage:`url(${item.product.imgUrl})`}"
                    :title="item.product.title"
                  ></router-link>
                </td>
                <td>
                  <h4 class="mb-2">{{item.product.title}}</h4>
                  <p>共{{item.qty}}{{item.product.unit}}</p>
                </td>
                <td class="text-right">
                  <p>{{item.final_total | currency}}</p>
                </td>
                <td>
                  <button class="btn btn-outline-info" @click="delCartData(item.id)">
                    <i class="fas fa-spinner fa-spin" v-if="item.id === effect.currentLoading"></i>
                    <i class="fas fa-trash-alt" v-else></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="order-total">
            總共金額:
            <span
              :class="{'order-delprice': cartData.final_total !== cartData.total}"
            >{{cartData.total | currency}}</span>
          </p>
          <p class="order-total" v-if="cartData.final_total !== cartData.total">
            折扣後金額:
            <span>{{cartData.final_total |currency}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-primary btn-lg" @click="toUserInfo">
        下一步
        <i class="fas fa-hand-point-right"></i>
      </button>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  props: ["cartData"],
  data() {
    return {
      couponCode: "",
      effect: {
        currentLoading: "",
        couponLoading: false
      }
    };
  },
  methods: {
    delCartData(id) {
      let vm = this;
      let url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.effect.currentLoading = id;
      vm.$http.delete(url).then(response => {
        vm.$emit("updateCart");
        vm.effect.currentLoading = "";
        vm.$bus.$emit("message:push", response.data.message, "warning");
      });
    },
    useCoupon() {
      let vm = this;
      let url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/coupon`;
      vm.effect.couponLoading = true;
      vm.$http
        .post(url, {
          data: {
            code: vm.couponCode
          }
        })
        .then(response => {
          if (response.data.success) {
            vm.$emit("updateCart");
            vm.$bus.$emit("message:push", response.data.message, "success");
            vm.couponCode = "";
            localStorage.clear();
          } else {
            vm.$bus.$emit("message:push", response.data.message, "warning");
          }
          vm.effect.couponLoading = false;
        });
    },
    toggleCoupon() {
      $(".coupon-inside").toggleClass("active");
    },
    toUserInfo() {
      this.$router.push("/guest/productorder/info");
    }
  },
  computed: {
    getToday() {
      let day = new Date();
      let today = `${day.getMonth() + 1}/${day.getDate()}`;
      return today;
    },
    getCouponData() {
      let coupon = JSON.parse(localStorage.getItem("coupon"));
      let couponInfo;
      if (coupon) {
        couponInfo = `請輸入${coupon.title.replace(/折價券/, "價碼")}: <br>${
          coupon.code
        }`;
      } else {
        couponInfo = `請輸入95折扣碼: <br>iloveflash`;
      }
      return couponInfo;
    }
  }
};
</script>