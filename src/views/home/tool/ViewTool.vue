<template>
  <div class="view-tool">
    <div class="view-tool-title">
      <p>视图工具控制台</p>
    </div>
    <div class="view-tool-create">
      <mu-select :label="select.label" v-model="select.value" class="view-tool-create-select">
        <mu-option v-for="(item, index) in select.options"
                   :key="'VIEW_TOOL_SELECT_OPTION_' + index"
                   :label="item.label" :value="item.value"/>
      </mu-select>
      <div ripple="VIEW_TOOL_SELECT_BUTTON" class="view-tool-create-button" @click.stop="create">创建</div>
    </div>
    <div class="view-tool-create-box">
      <div v-show="select.value === 'CURRENT_TIME'">
        <div class="view-tool-create-box-title"><p>工具名称：当前时间工具</p></div>
        <div style="display: flex; align-items: center;">
          <div class="view-tool-create-box-title"><p>工具配置：</p></div>
          <div>
            <mu-text-field v-model="config.CURRENT_TIME.name" label="名称"/>
            <mu-select label="时间格式" v-model="config.CURRENT_TIME.format" style="margin-left: 18px;">
              <mu-option label="12小时制" value="12"/>
              <mu-option label="24小时制" value="24"/>
            </mu-select>
          </div>
        </div>
      </div>
      <div v-show="select.value === 'TIMER'">
        <div class="view-tool-create-box-title"><p>工具名称：计时器工具</p></div>
        <div style="display: flex; align-items: center;">
          <div class="view-tool-create-box-title"><p>工具配置：</p></div>
          <div>
            <mu-text-field v-model="config.TIMER.name" label="名称"/>
            <mu-select label="时间格式" v-model="config.TIMER.mode" style="margin-left: 18px;">
              <mu-option label="数字格式" value="NUM"/>
              <mu-option label="时间格式" value="TIME"/>
            </mu-select>
            <mu-select label="状态" v-model="config.TIMER.status" style="margin-left: 18px;">
              <mu-option label="开始" value="START"/>
              <mu-option label="暂停" value="SUSPEND"/>
              <mu-option label="原点" value="ORIGIN"/>
            </mu-select>
          </div>
        </div>
      </div>
      <div v-show="select.value === 'COUNT_DOWN'">
        <div class="view-tool-create-box-title"><p>工具名称：倒计时工具</p></div>
        <div style="display: flex; align-items: center;">
          <div class="view-tool-create-box-title"><p>工具配置：</p></div>
          <div>
            <mu-text-field v-model="config.COUNT_DOWN.name" label="名称"/>
            <mu-select label="时间格式" v-model="config.COUNT_DOWN.mode" style="margin-left: 18px;">
              <mu-option label="数字格式" value="NUM"/>
              <mu-option label="时间格式" value="TIME"/>
            </mu-select>
            <mu-select label="状态" v-model="config.COUNT_DOWN.status" style="margin-left: 18px;">
              <mu-option label="开始" value="START"/>
              <mu-option label="暂停" value="SUSPEND"/>
              <mu-option label="归零" value="CLEAN"/>
            </mu-select>
            <mu-select label="类型" v-model="config.COUNT_DOWN.type" style="margin-left: 18px;">
              <mu-option label="倒计时" value="PUSH_AHEAD"/>
              <mu-option label="倒计时到某个时刻" value="PUSH_BACK"/>
            </mu-select>
            <mu-text-field v-show="config.COUNT_DOWN.type === 'PUSH_AHEAD'" v-model="config.COUNT_DOWN.value" label="倒计时时间" style="margin-left: 18px;"/>
            <mu-date-input v-show="config.COUNT_DOWN.type === 'PUSH_BACK'" v-model="config.COUNT_DOWN.valueDateTime" label="倒计时时间" type="dateTime" style="margin-left: 18px;"/>
          </div>
        </div>
      </div>
      <div v-show="select.value === 'BLOOD_TROUGH'">
        <div class="view-tool-create-box-title"><p>工具名称：人物血条工具</p></div>
        <div style="display: flex; align-items: center;">
          <div class="view-tool-create-box-title"><p>工具配置：</p></div>
          <div>
            <mu-text-field v-model="config.BLOOD_TROUGH.name" label="名称"/>
            <mu-text-field v-model="config.BLOOD_TROUGH.num" label="血量" style="margin-left: 18px;"/>
            <mu-text-field v-model="config.BLOOD_TROUGH.path" label="图片地址" style="margin-left: 18px;"/>
          </div>
        </div>
      </div>
    </div>
    <template v-for="(item) in update">
      <div class="view-tool-update-box" :key="'VIEW_TOOL_UPDATE_' + item.id">
        <ToolTimeCurrent :data="item" @update="sendMessage"/>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Crypto from '../../../utils/crypto';
