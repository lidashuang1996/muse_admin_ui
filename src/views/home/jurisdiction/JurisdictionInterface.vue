<template>
  <div class="jurisdiction-interface">
    <div class="jurisdiction-interface-head">
      <mu-text-field v-model="value" label="接口名称"></mu-text-field>
      <mu-text-field v-model="value" label="接口路径" style="margin-left: 32px;"></mu-text-field>
      <div ripple="ripple" class="jurisdiction-interface-head-button">搜 索</div>
      <div ripple="ripple" class="jurisdiction-interface-head-button">新 增</div>
    </div>
    <mu-data-table :min-col-width="200"
                   :data="table.data"
                   :sort.sync="sort"
                   :columns="columns"
                   :loading="table.status"
                   @sort-change="handleSortChange"
                   border>
    </mu-data-table>
    <div class="jurisdiction-interface-bottom">
      <mu-pagination raised
                     @change="pagingChange"
                     :total="table.total"
                     :current.sync="table.page"
                     :page-size.sync="table.size"></mu-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import http from '../../../http/main';
import { Component, Vue } from 'vue-property-decorator';

@Component()
export default class JurisdictionInterface extends Vue {
  protected value = '';
  protected sort = {
    name: '',
    order: 'asc'
  };
  protected columns = [
    { title: 'ID', name: 'id', width: 200, align: 'center', sortable: true },
    { title: '接口名称', name: 'name', width: 150, align: 'center' },
    { title: '接口路径', name: 'path', align: 'center' },
    { title: '操作人', name: 'operate', width: 150, align: 'center' },
    { title: '创建时间', name: 'createDate', width: 190, align: 'center', sortable: true },
    { title: '更新时间', name: 'updateDate', width: 190, align: 'center', sortable: true }
  ];
  protected list2 = [
    {
      name: 'Frozen Yogurt',
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: 1
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
      iron: 1
    },
    {
      name: 'Eclair',
      calories: 262,
      fat: 16.0,
      carbs: 23,
      protein: 6.0,
      iron: 7
    },
    {
      name: 'Cupcake',
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
      iron: 8
    },
    {
      name: 'Gingerbread',
      calories: 356,
      fat: 16.0,
      carbs: 49,
      protein: 3.9,
      iron: 16
    },
    {
      name: 'Jelly bean',
      calories: 375,
      fat: 0.0,
      carbs: 94,
      protein: 0.0,
      iron: 0
    },
    {
      name: 'Lollipop',
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
      iron: 2
    },
    {
      name: 'Honeycomb',
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
      iron: 45
    },
    {
      name: 'Donut',
      calories: 452,
      fat: 25.0,
      carbs: 51,
      protein: 4.9,
      iron: 22
    },
    {
      name: 'KitKat',
      calories: 518,
      fat: 26.0,
      carbs: 65,
      protein: 7,
      iron: 6
    }
  ];
  protected list = [];
  protected handleSortChange ({ name, order }) {
    this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
  }
  protected table: Table<JurisdictionInterfaceData, JurisdictionInterfaceDataSearch> = {
    status: false,
    page: 1,
    size: 16,
    total: 1000,
    data: [],
    search: {}
  };

  protected async mounted () {
    await this.initTableData();
  }

  protected async initTableData () {
    let data = { page: this.table.page, size: this.table.size };
    this.table.status = true;
    const res = await http.apiJurisdictionInterfaceQuery(data);
    this.table.status = false;
    if (res.code !== undefined && res.code !== null) {
      if (res.code === 200) {
        console.log(res);
        this.table.data = res.data;
      } else this.$alert(res.message, '错误');
    } else this.$alert('网络异常，请稍后重试', '错误');
  }

  protected pagingChange (size) {
    console.log(size);
  }
}
</script>
