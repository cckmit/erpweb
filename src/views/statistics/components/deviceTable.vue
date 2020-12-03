<template>
  <div>
    <el-table :data="dataList" border :height="height">
      <el-table-column v-for="(item, index) in alltablelabel" :key="index" :label="item.label" :prop="item.propname" align="center" />
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'AlldeviceTable',
  props: {
    devicetabledata: {
      type: Array,
      required: true
    },
    alltablelabel: {
      type: Array,
      required: true
    },
    height: {
      type: String,
      default: 'calc(78vh - 60px)'
    }
  },
  data() {
    return {
      dataList: []
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
    }
  }
}
</script>
<style scoped>
</style>
