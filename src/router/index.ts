import Vue from 'vue';
import VueRouter from 'vue-router';

const Index1 = () => import('../views/home/test/index1.vue');
const Index2 = () => import('../views/home/test/index2.vue');
const Index3 = () => import('../views/home/test/index3.vue');
const Index4 = () => import('../views/home/test/index4.vue');
const Index5 = () => import('../views/home/test/index5.vue');
const Index6 = () => import('../views/home/test/index6.vue');

const Index7 = () => import('../views/home/test/index7.vue');
const Index8 = () => import('../views/home/test/index8.vue');
const Index9 = () => import('../views/home/test/index9.vue');
const Index10 = () => import('../views/home/test/index10.vue');
const Index11 = () => import('../views/home/test/index11.vue');
const Index12 = () => import('../views/home/test/index12.vue');

const Index13 = () => import('../views/home/test/index13.vue');
const Index14 = () => import('../views/home/test/index14.vue');
const Index15 = () => import('../views/home/test/index15.vue');
const Index16 = () => import('../views/home/test/index16.vue');
const Index17 = () => import('../views/home/test/index17.vue');

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'index',
  //   component: () => import('../views/home/jurisdiction/JurisdictionInterface.vue')
  // }
  {
    path: '/tool',
    name: 'tool',
    component: () => import('../views/home/tool/ViewTool.vue')
  },
  {
    path: '/',
    name: 'lock_screen',
    component: () => import('../views/other/LockScreen.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/home/manage/UserManage.vue')
  },
  {
    path: '/code',
    name: 'code',
    component: () => import('../views/home/code/Code.vue')
  },
  {
    path: '/index1',
    name: 'index1',
    component: Index1
  },
  {
    path: '/index2',
    name: 'index2',
    component: Index2
  },
  {
    path: '/index3',
    name: 'index3',
    component: Index3
  },
  {
    path: '/index4',
    name: 'index4',
    component: Index4
  },
  {
    path: '/index5',
    name: 'index5',
    component: Index5
  },
  {
    path: '/index6',
    name: 'index6',
    component: Index6
  },
  {
    path: '/index7',
    name: 'index7',
    component: Index7
  },
  {
    path: '/index8',
    name: 'index8',
    component: Index8
  },
  {
    path: '/index9',
    name: 'index9',
    component: Index9
  },
  {
    path: '/index10',
    name: 'index10',
    component: Index10
  },
  {
    path: '/index1',
    name: 'index11',
    component: Index11
  },
  {
    path: '/index12',
    name: 'index12',
    component: Index12
  },
  {
    path: '/index13',
    name: 'index13',
    component: Index13
  },
  {
    path: '/index14',
    name: 'index14',
    component: Index14
  },
  {
    path: '/index15',
    name: 'index15',
    component: Index15
  },
  {
    path: '/index16',
    name: 'index16',
    component: Index16
  },
  {
    path: '/index17',
    name: 'index17',
    component: Index17
  }

  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];
export default new VueRouter({ routes });
