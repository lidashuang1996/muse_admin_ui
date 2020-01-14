<template>
  <div class="tool-time-current">
    <div class="tool-time-current-content">
      <p v-text="content"/>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Watch, Vue
} from 'vue-property-decorator';
@Component({})
export default class ToolTimeCurrent extends Vue {
  /**
   * {
   *  type: 'CURRENT_TIME', 类型
   *  config: {
   *    format: 12, // 12 或者 24 配置文件
   * }
   */
  protected content: string = ''; // 显示内容的变量

  protected timeout: any = null;

  @Prop({ required: true })
  protected config!: TimeCurrentViewConfig; // 配置文件

  @Watch('config')
  protected onConfigChanged (a: TimeCurrentViewConfig, b: TimeCurrentViewConfig) {
    if (a.format !== b.format) {
      if (this.timeout !== null) clearTimeout(this.timeout);
      // 监听配置文件的变化，刷新界面
      this.initDate();
    }
  }

  // 初始化生命周期函数
  protected mounted () {
    this.initDate();
  }

  // 时间的初始化界面显示
  protected initDate () {
    const date = new Date();
    if (Number(this.config.format) === 12) {
      let hours;
      if (date.getHours() < 1) hours = '上午 12';
      else if (date.getHours() < 10) hours = `上午 0${date.getHours()}`;
      else if (date.getHours() < 12) hours = `上午 ${date.getHours()}`;
      else if (date.getHours() < 13) hours = '下午 12';
      else if (date.getHours() < 22) hours = `下午 0${date.getHours() - 12}`;
      else hours = `下午 ${date.getHours() - 12}`;
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
      this.content = `${hours}:${minutes}:${seconds}`;
    } else {
      const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
      this.content = `${hours}:${minutes}:${seconds}`;
    }
    this.timeout = setTimeout(() => { this.initDate(); }, 1000);
  }
}
</script>
