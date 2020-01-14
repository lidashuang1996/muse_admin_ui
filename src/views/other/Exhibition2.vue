<template>
  <div class="exhibition2">
    <component :is="name" :config="config" v-if="name !== null && config !== null"/>
<!--    <ToolBloodTrough/>-->
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
export default class Exhibition2 extends Vue {
  protected config: any = null;

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
        if (!this.isLoad || res.type === 'CREATE') {
          if (res.data !== null && res.data.type !== null) {
            if (res.data.type === 'CURRENT_TIME') {
              this.name = 'ToolTimeCurrent';
              this.config = res.data.config;
            } else if (res.data.type === 'TIMER') {
              this.name = 'ToolTimeTimer';
              this.config = res.data.config;
            } else if (res.data.type === 'COUNT_DOWN') {
              this.name = 'ToolTimeCountDown';
              this.config = res.data.config;
            }
          }
          this.isLoad = true;
        } else {
          this.config = Object.assign({}, res.data.config);
          res.value.config = this.config;
          ws.send(JSON.stringify(res));
          console.log('发送', JSON.stringify(res));
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
