<template>
  <div class="dashboard-editor-container">
    <el-row>
      <el-col :span="5">
      </el-col>
      <el-col :span="5">
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'DashboardAdmin',
  components: {
  },
  data() {
    return {
    
    }
  },
  created() {
  },
  methods: {
	}
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  // padding: 32px;
  // background-color: rgb(240, 242, 245);
  position: relative;

}
.title {
  font-size:15px;
  color:#666;
  font-weight:bold;
  cursor: pointer;
}
.nodata{
    text-align: center;
    line-height: 200px;
    overflow:hidden;
    color:#909399;
    font-size:14px;
}
</style>
