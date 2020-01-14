<template>
  <div class="tool-time-count-down">
    <div class="tool-time-count-down-content">
      <p v-text="content"/>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch
} from 'vue-property-decorator';
@Component({
})
export default class ToolTimeCountDown extends Vue {
  /**
   * type: 'COUNT_DOWN',
   * config: {
   *   mode: 'NUM', // TIME / NUM
   *   type: 'PUSH_BACK', // Push ahead / Push back
   *   value: 10, // 倒计时时间 单位 S
   *   status: '开始 START、暂停suspend、回到原点origin', // 状态  开始 暂停 回到原点 （PUSH_BACK不会回到原点 只能开始，暂停）
   *   valueDateTime: 1576658323, // 到的时间
   * }
   */
  protected content: string = ''; // 显示内容的变量

  protected value: number = -1;

  protected timeout: any = null;

  @Prop({ required: true })
  protected config!: TimeCountDownViewConfig; // 配置文件

  @Watch('config')
  protected onConfigChanged (a: TimeCountDownViewConfig, b: TimeCountDownViewConfig) {
    if (a.value !== b.value) this.value = -1;
    if (a.value !== b.value || a.status !== b.status || a.valueDateTime !== b.valueDateTime || a.type !== b.type || a.mode !== b.mode) {
      this.initDate();
    }
  }

  // 初始化生命周期函数
  protected mounted () {
    this.initDate();
  }

  // 时间的初始化界面显示
  protected initDate () {
    if (this.config.type === 'PUSH_BACK') {
      const difference = Number(Math.floor(Number((new Date(String(this.config.valueDateTime)).getTime() - new Date().getTime()) / 1000)));
      if (difference <= 0) { this.content = ''; return; }
      if (this.config.mode === 'TIME') {
        const hours = Math.floor(Number(difference / 3600));
        const minutes = Math.floor(Number((difference / 60) % 60));
        const seconds = Math.floor(Number(difference % 60));
        const hoursString = hours < 10 ? `0${hours}` : hours.toString();
        const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString();
        const secondsString = seconds < 10 ? `0${seconds}` : seconds.toString();
        this.content = `${hoursString}:${minutesString}:${secondsString}`;
      } else this.content = difference.toString();
      if (this.config.status === 'START') this.timeout = setTimeout(() => { this.initDate(); }, 1000);
      else if (this.timeout !== null) clearTimeout(this.timeout);
    } else {
      if (this.value === 0) { this.content = ''; return; }
      if (this.value === -1) this.value = Math.floor(Number(this.config.value));
      if (this.config.mode === 'TIME') {
        const hours = Math.floor(Number(this.value / 3600));
        const minutes = Math.floor(Number((this.value / 60) % 60));
        const seconds = Math.floor(Number(this.value % 60));
        const hoursString = hours < 10 ? `0${hours}` : hours.toString();
        const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString();
        const secondsString = seconds < 10 ? `0${seconds}` : seconds.toString();
        this.content = `${hoursString}:${minutesString}:${secondsString}`;
      } else this.content = this.value.toString();
      if (this.config.status === 'START') {
        if (this.timeout !== null) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.value = this.value - 1;
          this.initDate();
        }, 1000);
      } else if (this.config.status === 'ORIGIN') {
        if (this.timeout !== null) clearTimeout(this.timeout);
        this.value = Number(this.config.value);
        if (this.config.mode === 'TIME') {
          const hours = Math.floor(Number(this.value / 3600));
          const minutes = Math.floor(Number((this.value / 60) % 60));
          const seconds = Math.floor(Number(this.value % 60));
          const hoursString = hours < 10 ? `0${hours}` : hours.toString();
          const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString();
          const secondsString = seconds < 10 ? `0${seconds}` : seconds.toString();
          this.content = `${hoursString}:${minutesString}:${secondsString}`;
        } else this.content = this.value.toString();
      } else if (this.timeout !== null) clearTimeout(this.timeout);
    }
  }
}
</script>
