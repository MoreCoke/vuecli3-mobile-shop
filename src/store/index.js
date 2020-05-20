import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    messages: []
  },
  actions: {
    updateMessage(context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000);
      context.commit("UPDATE_MESSAGE", { message, status, timestamp });
      context.dispatch("removeMessageWithTiming", timestamp);
    },
    removeMessage(context, num) {
      context.commit("REMOVE_MESSAGE", num);
    },
    removeMessageWithTiming(context, timestamp) {
      setTimeout(() => {
        context.commit("REMOVE_MESSAGE_WITH_TIMING", timestamp);
      }, 2500);
    }
  },
  mutations: {
    LOADING(state, payload) {
      state.isLoading = payload;
    },
    UPDATE_MESSAGE(state, { message, status, timestamp }) {
      state.messages.push({
        message,
        status,
        timestamp
      });
    },
    REMOVE_MESSAGE(state, num) {
      state.messages.splice(num, 1);
    },
    REMOVE_MESSAGE_WITH_TIMING(state, timestamp) {
      state.messages.forEach((item, i) => {
        if (item.timestamp === timestamp) {
          state.messages.splice(i, 1);
        }
      });
    }
  }

});
