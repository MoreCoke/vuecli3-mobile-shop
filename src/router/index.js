import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/components/views/Login';
//父組件
import Guest from '@/components/views/Guest';
import Admin from '@/components/views/Admin';
//訪客組件
// import GuestHome from "@/components/guests/GuestHome";
import GuestProductList from "@/components/guests/GuestProductList";
import GuestProductDetail from "@/components/guests/GuestProductDetail";
import GuestOrder from "@/components/guests/GuestOrder";
import GuestAboutUs from "@/components/guests/GuestAboutUs";
import GuestPromotion from "@/components/guests/GuestPromotion";
//後台組件
import AdminProductList from '@/components/admin/AdminProductList';
import AdminCoupon from "@/components/admin/AdminCoupon";
import AdminOrderList from '@/components/admin/AdminOrderList';

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const routes = [
  {
    path: '*',
    redirect: 'guest/home',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/guest',
    name: 'Guest',
    component: Guest,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/components/guests/GuestHome'),// GuestHome,
      },
      {
        path: 'productlist/:brand',
        name: "Productlist",
        component : GuestProductList,
      },
      {
        path: 'productdetail/:id',
        name: "Productdetail",
        component : GuestProductDetail,
      },
      {
        path: 'productorder/:step',
        name: "Productorder",
        component: GuestOrder,
      },
      {
        path:'aboutus',
        name: 'AboutUs',
        component: GuestAboutUs,
      },
      {
        path:'promotion',
        name:'Promotion',
        component:GuestPromotion,
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: 'products',
        name: 'Products',
        component: AdminProductList,
        meta: { requiresAuth: true },
      },
      {
        path: 'orders',
        name: 'Orders',
        component: AdminOrderList,
        meta: { requiresAuth: true },
      },
      {
        path: 'coupons',
        name:'Coupons',
        component: AdminCoupon,
        meta:{ requiresAuth : true},
      }
    ]
  },
];

const router = new VueRouter({
  routes,
});

export default router;
