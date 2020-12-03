<template>
  <div class="app-container">
    <span class="blue-vertical-bar">用户列表&nbsp;&nbsp;</span>
    <hr class="black-line">
    <div class="filter-container">
      <el-select v-model="searchKey" placeholder="全部" class="filter-item" style="width: 140px">
        <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="searchValue" placeholder="请输入搜索内容" style="width: 200px;" class="filter-item" clearable />
      <el-button type="primary" class="filter-item" style="margin-left: 10px;" icon="el-icon-edit" @click="addUser">添加用户</el-button>
    </div>
    <el-card>
      <el-table :data="userList" border stripe fit>
        <el-table-column label="用户名" prop="name" />
        <el-table-column label="角色" prop="role" />
        <el-table-column label="组织机构">
          <template slot-scope="scope">
            <span>{{ findPath(scope.row.company_id,scope.row.company) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button :disabled="scope.row.role === 'root'" size="mini" @click="viewUserdetail(scope.row)">查看</el-button>
            <el-button :disabled="scope.row.role === 'root'" size="mini" type="primary" @click="editUser(scope.row)">编辑</el-button>
            <el-button :disabled="scope.row.role === 'root'" size="mini" type="danger" @click="deleteUser(scope.$index, scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="listTotalNum"
        :current-page="currentPage"
        :page-size="pageSize"
        class="table-page"
        background
        layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="11vh">
      <el-form ref="dataForm" :model="newUser" :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="newUser.name" style="width:90%" placeholder="a-z、A-Z、0-9组合,长度限制5-16" clearable maxlength="16" minlength="5" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="newUser.password" style="width:90%" placeholder="a-z、A-Z、0-9组合,长度限制5-16" clearable maxlength="16" minlength="5" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="newUser.role" placeholder="请选择">
            <el-option v-for="item in rolelist" :key="item.value" :label="item.desc" :value="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="组织机构" prop="company_id">
          <!-- <el-cascader
            v-model="newUser.company_id"
            :options="CompanyOptions"
            :props="{ checkStrictly: true }"
            clearable
          /> -->
          <div style="height:200px;overflow:auto;">
            <span class="custom-tree-title">
              <span class="flex-item">公司名称</span>
              <span class="flex-item">厂家</span>
            </span>
            <el-tree
              ref="tree"
              :props="defaultProps"
              :data="treelist"
              node-key="id"
              accordion
              show-checkbox
              :check-strictly="true"
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
          <el-input v-model="newUser.telephone" style="width:90%" clearable />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="newUser.email" style="width:90%" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="createConfrmUser('dataForm')"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <edit-dialog :edit-manger-visible.sync="editMangerVisible" :propuserdata="UserData" @onDialogVisibleChange="dialogVisibleChange" @onUpdateInfo="updateInfo" />
  </div>
</template>

<script>
import { GetUsers, CreateUser, DeleteUser, GetRoles, GetFullTrees } from '@/api/iot-apis'
import { validname, validEmail, validPhone } from '@/utils/validate'
import EditDialog from './editUser'

export default {
  name: 'Userlist',
  components: { EditDialog },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('长度小于5位，不符合输入要求'))
      } else if (!validname(value)) {
        callback(new Error('有非法字符，请输入符合格式要求的用户名'))
      } else {
        callback()
      }
    }
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
    const validatePassword = (rule, value, callback) => {
      if (!validname(value)) {
        callback(new Error('Please enter the correct password'))
      } else {
        callback()
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
      searchKey: 'name',
      searchValue: '',
      selectOptions: [
        {
          key: 0,
          value: 'name',
          label: '用户名'
        },
        {
          key: 1,
          value: 'company',
          label: '组织机构'
        }
      ],
      listTotalNum: 0,
      currentPage: 1,
      pageSize: 10,
      userList: [],
      dialogFormVisible: false,
      newUser: {
        name: '',
        email: '',
        telephone: '',
        role: '',
        password: '',
        company_id: ''
      },
      UserData: {},
      editMangerVisible: false,
      rolelist: [],
      rules: {
        name: [
          {
            required: true,
            message: '请输入用户名,不能为空',
            trigger: 'blur'
          },
          {
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码,不能为空',
            trigger: 'blur'
          },
          {
            required: true,
            message: '请输入符合格式要求的密码',
            trigger: 'blur',
            validator: validatePassword
          }
        ],
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
      treelist: [],
      allRelationList: [],
      CompanyOptions: []
    }
  },
  watch: {
    searchValue(nval, oval) {
      this.searchUser()
    }
  },
  created() {
    this.getrolelist()
    this.alltreeRealtionlist()
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    async getAllTree() {
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
        this.$refs.tree.setCheckedKeys([a.id])
        this.selectId = []
        this.selectId.push(a.id)
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
    getUserList() {
      var like = {}
      var obj = {
        limit: this.pageSize,
        skip: this.pageSize * (this.currentPage - 1)
      }
      like[this.searchKey] = { '$regex': this.searchValue, '$options': '$i' }
      like = Object.assign(like, {}, { 'role': { '$ne': 'root' }})
      obj.q = JSON.stringify(like)
      GetUsers(obj).then(res => {
        this.userList = res.items
        this.listTotalNum = res.total_count
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
    async alltreeRealtionlist() {
      var obj = {
        limit: 0,
        skip: 0
      }
      const { items } = await GetFullTrees(obj)
      this.allRelationList = items
    },
    addUser() {
      this.getAllTree()
      this.resetUser()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.$refs.tree.setCheckedKeys([])
      })
    },
    resetUser() {
      this.newUser = {
        role: '',
        password: '12345678',
        name: '',
        email: '',
        telephone: '',
        company_id: ''
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getUserList()
    },
    searchUser() {
      this.currentPage = 1
      this.getUserList()
    },
    viewUserdetail(row) {
      this.$router.push({
        path: '/system/listdetail',
        name: 'UserDetail',
        params: { user: row }
      })
    },
    deleteUser(index, row) {
      this.$confirm('您确定要删除此用户吗？', '提示', {
        confirm: '确定',
        cancel: '取消',
        type: 'warning'
      })
        .then(() => {
          DeleteUser({ id: row }).then(
            res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              if (this.userList.length === 1 && this.currentPage >= 2) {
                this.currentPage = this.currentPage - 1
              }
              this.getUserList()
            }
          )
        })
        .catch(() => {})
    },
    editUser(row) {
      this.newUser = Object.assign({}, row) // copy obj
      this.UserData = this.newUser
      this.editMangerVisible = true
    },
    // 对话框显示变化
    dialogVisibleChange(val) {
      this.editMangerVisible = val
    },
    createConfrmUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.selectId.length === 0) {
            this.$message({
              message: '请选择组织机构',
              type: 'warning',
              showClose: true
            })
            return
          } else {
            this.newUser.company_id = this.selectId[0]
          }
          var obj = {
            body: this.newUser
          }
          CreateUser(obj).then(res => {
            this.getUserList()
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.dialogFormVisible = false
          }).catch((error) => {
            var str = ''
            if (error.message.indexOf('name_1') > -1) {
              str = ', 列表中已经存在此用户名,请重新添加'
            }
            this.$message({
              message: '添加失败' + str,
              type: 'error',
              duration: 5000
            })
          })
        } else {
          return false
        }
      })
    },
    updateInfo() {
      this.getUserList()
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
