<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>个人中心</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="modifyPassword()">修改密码</el-button>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="avatar+'?d=identicon'" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>Hello</div>
          {{ user.name }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">{{ user.role }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>基本信息</span></div>
        <div class="user-bio-section-body">
          <el-form
            ref="user"
            :model="user"
            class="newform"
            label-width="150px"
            label-position="left"
          >
            <el-form-item label="用户名">
              <span style="font-weight:bold">{{ user.name }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ user.created_at | changeTimeShow }}</span>
            </el-form-item>
            <el-form-item label="更新时间">
              <span>{{ user.updated_at | changeTimeShow }}</span>
            </el-form-item>
            <el-form-item label="电话">
              <span>{{ user.telephone }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ user.email }}</span>
            </el-form-item>
            <el-form-item label="角色权限">
              <el-tag>{{ user.role }}</el-tag>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 修改密码对话框 -->
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="11vh">
        <el-form ref="dataForm" :model="editPassword" :rules="rules" label-width="120px">
          <el-form-item label="原始密码:" prop="oldPassword">
            <el-input v-model="editPassword.oldPassword" style="width:80%" clearable />
          </el-form-item>
          <el-form-item label="新密码:" prop="newPassword">
            <el-input v-model="editPassword.newPassword" style="width:80%" clearable />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="editConfrm()">确定</el-button>
        </div>
      </el-dialog>
      <!-- <div class="user-skills user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>Skills</span></div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>Vue</span>
            <el-progress :percentage="70" />
          </div>
          <div class="progress-item">
            <span>JavaScript</span>
            <el-progress :percentage="18" />
          </div>
          <div class="progress-item">
            <span>Css</span>
            <el-progress :percentage="12" />
          </div>
          <div class="progress-item">
            <span>ESLint</span>
            <el-progress :percentage="100" status="success" />
          </div>
        </div>
      </div> -->
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import { mapGetters } from 'vuex'
import { convertUTCLocalTime } from '@/utils/validate'
import { ChangeCurrentUserPassword } from '@/api/iot-apis'

export default {
  filters: {
    changeRoleShow(val) {
      var ret = '普通用户'
      if (val === 'user') {
        ret = '普通用户'
      } else if (val === 'root') {
        ret = '超级管理员'
      } else if (val === 'admin') {
        ret = '管理员'
      } else {
        ret = ''
      }
      return ret
    },
    changeTimeShow(val) {
      if (val === undefined) {
        return ''
      } else {
        var time = convertUTCLocalTime(val * 1000)
        return time
      }
    }
  },
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          role: '',
          roles: [],
          id: '',
          telephone: '',
          created_at: '',
          updated_at: '',
          password: ''
        }
      }
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      editPassword: {
        oldPassword: '',
        newPassword: ''
      },
      rules: {
        oldPassword: [
          {
            required: true,
            trigger: 'blur',
            message: '不能为空'
          }
        ],
        newPassword: [
          {
            required: true,
            trigger: 'blur',
            message: '不能为空'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'avatar'
    ])
  },
  methods: {
    modifyPassword() {
      this.dialogFormVisible = true
    },
    editConfrm() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          var obj = {
            userName: this.user.name,
            oldPassword: this.editPassword.oldPassword,
            newPassword: this.editPassword.newPassword
          }
          ChangeCurrentUserPassword(obj).then(res => {
            this.dialogFormVisible = false
            this.$message({
              message: '密码修改成功',
              type: 'success'
            })
            this.editPassword = {
              oldPassword: '',
              newPassword: ''
            }
          }).catch(error => {
            console.log(error)
            this.$message({ showClose: true, message: '您输入的原始密码不正确', type: 'error' })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 .box-center {
   margin: 0 auto;
   display: table;
 }

 .text-muted {
   color: #777;
 }

 .user-profile {
   .user-name {
     font-weight: bold;
   }

   .box-center {
     padding-top: 10px;
   }

   .user-role {
     padding-top: 10px;
     font-weight: 400;
     font-size: 14px;
   }

   .box-social {
     padding-top: 30px;

     .el-table {
       border-top: 1px solid #dfe6ec;
     }
   }

   .user-follow {
     padding-top: 20px;
   }
 }

 .user-bio {
   margin-top: 20px;
   color: #606266;

   span {
     padding-left: 4px;
   }

   .user-bio-section {
     font-size: 14px;
     padding: 15px 0;

     .user-bio-section-header {
       border-bottom: 1px solid #dfe6ec;
       padding-bottom: 10px;
       margin-bottom: 10px;
       font-weight: bold;
     }
   }
 }
 .newform {
  margin-left: 30px;
}
.newform .el-form-item {
  margin-bottom: 9px;
}
</style>
