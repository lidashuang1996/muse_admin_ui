<template>
  <div id="app" v-show="isLoad">
    <!-- 后台登录 -->
    <Login v-if="status === 0"/>
    <!-- 后台主页 -->
    <Home v-if="status === 1"/>
    <!-- 锁屏页面 -->
    <LockScreen v-if="status === 2"/>
  </div>
</template>

<script lang="ts">
import { State } from 'vuex-class';
import Cache from './utils/cache';
import Login from './views/login/Login.vue';
import Home from './views/home/Home.vue';
import LockScreen from './views/other/LockScreen.vue';
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: { LockScreen, Home, Login }
})
export default class App extends Vue {
  // 读取 Vuex 里面的数据
  @State('status')
  protected status!: number; // 读取当前的状态 0 登录 1 主页 2 锁屏
  protected isLoad: boolean = false; // 是否在加载 true -> 加载完成 false -> 加载中

  protected mounted () {
    Cache.init(this); // 初始化
    this.isLoad = true; // 加载完成显示数据
  }

  // @Watch('status')
  // protected onStatusChange (newData: number) {
  //   this.status = newData;
  // }
}
</script>
