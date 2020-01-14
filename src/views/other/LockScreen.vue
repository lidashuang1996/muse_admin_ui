<template>
  <div class="lock-screen">
    <div class="lock-screen-content" @click="test()">
      <mu-text-field
        v-model="password"
        label="请输入解锁密码"
        label-float
        @focus="inputFocus"
        @keyup.enter.native="unlock"
        :error-text="passwordError"
        :action-icon="vPassword ? 'visibility_off' : 'visibility'"
        :action-click="passwordSwitchEvent"
        :type="vPassword ? 'text' : 'password'"/>
      <touch-ripple :speed="1" :opacity="0.3" color="#fff" transition="ease" style="width: 80px; margin-left: 24px;">
        <button class="lock-screen-button" @click.stop="unlock">解锁</button>
      </touch-ripple>
    </div>
  </div>
</template>

<script lang="ts">
import Cache from '../../utils/cache';
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class LockScreen extends Vue {
  protected password: string = ''; // 密码
  protected vPassword: boolean = false; // 密码显示的状态
  protected passwordError: string = ''; // 密码错误提示

  protected test () {
    Cache.setLockScreen('123456');
  }

  /**
   * 密码的显示和不显示切换
   */
  protected passwordSwitchEvent () {
    this.vPassword = !this.vPassword;
  }

  /**
   * 获取焦点时候清除错误提示
   */
  protected inputFocus () {
    this.passwordError = '';
  }

  protected unlock () {
    if (this.password === '') this.passwordError = '锁屏密码不能为空';
    else if (this.password.length < 5) this.passwordError = '锁屏密码长度不能小于5';
    else if (this.password.length > 24) this.passwordError = '锁屏密码长度不能大于24';
    else if (!/^[1-9a-zA-Z]{5,}$/.test(this.password)) this.passwordError = '锁屏密码由数字和字母组成';
    else {
      this.passwordError = '';
      if (!Cache.checkLockScreen(this.password)) this.passwordError = '锁屏密码错误';
    }
  }
}
</script>
