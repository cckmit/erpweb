<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/components/Charts/mixins/resize'

const animationDuration = 3000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'alerttypeBarchart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '600px'
    },
    chartData: {
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
    chartData: {
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
      this.setOptions(this.chartData)
    },
    setOptions({ allArrayData } = {}) {
      var seriesLabel = {
        normal: {
          show: true,
          position: 'top',
          textBorderColor: '#000',
          fontSize: 16,
          textBorderWidth: 0,
          color: '#000'
        }
      }
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
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
          data: ['红色告警', '橙色告警', '黄色告警', '蓝色告警'],
          top: 10
        },
        xAxis: {
          type: 'category',
          data: [''],
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value',
          name: '报警数',
          axisTick: {
            show: false
          }
        },
        color: ['#d81332', '#ea5e21', '#daa517', '#2989e2'],
        series: [
          {
            name: '红色告警',
            type: 'bar',
            barWidth: '10%',
            data: [allArrayData[0]],
            barGap: '100%',
            label: seriesLabel
          },
          {
            name: '橙色告警',
            type: 'bar',
            barWidth: '10%',
            data: [allArrayData[1]],
            label: seriesLabel,
            barGap: '100%'
          },
          {
            name: '黄色告警',
            type: 'bar',
            barWidth: '10%',
            data: [allArrayData[2]],
            barGap: '100% ',
            label: seriesLabel
          },
          {
            name: '蓝色告警',
            type: 'bar',
            barWidth: '10%',
            data: [allArrayData[3]],
            barGap: '100%',
            label: seriesLabel
          }
        ],
        animationDuration: animationDuration
      })
    }
  }
}
</script>
