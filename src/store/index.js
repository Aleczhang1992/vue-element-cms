/**
 * Created by an.han on 16/10/15.
 */

export default {
  state: {
    message: 'yes!',
    newsList:[],
  },
  mutations: {
    MESSAGE (state, value) {
      state.message = value || state.message;
    },
    NEWSLIST (state, value) {
      state.newsList = value || state.newsList;
    }
  }
}