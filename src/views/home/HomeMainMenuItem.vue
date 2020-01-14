<template>
  <!-- @mouseenter="mouseenter" @mouseleave="mouseleave" -->
  <div style="position: relative;" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <div v-if="isMenuFold"
         ripple="ripple"
         @click.stop="oneMenuClick"
         :class="x === menuIndex.x && 'home-main-menu-list-item-select'"
         class="home-main-menu-list-item">
      <i class="home-main-menu-list-item-ico" v-text="data.ico.content"
         :class="data.ico.class === undefined ? 'material-icons' : data.ico.class"/>
    </div>
    <div v-else
         ripple="ripple"
         @click.stop="oneMenuClick"
         :class="x === menuIndex.x && 'home-main-menu-list-item-select'"
         class="home-main-menu-list-item">
      <i class="home-main-menu-list-item-ico" v-text="data.ico.content"
         :class="data.ico.class === undefined ? 'material-icons' : data.ico.class"/>
      <span class="home-main-menu-list-item-txt" v-text="data.title" v-show="textStatus"/>
      <i class="home-main-menu-list-item-arrow material-icons"
         v-show="textStatus && data !== undefined && data.children !== undefined && data.children.length > 0">keyboard_arrow_down</i>
    </div>
    <div v-show="status"
         class="home-main-menu-list-children-popup"
         v-if="data !== undefined && data.children !== undefined && data.children.length > 0 && isMenuFold">
      <div class="home-main-menu-list-children-popup-content">
        <template v-for="(it, ix) in data.children">
          <div ripple="ripple"
               @click.stop="twoMenuClick(ix)"
               class="home-main-menu-list-children-popup-content-item"
               :class="x === menuIndex.x && ix ===  menuIndex.y && 'home-main-menu-list-children-popup-content-item-select'"
               :key="'HOME_MAIN_MENU_ITEM_CHILDREN_POPUP_' + ix">
            <i class="home-main-menu-list-children-popup-content-item-ico" v-text="it.ico.content"
               :class="it.ico.class === undefined ? 'material-icons' : it.ico.class"/>
            <span class="home-main-menu-list-children-popup-content-item-txt" v-text="it.title"/>
          </div>
        </template>
      </div>
    </div>
    <div v-show="status"
         class="home-main-menu-list-children"
         v-if="data !== undefined && data.children !== undefined && data.children.length > 0 && !isMenuFold">
      <template v-for="(it, ix) in data.children">
        <div ripple="ripple"
             @click.stop="twoMenuClick(ix)"
             class="home-main-menu-list-children-item"
             :class="x === menuIndex.x && ix === menuIndex.y && 'home-main-menu-list-children-item-select'"
             :key="'HOME_MAIN_MENU_ITEM_CHILDREN_' + ix">
          <i class="home-main-menu-list-children-item-ico" v-text="it.ico.content"
             :class="it.ico.class === undefined ? 'material-icons' : it.ico.class"/>
          <span class="home-main-menu-list-children-item-txt" v-text="it.title"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { State, Mutation } from 'vuex-class';
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
@Component({})
export default class HomeMainMenuItem extends Vue {
  @Prop() protected x!: number;
  @Prop() protected data!: MenuStoreItem;
  @Prop() protected isMenuFold!: boolean;
  @State('menuIndex') protected menuIndex: any; // vuex 里面读取菜单的选择情况
  @Mutation('menuIndex') protected menuIndexMutation!: IndexMenuStoreMutation;
  // 是否展开菜单栏
  protected status: boolean = false;
  protected textStatus: boolean = true;

  @Watch('isMenuFold')
  protected onRouteChange (isMenuFold: boolean) {
    if (isMenuFold) {
      this.status = false;
      this.textStatus = false;
    } else setTimeout(() => { this.textStatus = true; }, 100);
  }

  // 菜单的一级确定事件
  protected oneMenuClick () {
    if (this.data.children !== undefined && this.data.children.length > 0) {
      if (this.isMenuFold) this.status = true;
      else this.status = !this.status;
      this.$emit('switch');
    } else {
      this.menuIndexMutation({ x: this.x, y: 0 });
      this.$router.push({ name: this.data.name });
    }
  }
  // 菜单的二级确定事件
  protected twoMenuClick (i: number) {
    if (this.isMenuFold) this.status = false;
    this.menuIndexMutation({ x: this.x, y: i });
    if (this.data.children !== undefined) this.$router.push({ name: this.data.children[i].name });
  }

  /**
   * 鼠标移入事件
   */
  protected mouseenter () {
    if (this.isMenuFold) this.status = true;
  }

  /**
   * 鼠标移出事件
   */
  protected mouseleave () {
    if (this.isMenuFold) this.status = false;
  }
}
</script>
