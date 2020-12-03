<template>
  <div class="app-container">
    <span class="blue-vertical-bar">设备统计</span>
    <hr class="black-line">
    <el-card>
      <device-view />
    </el-card>
    <!-- <div class="filter-container">
      <el-select v-model="selectvalue" placeholder="请选择">
        <el-option
          v-for="item in alloptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <el-card>
      <zong-view v-if="selectvalue === 'all'" />
      <tunnel-view v-if="selectvalue === 'tunnel'" />
      <device-type v-if="selectvalue === 'devicetype'" />
    </el-card> -->
  </div>
</template>

<script>
// import ZongView from './zongview'
// import TunnelView from './tunnelview'
// import DeviceType from './devicetypeview'
import DeviceView from './deviceview'

export default {
  name: 'DeviceStatis',
  components: {
    DeviceView
    // ZongView, TunnelView, DeviceType
  },
  data() {
    return {
      selectvalue: 'all',
      alloptions: [
        {
          value: 'all',
          label: '总视图'
        },
        {
          value: 'tunnel',
          label: '按隧道统计'
        }, {
          value: 'devicetype',
          label: '按设备类型统计'
        }
      ]
    }
  },
  destroyed() {
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style scoped>
</style>
