<template>
  <div>
    <el-table id="tableData" :data="dataList" border :span-method="objectSpanMethod" height="calc(92vh - 180px)">
      <el-table-column label="隧道名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.typeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备数量" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.device_count | changeCountShow }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="在线数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.online_count }}</span>
        </template>
      </el-table-column>
      <el-table-column label="离线数" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.offline_count > 0" style="color:red;">{{ scope.row.offline_count }}</span>
          <span v-else>{{ scope.row.offline_count }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="总计" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.all_count }}</span>
        </template>
      </el-table-column>
      <el-table-column label="隧道占比" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.tunnel_percent }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'DeviceallTable',
  filters: {
    changeCountShow(val) {
      if (val === undefined) {
        return 0
      } else {
        return val
      }
    }
  },
  props: {
    devicetabledata: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dataList: [],
      mergeLineArr: [],
      mergeLineIndex: ''
    }
  },
  watch: {
    devicetabledata: {
      deep: true,
      handler(val) {
        this.drawData(val)
      }
    }
  },
  created() {
  },
  mounted() {
    this.drawData(this.devicetabledata)
  },
  methods: {
    drawData(data) {
      this.dataList = []
      this.dataList = data
      this.mergeLineMethod(this.dataList)
    },
    mergeLineMethod(dataList) { // 处理合并表格数据
      for (var i = 0; i < dataList.length; i++) {
        if (i === 0) {
          this.mergeLineArr.push(1)
          this.mergeLineIndex = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (dataList[i].name === dataList[i - 1].name) {
            this.mergeLineArr[this.mergeLineIndex] += 1
            this.mergeLineArr.push(0)
          } else {
            this.mergeLineArr.push(1)
            this.mergeLineIndex = i
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 3 || columnIndex === 4) {
        const _row = this.mergeLineArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }
  }
}
</script>
<style scoped>
</style>
