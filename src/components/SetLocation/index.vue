<template>
  <div style="position:relative">
    <el-dialog :visible.sync="dialogVisible" :before-close="closeDialog" :close-on-click-modal="false" title="设置位置" width="80%" top="5vh">
      <el-row>
        <el-col :span="18">
          经度:<el-input v-model="center[0]" size="mini" placeholder="请输入经度" style="width: 200px;" class="filter-item" clearable />
          纬度:<el-input v-model="center[1]" size="mini" placeholder="请输入纬度" style="width: 200px;" class="filter-item" clearable />
          <el-button size="mini" type="primary" @click="setCenter()">确认</el-button>
        </el-col>
        <el-col :span="6">
          <el-button v-if="showFunction" size="mini" type="primary" :disabled="edit" @click="enableClick()">添加/删除</el-button>
          <el-button v-if="showFunction" size="mini" type="primary" @click="editTunnel()">编辑</el-button>
          <el-button v-if="showFunction" size="mini" type="danger" :disabled="edit" @click="clearTunnel()">清除</el-button>
          <el-button size="mini" type="success" @click="save()">保存设置</el-button>
        </el-col>
      </el-row>
      <Map v-if="dialogVisible" ref="baidumap" :center="centerLabel" :line="line" :show-window="showWindow" :polygons="polygons" :markers="markers" @savepolyline="savePolyLine($event)" />
    </el-dialog>
  </div>
</template>
<script>

