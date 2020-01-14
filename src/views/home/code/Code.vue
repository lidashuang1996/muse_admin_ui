<template>
  <div class="code base-route">
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
  </div>
</template>

<script lang="ts">
import http from '../../../http/main';
import { Component, Vue } from 'vue-property-decorator';
@Component({
})
export default class Home extends Vue {
  protected table: Table<any, any> = {
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
    let data = { page: this.table.page, size: this.table.size };
    if (this.table.search.content !== '') data['content'] = this.table.search.content;
    this.table.status = true;
    const res: HttpUserResult = await http.apiUserQuery(data);
    this.table.status = false;
    if (res.code !== undefined && res.code !== null) {
      if (res.code === 200) {
        console.log(res);
        this.table.data = res.data;
      } else this.$alert(res.message, '错误');
    } else this.$alert('网络异常，请稍后重试', '错误');
  }
}
</script>
