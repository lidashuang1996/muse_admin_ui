<template>
  <div class="user-manage base-route">
    <div class="base-route-head">
      <mu-text-field v-model="table.search.content" label="ID/账号/名称/别名"/>
      <div ripple="ripple" class="base-route-button" @click.stop="searchUserData">搜 索</div>
      <div ripple="ripple" class="base-route-button" @click.stop="openCreateUser">新 增</div>
    </div>
    <mu-data-table :min-col-width="160"
                   :data="table.data"
                   :columns="table.columns"
                   :loading="table.status"
                   border>
      <template slot-scope="scope">
        <td class="is-center">{{scope.row.id}}</td>
        <td class="is-center" style="cursor: pointer; color: #3f7dfe;" @click.stop="openTableMessage('ROLE', scope.row._role)">
          {{scope.row._role.name}}
        </td>
        <td class="is-center" style="cursor: pointer; color: #4bae6d;" @click.stop="openTableMessage('GROUP', scope.row._group)">
          {{scope.row._group.name}}
        </td>
        <td class="is-center">{{scope.row.account}}</td>
        <td class="is-center">{{scope.row.name}}</td>
        <td class="is-center">{{scope.row.alias}}</td>
        <td class="is-center">{{scope.row.sex}}</td>
        <td class="is-center">{{scope.row.birthday}}</td>
        <td class="is-center">{{scope.row.operate}}</td>
        <td class="is-center">{{scope.row.createDate}}</td>
        <td class="is-center">{{scope.row.updateDate}}</td>
        <td class="is-center">
          <span style="color: #ff0000; cursor: pointer;" @click.stop="deleteUserData(scope.row.id)">删除</span>
          <span style="color: #3f7dfe; cursor: pointer; margin-left: 12px;" @click.stop="openUpdateUser(scope.row)">修改</span>
        </td>
      </template>
    </mu-data-table>
    <!--<mu-pagination raised-->
                   <!--class="base-route-bottom"-->
                   <!--@change="pagingChange"-->
                   <!--:total="table.total"-->
                   <!--:current.sync="table.page"-->
                   <!--:page-size.sync="table.size">-->
    <!--</mu-pagination>-->
    <div>
      <mu-snackbar :position="normal.position" :open.sync="normal.bool" :color="normal.color" >
        <span v-text="normal.message"/>
        <mu-button flat slot="action" color="#fff" @click="normal.bool = false">关闭</mu-button>
      </mu-snackbar>
      <mu-dialog width="420" :title="table.dialog.title" :open.sync="table.dialog.bool">
        <p v-html="table.dialog.content"/>
        <mu-button slot="actions" flat color="primary" @click.stop="table.dialog.bool = false">确定</mu-button>
      </mu-dialog>
      <mu-dialog width="560" :title="operate.create.title" :open.sync="operate.create.bool" :overlay-close="false">
        <div>
          <div style="display: flex;">
            <mu-text-field label-float :error-text="operate.create.input.accountError"
                           v-model="operate.create.input.account" label="账号" style="width: 100%;"/>
            <mu-text-field label-float :error-text="operate.create.input.passwordError" type="password"
                           v-model="operate.create.input.password" label="密码" style="width: 100%; margin-left: 20px;"/>
          </div>
          <div style="display: flex;">
            <mu-text-field label-float v-model="operate.create.input.name" label="名称" style="width: 100%;"/>
            <mu-text-field label-float v-model="operate.create.input.alias" label="别名"
                           style="width: 100%; margin-left: 20px;"/>
          </div>
          <div style="display: flex;">
            <mu-select label-float label="角色" :error-text="operate.create.input.roleError" v-model="operate.create.input.role" style="width: 100%;">
              <mu-option v-for="(item, index) in operate.data.role" :key="'USER_MANAGE_CREATE_ROLE_' + index"
                         :label="item.name" :value="item.id"/>
            </mu-select>
            <mu-select label-float label="安全组" :error-text="operate.create.input.groupError" v-model="operate.create.input.group" style="width: 100%; margin-left: 20px;">
              <mu-option v-for="(item, index) in operate.data.group" :key="'USER_MANAGE_CREATE_GROUP_' + index"
                         :label="item.name" :value="item.id"/>
            </mu-select>
          </div>
        </div>
        <mu-button slot="actions" flat @click="operate.create.bool = false">关闭</mu-button>
        <mu-button slot="actions" flat color="primary" @click="crateUserData">确定</mu-button>
      </mu-dialog>
      <mu-dialog width="420" :title="operate.update.title" :open.sync="operate.update.bool" :overlay-close="false">
        <div>
          <p v-text="'ID：' + operate.update.input.id"/>
          <p v-text="'名称：' + operate.update.input.name"/>
          <p v-text="'账号：' + operate.update.input.account"/>
          <mu-text-field label-float v-model="operate.update.input.alias" label="别名" style="width: 100%;"/>
          <mu-select label-float label="角色" :error-text="operate.update.input.roleError" v-model="operate.update.input.role" style="width: 100%;">
            <mu-option v-for="(item, index) in operate.data.role" :key="'USER_MANAGE_CREATE_GROUP_' + index"
                       :label="item.name" :value="item.id"/>
          </mu-select>
          <mu-select label-float label="安全组" :error-text="operate.update.input.groupError" v-model="operate.update.input.group" style="width: 100%;">
            <mu-option v-for="(item, index) in operate.data.group" :key="'USER_MANAGE_CREATE_GROUP_' + index"
                       :label="item.name" :value="item.id"/>
          </mu-select>
        </div>
        <mu-button slot="actions" flat @click.stop="operate.update.bool = false">关闭</mu-button>
        <mu-button slot="actions" flat color="primary" @click.stop="updateUserData">确定</mu-button>
      </mu-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import http from '../../../http/main';
