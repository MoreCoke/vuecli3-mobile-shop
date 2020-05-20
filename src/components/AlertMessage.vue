<template>
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
  methods: {
    updateMessage(message, status) {
      this.$store.dispatch("updateMessage", { message, status });
    },
    removeMessage(num) {
      this.$store.dispatch("removeMessage", num);
    },
    removeMessageWithTiming(timestamp) {
      this.$store.dispatch("removeMessageWithTiming", timestamp);
    }
  },
  computed: {
    messages() {
      return this.$store.state.messages;
    }
  }
};
</script>
