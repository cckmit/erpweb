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
      default: 'misinBar'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
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
    setOptions({ x_Maxis, seriesMData } = {}) {
      this.chart.setOption({
        title: {
          text: '误报占比统计',
          subtext: '',
          left: 'center'
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '误报占比：{c}%'
        },
        xAxis: {
          data: x_Maxis,
          type: 'category',
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value',
          // min: 0,
          // max: 100,
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} %'
          },
          show: true
        },
        series: [
          {
            name: '误报占比',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  formatter: '{c}%'
                }
              }
            },
            barWidth: '35%',
            data: seriesMData,
            color: ['#daa517'],
            animationDuration: 2800
          }
        ]
      })
    }
  }
}
</script>