import Map from '@/components/Map'
import XLSX from 'xlsx'
import { isExcel, fixData } from '@/utils/validate'
import { UpdateRoute, UpdateTunnel, SetSplicePosition } from '@/api/iot-apis'
export default {
  name: 'SetLocation',
  components: { Map },
  props: {
    dialogVisible: {
      type: Boolean,
      default: function() { return }
    },
    info: {
      type: Object,
      default: function() {
        return {}
      }
    },
    tunposition: {
      type: Array,
      default: function() {
        return []
      }
    },
    routeposition: {
      type: Array,
      default: function() {
        return []
      }
    },
    name: {
      type: String,
      default: function() {
        return ''
      }
    },
    showWindow: {
      type: Boolean,
      default: function() {
        return true
      }
    },
    showFunction: {
      type: Boolean,
      default: function() {
        return true
      }
    }
  },
  data() {
    return {
      center: [],
      zoom: 7,
      markerPosition: [],
      devicestyle: null,
      // markers: [],
      warningmarkers: [],
      infoWindow: {},
      locationData: [],
      currentRole: 0,
      alertNum: 0,
      position: [],
      line: [],
      polygons: [],
      markers: [],
      edit: false,
      centerLabel: {},
      tunnelName: ''
    }
  },
  watch: {
    info: {
      handler(newVal, oldVal) {
        if (this.name === '隧道') {
          this.polygons = [{
            position: JSON.parse(JSON.stringify(newVal.position)),
            color: '#ffba00'
          }]
          if (newVal.position.length !== 0) {
            this.centerLabel = {
              name: newVal.tunnel_name,
              position: [newVal.position[0].longitude, newVal.position[0].latitude]
            }
          }
          this.line = []
          this.markers = []
        }
        if (this.name === '线路') {
          this.line = [{ position: JSON.parse(JSON.stringify(newVal.position)) }]
          if (newVal.position.length !== 0) {
            this.centerLabel = {
              name: newVal.route_name,
              position: [newVal.position[0].longitude, newVal.position[0].latitude]
            }
          }
          this.polygons = []
          this.markers = []
        }
        if (this.name === '接头') {
          this.markers = [{ position: newVal.position }]
          this.tunnelName = newVal.tunnel_name
        }
      },
      deep: true
      // immediate: true
    },
    tunposition(val) {
      if (this.name === '接头') {
        this.polygons = [{ position: val }]
        if (val.length !== 0) {
          this.centerLabel = {
            name: this.tunnelName,
            position: [val[0].longitude, val[0].latitude]
          }
        }
      }
    },
    routeposition(val) {
      if (this.name === '接头') {
        this.line = [{ position: val }]
      }
    }
  },
  destroyed() {
    clearInterval(this.timer)
  },
  created() {
  },
  mounted() {
    // this.createMap()
  },
  methods: {
    setCenter() {
      if (this.center.length > 0) {
        if (this.center[0] > 0 && this.center[0] < 180 && this.center[1] > 0 && this.center[1] < 90) {
          this.$refs.baidumap.setCenterAndZoom(this.center, 16)
          return
        }
      }
      this.$message({
        type: 'warning',
        message: '输入经纬度格式不正确'
      })
    },
    createMap() {
    },
    createPolyline() {
      this.$refs.baidumap.CreatePolyline([])
    },
    routePlan() {
      this.$refs.baidumap.madeBoundary()
    },
    enableClick() {
      this.$refs.baidumap.enableClick(this.name)
    },
    editTunnel() {
      this.edit = true
      this.$refs.baidumap.edit(this.name)
    },
    clearTunnel() {
      this.$confirm('此操作将永久删除该位置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs.baidumap.clear(this.name)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    closeClick() {
      this.$refs.baidumap.closeClick()
    },
    save() {
      this.edit = false
      this.$refs.baidumap.save(this.name)
    },
    savePolyLine(data) {
      if (this.name === '隧道') {
        this.updateTunnelConfrm(data)
      } else if (this.name === '线路') {
        this.updateRouteConfrm(data)
      } else {
        this.updateMarkConfrm(data)
      }
    },
    updateRouteConfrm(List) {
      const data = JSON.parse(JSON.stringify(this.info))
      data.position = List
      var obj = {
        body: data,
        id: data.id
      }
      UpdateRoute(obj).then(
        res => {
          this.$message({
            message: '修改线路位置成功',
            type: 'success'
          })
          this.$emit('onDialogVisibleChange', false)
        }
      ).catch(error => {
        console.log(error)
        this.$message({
          message: '修改失败',
          type: 'warning'
        })
      })
    },
    updateTunnelConfrm(List) {
      const data = JSON.parse(JSON.stringify(this.info))
      data.position = List
      var obj = {
        body: data,
        id: data.id
      }
      UpdateTunnel(obj).then(
        res => {
          this.$message({
            message: '修改隧道位置成功',
            type: 'success'
          })
          this.$emit('onDialogVisibleChange', false)
        }
      ).catch(error => {
        console.log(error)
        this.$message({
          message: '修改失败',
          type: 'warning'
        })
      })
    },
    updateMarkConfrm(data) {
      var newposition = {
        longitude: data.point.lng,
        latitude: data.point.lat
      }
      var obj = {
        id: this.info.id,
        position: newposition
      }
      SetSplicePosition(obj).then(
        res => {
          this.$message({
            message: '位置设置成功',
            type: 'success'
          })
          this.$emit('onDialogVisibleChange', false)
        }
      ).catch(error => {
        console.log(error)
        this.$message({
          message: '设置失败！',
          type: 'warning'
        })
      })
    },
    closeDialog() {
      this.edit = false
      this.$emit('onDialogVisibleChange', false)
    },
    downloadFile(filename) {
      const data = [
        {
          longitude: '102.840305',
          latitude: '24.887714'
        }, {
          longitude: '102.840593',
          latitude: '24.884305'
        }, {
          longitude: '102.85166',
          latitude: '24.881814'
        }
      ]
      const ws = XLSX.utils.json_to_sheet(data)
      /* generate workbook and add the worksheet */
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
      /* save to file */
      XLSX.writeFile(wb, filename + '.xlsx')
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    openFile() {
      this.$refs['excel-upload-input'].click()
    },

    changeCMDFile(e) {
      const files = e.target.files
      const rawFile = files[0]
      if (!isExcel(rawFile.name)) {
        this.$message.error('Only supports upload .xlsx, .xls,  suffix files')
        return false
      }
      this.readerData(rawFile)
    },
    readerData(rawFile) {
      this.loading = true
      const reader = new FileReader()
      reader.onload = e => {
        const data = e.target.result
        const fixedData = fixData(data)
        const workbook = XLSX.read(fixedData, { type: 'binary' })
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const results = XLSX.utils.sheet_to_json(worksheet)
        this.generateData(results)
        this.loading = false
      }
      reader.readAsArrayBuffer(rawFile)
    },
    generateData(List) {
      if (List.length < 20) {
        this.$message.warning('Enter at least 20 coordinates 请至少注入20个线路坐标')
        // return
      }
      const data = []
      for (const item of List) {
        const obj = {
          longitude: Number(item.longitude),
          latitude: Number(item.latitude)
        }
        data.push(obj)
      }
      this.$refs.baidumap.ImportLine(data)
    }
  }
}
</script>
<style lang="scss" scoped>
.right{
	text-align: right;
	margin-right: 2em
}
</style>
