<template>
  <div class="tool-time-timer">
    <div class="tool-time-timer-content">
      <p v-text="content"/>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Watch, Vue
} from 'vue-property-decorator';
@Component({})
export default class ToolTimeTimer extends Vue {
  /**
   * {
   *  type: 'TIMER',
   *  config: {
   *    mode: 'NUM', // TIME / NUM
   *    status: 'start', // 状态 --> 开始 start  暂停 suspend  清除 clean
   *  }
   * }
   */
  protected content: string = ''; // 显示内容的变量

  protected dateTime: number = 0;

  protected numTime: number = 0;

  protected timeout: any = null;

  @Prop({ required: true })
  protected config!: TimeTimerViewConfig; // 配置文件

  @Watch('config')
  protected onConfigChanged (a: TimeTimerViewConfig, b: TimeTimerViewConfig) {
    if (a.status !== b.status) {
      if (this.timeout !== null) clearTimeout(this.timeout);
      this.initDate();
    } else if (a.mode !== b.mode && a.status === 'SUSPEND') {
      if (this.config.mode === 'TIME') {
        const hours = Math.floor(Number(this.numTime / 3600));
        const minutes = Math.floor(Number((this.numTime / 60) % 60));
        const seconds = Math.floor(Number(this.numTime % 60));
        const hoursString = hours < 10 ? `0${hours}` : hours.toString();
        const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString();
        const secondsString = seconds < 10 ? `0${seconds}` : seconds.toString();
        this.content = `${hoursString}:${minutesString}:${secondsString}`;
      } else this.content = this.numTime.toString();
    }
  }

  // 初始化生命周期函数
  protected mounted () {
    this.initDate();
  }

  // 时间的初始化界面显示
  protected initDate () {
    if (this.dateTime === 0) this.dateTime = new Date().getTime();
    if (this.config.status === 'START') {
      const variable = Math.floor((new Date().getTime() - this.dateTime) / 1000) + this.numTime;
      if (this.config.mode === 'TIME') {
        const hours = Math.floor(Number(variable / 3600));
        const minutes = Math.floor(Number((variable / 60) % 60));
        const seconds = Math.floor(Number(variable % 60));
        const hoursString = hours < 10 ? `0${hours}` : hours.toString();
        const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString();
        const secondsString = seconds < 10 ? `0${seconds}` : seconds.toString();
        this.content = `${hoursString}:${minutesString}:${secondsString}`;
      } else this.content = variable.toString();
      this.timeout = setTimeout(() => { this.initDate(); }, 1000);
    } else if (this.config.status === 'SUSPEND') {
      this.numTime = Math.floor((new Date().getTime() - this.dateTime) / 1000) + this.numTime;
      if (this.config.mode === 'TIME') {
        const hours = Math.floor(Number(this.numTime / 3600));
        const minutes = Math.floor(Number((this.numTime / 60) % 60));
        const seconds = Math.floor(Number(this.numTime % 60));
        const hoursString = hours < 10 ? `0${hours}` : hours.toString();
        const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString();
        const secondsString = seconds < 10 ? `0${seconds}` : seconds.toString();
        this.content = `${hoursString}:${minutesString}:${secondsString}`;
      } else this.content = this.numTime.toString();
      this.dateTime = 0;
    } else {
      this.numTime = 0;
      this.dateTime = 0;
      if (this.config.mode === 'TIME') this.content = '00:00:00';
      else this.content = '0';
    }
  }
}
</script>
