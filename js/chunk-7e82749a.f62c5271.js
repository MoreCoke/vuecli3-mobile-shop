(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e82749a"],{1799:function(t,a,e){"use strict";var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"mb-3"},[e("nav",{attrs:{"aria-label":"Page navigation example"}},[e("ul",{staticClass:"pagination d-flex justify-content-center"},[e("li",{staticClass:"page-item",class:{disabled:!t.propPage.has_pre}},[e("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(a){a.preventDefault(),t.$emit("pageData",t.propPage.current_page-1)}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])]),t._l(t.propPage.total_pages,(function(a){return e("li",{key:a,staticClass:"page-item",class:{active:t.propPage.current_page===a}},[e("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.$emit("pageData",a)}}},[t._v(t._s(a))])])})),e("li",{staticClass:"page-item",class:{disabled:!t.propPage.has_next}},[e("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(a){a.preventDefault(),t.$emit("pageData",t.propPage.current_page+1)}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])])],2)])])},s=[],n={name:"Product",props:["propPage"]},i=n,l=e("2877"),c=Object(l["a"])(i,o,s,!1,null,null,null);a["a"]=c.exports},c9bc:function(t,a,e){"use strict";e.r(a);var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"vld-parent"},[e("loading",{attrs:{active:t.isLoading},on:{"update:active":function(a){t.isLoading=a}}})],1),e("div",{staticClass:"text-right"},[e("button",{staticClass:"btn btn-primary",on:{click:function(a){return t.openModal(!0)}}},[t._v("建立新的折價券")])]),e("table",{staticClass:"table mt-4"},[t._m(0),e("tbody",t._l(t.coupons,(function(a,o){return e("tr",{key:o},[e("td",[t._v(t._s(a.title))]),e("td",[t._v(t._s(a.code))]),e("td",[t._v(t._s(a.percent))]),e("td",[t._v(t._s(a.due_date))]),e("td",[a.is_enabled?e("span",{staticClass:"text-success"},[t._v("啟用")]):e("span",[t._v("未啟用")])]),e("td",[e("button",{staticClass:"btn btn-outline-primary btn-sm",on:{click:function(e){return t.openModal(!1,a)}}},[t._v("編輯")]),e("button",{staticClass:"btn btn-outline-danger btn-sm",on:{click:function(e){return t.delModal(a)}}},[t._v("刪除")])])])})),0)]),e("Pagination",{attrs:{"prop-page":t.pagination},on:{pageData:t.getCoupons}}),e("div",{staticClass:"modal fade",attrs:{id:"couponModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog modal-lg",attrs:{role:"document"}},[e("div",{staticClass:"modal-content border-0"},[t._m(1),e("div",{staticClass:"modal-body"},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"mb-2",attrs:{for:"title"}},[t._v("名稱")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.tempCoupon.title,expression:"tempCoupon.title"}],staticClass:"form-control",attrs:{type:"text",id:"title",placeholder:"請輸入名稱"},domProps:{value:t.tempCoupon.title},on:{input:function(a){a.target.composing||t.$set(t.tempCoupon,"title",a.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{staticClass:"mb-2",attrs:{for:"percent"}},[t._v("折扣比例(請輸入正整數)")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.tempCoupon.percent,expression:"tempCoupon.percent"}],staticClass:"form-control",attrs:{type:"number",id:"percent",placeholder:"折扣比例"},domProps:{value:t.tempCoupon.percent},on:{input:function(a){a.target.composing||t.$set(t.tempCoupon,"percent",a.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{staticClass:"mb-2",attrs:{for:"due_date"}},[t._v("日期")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.tempCoupon.due_date,expression:"tempCoupon.due_date"}],staticClass:"form-control",attrs:{type:"date",id:"due_date",placeholder:"請輸入有效日期"},domProps:{value:t.tempCoupon.due_date},on:{input:function(a){a.target.composing||t.$set(t.tempCoupon,"due_date",a.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{staticClass:"mb-2",attrs:{for:"code"}},[t._v("折扣碼")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.tempCoupon.code,expression:"tempCoupon.code"}],staticClass:"form-control",attrs:{type:"text",id:"code",placeholder:"請輸入折扣碼"},domProps:{value:t.tempCoupon.code},on:{input:function(a){a.target.composing||t.$set(t.tempCoupon,"code",a.target.value)}}})]),e("hr"),e("div",{staticClass:"form-group"},[e("div",{staticClass:"form-check"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.tempCoupon.is_enabled,expression:"tempCoupon.is_enabled"}],staticClass:"form-check-input",attrs:{type:"checkbox","true-value":1,"false-value":0,id:"is_enabled"},domProps:{checked:Array.isArray(t.tempCoupon.is_enabled)?t._i(t.tempCoupon.is_enabled,null)>-1:t._q(t.tempCoupon.is_enabled,1)},on:{change:function(a){var e=t.tempCoupon.is_enabled,o=a.target,s=o.checked?1:0;if(Array.isArray(e)){var n=null,i=t._i(e,n);o.checked?i<0&&t.$set(t.tempCoupon,"is_enabled",e.concat([n])):i>-1&&t.$set(t.tempCoupon,"is_enabled",e.slice(0,i).concat(e.slice(i+1)))}else t.$set(t.tempCoupon,"is_enabled",s)}}}),e("label",{staticClass:"form-check-label",attrs:{for:"is_enabled"}},[t._v("是否啟用")])])])]),e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("取消")]),e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.updateCoupon}},[t._v("確認")])])])])]),e("div",{staticClass:"modal fade",attrs:{id:"delCouponModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[e("div",{staticClass:"modal-content border-0"},[t._m(2),e("div",{staticClass:"modal-body"},[t._v(" 是否刪除 "),e("strong",{staticClass:"text-danger"},[t._v(t._s(t.tempCoupon.title))]),t._v(" 商品(刪除後將無法恢復)。 ")]),e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("取消")]),e("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:t.delCoupon}},[t._v("確認刪除")])])])])])],1)},s=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("th",[t._v("折價券名稱")]),e("th",{attrs:{width:"200"}},[t._v("代碼內容")]),e("th",{attrs:{width:"120"}},[t._v("折扣%數")]),e("th",{attrs:{width:"120"}},[t._v("有效期限")]),e("th",{attrs:{width:"100"}},[t._v("是否啟用")]),e("th",{attrs:{width:"120"}},[t._v("編輯")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-header bg-dark text-white"},[e("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[e("span",[t._v("新增折價券")])]),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-header bg-danger text-white"},[e("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[e("span",[t._v("刪除產品")])]),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])}],n=(e("99af"),e("1157")),i=e.n(n),l=e("1799"),c={components:{Pagination:l["a"]},data:function(){return{coupons:[],pagination:{},tempCoupon:{},isNew:!1,isLoading:!1,status:{fileUploading:!1}}},methods:{getCoupons:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a="".concat("https://vue-course-api.hexschool.io/","api/").concat("morecoke","/admin/coupons?page=").concat(t),e=this;e.isLoading=!0,this.$http.get(a).then((function(t){e.isLoading=!1,e.coupons=t.data.coupons,e.pagination=t.data.pagination}))},openModal:function(t,a){t?(this.tempCoupon={},this.isNew=!0):(this.tempCoupon=Object.assign({},a),this.isNew=!1),i()("#couponModal").modal("show")},delModal:function(t){this.tempCoupon=t,i()("#delCouponModal").modal("show")},updateCoupon:function(){var t="".concat("https://vue-course-api.hexschool.io/","api/").concat("morecoke","/admin/coupon"),a="post",e=this;e.isNew||(t="".concat("https://vue-course-api.hexschool.io/","api/").concat("morecoke","/admin/coupon/").concat(e.tempCoupon.id),a="put"),this.$http[a](t,{data:e.tempCoupon}).then((function(t){t.data.success?(i()("#couponModal").modal("hide"),e.$bus.$emit("message:push",t.data.message,"success"),e.getCoupons()):(i()("#couponModal").modal("hide"),e.$bus.$emit("message:push",t.data.message,"warning"),e.getCoupons())}))},delCoupon:function(){var t=this,a="".concat("https://vue-course-api.hexschool.io/","api/").concat("morecoke","/admin/coupon/").concat(t.tempCoupon.id);this.$http.delete(a,{data:t.tempCoupon}).then((function(a){a.data.success?(i()("#delCouponModal").modal("hide"),t.$bus.$emit("message:push",a.data.message,"success"),t.getCoupons()):(i()("#delCouponModal").modal("hide"),t.$bus.$emit("message:push",a.data.message,"warning"),t.getCoupons())}))}},created:function(){this.getCoupons()}},d=c,r=e("2877"),p=Object(r["a"])(d,o,s,!1,null,null,null);a["default"]=p.exports}}]);
//# sourceMappingURL=chunk-7e82749a.f62c5271.js.map