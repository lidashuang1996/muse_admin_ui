<template>
  <div class="login">
    <div class="login-content">
      <div class="login-content-logo">ZZ-WMS
      </div>
      <div class="login-content-division"></div>
      <div class="login-content-input">
        <div class="l-title">登 录</div>
        <mu-text-field class="l-input"
                       v-model="iAccount"
                       label-float
                       @focus="inputFocusEvent('ACCOUNT')"
                       @keyup.enter.native="loginEvent"
                       label="邮箱/手机号码"
                       :error-text="eAccount"/>
        <mu-text-field class="l-input"
                       v-model="iPassword"
                       label="密码"
                       label-float
                       @focus="inputFocusEvent('PASSWORD')"
                       @keyup.enter.native="loginEvent"
                       :error-text="ePassword"
                       :action-icon="vPassword ? 'visibility_off' : 'visibility'"
                       :action-click="passwordSwitchEvent"
                       :type="vPassword ? 'text' : 'password'"/>
        <div class="l-button-load" v-if="buttonLoad">
          <svg width="34" height="34" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
            <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50" transform="rotate(189.422 50 50)">
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50"
                                to="360 50 50" repeatCount="indefinite"/>
            </path>
          </svg>
          登录中 ...
        </div>
        <div class="l-button" @click.stop="loginEvent" v-else>
          <touch-ripple :speed="1" :opacity="0.3" color="#fff" transition="ease">
            <span>登 录</span>
          </touch-ripple>
        </div>
        <div class="l-other">
          <p class="l-other-title"><span>其它方式登录</span></p>
          <ul class="l-other-nav">
            <li @click.stop="otherLoginEvent('扫码登录')">
              <i>
               <svg viewBox="0 0 1024 1024" width="28" height="28" fill="#a9a9a9" class="nav1">
                 <path
                   d="M281.6 25.6h-192c-12.8 0-25.6 12.8-25.6 25.6v179.2c0 12.8 12.8 25.6 25.6 25.6s25.6-12.8 25.6-25.6V83.2h160c12.8 0 25.6-12.8 25.6-25.6S294.4 25.6 281.6 25.6zM928 25.6h-179.2c-12.8 0-25.6 12.8-25.6 25.6s12.8 25.6 25.6 25.6h160v160c0 12.8 12.8 25.6 25.6 25.6s25.6-12.8 25.6-25.6V51.2c-6.4-12.8-19.2-25.6-32-25.6zM928 691.2c-12.8 0-25.6 12.8-25.6 25.6v160h-160c-12.8 0-25.6 12.8-25.6 25.6s12.8 25.6 25.6 25.6h179.2c12.8 0 25.6-12.8 25.6-25.6v-179.2c6.4-19.2-6.4-32-19.2-32zM275.2 876.8H121.6v-160c0-12.8-12.8-25.6-25.6-25.6s-32 12.8-32 25.6V896c0 12.8 12.8 25.6 25.6 25.6h179.2c12.8 0 25.6-6.4 25.6-25.6 0-12.8-12.8-19.2-19.2-19.2z"/>
                 <path
                   d="M198.4 172.8v620.8H832V172.8H198.4z m512 339.2H320c-25.6 0-38.4-12.8-38.4-38.4s12.8-38.4 38.4-38.4h390.4c25.6 0 38.4 12.8 38.4 38.4s-25.6 38.4-38.4 38.4z"/></svg>
              </i>
            </li>
            <li @click.stop="otherLoginEvent('微信登陆')">
              <i>
                <svg viewBox="0 0 1024 1024" width="30" height="30" fill="#a9a9a9" class="nav2">
                  <path
                    d="M684.327322 267.607874c10.295484 0 20.419052 0.780783 30.601972 1.898233C687.515944 141.847635 551.073412 47.02399 395.27095 47.02399c-174.151365 0-316.802296 118.652354-316.802296 269.418103 0 86.992283 47.438429 158.431336 126.767172 213.925231l-31.665187 95.272877 110.765733-55.494918c39.60809 7.776104 71.383794 15.833617 110.935602 15.833617 9.956769 0 19.804045-0.447185 29.538757-1.172709-6.154163-21.204951-9.788947-43.35953-9.788947-66.462714C415.074995 379.937219 533.898241 267.607874 684.327322 267.607874L684.327322 267.607874zM514.039961 181.733041c23.943318 0 39.663348 15.72003 39.663348 39.552831 0 23.717168-15.717983 39.60809-39.663348 39.60809-23.667026 0-47.495734-15.889899-47.495734-39.60809C466.544227 197.397812 490.317677 181.733041 514.039961 181.733041L514.039961 181.733041zM292.337603 260.892939c-23.77652 0-47.721885-15.889899-47.721885-39.60809 0-23.832801 23.944342-39.552831 47.721885-39.552831 23.772426 0 39.552831 15.664771 39.552831 39.552831C331.891458 245.00304 316.111053 260.892939 292.337603 260.892939L292.337603 260.892939zM973.550493 514.537799c0-126.655631-126.766149-229.870388-269.14181-229.870388-150.761656 0-269.419126 103.271038-269.419126 229.870388 0 126.991276 118.712729 229.866295 269.419126 229.866295 31.55467 0 63.383586-7.887644 95.05082-15.8285l86.87665 47.659463-23.832801-79.209016C926.110017 649.244804 973.550493 585.975828 973.550493 514.537799L973.550493 514.537799zM617.027543 474.873428c-15.717983 0-31.66314-15.663748-31.66314-31.665187 0-15.775288 15.945157-31.659047 31.66314-31.659047 24.056905 0 39.665395 15.884782 39.665395 31.659047C656.691915 459.20968 641.083425 474.873428 617.027543 474.873428L617.027543 474.873428zM791.289426 474.873428c-15.608489 0-31.492248-15.663748-31.492248-31.665187 0-15.775288 15.830547-31.659047 31.492248-31.659047 23.832801 0 39.664372 15.884782 39.664372 31.659047C830.952774 459.20968 815.122227 474.873428 791.289426 474.873428L791.289426 474.873428z"/></svg>
              </i>
            </li>
            <li @click.stop="otherLoginEvent('QQ登录')">
              <i>
                <svg viewBox="0 0 1024 1024" width="28" height="28" fill="#a9a9a9" class="nav3">
                  <path
                    d="M116.435 593.714c-33.54 78.964-38.985 154.297-12.059 168.37 18.572 9.696 47.686-12.382 74.936-52.909 10.791 44.157 37.493 84.137 75.633 116.21-40.004 14.768-66.135 38.886-66.135 66.232 0 44.954 70.709 81.302 157.978 81.302 78.716 0 143.907-29.538 155.94-68.371 3.232-0.049 15.663-0.049 18.796 0 12.083 38.784 77.324 68.371 155.989 68.371 87.267 0 157.978-36.398 157.978-81.302 0-27.297-26.105-51.464-66.135-66.232 38.089-32.123 64.889-72.053 75.631-116.21 27.251 40.527 56.29 62.605 74.887 52.909 26.95-14.073 21.631-89.456-12.032-168.37-26.355-62.058-62.11-107.754-89.457-117.848 0.398-3.929 0.596-7.958 0.596-11.935 0-23.968-6.661-46.146-18.049-64.196 0.199-1.393 0.199-2.834 0.199-4.227 0-11.038-2.636-21.381-7.114-30.332-6.909-161.309-111.93-289.402-281.866-289.402-170.036 0-275.106 128.093-281.943 289.402-4.525 9.001-7.135 19.343-7.135 30.332 0 1.393 0.099 2.835 0.15 4.227-11.288 18.05-17.951 40.178-17.951 64.196 0 3.978 0.15 7.955 0.498 11.935-27.151 10.094-63.028 55.841-89.333 117.848z"/></svg>
              </i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import http from '../../http/main';
