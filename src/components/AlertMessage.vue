<template>
  <!-- <div class="message-alert">
    <div
      class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages"
      :key="i"
    >
      <span v-if="item.status==='success'"><i class="far fa-laugh"></i></span>
      <span v-else><i class="far fa-sad-tear"></i></span>
      <span>{{ item.message }}</span>
      <button
        type="button"
        class="close"
        @click="removeMessage(i)"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>-->
  <div>
    <div
      class="message-alert"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages"
      :key="i"
    >
      <div class="message-btn">
        <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="message-icon">
        <span v-if="item.status==='success'">
          <i class="far fa-3x fa-laugh"></i>
        </span>
        <span v-else>
          <i class="far fa-3x fa-sad-tear"></i>
        </span>
      </div>
      <div class="message-text">
        <span>{{ item.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: []
    };
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 2500);
    }
  },
  created() {
    const vm = this;
    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    vm.$bus.$on("message:push", (message, status = "warning") => {
      vm.updateMessage(message, status);
    });
    //vm.$bus.$emit('message:push');
  }
};
</script>

<style scope>
</style>