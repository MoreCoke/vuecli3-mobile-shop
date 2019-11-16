<template>
  <div>
    <div class="topic text-primary">訂單資料</div>
    <div class="order mb-3">
      <table class="order-table">
        <thead>
          <th></th>
          <th>購買商品</th>
          <th>購買數量</th>
          <th>價格</th>
        </thead>
        <tbody>
          <tr v-for="(item,index) in order.products" :key="`order-${index}`">
            <td>
              <div
                class="shopping-img"
                :style="{backgroundImage:`url(${item.product.imgUrl})`}"
                :title="item.product.title"
              ></div>
            </td>
            <td>
              <h4>{{item.product.title}}</h4>
            </td>
            <td>
              <p>共{{item.qty}}{{item.product.unit}}</p>
            </td>
            <td class="text-right">
              <p>{{item.final_total | currency}}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="order-total">
        總共金額:
        <span>{{order.total |currency}}</span>
      </p>
    </div>
    <div class="topic text-primary">訂購人資料</div>
    <div class="userdata mb-4">
      <div class="userdata-inside">
        <table class="table" v-if="order.user">
          <tbody>
            <tr>
              <th>下單日期 :</th>
              <td>{{order.create_at | date}}</td>
            </tr>
            <tr class="border-bottom">
              <th>訂單編號 :</th>
              <td>{{order.id}}</td>
            </tr>
            <tr>
              <th>訂購人姓名 :</th>
              <td>{{order.user.name}}</td>
            </tr>
            <tr>
              <th>訂購人電話 :</th>
              <td>{{order.user.tel}}</td>
            </tr>
            <tr>
              <th>訂購人Email :</th>
              <td>{{order.user.email}}</td>
            </tr>
            <tr class="border-bottom">
              <th>訂購人地址 :</th>
              <td>{{order.user.address}}</td>
            </tr>
            <tr>
              <th>付款狀態 :</th>
              <td>
                <span v-if="order.is_paid" class="text-success">付款完成</span>
                <span v-else class="text-danger">尚未付款</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center my-3">
          <button class="btn btn-primary mx-auto" v-if="!order.is_paid" @click="payOrder(orderId)">
            確認付款
            <i class="fas fa-spinner fa-spin" v-if="effect.orderLoading"></i>
            <i class="far fa-money-bill-alt" v-else></i>
          </button>
          <button class="btn btn-primary" v-else @click="toGuestHome">
            回首頁
            <i class="fas fa-home"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderId: this.$route.query.orderid,
      order: {},
      effect: {
        orderLoading: false
      }
    };
  },
  methods: {
    getOrderData(orderid) {
      let vm = this;
      let url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/order/${orderid}`;
      vm.$http.get(url).then(response => {
        vm.order = response.data.order;
      });
    },
    payOrder(orderid) {
      let vm = this;
      let url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/pay/${orderid}`;
      vm.effect.orderLoading = true;
      vm.$http.post(url).then(response => {
        this.$bus.$emit("message:push", response.data.message, "success");
        vm.effect.orderLoading = false;
        vm.getOrderData(orderid);
      });
    },
    toGuestHome() {
      this.$router.push("/guest/home");
    }
  },
  created() {
    this.getOrderData(this.orderId);
  }
};
</script>