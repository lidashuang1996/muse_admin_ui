<template>
  <div class="index" style="padding: 18px;">
    <div style="display: flex;">
      <IndexChart1 style="width: 66%; height: 500px;"></IndexChart1>
      <IndexChart2 style="width: 34%; height: 500px;"></IndexChart2>
    </div>
    <div style="display: flex;">
      <IndexChart3 style="width: 100%; height: 600px;"></IndexChart3>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IndexChart1 from './IndexChart1.vue';
import IndexChart2 from './IndexChart2.vue';
import IndexChart3 from './IndexChart3.vue';
@Component({
  components: { IndexChart3, IndexChart2, IndexChart1 }
})
export default class Index extends Vue {
}
</script>
