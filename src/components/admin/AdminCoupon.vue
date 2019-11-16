<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>

    <div class="text-right">
      <button class="btn btn-primary" @click="openModal(true)">建立新的折價券</button>
    </div>
    <table class="table mt-4">
      <thead>
        <th>折價券名稱</th>
        <th width="200">代碼內容</th>
        <th width="120">折扣%數</th>
        <th width="120">有效期限</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </thead>
      <tbody>
        <tr v-for="(item,key) in coupons" :key="key">
          <td>{{item.title}}</td>
          <td>{{item.code}}</td>
          <td>{{item.percent}}</td>
          <td>{{item.due_date}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="delModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :prop-page="pagination" @pageData="getCoupons" />

    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增折價券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="mb-2" for="title">名稱</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="tempCoupon.title"
                placeholder="請輸入名稱"
              />
            </div>

            <div class="form-group">
              <label class="mb-2" for="percent">折扣比例(請輸入正整數)</label>
              <input
                type="number"
                class="form-control"
                id="percent"
                v-model="tempCoupon.percent"
                placeholder="折扣比例"
              />
            </div>
            <div class="form-group">
              <label class="mb-2" for="due_date">日期</label>
              <input
                type="date"
                class="form-control"
                id="due_date"
                v-model="tempCoupon.due_date"
                placeholder="請輸入有效日期"
              />
            </div>
            <div class="form-group">
              <label class="mb-2" for="code">折扣碼</label>
              <input
                type="text"
                class="form-control"
                id="code"
                v-model="tempCoupon.code"
                placeholder="請輸入折扣碼"
              />
            </div>
            <hr />
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="tempCoupon.is_enabled"
                  :true-value="1"
                  :false-value="0"
                  id="is_enabled"
                />
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import Pagination from "../Pagination";

export default {
  components: {
    Pagination
  },
  data() {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false
      }
    };
  },
  methods: {
    getCoupons(page = 1) {
      let url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`; //'https://vue-course-api.hexschool.io/api/morecoke/products?page=:page';
      let vm = this;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        this.tempCoupon = Object.assign({}, item);
        this.isNew = false;
      }
      $("#couponModal").modal("show");
    },
    delModal(item) {
      this.tempCoupon = item;

      $("#delCouponModal").modal("show");
    },
    updateCoupon() {
      let api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupon`; 
      let httpMethod = "post";
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#couponModal").modal("hide");
          vm.$bus.$emit('message:push',response.data.message,'success');
          vm.getCoupons();
        } else {
          $("#couponModal").modal("hide");
          vm.$bus.$emit('message:push',response.data.message,'warning');
          vm.getCoupons();
        }
      });
    },
    delCoupon() {
      const vm = this;
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      this.$http.delete(api, { data: vm.tempCoupon }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#delCouponModal").modal("hide");
          vm.$bus.$emit('message:push',response.data.message,'success');
          vm.getCoupons();
        } else {
          $("#delCouponModal").modal("hide");
          vm.$bus.$emit('message:push',response.data.message,'warning');
          vm.getCoupons();
          console.log("新增失敗");
        }
      });
    },
  },
  created() {
    this.getCoupons();
  }
};
</script>