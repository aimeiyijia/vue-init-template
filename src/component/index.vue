<template>
  <div class="gzjl">
    <pcTable
      :loading="loading"
      :columns="columns"
      :tableLoadData="tableData"
      :current-page="requestForm.pageNo"
      :page-size="requestForm.pageSize"
      :total="total"
      @current-change="pageChange"
    >
      <template v-slot:isDownload="scope">
        <span>{{ scope.row.downloadBy ? "是" : "否" }}</span>
      </template>
      <template v-slot:fileVoList="scope">
        <span
          class="table-opera"
          v-for="item in scope.row.fileVoList"
          :key="item.fileName"
          @click="downloadFile(item, scope.row.id)"
          >{{ item.fileName }}</span
        >
      </template>
    </pcTable>
  </div>
</template>

<script>
import pcTable from "../../../../component/pcTable.vue";
export default {
  name: "gzjl",
  components: { pcTable },
  props: {
    workAreaData: {
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      addVisible: false,
      addTitle: "",
      type: "add",
      requestForm: {
        nodeId: "", //节点编码
        pageNo: 1, //当前页
        pageSize: 20 //分页大小
      },
      total: 0,
      nodeData: {},
      viewData: {},
      columns: [
        {
          label: "文书类别",
          prop: "documentTypeName"
        },
        {
          label: "文书日期",
          prop: "generateTime"
        },
        {
          label: "附件",
          columnType: "slot",
          slotName: "fileVoList"
        },
        {
          label: "上传人",
          prop: "createBy"
        },
        {
          label: "上传时间",
          prop: "createTime"
        },
        {
          label: "管理人是否下载",
          columnType: "slot",
          slotName: "isDownload"
        },
        {
          label: "下载人",
          prop: "downloadBy"
        },
        {
          label: "下载时间",
          prop: "downloadTime"
        }
      ],
      tableData: []
    };
  },
  created() {
    this.requestForm.nodeId = this.workAreaData.id;
    this.nodeData = this.workAreaData;
    this.getData();
  },
  methods: {
    // 下载文件
    downloadFile(file, id) {
      DataApi.updateDocumentManage({ id })
        .then(res => {
          if (res.code != 200) {
            this.$message({
              type: "error",
              message: res.msg
            });
            return;
          }
          window.open(
            global.globalDownloadUrl +
              file.filePath +
              "?filename=" +
              encodeURI(
                file.fileName.substring(0, file.fileName.lastIndexOf("."))
              )
          );
          this.getData();
        })
        .catch(err => {});
    },
    getData() {
      this.loading = true;
      DataApi.getDocumentManageList(this.requestForm)
        .then(res => {
          if (res.code != 200) {
            this.$message({
              type: "error",
              message: res.msg
            });
            return;
          }
          this.total = res.data.total;
          this.tableData = res.data.content;
        })
        .catch(err => {})
        .finally(() => {
          this.loading = false;
        });
    },
    pageChange(index) {
      this.requestForm.pageNo = index;
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
.gzjl {
  padding: 8px 24px;
}
.add {
  text-align: right;
  .el-button {
    width: 130px;
    margin-bottom: 8px;
  }
}
.table-opera {
  color: #317aed;
  text-decoration: underline;
  cursor: pointer;
}
span.table-opera {
  margin: 0 4px;
}
</style>