import { Component, Vue } from 'vue-property-decorator';
@Component({
})
export default class UserManage extends Vue {
  protected table: Table<TableUserData, TableUserDataSearch> = {
    columns: [
      { title: 'ID', name: 'id', width: 170, align: 'center' },
      { title: '角色', name: 'role', width: 120, align: 'center' },
      { title: '安全组', name: 'group', width: 150, align: 'center' },
      { title: '账号', name: 'account', width: 150, align: 'center' },
      { title: '名称', name: 'name', align: 'center' },
      { title: '别名', name: 'alias', width: 120, align: 'center' },
      { title: '性别', name: 'sex', width: 60, align: 'center' },
      { title: '生日', name: 'birthday', width: 90, align: 'center' },
      { title: '操作人', name: 'operate', width: 170, align: 'center' },
      { title: '创建时间', name: 'createDate', width: 150, align: 'center' },
      { title: '更新时间', name: 'updateDate', width: 150, align: 'center' },
      { title: '功能', name: 'button', width: 100, align: 'center' }
    ],
    status: false,
    page: 1,
    size: 16,
    total: 1000,
    data: [],
    search: {
      content: ''
    },
    dialog: {
      bool: false,
      title: 'TABLE_DIALOG_TITLE',
      content: 'TABLE_DIALOG_CONTENT'
    }
  };
  protected normal = {
    color: 'success',
    position: 'bottom-end',
    message: '',
    bool: false,
    timeout: 3000
  };
  protected operate = {
    status: {
      role: 0,
      group: 0
    },
    data: {
      role: [],
      group: []
    },
    create: {
      title: '创建用户',
      bool: false,
      status: false,
      input: {
        account: '',
        accountError: '',
        password: '',
        passwordError: '',
        group: '',
        groupError: '',
        role: '',
        roleError: '',
        name: '',
        alias: ''
      }
    },
    update: {
      title: '修改用户',
      bool: false,
      status: false,
      input: {
        id: '',
        name: '',
        account: '',
        group: '',
        groupError: '',
        role: '',
        roleError: '',
        alias: ''
      }
    }
  };

