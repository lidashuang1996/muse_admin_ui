import Vue from 'vue';
import Vuex from 'vuex';
import types from './types';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: { name: 1111 }, // 登录后的属性
    status: 0, // 页面的状态
    menu: [], // 菜单
    isMenuFold: false,
    menuIndex: { x: 0, y: 0 }
  },
  mutations: {
    [types.STATUS_CHANGE] (state: any, data: number) {
      state.status = data;
    },
    [types.LOGIN_CHANGE] (state: any, data: HttpLoginResult) {
      state.login = data;
    },
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
