<template>
  <div>
    <el-table :data="dataList" :span-method="objectSpanMethod" border height="calc(78vh - 60px)">
      <el-table-column label="电压" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.volage }}</span>
        </template>
      </el-table-column>
      <el-table-column label="线路名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.routename }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电压等级占比" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.routepercent }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'MonitorRouteTable',
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
          if (dataList[i].volage === dataList[i - 1].volage) {
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
      if (columnIndex === 0 || columnIndex === 2) {
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
