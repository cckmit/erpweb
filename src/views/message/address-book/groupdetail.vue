<template>
  <div class="app-container">
    <div style="height:40px;line-height:40px;">
      <span class="blue-vertical-bar">{{ group_name }}</span>
      <el-button plain type="primary" style="float:right;" @click="goback()">返回 </el-button>
    </div>
    <hr class="black-line">
    <el-row :gutter="20">
      <el-col :span="14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>分组成员</span>
          </div>
          <el-table :data="userlist" border height="530">
            <el-table-column type="index" width="60" align="center" :index="indexMethod" />
            <el-table-column property="contact" label="姓名" />
            <el-table-column property="telephone" label="手机号码" />
            <el-table-column property="unit" label="单位" />
            <el-table-column property="station" label="岗位" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>分组隧道</span>
          </div>
          <el-table :data="tunnellist" border height="530">
            <el-table-column type="index" width="60" align="center" :index="indexMethod" />
            <el-table-column property="tunnel_name" label="隧道名" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { setGroupdata, getGroupdata } from '@/utils/storeId'

export default {
  name: 'GroupDetail',
  data() {
    return {
      groupDetail: {},
      group_name: '',
      userlist: [],
      tunnellist: []
    }
  },
  created() {
  },
  mounted() {
    if (this.$route.params.datailData) {
      this.groupDetail = this.$route.params.datailData
      setGroupdata(this.$route.params.datailData)
    } else {
      this.groupDetail = JSON.parse(getGroupdata())
    }
    this.group_name = this.groupDetail.group_name
    this.userlist = this.groupDetail.address_book
    this.tunnellist = []
    for (var item of this.groupDetail.tunnel_name) {
      var obj = {
        tunnel_name: item
      }
      this.tunnellist.push(obj)
    }
  },
  methods: {
    goback() {
      window.history.back()
    },
    indexMethod(index) {
      return index + 1
    }
  }
}
</script>
<style scoped>
</style>
