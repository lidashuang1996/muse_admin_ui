<template>
  <div id="app" v-if="isLoad">
    <!-- 后台登录 -->
<!--    <Login/>-->
    <!-- 后台主页 -->
    <div>
      <Exhibition v-if="isExhibition"/>
      <Home v-else/>
    </div>
  </div>
</template>

<script lang="ts">
import { State } from 'vuex-class';
import Cache from './utils/cache';
import Login from './views/login/Login.vue';
import Home from './views/home/Home.vue';
import Exhibition from './views/other/Exhibition.vue';
import { Component, Watch, Vue } from 'vue-property-decorator';
@Component({
  components: { Exhibition, Home, Login }
})
export default class App extends Vue {
  // 读取 Vuex 里面的数据
  @State('status') protected status!: number;
  protected isExhibition: boolean = false;
  protected isLoad: boolean = false;

  protected mounted () {
    if (this.$route.path.toLocaleUpperCase() === '/exhibition'.toUpperCase()) {
      this.isExhibition = true;
    }
    Cache.init(this); // 初始化
    this.isLoad = true;
  }

  @Watch('status')
  protected onStatusChange () {
  }
}
</script>
