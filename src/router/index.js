import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    path: "*",
    redirect: "guest/home"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login")
  },
  {
    path: "/guest",
    name: "Guest",
    component: () => import("@/views/Guest"),
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/components/guests/GuestHome")
      },
      {
        path: "productlist/:brand",
        name: "Productlist",
        component: () => import("@/components/guests/GuestProductList")
      },
      {
        path: "productdetail/:id",
        name: "Productdetail",
        component: () => import("@/components/guests/GuestProductDetail")
      },
      {
        path: "productorder/:step",
        name: "Productorder",
        component: () => import("@/components/guests/GuestOrder")
      },
      {
        path: "aboutus",
        name: "AboutUs",
        component: () => import("@/components/guests/GuestAboutUs")
      },
      {
        path: "promotion",
        name: "Promotion",
        component: () => import("@/components/guests/GuestPromotion")
      }
    ]
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views/Admin"),
    children: [
      {
        path: "products",
        name: "Products",
        component: () => import("@/components/admin/AdminProductList"),
        meta: { requiresAuth: true }
      },
      {
        path: "orders",
        name: "Orders",
        component: () => import("@/components/admin/AdminOrderList"),
        meta: { requiresAuth: true }
      },
      {
        path: "coupons",
        name: "Coupons",
        component: () => import("@/components/admin/AdminCoupon"),
        meta: { requiresAuth: true }
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: "history",
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

export default router;
