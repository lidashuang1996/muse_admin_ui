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
                  <img :src="loginData.avatar" alt="HOME_MAIN_HEAD_USER_IMG"/>
                </mu-avatar>
                <span class="home-main-head-nav-content-right-user-box-name" v-text="loginData.name"/>
              </div>
              <!-- 弹出的菜单的列表 -->
              <div slot="content" class="home">
                <div class="home-main-head-nav-content-right-user-popup">
                  <touch-ripple :speed="1" :opacity="0.3" color="#000" transition="ease" class="home-main-head-nav-content-right-user-nav">
                    <i class="material-icons">account_circle</i>
                    <span>账号信息</span>
                  </touch-ripple>
                </div>
                <div class="home-main-head-nav-content-right-user-popup" @click.stop="logout()">
                  <touch-ripple :speed="1" :opacity="0.3" color="#000" transition="ease" class="home-main-head-nav-content-right-user-nav" >
                    <i class="material-icons">close</i>
                    <span>退出登录</span>
                  </touch-ripple>
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
        <HomeMainHeadItem :data="pData2" class="home-main-head-menu-content-item-select"/>
        <HomeMainHeadItem :data="pData1"/>
        <HomeMainHeadItem :data="pData2"/>
        <HomeMainHeadItem :data="pData2"/>
        <HomeMainHeadItem :data="pData1"/>
        <HomeMainHeadItem :data="pData1"/>
        <HomeMainHeadItem :data="pData1"/>
        <HomeMainHeadItem :data="pData1"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import http from '../../http/main';
import Cache from '../../utils/cache';
import Screen from '../../utils/screen';
import { State, Mutation } from 'vuex-class';
import { Component, Vue } from 'vue-property-decorator';
import HomeMainHeadItem from './HomeMainHeadItem.vue';
@Component({
  components: { HomeMainHeadItem }
})
export default class HomeMainHead extends Vue {
  // 读取 vuex 里面缓存的用户登录数据
  @State('login') protected loginData!: HttpLoginDataResult;
  @State('isMenuFold') protected isMenuFold!: boolean; // 菜单列表是否展开的状态
  @Mutation('isMenuFold') protected isMenuFoldMutation!: IsMenuFoldStoreMutation;
  protected isFull: boolean = false; // 是否为全屏
  protected pData1: any = {
    bool: true,
    name: '理想我们'
  };
  protected pData2: any = {
    bool: false,
    name: '李大双'
  };
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
        else if (!/^[1-9a-zA-Z]{5,}$/.test(value)) message = '锁屏密码由数字或字母组成';
        else { valid = true; message = ''; }
        return { valid, message };
      }
    }).then(({ result, value }) => {
      if (result) {
        Cache.setLockScreen(String(value)).init(); // 写入本地密码
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
        Cache.logout().init(); // 清除缓存数据
        await http.apiLogout({ token: this.loginData.token });
      }
    });
  }
}
</script>