  /**
   * vue 加载完成触发的事件
   */
  protected async mounted () {
    await this.initTableData();
  }

  /**
   * 初始化表格的数据
   */
  protected async initTableData () {
    let data: HttpUserParam = { page: this.table.page, size: this.table.size };
    if (this.table.search !== undefined && this.table.search.content !== '') data.content = this.table.search.content;
    this.table.status = true;
    const res: HttpUserResult = await http.apiUserQuery(data);
    this.table.status = false;
    if (res.code !== undefined && res.code != null) {
      if (res.code === 200) {
        console.log(res);
        this.table.data = res.data;
      } else this.$alert(res.message, '错误', {});
    } else this.$alert('网络异常，请稍后重试', '错误', {});
  }

  /**
   * 表格弹出框显示
   */
  protected openTableMessage (type: string, data: any) {
    switch (type) {
      case 'ROLE':
        this.table.dialog.title = '角色';
        this.table.dialog.content = `<p>角色ID：${data.id}</p>
          <p>角色名称：${data.name}</p>
          <p>角色描述：${data.describe == null ? '' : data.describe}</p>
          <p>创建时间：${data.createDate}</p>
          <p>更新时间：${data.updateDate}</p>
          <p>操作人：${data.operate}</p>`;
        break;
      case 'GROUP':
        this.table.dialog.title = '安全组';
        this.table.dialog.content = `<p>安全组ID：${data.id}</p>
          <p>安全组名称：${data.name}</p>
          <p>创建时间：${data.createDate}</p>
          <p>更新时间：${data.updateDate}</p>
          <p>操作人：${data.operate}</p>`;
        break;
    }
    this.table.dialog.bool = true;
  }

  /**
   * 搜索数据
   */
  protected async searchUserData () {
    await this.initTableData();
  }

  /**
   * 新增用户数据
   */
  protected async openCreateUser () {
    this.operate.create.bool = true;
    if (this.operate.status.role !== 0 || this.operate.status.group !== 0) return;
    this.operate.status.role = -1;
    this.operate.status.group = -1;
    // 获取角色 和 安全组的数据
    const res1 = await http.apiUserRoleQuery({});
    const res2 = await http.apiJurisdictionGroupQuery({});
    if (res1.code !== undefined && res1.code !== null && res1.code === 200) {
      this.operate.status.role = 1;
      this.operate.data.role = res1.data;
    } else this.operate.status.role = 0;
    if (res2.code !== undefined && res2.code !== null && res2.code === 200) {
      this.operate.status.group = 1;
      this.operate.data.group = res2.data;
    } else this.operate.status.group = 0;
  }

  protected async crateUserData () {
    let b1 = true;
    let b2 = true;
    let b3 = true;
    let b4 = true;
    if (this.operate.create.input.account === '') {
      b1 = false;
      this.operate.create.input.accountError = '账号不能为空';
    }
    if (b1 && (this.operate.create.input.account.length < 5 || this.operate.create.input.account.length > 24)) {
      b1 = false;
      this.operate.create.input.accountError = '账号长度为5-24位';
    }
    if (this.operate.create.input.password === '') {
      b2 = false;
      this.operate.create.input.passwordError = '密码不能为空';
    }
    if (b2 && (this.operate.create.input.password.length < 5 || this.operate.create.input.password.length > 24)) {
      b2 = false;
      this.operate.create.input.passwordError = '密码长度为5-24位';
    }
    if (this.operate.create.input.role === '') {
      b3 = false;
      this.operate.create.input.roleError = '角色不能为空';
    }
    if (this.operate.create.input.group === '') {
      b4 = false;
      this.operate.create.input.groupError = '安全组不能为空';
    }
    if (b1) this.operate.create.input.accountError = '';
    if (b2) this.operate.create.input.passwordError = '';
    if (b3) this.operate.create.input.roleError = '';
    if (b4) this.operate.create.input.groupError = '';
    if (b1 && b2 && b3 && b4 && !this.operate.create.status) {
      let data = {
        account: this.operate.create.input.account,
        password: this.operate.create.input.password,
        group: this.operate.create.input.group,
        role: this.operate.create.input.role
      };
      if (this.operate.create.input.name != null) data['name'] = this.operate.create.input.name;
      if (this.operate.create.input.alias != null) data['alias'] = this.operate.create.input.alias;
      this.operate.create.status = true;
      const res: HttpUserResult = await http.apiUserCreate(data);
      this.operate.create.status = false;
      if (res.code !== undefined && res.code !== null) {
        if (res.code === 200) {
          this.operate.create.input.account = '';
          this.operate.create.input.password = '';
          this.operate.create.input.group = '';
          this.operate.create.input.role = '';
          this.operate.create.input.name = '';
          this.operate.create.input.alias = '';
          this.operate.create.bool = false;
          this.normal.bool = true;
          this.normal.message = '用户创建成功！';
          setTimeout(() => { this.normal.bool = false; }, this.normal.timeout);
          await this.initTableData();
        } else this.$alert(res.message, '错误');
      } else this.$alert('网络异常，请稍后重试', '错误');
    }
  }

