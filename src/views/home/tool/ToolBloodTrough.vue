<template>
  <div class="tool-blood-trough">
    <div class="tool-blood-trough-bg"></div>
    <span class="tool-blood-trough-num">100</span>
    <div class="tool-blood-trough-box progress">
      <div id="inner" class="progress-bar progress-bar-info progress-bar-striped active" style="width: 100%;"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Mutation } from 'vuex-class';
import { Component, Vue } from 'vue-property-decorator';
@Component({
})
export default class ToolBloodTrough extends Vue {
}
</script>
