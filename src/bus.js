import Vue from 'vue';

Vue.prototype.$bus = new Vue();

//Message
// vm.$bus.$emit('message:push',message,status);
// message(String):訊息內容
// status(String):Alert 的樣式

// HomeProductTypeIndex
// vm.$bus.$emit("HomeProductTypeIndex", type, index);
// type(String):商品類型(預設全部商品)
// index(Number):商品類型的索引值