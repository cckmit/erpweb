<template>
  <div class="app-container">
    <span class="blue-vertical-bar">监控范围统计</span>
    <hr class="black-line">
    <div class="filter-container">
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
      <monitor-tunnel v-if="selectvalue === 'tunnel'" />
      <monitor-route v-if="selectvalue === 'route'" />
    </el-card>
  </div>
</template>

<script>
import MonitorTunnel from './tunnelview'
import MonitorRoute from './routeview'

export default {
  name: 'MonitorRange',
  components: {
    MonitorTunnel, MonitorRoute
  },
  data() {
    return {
      selectvalue: 'route',
      alloptions: [
        {
          value: 'route',
          label: '按线路统计'
        }, {
          value: 'tunnel',
          label: '按隧道统计'
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
