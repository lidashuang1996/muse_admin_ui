import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: 0, // 页面的状态
    login: {},
    menu: [], // 菜单
    isMenuFold: false,
    menuIndex: { x: 0, y: 0 }
  },
  mutations: {
    // 修改 menu 的值
    menu (state: any, data: MenuStore) {
      state.menu = data;
    },
    isMenuFold (state: any) {
      state.isMenuFold = !state.isMenuFold;
    },
    menuIndex (state: any, data: IndexMenuStore) {
      state.menuIndex = data;
    }
  },
  actions: {
  },
  modules: {
  }
});
