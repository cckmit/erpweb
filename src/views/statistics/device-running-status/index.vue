<template>
  <div class="app-container">
    <span class="blue-vertical-bar">设备运行状态</span>
    <hr class="black-line">
    <div class="filter-container">
      <el-select v-model="selectTunnel" placeholder="隧道选择" clearable @change="changeTunnel">
        <el-option
          v-for="item in allTunneloptions"
          :key="item.id"
          :label="item.tunnel_name"
          :value="item.tunnel_name"
        />
      </el-select>
    </div>
    <el-card>
      <device-view :tunnelname="tunnelName" />
    </el-card>
    <!-- <el-tabs v-model="activeName">
      <el-tab-pane label="离在线设备统计" name="onoffdevice">
        <div class="filter-container">
          <el-select v-model="selectonOroff" placeholder="请选择">
            <el-option
              v-for="item in allOnOffoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <el-card>
          <deviceon-view v-if="activeName=='onoffdevice'" :type="selectonOroff" />
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="故障设备统计" name="breakdevice">
        <div class="filter-container">
          <el-select v-model="selectBreakvalue" placeholder="请选择">
            <el-option
              v-for="item in allBreakoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-date-picker
            v-model="selectTime"
            style="width:180px"
            type="month"
            format="yyyy-MM"
            value-format="yyyy-MM"
            placeholder="选择日期"
          />
          <el-button type="primary" sise="small" icon="el-icon-search" plain @click="searchTime">查询</el-button>
        </div>
        <el-card>
          <breakdevice-type v-if="activeName=='breakdevice'" :type="selectBreakvalue" :selecttime="propTime" />
        </el-card>
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script>
// import DeviceonView from './device-view'
// import BreakdeviceType from './breakdown-device'
import DeviceView from './device'
import { GetTunnels } from '@/api/iot-apis'

export default {
  name: 'DeviceRunningStatus',
  components: {
    DeviceView
    // DeviceonView, BreakdeviceType
  },
  data() {
    return {
      selectonOroff: 'OnLine',
      allOnOffoptions: [
        {
          value: 'OnLine',
          label: '在线设备'
        }, {
          value: 'OffLine',
          label: '离线设备'
        }
      ],
      selectBreakvalue: 'type',
      allBreakoptions: [
        {
          value: 'tunnel',
          label: '按隧道'
        }, {
          value: 'type',
          label: '按设备类型'
        }
      ],
      selectTime: '',
      propTime: '',
      activeName: 'onoffdevice',
      allTunneloptions: [],
      selectTunnel: '',
      tunnelName: ''
    }
  },
  destroyed() {
  },
  created() {
  },
  mounted() {
    this.getTunellist()
  },
  methods: {
    getTunellist() {
      var obj = {
        limit: 0,
        skip: 0
      }
      GetTunnels(obj).then(res => {
        this.allTunneloptions = res.items
      })
    },
    changeTunnel(val) {
      console.log(val)
      if (val !== null) {
        this.tunnelName = val
      } else {
        this.tunnelName = ''
      }
    }
    // searchTime() {
    //   if (this.selectTime !== null) {
    //     this.propTime = this.selectTime
    //   } else {
    //     this.propTime = ''
    //   }
    // }
  }
}
</script>
<style scoped>
</style>
