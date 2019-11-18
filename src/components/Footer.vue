<template>
  <div class="px-3 py-4 bg-primary">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="d-flex flex-column justify-content-center h-100">
            <span class="text-white h5 text-center mb-4">僅用做學習，禁止任何商業用途</span>
            <div class="d-flex justify-content-center align=items-center">
              <a href="https://github.com/MoreCoke/Vue-test" class="mx-2">
                <i class="fab fa-lg fa-github fa-2x info-link"></i>
              </a>
              <a href="https://codepen.io/moreCoke" class="mx-2">
                <i class="fab fa-codepen fa-2x info-link"></i>
              </a>
              <a href="#" class="mx-2" @click.prevent="signin">
                <i class="fas fa-users-cog fa-2x info-link"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="d-none d-md-block col-md-8">
          <ul
            class="list-unstyled d-flex justify-content-around align-items-center info-list text-white"
          >
            <li class="d-none d-lg-block">
              <span>全台分店</span>
              <ul class="list-unstyled">
                <li>
                  <a href="#" @click.prevent>台北信義店</a>
                </li>
                <li>
                  <a href="#" @click.prevent>台北中山店</a>
                </li>
                <li>
                  <a href="#" @click.prevent>台北西門店</a>
                </li>
                <li>
                  <a href="#" @click.prevent>新北新莊店</a>
                </li>
              </ul>
            </li>
            <li>
              <span>客服專區</span>
              <ul class="list-unstyled">
                <li>服務電話:(02)2019-1234</li>
                <li>服務信箱:fastservice123@gmail.com</li>
                <li>服務時間:24小時待線</li>
              </ul>
            </li>
            <li>
              <span>網路購物政策</span>
              <ul class="list-unstyled">
                <li>
                  <a href="#" @click.prevent>退貨需知</a>
                </li>
                <li>
                  <a href="#" @click.prevent>網路購物付款方式</a>
                </li>
                <li>
                  <a href="#" @click.prevent>訂單和運送說明</a>
                </li>
              </ul>
            </li>
            <li>
              <span>追蹤我們</span>
              <ul class="list-unstyled text-center">
                <li>
                  <a href="#" @click.prevent>
                    <i class="fab fa-facebook-square fa-2x"></i>
                  </a>
                </li>
                <li>
                  <a href="#" @click.prevent>
                    <i class="fab fa-instagram fa-2x"></i>
                  </a>
                </li>
                <li>
                  <a href="#" @click.prevent>
                    <i class="fab fa-line fa-2x"></i>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    signin() {
        this.$router.push("/admin/products");
    },
  },
};
</script>
