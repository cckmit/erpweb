<template>
  <el-dialog title="编辑用户" :visible.sync="editMangerVisible" :before-close="closeDialog" :close-on-click-modal="false" top="5vh">
    <el-form ref="dataForm" :model="editUser" :rules="rules" label-width="100px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="editUser.name" style="width:90%" />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="editUser.role" placeholder="请选择" style="width:250px;">
          <el-option v-for="item in rolelist" :key="item.value" :label="item.desc" :value="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="组织机构:" prop="company_id">
        <div style="height:200px;overflow:auto;">
          <span class="custom-tree-title">
            <span class="flex-item">公司名称</span>
            <span class="flex-item">厂家</span>
          </span>
          <el-tree
            ref="edittree"
            :props="defaultProps"
            :data="treelist"
            node-key="id"
            accordion
            show-checkbox
            :check-strictly="true"
            :default-expanded-keys="selectExpand"
            @check="checkGroupNode"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span class="flex-item">{{ data.name }}</span>
              <span class="flex-item">{{ data.factory }}</span>
            </span>
          </el-tree>
        </div>
      </el-form-item>
      <el-form-item label="手机号" prop="telephone">
        <el-input v-model="editUser.telephone" style="width:90%" clearable />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editUser.email" style="width:90%" clearable />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button
        type="primary"
        @click="updateConfrmUser('dataForm')"
      >确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { UpdateUser, GetRoles, GetFullTrees } from '@/api/iot-apis'
import { validEmail, validPhone } from '@/utils/validate'

export default {
  name: 'EditUser',
  props: {
    editMangerVisible: {
      type: Boolean,
      default: function() { return }
    },
    propuserdata: {
      type: Object,
      default: function() { return }
    }
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value) {
        if (!validPhone(value)) {
          callback(new Error('Please enter the correct phone'))
        } else {
          callback()
        }
      } else {
        return callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (value) {
        if (!validEmail(value)) {
          callback(new Error('Please enter the correct email'))
        } else {
          callback()
        }
      } else {
        return callback()
      }
    }
    return {
      dialogFormVisible: false,
      editUser: {
        name: '',
        email: '',
        telephone: '',
        company: '',
        company_id: '',
        role: '',
        password: ''
      },
      rolelist: [],
      rules: {
        telephone: [
          { required: false, message: '请输入正确手机号', trigger: 'blur', validator: validatePhone }
        ],
        email: [
          {
            required: false,
            message: '请输入正确的邮箱',
            trigger: 'blur',
            validator: validateEmail
          }
        ],
        role: [
          { required: true, message: '请选择一个角色', trigger: 'change' }
        ]
      },
      defaultProps: {
        id: 'id',
        children: 'children',
        name: 'name',
        factory: 'factory',
        isLeaf: 'leaf'
      },
      selectId: [],
      selectName: '',
      treeShow: false,
      oriTreeData: [],
      treelist: [],
      selectExpand: []
    }
  },
  watch: {
    propuserdata(val) {
      this.editUser = val
      this.$nextTick(() => {
        this.getAllTree(true)
      })
      this.getrolelist()
    }
  },
  mounted() {
  },
  methods: {
    async getAllTree(flag) {
      var obj = {
        limit: 0,
        skip: 0
      }
      const { items } = await GetFullTrees(obj)
      for (var item of items) {
        if (item.parent_id === 'root') {
          this.treelist = []
          for (var v of item.children_ids) {
            this.findid(v, items)
          }
        }
      }
      if (flag) {
        this.selectExpand = [this.editUser.company_id]
        this.$refs.edittree.setCheckedKeys([this.editUser.company_id])
      }
    },
    findid(v, items) {
      for (var item of items) {
        if (v === item.parent_id) {
          var obj = {
            id: v,
            name: item.company.name,
            factory: item.company.factory,
            children: this.findChiLd(item.children_ids, items)
          }
          this.treelist.push(obj)
        }
      }
    },
    findChiLd(list, items) {
      var data = []
      for (var i of list) {
        for (var item of items) {
          if (i === item.parent_id) {
            var obj = {
              id: i,
              name: item.company.name,
              factory: item.company.factory,
              children: this.findChiLd(item.children_ids, items)
            }
            data.push(obj)
          }
        }
      }
      return data
    },
    checkGroupNode(a, b) {
      if (b.checkedKeys.length > 0) {
        this.$refs.edittree.setCheckedKeys([a.id])
        this.selectId = []
        this.selectId.push(a.id)
        this.selectName = a.name
      }
    },
    getrolelist() {
      var obj = {
        limit: 0,
        skip: 0,
        q: ''
      }
      GetRoles(obj).then(res => {
        this.rolelist = []
        for (var i of res.items) {
          if (i.name !== 'root') {
            this.rolelist.push(i)
          }
        }
      })
    },
    closeDialog() {
      this.treeShow = false
      this.$emit('onDialogVisibleChange', false) // 关闭对话框
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    roleChange(val) {
      this.$forceUpdate()
    },
    editCompany() {
      this.treeShow = true
      this.$nextTick(() => {
        this.$refs.edittree.setCheckedKeys([this.editUser.company_id])
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    updateConfrmUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.selectId.length === 0) {
            this.editUser.company_id = this.editUser.company_id
          } else {
            this.editUser.company_id = this.selectId[0]
            this.editUser.company = this.selectName
          }
          var obj = {
            body: this.editUser,
            id: this.editUser.id
          }
          UpdateUser(obj).then(
            res => {
              this.closeDialog()
              this.$message({
                message: '更新成功',
                type: 'success'
              })
              this.$emit('onUpdateInfo', this.editUser)
              if (this.editUser.id === this.$store.getters.id) {
                this.logout()
              }
            }
          ).catch((error) => {
            var str = ''
            if (error.message.indexOf('name_1') > -1) {
              str = ', 列表中已经存在此用户名，请重新填写'
            }
            this.$message({
              message: '修改失败' + str,
              type: 'error',
              duration: 5000
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.custom-tree-node {
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
.custom-tree-node  .flex-item {
    width: 120px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.custom-tree-title {
    width: 339px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color:#000;
    padding-right: 8px;
}
.custom-tree-title .flex-item {
    width: 120px;
    height:30px;
}
</style>
