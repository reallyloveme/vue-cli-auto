<template>
  <div>
    <div class="search-form" :model="searchForm">
      <el-form inline>
        <el-form-item label="文本框：">
          <el-input v-model="searchForm.inputTxt"></el-input>
        </el-form-item>
        <el-form-item label="下拉框：">
          <el-select v-model="searchForm.selectValue">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker
            v-model="searchForm.timeRing"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="rest">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-content">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
    <div class="page-content">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        searchForm: {
          inputTxt: '',
          selectValue: '',
          timeRing:[]
        }
    }
  },
  methods: {
    search() {},
    rest() {}
  }
}
</script>

<style scope>
  .search-form {
    text-align: left;
  }
  .page-content {
    margin-top: 20px;
    text-align: right;
  }
</style>