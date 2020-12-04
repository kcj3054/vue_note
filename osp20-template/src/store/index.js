import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    history: [],
    images : [],
  },
  mutations: {
    add(state, value) {
      state.history = value;
    },
    setImages (state, payload) {
      state.images = payload
    }
  },
  actions: {
    addToHistory(context, value) {
      let history = context.state.history;

      history = [...history, ...value];
      context.commit("add", history);
    },
  },
});