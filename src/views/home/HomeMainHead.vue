<template>
  <div class="home-main-head" :style="isMenuFold && 'padding-left: 78px;'">
    <!-- 头部的导航 -->
    <div class="home-main-head-nav">
      <!-- 头部的导航的内容 -->
      <div class="home-main-head-nav-content">
        <!-- 头部的导航的内容切换菜单列表按钮 -->
        <div class="home-main-head-nav-content-switch">
          <i class="material-icons" @click.stop="switchMenu">view_list</i>
        </div>
        <!-- 头部的导航的内容右边的菜单 -->
        <div class="home-main-head-nav-content-right">
          <!-- 通知 -->
          <div class="home-main-head-nav-content-right-notice">
            <mu-tooltip content="通知">
              <i class="material-icons" @click.stop="notice">notifications</i>
            </mu-tooltip>
          </div>
          <!-- 锁屏 -->
          <div class="home-main-head-nav-content-right-lock-screen">
            <mu-tooltip content="锁屏">
              <i class="material-icons" @click.stop="lockScreen">lock</i>
            </mu-tooltip>
          </div>
          <!-- 全屏 -->
          <div class="home-main-head-nav-content-right-full-screen">
            <mu-tooltip content="退出全屏" v-if="isFull">
              <i class="material-icons" @click.stop="handleFullScreen">fullscreen_exit</i>
            </mu-tooltip>
            <mu-tooltip content="全屏" v-else>
              <i class="material-icons" @click.stop="handleFullScreen">fullscreen</i>
            </mu-tooltip>
          </div>
          <!-- 用户 -->
          <div class="home-main-head-nav-content-right-user">
            <mu-menu placement="bottom-start" open-on-hover>
              <div class="home-main-head-nav-content-right-user-box">
                <mu-avatar size="42">
                  <img :src="avatarPath" alt="HOME_MAIN_HEAD_USER_IMG"/>
                </mu-avatar>
                <span class="home-main-head-nav-content-right-user-box-name" v-text="loginData.name"/>
              </div>
              <!-- 弹出的菜单的列表 -->
              <div slot="content" class="home">
                <div ripple="ripple" class="home-main-head-nav-content-right-user-nav" @click.stop="">
                  <i class="material-icons">account_circle</i>
                  <span>账号信息</span>
                </div>
                <div ripple="ripple" class="home-main-head-nav-content-right-user-nav" @click.stop="logout">
                  <i class="material-icons">close</i>
                  <span>退出登录</span>
                </div>
              </div>
            </mu-menu>
          </div>
        </div>
      </div>
    </div>
    <!-- 头部的菜单 -->
    <div class="home-main-head-menu">
      <div class="home-main-head-menu-content">
<!--        <HomeMainHeadItem class="home-main-head-menu-content-item-select"></HomeMainHeadItem>-->
<!--        <HomeMainHeadItem></HomeMainHeadItem>-->
<!--        <HomeMainHeadItem></HomeMainHeadItem>-->
<!--        <HomeMainHeadItem></HomeMainHeadItem>-->
<!--        <HomeMainHeadItem></HomeMainHeadItem>-->
<!--        <HomeMainHeadItem></HomeMainHeadItem>-->
<!--        <HomeMainHeadItem></HomeMainHeadItem>-->
<!--        <HomeMainHeadItem></HomeMainHeadItem>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import http from '../../http/main';
import Cache from '../../utils/cache';
import Config from '../../config/main';
import Screen from '../../utils/screen';
import Crypto from '../../utils/crypto';
import { State, Mutation } from 'vuex-class';
import { Component, Vue } from 'vue-property-decorator';
@Component({
})
export default class HomeMainHead extends Vue {
  // 读取 vuex 里面缓存的用户登录数据
  @State('login') protected loginData!: HttpLoginDataResult;
  @State('isMenuFold') protected isMenuFold!: boolean; // 菜单列表是否展开的状态
  @Mutation('isMenuFold') protected isMenuFoldMutation!: IsMenuFoldStoreMutation;
  // 是否为全屏
  protected isFull: boolean = false;
  // 用户图片地址
  protected avatarPath: string = Config.IMG_URL + this.loginData.avatar;

  /**
   * 读取是否为全屏
   */
  protected created () {
    this.isFull = Screen.init();
  }

  /**
   * 菜单切换
   */
  protected switchMenu () {
    this.isMenuFoldMutation();
  }

  /**
   * 通知的方法
   */
  protected notice () {
    this.$alert('通知模块暂未开启！', '通知', {});
  }

  /**
   * 锁屏的方法
   */
  protected lockScreen () {
    this.$prompt('请输入锁屏密码', '提示', {
      validator (value: (string | number)) {
        value = String(value);
        let valid = false;
        let message = '';
        if (value == null || value === '') message = '锁屏密码不能为空';
        else if (value.length < 5) message = '锁屏密码长度不能小于5';
        else if (value.length > 24) message = '锁屏密码长度不能大于24';
        else if (!/^(?!\d+$)[\da-zA-Z]+$/.test(value)) message = '锁屏密码由数字和字母组成';
        else { valid = true; message = ''; }
        return { valid, message };
      }
    }).then(({ result, value }) => {
      if (result) {
        // 写入本地密码
        Cache.setLockScreen({ pwd: Crypto.md5(String(value)) });
      }
    });
  }

  /**
   * 切换全屏的方法
   */
  protected handleFullScreen () {
    this.isFull = Screen.handleFullScreen();
  }

  /**
   * 退出登录
   */
  protected logout () {
    this.$confirm('您确定退出登录吗？', '提示', {}).then(async ({ result }) => {
      if (result) {
        const res: HttpLogoutResult = await http.apiLogout({ token: this.loginData.token });
        if (res.code === undefined) {
          this.$alert('网络异常，请稍后再试', '提示', {});
        } else if (res.code === 200) {
          Cache.clear().init(); // 清除缓存数据
        } else this.$alert(res.message, '提示', {});
      }
    });
  }
}
</script>
