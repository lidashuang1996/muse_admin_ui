<template>
  <div class="home">
    <!-- 后台的全部页面 -->
    <HomeMain/>
  </div>
</template>

<script lang="ts">
import { Mutation } from 'vuex-class';
import HomeMain from './HomeMain.vue';
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: { HomeMain }
})
export default class Home extends Vue {
  // vuex 里面读取菜单
  @Mutation('menu') protected menu!: MenuStoreMutation;
  // vue 生命周期函数 created 创建菜单
  protected created () {
    // 在这里自定义菜单
    const list: MenuStore = [
      {
        name: 'index1',
        title: '首页',
        ico: { content: 'phonelink' }
      },
      {
        name: 'index2',
        title: '工作台',
        ico: { content: 'phonelink' },
        children: [
          {
            name: 'index3',
            title: '通知公告',
            ico: { content: 'mode_comment' }
          }
        ]
      },
      {
        name: 'index3',
        title: '我的事务',
        ico: {
          content: 'access_alarm'
        },
        children: [
          {
            name: 'index4',
            title: '发起事务',
            ico: { content: 'looks_one' }
          },
          {
            name: 'index5',
            title: '待签事务',
            ico: { content: 'looks_two' }
          },
          {
            name: 'index6',
            title: '待办事务',
            ico: { content: 'looks_3' }
          },
          {
            name: 'index7',
            title: '已发事务',
            ico: { content: 'looks_4' }
          },
          {
            name: 'index8',
            title: '办结事务',
            ico: { content: 'looks_5' }
          }
        ]
      },
      {
        name: 'index9',
        title: '系统监控',
        ico: {
          content: 'data_usage'
        },
        children: [
          {
            name: 'index10',
            title: '接口监控',
            ico: { content: 'settings_input_hdmi' }
          },
          {
            name: 'index11',
            title: 'ELK监控',
            ico: { content: 'nature_people' }
          },
          {
            name: 'index12',
            title: '日志监控',
            ico: { content: 'description' }
          }
        ]
      },
      {
        name: 'index13',
        title: '研发工具',
        ico: {
          content: 'extension'
        },
        children: [
          {
            name: 'index14',
            title: '对象存储',
            ico: { content: 'local_cafe' }
          }
        ]
      },
      {
        name: 'index15',
        title: '流程管理',
        ico: {
          content: 'access_alarm'
        },
        children: [
          {
            name: 'index16',
            title: '模型管理',
            ico: { content: 'shopping_cart' }
          },
          {
            name: 'index17',
            title: '流程部署',
            ico: { content: 'pets' }
          },
          {
            name: 'index1',
            title: '流程管理',
            ico: { content: 'event' }
          },
          {
            name: 'index2',
            title: '流程跟踪',
            ico: { content: 'touch_app' }
          }
        ]
      },
      {
        name: 'index3',
        title: '资源管理',
        ico: {
          content: 'language'
        },
        children: [
          {
            name: 'index4',
            title: '对象存储',
            ico: { content: 'local_cafe' }
          }
        ]
      },
      {
        name: 'index5',
        title: '权限管理',
        ico: {
          content: 'donut_small'
        },
        children: [
          {
            name: 'index6',
            title: '用户权限',
            ico: { content: 'account_circle' }
          },
          {
            name: 'index7',
            title: '接口权限',
            ico: { content: 'device_hub' }
          },
          {
            name: 'index8',
            title: '安全组权限',
            ico: { content: 'assessment' }
          }
        ]
      },
      {
        name: 'index9',
        title: '系统管理',
        ico: {
          content: 'build'
        },
        children: [
          {
            name: 'index10',
            title: '用户管理',
            ico: { content: 'account_box' }
          },
          {
            name: 'index11',
            title: '机构管理',
            ico: { content: 'group_work' }
          },
          {
            name: 'index12',
            title: '字典管理',
            ico: { content: 'dns' }
          },
          {
            name: 'index13',
            title: '菜单管理',
            ico: { content: 'store' }
          },
          {
            name: 'index14',
            title: '顶部管理',
            ico: { content: 'filter_list' }
          },
          {
            name: 'index15',
            title: '参数管理',
            ico: { content: 'cloud' }
          },
          {
            name: 'index16',
            title: '租户管理',
            ico: { content: 'nfc' }
          },
          {
            name: 'index17',
            title: '应用管理',
            ico: { content: 'stay_current_portrait' }
          }
        ]
      }
    ];
    // 初始化菜单数据
    this.menu(list);
  }
}
</script>