import Cache from '../../utils/cache';
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class Login extends Vue {
  // 账号
  protected iAccount: string = '';
  // 账号错误提示
  protected eAccount: string = '';
  // 密码
  protected iPassword: string = '';
  // 密码错误提示
  protected ePassword: string = '';
  // 密码是否显示
  protected vPassword: boolean = false;
  // 登录按钮加载中的的状态
  protected buttonLoad: boolean = false;

  /**
   * 密码显示切换的事件
   */
  protected passwordSwitchEvent () {
    this.vPassword = !this.vPassword;
  }

  /**
   * 输入框的获取焦点事件---> 删除错误提示
   */
  protected inputFocusEvent (name: string) {
    switch (name) {
      case 'ACCOUNT':
        if (this.eAccount !== '') this.eAccount = '';
        break;
      case 'PASSWORD':
        if (this.ePassword !== '') this.ePassword = '';
        break;
    }
  }

  /**
   * 登录触发的事件
   */
  protected async loginEvent () {
    if (this.buttonLoad) return; // 防止重复提交
    let aBool: boolean = true;
    let pBool: boolean = true;
    let account: string = this.iAccount;
    let password: string = this.iPassword;
    if (account === '') { this.eAccount = '账号不能为空'; aBool = false; }
    if (aBool && account.length < 5) { this.eAccount = '账号长度不能短于5位'; aBool = false; }
    if (aBool && account.length > 24) { this.eAccount = '账号长度不能长于24位'; aBool = false; }
    if (password === '') { this.ePassword = '密码不能为空'; pBool = false; }
    if (pBool && password.length < 5) { this.ePassword = '密码长度不能短于5位'; pBool = false; }
    if (pBool && password.length > 24) { this.ePassword = '密码长度不能长于24位'; pBool = false; }
    if (aBool) { this.eAccount = ''; }
    if (pBool) { this.ePassword = ''; }
    if (!aBool || !pBool) return;
    this.buttonLoad = true; // 按钮加载中
    const res: HttpLoginResult = await http.apiLogin({ account, password }); // 发送请求
    this.buttonLoad = false; // 按钮关闭加载中
    if (res.code == null) this.$alert('网络异常，请稍后再试', '提示', {});
    else if (res.code === 200) Cache.setUser(res.data).init(); // 写入到缓存且初始化数据
    else this.$alert(res.message, '提示', {});
  }

  /**
   * 其他登录方式出发的事件
   */
  protected otherLoginEvent (name: string) {
    this.$toast.info(`${name} 暂未开放`);
  }
}
</script>
