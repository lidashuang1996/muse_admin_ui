<template>
  <div class="exhibition">
    {{content}}
  </div>
</template>

<script lang="ts">
/**
 * 显示工具插件的页面，读取ID进行交互
 */
import { Component, Vue } from 'vue-property-decorator';
import ToolTimeCurrent from '../home/tool/ToolTimeCurrent.vue';
import ToolTimeTimer from '../home/tool/ToolTimeTimer.vue';
import ToolTimeCountDown from '../home/tool/ToolTimeCountDown.vue';
import ToolBloodTrough from '../home/tool/ToolBloodTrough.vue';
@Component({
  components: { ToolBloodTrough, ToolTimeCountDown, ToolTimeTimer, ToolTimeCurrent }
})
export default class Exhibition extends Vue {
  protected config: any = null;

  protected content: any = '';

  protected name: (string | null) = null;

  protected isLoad: boolean = false;

  protected mounted () {
    const voucher = this.$route.query.id;
    if (voucher) {
      const ws = new WebSocket(`ws://192.168.0.102:5000/tool/socket?ROLE=USER&ID=${voucher}`);
      ws.onopen = (evt) => { // 绑定连接事件
        console.log('初始化-->', evt);
      };
      ws.onmessage = (evt) => { // 绑定收到消息事件
        console.log('收到消息:', evt);
        const res = JSON.parse(evt.data);
        this.content = res.data.config.content;
        if (res.data.type === 'CURRENT_TIME') {
          if (Number(res.data.config.format) === 12) {
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
        }
      };
      ws.onclose = (evt) => { // 绑定关闭或断开连接事件
        console.log('关闭/异常：', evt);
      };
    } else {
      alert('参数异常');
    }
  }
}
</script>