import ToolSocket from '../../../socket/tool';
import { Component, Vue } from 'vue-property-decorator';
import ToolTimeCurrent from './ToolTimeCurrent.vue';
@Component({
  components: { ToolTimeCurrent }
})
export default class ViewTool extends Vue {
  protected select: any = {
    value: 'CURRENT_TIME',
    label: '视图工具',
    options: [
      {
        label: '当前时间工具',
        value: 'CURRENT_TIME'
      },
      {
        label: '倒计时工具',
        value: 'COUNT_DOWN'
      },
      {
        label: '计时器工具',
        value: 'TIMER'
      },
      {
        label: '人物血条工具',
        value: 'BLOOD_TROUGH'
      }
    ]
  };
  protected config: any = {
    CURRENT_TIME: {
      name: '',
      format: '12',
      content: ''
    },
    COUNT_DOWN: {
      name: '',
      type: 'PUSH_AHEAD',
      mode: 'NUM',
      value: 0,
      status: 'SUSPEND',
      valueDateTime: ''
    },
    TIMER: {
      name: '',
      mode: 'NUM',
      status: 'START'
    },
    BLOOD_TROUGH: {
      name: '',
      num: 100,
      path: ''
    }
  };
  protected update: any = [];

  protected mounted () {
    ToolSocket.getInstance((message: string) => {
      const list = JSON.parse(message);
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (item.type === 'CREATE') {
          for (let j = 0; j < this.update.length; j++) {
            if (item.id === this.update[j].id) return;
          }
          item.type = 'OPERATION';
          item.value = JSON.parse(JSON.stringify(item.data));
          this.update.push(item);
        } else if (item.type === 'OPERATION') {
          for (let j = 0; j < this.update.length; j++) {
            if (item.id === this.update[j].id) {
              this.update[j].data.config = item.data.config;
              this.update[j].value = item.value;
              return;
            }
          }
          item.type = 'OPERATION';
          item.value = JSON.parse(JSON.stringify(item.data));
          this.update.push(item);
        } else if (item.type === 'DELETE') {
          for (let j = 0; j < this.update.length; j++) {
            if (item.id === this.update[j].id) {
              this.update.splice(j, 1);
            }
          }
        }
      }
    }).connectAdmin();
  }
  protected create () {
    let data = null;
    switch (this.select.value) {
      case 'CURRENT_TIME':
        data = { config: this.config.CURRENT_TIME, type: 'CURRENT_TIME' };
        break;
      case 'COUNT_DOWN':
        data = { config: this.config.COUNT_DOWN, type: 'COUNT_DOWN' };
        break;
      case 'TIMER':
        data = { config: this.config.TIMER, type: 'TIMER' };
        break;
      case 'BLOOD_TROUGH':
        data = { config: this.config.BLOOD_TROUGH, type: 'BLOOD_TROUGH' };
        break;
    }
    const uuid = Crypto.uuid();
    const json = JSON.stringify({ id: uuid, type: 'CREATE', data: data });
    ToolSocket.getInstance().sendMessage(json);
    this.$alert('http://192.168.0.102:8080/#/exhibition?id=' + uuid, '提示', {});
  }
  protected sendMessage (c: string) {
    ToolSocket.getInstance().sendMessage(c);
  }
}
</script>