  protected async openUpdateUser (data: any) {
    this.operate.update.bool = true;
    this.operate.update.input.id = data.id;
    this.operate.update.input.name = data.name;
    this.operate.update.input.alias = data.alias;
    this.operate.update.input.role = data.role;
    this.operate.update.input.group = data.group;
    this.operate.update.input.account = data.account;
    if (this.operate.status.role !== 0 || this.operate.status.group !== 0) return;
    this.operate.status.role = -1;
    this.operate.status.group = -1;
    // 获取角色 和 安全组的数据
    const res1 = await http.apiUserRoleQuery({});
    const res2 = await http.apiJurisdictionGroupQuery({});
    if (res1.code !== undefined && res1.code !== null && res1.code === 200) {
      this.operate.status.role = 1;
      this.operate.data.role = res1.data;
    } else this.operate.status.role = 0;
    if (res2.code !== undefined && res2.code !== null && res2.code === 200) {
      this.operate.status.group = 1;
      this.operate.data.group = res2.data;
    } else this.operate.status.group = 0;
  }
  protected async updateUserData () {
    if (!this.operate.update.status) {
      let data = { id: this.operate.update.input.id, group: this.operate.update.input.group, role: this.operate.update.input.role };
      if (this.operate.update.input.alias != null) data['alias'] = this.operate.update.input.alias;
      this.operate.update.status = true;
      const res: HttpUserResult = await http.apiUserUpdate(data);
      this.operate.update.status = false;
      if (res.code != null && res.code !== undefined) {
        if (res.code === 200) {
          this.operate.update.input.id = '';
          this.operate.update.input.name = '';
          this.operate.update.input.group = '';
          this.operate.update.input.role = '';
          this.operate.update.input.alias = '';
          this.operate.update.bool = false;
          this.normal.bool = true;
          this.normal.message = '用户修改成功！';
          setTimeout(() => { this.normal.bool = false; }, this.normal.timeout);
          await this.initTableData();
        } else this.$alert(res.message, '错误', {});
      } else this.$alert('网络异常，请稍后重试', '错误', {});
    }
  }

  /**
   * 删除用户
   */
  protected deleteUserData (id: string) {
    this.$confirm('您确定要删除该用户吗？', '提示', {}).then(async ({ result }) => {
      if (result) {
        const res: HttpUserResult = await http.apiUserDelete({ id });
        if (res.code !== undefined && res.code !== null) {
          if (res.code === 200) {
            await this.initTableData();
            this.normal.bool = true;
            this.normal.message = '用户删除成功！';
            setTimeout(() => { this.normal.bool = false; }, this.normal.timeout);
          } else this.$alert(res.message, '错误', {});
        } else this.$alert('网络异常，请稍后重试', '错误', {});
      }
    });
  }
}
</script>
