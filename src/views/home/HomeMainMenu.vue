<template>

  <!-- 主页菜单列表 -->
  <mu-drawer class="home-main-menu"
             style="overflow: visible;"
             :open.sync="isMenuOpen"
             :docked="true"
             :z-depth="0"
             :width="isMenuFold ? 78 : 220">
    <div style="width: 100%; height: 100%; overflow: auto;">
      <div class="home-main-menu-top">
        <router-link to="/" tag="a" class="home-main-menu-top-open" :style="isMenuFold && 'left: calc(50% - 220px);'">
          WMS-ADMIN
          <!--<img src=""  alt="HOME_MAIN_LOGO"/>-->
        </router-link>
        <router-link to="/" tag="a" class="home-main-menu-top-fold" :style="isMenuFold && 'left: 50%;'">
          ADMIN
          <!--<img src=""  alt="HOME_MAIN_LOGO"/>-->
        </router-link>
      </div>
      <div id="home-main-menu-list" class="home-main-menu-list">
        <template v-for="(item, index) in menu">
          <HomeMainMenuItem :isMenuFold="isMenuFold" :data="item" :x="index"
                            :key="'HOME_MAIN_MENU_ITEM_' + index" @switch="initWindow"/>
        </template>
      </div>
      <div class="home-main-menu-bottom" :style="'margin-top: ' + bottomMargin + 'px;'">
        <p>Muse-UI is open source and released under the MIT Licence.</p>
        <p>Copyright (c) 2016 myron.</p>
      </div>
    </div>
  </mu-drawer>
</template>

<script lang="ts">
import { State } from 'vuex-class';
import HomeMainMenuItem from './HomeMainMenuItem.vue';
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: { HomeMainMenuItem }
})
export default class HomeMainMenu extends Vue {
  @State('menu') protected menu!: MenuStore; // vuex 里面读取菜单
  @State('isMenuFold') protected isMenuFold!: boolean; // 菜单列表是否展开的状态
  protected isMenuOpen: boolean = true; // 菜单抽屉一直都是打开的状态
  protected bottomMargin: number = 0; // 距离底部的间隔

  /**
   * vue 生命周期函数 1.初始化窗体 2. 监听窗体的变化
   */
  protected mounted () {
    this.initWindow(); // 初始化窗体
    window.onresize = () => { this.initWindow(); }; // 监听窗体的变化
  }

  /**
   * 初始化窗体--底部边距
   */
  protected initWindow () {
    this.$nextTick(() => {
      const ch = document.documentElement.clientHeight;
      const mh = document.getElementById('home-main-menu-list')!.clientHeight;
      if ((mh + 64 + 105) > ch) this.bottomMargin = 0;
      else this.bottomMargin = ch - mh - 64 - 105;
    });
  }
}
</script>
