(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-44ef19d9"],{"1a64":function(t,s,e){},"22c3":function(t,s,e){"use strict";var a=e("1a64"),r=e.n(a);r.a},"534d":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"container"},[e("div",{staticClass:"vld-parent"},[e("loading",{attrs:{active:t.effect.isLoading},on:{"update:active":function(s){return t.$set(t.effect,"isLoading",s)}}})],1),e("ul",{staticClass:"step my-4"},[e("li",{staticClass:"step-check",class:{done:"check"===t.step}},[t._m(0),e("span",{staticClass:"step-text"},[t._v("訂單確認")])]),e("li",{staticClass:"step-credit",class:{done:"info"===t.step}},[t._m(1),e("span",{staticClass:"step-text"},[t._v("資料輸入")])]),e("li",{staticClass:"step-finished",class:{done:"finished"===t.step}},[t._m(2),e("span",{staticClass:"step-text"},[t._v("訂單成立")])])]),"check"===t.step?e("OrderCheck",{attrs:{cartData:t.cartProducts},on:{updateCart:t.getCartData}}):t._e(),"info"===t.step?e("OrderInfo"):t._e(),"finished"===t.step?e("OrderFinished"):t._e()],1)},r=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("span",{staticClass:"step-icon"},[e("i",{staticClass:"fas fa-2x fa-user-check"})])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("span",{staticClass:"step-icon"},[e("i",{staticClass:"far fa-2x fa-credit-card"})])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("span",{staticClass:"step-icon"},[e("i",{staticClass:"fas fa-2x fa-truck-moving"})])}],i=(e("99af"),function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-lg-4"},[e("div",{staticClass:"coupon"},[e("div",{staticClass:"coupon-content"},[e("div",{staticClass:"coupon-title",on:{click:t.toggleCoupon}},[t._v(" 點我領折扣! "),e("i",{staticClass:"fas fa-hand-point-down blink"})]),e("div",{staticClass:"coupon-text"},[e("span",[t._v("有效期限")]),e("p",[t._v(" "+t._s(t.getToday)+" "),e("span",[t._v("23:59分止")])])]),e("div",{staticClass:"input-group mt-4"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.couponCode,expression:"couponCode"}],staticClass:"form-control",attrs:{type:"text",placeholder:"請輸入折扣代碼"},domProps:{value:t.couponCode},on:{input:function(s){s.target.composing||(t.couponCode=s.target.value)}}}),e("div",{staticClass:"input-group-append"},[e("button",{staticClass:"btn btn-info",on:{click:t.useCoupon}},[t._v(" 確認 "),t.effect.couponLoading?e("i",{staticClass:"fas fa-spinner fa-spin"}):t._e()])])])]),e("div",{staticClass:"coupon-inside"},[e("i",{staticClass:"fas fa-3x fa-ticket-alt"}),e("p",{domProps:{innerHTML:t._s(t.getCouponData)}}),t._m(0)])]),e("div",{staticClass:"horizontial-coupon"},[e("div",{staticClass:"coupon-content"},[e("div",{staticClass:"coupon-title"},[e("span",{domProps:{innerHTML:t._s(t.getCouponData)}}),e("i",{staticClass:"fas fa-hand-point-down"})]),e("div",{staticClass:"coupon-text"},[e("span",[t._v("有效期限")]),e("p",[t._v(" "+t._s(t.getToday)+" "),e("span",[t._v("23:59分止")])])]),e("div",{staticClass:"input-group mt-4 mx-auto w-md-50"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.couponCode,expression:"couponCode"}],staticClass:"form-control",attrs:{type:"text",placeholder:"請輸入折扣代碼"},domProps:{value:t.couponCode},on:{input:function(s){s.target.composing||(t.couponCode=s.target.value)}}}),e("div",{staticClass:"input-group-append"},[e("button",{staticClass:"btn btn-info",on:{click:t.useCoupon}},[t._v(" 確認 "),t.effect.couponLoading?e("i",{staticClass:"fas fa-spinner fa-spin"}):t._e()])])])])])]),e("div",{staticClass:"col-lg-8"},[e("div",{staticClass:"order mb-3"},[e("table",{staticClass:"order-table"},[t._m(1),e("tbody",t._l(t.cartData.carts,(function(s,a){return e("tr",{key:"cart-"+a},[e("td",[e("router-link",{staticClass:"shopping-img",style:{backgroundImage:"url("+s.product.imgUrl+")"},attrs:{to:"/guest/productdetail/"+s.product.id,title:s.product.title}})],1),e("td",[e("h4",{staticClass:"mb-2"},[t._v(t._s(s.product.title))]),e("p",[t._v("共"+t._s(s.qty)+t._s(s.product.unit))])]),e("td",{staticClass:"text-right"},[e("p",[t._v(t._s(t._f("currency")(s.final_total)))])]),e("td",[e("button",{staticClass:"btn btn-outline-info",on:{click:function(e){return t.delCartData(s.id)}}},[s.id===t.effect.currentLoading?e("i",{staticClass:"fas fa-spinner fa-spin"}):e("i",{staticClass:"fas fa-trash-alt"})])])])})),0)]),e("p",{staticClass:"order-total"},[t._v(" 總共金額: "),e("span",{class:{"order-delprice":t.cartData.final_total!==t.cartData.total}},[t._v(t._s(t._f("currency")(t.cartData.total)))])]),t.cartData.final_total!==t.cartData.total?e("p",{staticClass:"order-total"},[t._v(" 折扣後金額: "),e("span",[t._v(t._s(t._f("currency")(t.cartData.final_total)))])]):t._e()])])]),e("div",{staticClass:"d-flex justify-content-end mb-3"},[e("button",{staticClass:"btn btn-primary btn-lg",on:{click:t.toUserInfo}},[t._v(" 下一步 "),e("i",{staticClass:"fas fa-hand-point-right"})])])])}),o=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"d-flex justify-content-between align-items-end w-100"},[e("div",{staticClass:"barcode"},[e("div",{staticClass:"barcode-num"},[t._v("1 234 56 78 999")])]),e("div",[t._v(" 數量有限， "),e("br"),t._v("先拿先贏 ")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("thead",[e("th"),e("th",[t._v("購買明細")]),e("th",[t._v("價格")]),e("th")])}],n=(e("0d03"),e("ac1f"),e("5319"),e("1157")),c=e.n(n),l={props:["cartData"],data:function(){return{couponCode:"",effect:{currentLoading:"",couponLoading:!1}}},methods:{delCartData:function(t){var s=this,e="".concat("https://vue-course-api.hexschool.io/","api/").concat("morecoke","/cart/").concat(t);s.effect.currentLoading=t,s.$http.delete(e).then((function(t){s.$emit("updateCart"),s.effect.currentLoading="",s.$bus.$emit("message:push",t.data.message,"warning")}))},useCoupon:function(){var t=this,s="".concat("https://vue-course-api.hexschool.io/","api/").concat("morecoke","/coupon");t.effect.couponLoading=!0,t.$http.post(s,{data:{code:t.couponCode}}).then((function(s){s.data.success?(t.$emit("updateCart"),t.$bus.$emit("message:push",s.data.message,"success"),t.couponCode="",localStorage.clear()):t.$bus.$emit("message:push",s.data.message,"warning"),t.effect.couponLoading=!1}))},toggleCoupon:function(){c()(".coupon-inside").toggleClass("active")},toUserInfo:function(){this.$router.push("/guest/productorder/info")}},computed:{getToday:function(){var t=new Date,s="".concat(t.getMonth()+1,"/").concat(t.getDate());return s},getCouponData:function(){var t,s=JSON.parse(localStorage.getItem("coupon"));return t=s?"請輸入".concat(s.title.replace(/折價券/,"價碼"),": <br>").concat(s.code):"請輸入95折扣碼: <br>iloveflash",t}}},d=l,u=e("2877"),m=Object(u["a"])(d,i,o,!1,null,null,null),p=m.exports,f=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"vld-parent"},[e("loading",{attrs:{active:t.effect.isLoading},on:{"update:active":function(s){return t.$set(t.effect,"isLoading",s)}}})],1),e("div",{staticClass:"topic"},[t._v("訂購人資料")]),e("div",{staticClass:"my-5 row justify-content-center"},[e("form",{staticClass:"col-md-10",on:{submit:function(s){return s.preventDefault(),t.sentOrderData(s)}}},[e("div",{staticClass:"form-row"},[e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"username"}},[t._v("訂購人姓名*")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.user.name,expression:"form.user.name"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",class:{"is-invalid":t.errors.has("name")},attrs:{type:"text",name:"name",id:"username",placeholder:"請輸入姓名"},domProps:{value:t.form.user.name},on:{input:function(s){s.target.composing||t.$set(t.form.user,"name",s.target.value)}}}),t.errors.has("name")?e("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("name").replace(/name/,"名字")))]):t._e()])]),e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"usertel"}},[t._v("訂購人電話*")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.user.tel,expression:"form.user.tel"},{name:"validate",rawName:"v-validate",value:"required|digits:10",expression:"'required|digits:10'"}],staticClass:"form-control",class:{"is-invalid":t.errors.has("tel")},attrs:{type:"tel",name:"tel",id:"usertel",placeholder:"請輸入電話"},domProps:{value:t.form.user.tel},on:{input:function(s){s.target.composing||t.$set(t.form.user,"tel",s.target.value)}}}),t.errors.has("tel")?e("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("tel").replace(/tel/,"電話號碼")))]):t._e()])])]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"useremail"}},[t._v("Email*")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.user.email,expression:"form.user.email"},{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],staticClass:"form-control",class:{"is-invalid":t.errors.has("email")},attrs:{type:"email",name:"email",id:"useremail",placeholder:"請輸入 Email"},domProps:{value:t.form.user.email},on:{input:function(s){s.target.composing||t.$set(t.form.user,"email",s.target.value)}}}),t.errors.has("email")?e("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("email")))]):t._e()]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"useraddress"}},[t._v("訂購人地址*")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.user.address,expression:"form.user.address"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",class:{"is-invalid":t.errors.has("address")},attrs:{type:"text",name:"address",id:"useraddress",placeholder:"請輸入地址"},domProps:{value:t.form.user.address},on:{input:function(s){s.target.composing||t.$set(t.form.user,"address",s.target.value)}}}),t.errors.has("address")?e("span",{staticClass:"text-danger"},[t._v("地址不得留空")]):t._e()]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"comment"}},[t._v("備註(選填)")]),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.form.message,expression:"form.message"}],staticClass:"form-control",attrs:{name:"",id:"comment",cols:"20",rows:"5"},domProps:{value:t.form.message},on:{input:function(s){s.target.composing||t.$set(t.form,"message",s.target.value)}}})]),e("div",{staticClass:"d-flex justify-content-between my-3"},[e("button",{staticClass:"btn btn-primary btn-lg",on:{click:t.toOrderCheck}},[t._v(" 上一步 "),e("i",{staticClass:"fas fa-hand-point-left"})]),t._m(0)])])])])},v=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("button",{staticClass:"btn btn-primary btn-lg"},[t._v(" 送出訂單 "),e("i",{staticClass:"fas fa-hand-point-right"})])}],C={data:function(){return{effect:{isLoading:!1},form:{user:{name:"",email:"",tel:"",address:""},message:""}}},methods:{sentOrderData:function(){var t=this,s="".concat("https://vue-course-api.hexschool.io/","api/").concat("morecoke","/order");this.$validator.validate().then((function(e){e?(t.effect.isLoading=!0,t.$http.post(s,{data:t.form}).then((function(s){s.data.success?(t.$bus.$emit("message:push",s.data.message,"success"),t.toOrderFinished(s.data.orderId)):t.$bus.$emit("message:push",s.data.message,"warning"),t.effect.isLoading=!1}))):t.$bus.$emit("message:push","表單尚未完成","warning")}))},toOrderCheck:function(){this.$router.push("/guest/productorder/check")},toOrderFinished:function(t){this.$router.push({path:"/guest/productorder/finished",query:{orderid:t}})}}},_=C,h=(e("22c3"),Object(u["a"])(_,f,v,!1,null,null,null)),g=h.exports,b=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"topic text-primary"},[t._v("訂單資料")]),e("div",{staticClass:"order mb-3"},[e("table",{staticClass:"order-table"},[t._m(0),e("tbody",t._l(t.order.products,(function(s,a){return e("tr",{key:"order-"+a},[e("td",[e("div",{staticClass:"shopping-img",style:{backgroundImage:"url("+s.product.imgUrl+")"},attrs:{title:s.product.title}})]),e("td",[e("h4",[t._v(t._s(s.product.title))])]),e("td",[e("p",[t._v("共"+t._s(s.qty)+t._s(s.product.unit))])]),e("td",{staticClass:"text-right"},[e("p",[t._v(t._s(t._f("currency")(s.final_total)))])])])})),0)]),e("p",{staticClass:"order-total"},[t._v(" 總共金額: "),e("span",[t._v(t._s(t._f("currency")(t.order.total)))])])]),e("div",{staticClass:"topic text-primary"},[t._v("訂購人資料")]),e("div",{staticClass:"userdata mb-4"},[e("div",{staticClass:"userdata-inside"},[t.order.user?e("div",{staticClass:"row justify-content-center"},[e("div",{staticClass:"col-sm-4 mb-2 mb-sm-3"},[t._v("下單日期 :")]),e("div",{staticClass:"col-sm-8 mb-2 mb-sm-3"},[t._v(t._s(t._f("date")(t.order.create_at)))]),e("div",{staticClass:"col-sm-4 mb-2 mb-sm-3"},[t._v("訂單編號 :")]),e("div",{staticClass:"col-sm-8 mb-2 mb-sm-3"},[t._v(t._s(t.order.id))]),e("div",{staticClass:"divider"}),e("div",{staticClass:"col-sm-4 mb-2 mb-sm-3"},[t._v("訂購人姓名 :")]),e("div",{staticClass:"col-sm-8 mb-2 mb-sm-3"},[t._v(t._s(t.order.user.name))]),e("div",{staticClass:"col-sm-4 mb-2 mb-sm-3"},[t._v("訂購人電話 :")]),e("div",{staticClass:"col-sm-8 mb-2 mb-sm-3"},[t._v(t._s(t.order.user.tel))]),e("div",{staticClass:"col-sm-4 mb-2 mb-sm-3"},[t._v("訂購人Email :")]),e("div",{staticClass:"col-sm-8 mb-2 mb-sm-3"},[t._v(t._s(t.order.user.email))]),e("div",{staticClass:"col-sm-4 mb-2 mb-sm-3"},[t._v("訂購人地址 :")]),e("div",{staticClass:"col-sm-8 mb-2 mb-sm-3"},[t._v(t._s(t.order.user.address))]),e("div",{staticClass:"divider"}),e("div",{staticClass:"col-sm-4 mb-2 mb-sm-3"},[t._v("付款狀態 :")]),e("div",{staticClass:"col-sm-8 mb-2 mb-sm-3"},[t.order.is_paid?e("span",{staticClass:"text-success"},[t._v("付款完成")]):e("span",{staticClass:"text-danger"},[t._v("尚未付款")])])]):t._e(),e("div",{staticClass:"text-center my-3"},[t.order.is_paid?e("button",{staticClass:"btn btn-primary",on:{click:t.toGuestHome}},[t._v(" 回首頁 "),e("i",{staticClass:"fas fa-home"})]):e("button",{staticClass:"btn btn-primary mx-auto",on:{click:function(s){return t.payOrder(t.orderId)}}},[t._v(" 確認付款 "),t.effect.orderLoading?e("i",{staticClass:"fas fa-spinner fa-spin"}):e("i",{staticClass:"far fa-money-bill-alt"})])])])])])},x=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("thead",[e("th"),e("th",[t._v("購買商品")]),e("th",[t._v("購買數量")]),e("th",[t._v("價格")])])}],$={data:function(){return{orderId:this.$route.query.orderid,order:{},effect:{orderLoading:!1}}},methods:{getOrderData:function(t){var s=this,e="".concat("https://vue-course-api.hexschool.io/","api/").concat("morecoke","/order/").concat(t);s.$http.get(e).then((function(t){s.order=t.data.order}))},payOrder:function(t){var s=this,e=this,a="".concat("https://vue-course-api.hexschool.io/","api/").concat("morecoke","/pay/").concat(t);e.effect.orderLoading=!0,e.$http.post(a).then((function(a){s.$bus.$emit("message:push",a.data.message,"success"),e.effect.orderLoading=!1,e.getOrderData(t)}))},toGuestHome:function(){this.$router.push("/guest/home")}},created:function(){this.getOrderData(this.orderId)}},y=$,k=Object(u["a"])(y,b,x,!1,null,null,null),w=k.exports,L={components:{OrderCheck:p,OrderInfo:g,OrderFinished:w},data:function(){return{step:this.$route.params.step,cartProducts:{},effect:{isLoading:!1,currentLoading:"",couponLoading:!1}}},methods:{getCartData:function(){var t=this,s="".concat("https://vue-course-api.hexschool.io/","api/").concat("morecoke","/cart");t.effect.isLoading=!0,t.$http.get(s).then((function(s){t.cartProducts=s.data.data,t.effect.isLoading=!1}))},checkStep:function(){this.step=this.$route.params.step}},watch:{$route:function(){this.checkStep()}},created:function(){this.getCartData()}},D=L,O=Object(u["a"])(D,a,r,!1,null,null,null);s["default"]=O.exports}}]);
//# sourceMappingURL=chunk-44ef19d9.4d6852ad.js.map