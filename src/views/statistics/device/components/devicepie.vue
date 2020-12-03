<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/components/Charts/mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'deviceTunnelpie'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '600px'
    },
    devicechartdata: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    devicechartdata: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.devicechartdata)
    },
    setOptions({ title, legendname, seriesData } = {}) {
      this.chart.setOption({
        title: title,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        toolbox: {
          show: true,
          right: 23,
          iconStyle: {
            color: '#1890ff',
            borderColor: '#1890ff'
          },
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ['toolbox'],
              pixelRatio: 2
            }
          }
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: legendname
        },
        series: [
          {
            name: '设备数量',
            type: 'pie',
            radius: '55%',
            label: {
              formatter: '{b}: {c} ({d}%)'
            },
            data: seriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>
