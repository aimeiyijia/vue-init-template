<template>
  <div>
    <el-table
      :data="tableData"
      v-loading="loading"
      height="0px"
      border
      v-height-adaptive="{ topOffset: 50, bottomOffset: 0 }"
      highlight-current-row
      :header-cell-style="{ 'background-color': '#fbfbff' }"
      @selection-change="selectionChange"
    >
      <!-- 多选框 -->
      <el-table-column
        v-if="selection"
        type="selection"
        width="50"
        :selectable="selectable"
        :align="align"
      ></el-table-column>
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="50"
        v-if="columnIndex"
      >
      </el-table-column>
      <!-- 文本数据渲染 -->
      <template v-for="item in header">
        <el-table-column
          v-if="item.columnType === 'slot'"
          :prop="item.prop"
          :label="item.label"
          :key="item.prop"
          :width="item.width"
          :align="align"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :row="scope.row" />
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :prop="item.prop"
          :label="item.label"
          :key="item.prop"
          :width="item.width"
          :align="align"
        ></el-table-column>
      </template>
    </el-table>
    <div class="pagination">
      <span
        >共<i>{{ Math.ceil(pcTotal / pcPageSize) }}</i
        >页/<i>{{ pcTotal }}</i
        >条数据</span
      >
      <el-pagination
        @current-change="pageChange"
        background
        :current-page="pcPageNo"
        :page-size="pcPageSize"
        layout="prev,pager,next,jumper"
        :total="pcTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "kezhang",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: []
    },
    tableLoadData: {
      type: Array,
      default: []
    },
    align: {
      type: String,
      default: "center"
    },
    columnIndex: {
      type: Boolean,
      default: true
    },
    selection: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Function,
      default: () => {
        return true;
      }
    },
    height: {
      type: [Number, String],
      default: 600
    },
    pageNo: {
      type: Number,
      default: 1
    },
    pageSize: { type: Number, default: 20 },
    total: { type: Number, default: 0 }
  },
  data() {
    return {};
  },
  computed: {
    tableData() {
      return this.tableLoadData;
    },
    header() {
      return this.columns;
    },
    pcPageNo() {
      return this.pageNo;
    },
    pcPageSize() {
      return this.pageSize;
    },
    pcTotal() {
      return this.total;
    }
  },
  methods: {
    pageChange(val) {
      this.$emit("current-change", val);
    },
    selectionChange(selection) {
      this.$emit("selection-change", selection);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-table {
  border: 1px solid #e1e4f8;
}
.pagination {
  margin-top: 4px;
  text-align: right;
  span {
    margin-right: 8px;
    vertical-align: text-top;
    i {
      color: #ff0000;
    }
  }
}
</style>
