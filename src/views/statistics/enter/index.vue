<template>
  <div class="app-container">
    <span class="blue-vertical-bar">出入口统计</span>
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
      <tunnel-view v-if="selectvalue === 'tunnel'" :selecttime="propTime" />
      <unit-view v-if="selectvalue === 'unit'" :selecttime="propTime" />
    </el-card>
  </div>
</template>

<script>
import TunnelView from './tunnelview'
import UnitView from './unitview'

export default {
  name: 'EnterStatistics',
  components: {
    TunnelView, UnitView
  },
  data() {
    return {
      selectvalue: 'tunnel',
      alloptions: [
        {
          value: 'tunnel',
          label: '按隧道统计'
        }, {
          value: 'unit',
          label: '按单位统计'
        }
      ],
      selectTime: '',
      propTime: []
    }
  },
  destroyed() {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    searchTime() {
      if (this.selectTime !== null && this.selectTime.length > 0) {
        var timeStart = this.selectTime + '-' + '01 ' + '00:00:00'
        var timeEnd = this.selectTime + '-' + '31 ' + '24:00:00'
        this.propTime = [timeStart, timeEnd]
      } else {
        this.propTime = []
      }
    }
  }
}
</script>
<style scoped>
</style>
