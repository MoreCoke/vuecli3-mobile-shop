<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <table class="table mt-4">
      <thead>
        <th width="120">購買時間</th>
        <th width="80">訂單順序</th>
        <th>購買商品</th>
        <th>買家資料</th>
        <th width="200">訂單編號</th>
        <th width="120">應付金額</th>
        <th width="100">是否付款</th>
        <th width="100">編輯</th>
      </thead>
      <tbody>
        <tr v-for="(item,index) in orders" :key="index">
          <td>{{item.create_at | date}}</td>
          <td>{{item.num}}</td>
          <td>
            <ul class="list-unstyled">
              <li
                class="mb-2"
                v-for="(orderproduct,index) in item.products"
                :key="`orderproduct-${index}`"
              >{{orderproduct.product.title}} : {{orderproduct.qty}} {{orderproduct.product.unit}}</li>
            </ul>
          </td>
          <td>
            <ul class="list-unstyled">
              <li class="mb-2">
                <div>
                  <p>買家姓名: {{item.user.name}}</p>
                  <p>買家電話: {{item.user.tel}}</p>
                  <p>買家郵箱: {{item.user.email}}</p>
                  <p>買家地址: {{item.user.address}}</p>
                </div>
              </li>
            </ul>
          </td>
          <td class="text-right">{{item.id}}</td>
          <td class="text-right">{{item.total | currency}}</td>
          <td>
            <span v-if="item.is_paid" class="text-success">已付款</span>
            <span v-else>未付款</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(item)">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :prop-page="pagination" @pageData="getOrders" />
    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>更新訂單</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" v-if="tempOrder.user">
            <div class="row">
              <div class="col-12">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="title">買家姓名</label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      placeholder="請輸入買家姓名"
                      v-model="tempOrder.user.name"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="title">電話</label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      placeholder="請輸入電話"
                      v-model="tempOrder.user.tel"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="category">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    placeholder="請輸入Email"
                    v-model="tempOrder.user.email"
                  />
                </div>
                <div class="form-group">
                  <label for="category">地址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    placeholder="請輸入地址"
                    v-model="tempOrder.user.address"
                  />
                </div>

                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempOrder.is_paid"
                      :true-value="1"
                      :false-value="0"
                      id="is_paid"
                    />
                    <label class="form-check-label" for="is_paid">是否付款</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateOrder(tempOrder.id)">確認</button>
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
      pagination: {},
      tempOrder: {},
      orders: [],
      isLoading: false
    };
  },
  methods: {
    getOrders(page = 1) {
      let url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/orders?page=${page}`;
      let vm = this;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(item) {
      this.tempOrder = Object.assign({}, item);
      $("#orderModal").modal("show");
    },
    updateOrder(id) {
      let url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/order/${id}`;
      let vm = this;
      this.$http.put(url, { data: vm.tempOrder }).then(response => {
        if (response.data.success) {
          console.log(response);
          $("#orderModal").modal("hide");
          vm.$bus.$emit("message:push", response.data.message, "success");
          vm.getOrders();
        } else {
          $("#orderModal").modal("hide");
          vm.$bus.$emit("message:push", response.data.message, "warning");
        }
      });
    }
  },
  created() {
    this.getOrders();
  }
};
</script>
