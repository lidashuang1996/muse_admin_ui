<template>
  <div class="tool-time-current">
    <p>id: {{data.id}}</p>
    <p>http://192.168.0.102:8080/#/exhibition?id={{data.id}}</p>
    <p>配置：{{data.data.config}}</p>
    <p>显示：{{content}}</p>
    <div>
      <div>
        <label>
          格式：
        </label>
        <label>
          <select v-model="config.format">
            <option value="12">12小时制</option>
            <option value="24">24小时制</option>
          </select>
        </label>
      </div>
      <div><button @click.stop="update">修改</button></div>
    </div>

  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Watch, Vue
} from 'vue-property-decorator';
@Component({})
export default class ToolTimeCurrent extends Vue {
  protected content: string = ''; // 显示内容的变量
  protected timeout: any = null;
  @Prop({ required: true })
  protected data!: any; // 配置文件
  protected config: any = JSON.parse(JSON.stringify(this.data.data.config));

  @Watch('config')
  protected onConfigChanged (a: any, b: any) {
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
    if (Number(this.data.data.config.format) === 12) {
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
    this.timeout = setTimeout(() => {
      this.initDate();
      this.data.data.config.content = this.content;
      this.$emit('update', JSON.stringify(this.data));
    }, 1000);
  }

  protected update () {
    this.data.data.config = this.config;
    this.data.data.config.content = this.content;
    this.$emit('update', JSON.stringify(this.data));
  }
}
</script>
