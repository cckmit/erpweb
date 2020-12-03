<template>
  <div class="app-container">
    <div style="height:40px;line-height:40px;">
      <span class="blue-vertical-bar">用户详细</span>
      <el-button plain type="primary" style="float:right;" @click="goback()">返回 </el-button>
    </div>
    <hr class="black-line">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>详细信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="modifyPassword()">修改密码</el-button>
      </div>
      <el-container>
        <el-main>
          <el-form
            ref="userDetail"
            :model="userDetail"
            class="newform"
            label-width="150px"
            label-position="left"
          >
            <el-form-item label="用户名:">
              <span style="font-weight:bold">{{ userDetail.name }}</span>
            </el-form-item>
            <el-form-item label="创建时间:">
              <span>{{ userDetail.created_at | changeTimeShow }}</span>
            </el-form-item>
            <el-form-item label="更新时间:">
              <span>{{ userDetail.updated_at | changeTimeShow }}</span>
            </el-form-item>
            <el-form-item label="电话:">
              <span>{{ userDetail.telephone }}</span>
            </el-form-item>
            <el-form-item label="邮箱:">
              <span>{{ userDetail.email }}</span>
            </el-form-item>
            <el-form-item label="角色:">
              <el-tag>{{ userDetail.role }}</el-tag>
            </el-form-item>
            <el-form-item label="组织机构:">
              <span>{{ findPath(userDetail.company_id,userDetail.company) }}</span>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-card>
    <!-- 修改密码对话框 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="11vh">
      <el-form ref="dataForm" :model="editPassword" :rules="rules" label-width="120px">
        <el-form-item label="用户名:" prop="name">
          <span>{{ userDetail.name }}</span>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="editPassword.password" style="width:80%" clearable />
          <p style="margin:0px">a-z、A-Z、0-9组合,长度限制5-16</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editConfrm()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// API
import { ChangeUserPassword, GetFullTrees } from '@/api/iot-apis'
import { validname } from '@/utils/validate'

export default {
  name: 'UserDetail',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (!validname(value)) {
        callback(new Error('请输入正确的密码格式'))
      } else {
        callback()
      }
    }
    return {
      userDetail: {
        id: '',
        name: '',
        status: '',
        roles: [],
        telephone: '',
        email: '',
        created_at: '',
        updated_at: '',
        password: '',
        company_id: '',
        company: ''
      },
      dialogFormVisible: false,
      editPassword: {
        password: ''
      },
      rules: {
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }
        ]
      },
      allRelationList: []
    }
  },
  created() {
    this.alltreeRealtionlist()
  },
  mounted() {
    if (this.$route.params.user === undefined) {
      this.$router.go(-1)
    } else {
      this.userDetail = this.$route.params.user
    }
  },
  methods: {
    async alltreeRealtionlist() {
      var obj = {
        limit: 0,
        skip: 0
      }
      const { items } = await GetFullTrees(obj)
      this.allRelationList = items
    },
    modifyPassword() {
      this.dialogFormVisible = true
    },
    editConfrm() {
      var form = {
        id: this.userDetail.id,
        username: this.userDetail.name,
        password: this.editPassword.password
      }
      ChangeUserPassword(form).then(res => {
        this.dialogFormVisible = false
        this.$message({
          message: '密码修改成功',
          type: 'success'
        })
        this.editPassword.password = ''
      })
    },
    findPath(id, name) {
      if (id === '') {
        return
      }
      for (const item of this.allRelationList) {
        if (this.judeInclude(item, id)) {
          if (item.parent_id === 'root') {
            return name
          }
          name = item.company.name + '/' + name
          return this.findPath(item.parent_id, name)
        }
      }
      return ''
    },
    judeInclude(data, id) {
      if (data.children_ids.indexOf(id) > -1) {
        return true
      } else {
        return false
      }
    },
    goback() {
      window.history.back()
    }
  }
}
</script>
<style scoped>
.newform {
  margin-left: 30px;
}
.newform .el-form-item {
  margin-bottom: 9px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
