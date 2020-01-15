<template>
  <div class="home-main-head-item" v-if="bool" style="position: relative;">
    <div>
      <touch-ripple :speed="1" :opacity="0.3" color="#000" transition="ease" class="home-main-head-menu-content-item"
                    :style="!data.bool && 'padding-right: 10px;'">
        {{data.name}}
      </touch-ripple>
    </div>
    <span class="home-main-head-menu-content-item-close" @click="del" v-if="data.bool">
      <i class="material-icons">close</i>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
})
export default class HomeMainHeadItem extends Vue {
  @Prop()
  protected data: any;
  protected bool = true;
  protected del () {
    alert('312312');
    this.bool = false;
  }
}
</script>
