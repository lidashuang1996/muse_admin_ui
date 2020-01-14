<template>
  <div class="home-main">
    <HomeMainHead/>
    <HomeMainMenu/>
    <div class="home-main-content" :style="isMenuFold && 'padding-left: 94px;'">
      <div class="home-main-content-route">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { State } from 'vuex-class';
import HomeMainHead from './HomeMainHead.vue';
import HomeMainMenu from './HomeMainMenu.vue';
import HomeMainMenuItem from './HomeMainMenuItem.vue';
import HomeMainHeadItem from './HomeMainHeadItem.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: { HomeMainMenu, HomeMainHead, HomeMainHeadItem, HomeMainMenuItem }
})
export default class HomeMain extends Vue {
  @State('isMenuFold') protected isMenuFold!: boolean; // 菜单列表是否展开的状态
}
</script>
