<template>
  <div>
    <div class="col-md-2 d-none d-md-block">
      <nav class="bg-light sidebar customnav-pt">
        <div class="sidebar-sticky">
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link
                to="/admin/products"
                class="nav-link"
                :class="{active :currentPath === 'Products'}"
              >
                <i class="fas fa-2x fa-box-open mr-2"></i>
                <span class="h3">上線商品</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/admin/orders"
                class="nav-link"
                :class="{active :currentPath === 'Orders'}"
              >
                <i class="fas fa-2x fa-list-alt mr-2"></i>
                <span class="h3">模擬訂單</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/admin/coupons"
                class="nav-link"
                :class="{active :currentPath === 'Coupons'}"
                href="#"
              >
                <i class="fas fa-2x fa-ticket-alt mr-3"></i>
                <span class="h3">折價券</span>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="d-md-none">
      <ul class="nav">
        <li class="nav-item">
          <router-link
            to="/admin/products"
            class="nav-link"
            :class="{active :currentPath === 'Products'}"
          >
            <i class="fas fa-box-open mr-2"></i>
            <span class="h5">上線商品</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/admin/orders"
            class="nav-link"
            :class="{active :currentPath === 'Orders'}"
          >
            <i class="fas fa-list-alt mr-2"></i>
            <span class="h5">模擬訂單</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/admin/coupons"
            class="nav-link"
            :class="{active :currentPath === 'Coupons'}"
            href="#"
          >
            <i class="fas fa-ticket-alt mr-3"></i>
            <span class="h5">折價券</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    currentPath() {
      return this.$route.name;
    }
  }
};
</script>