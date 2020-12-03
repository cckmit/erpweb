<template>
  <div class="app-container">
    <span class="blue-vertical-bar">角色列表&nbsp;&nbsp;</span>
    <hr class="black-line">
    <div class="filter-container">
      <el-select v-model="searchKey" placeholder="全部" class="filter-item" style="width: 140px">
        <el-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input v-model="searchValue" placeholder="请输入搜索内容" style="width: 200px;" class="filter-item" clearable />
      <el-button type="primary" class="filter-item" style="margin-left: 10px;" icon="el-icon-edit" @click="addRole">添加角色</el-button>
    </div>
    <el-card>
      <el-table :data="roleList" border stripe fit>
        <el-table-column label="角色" prop="name" />
        <el-table-column label="角色名" prop="desc" />
        <el-table-column label="菜单权限" align="center">
          <template slot-scope="scope">
            <el-button :disabled="scope.row.name === 'root'" size="mini" type="primary" @click="handleEdit(scope.row)">详情</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button :disabled="scope.row.name === 'root' || scope.row.name === 'factory'|| scope.row.name === 'attendant'" size="mini" type="danger" @click="deleteRole(scope.row)">删除</el-button>
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- 添加/编辑用户对话框 -->
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑角色':'添加角色'" :close-on-click-modal="false" top="11vh">
      <el-form ref="dataForm" :model="role" :rules="rules" label-width="100px">
        <el-form-item label="角色" prop="name">
          <el-input v-model="role.name" :disabled="dialogType ==='edit'" placeholder="a-z、A-Z组合(例如：user)" clearable minlength="1" />
        </el-form-item>
        <el-form-item label="角色名" prop="desc">
          <el-input
            v-model="role.desc"
            placeholder="例如：普通用户"
          />
        </el-form-item>
        <el-form-item v-if="dialogType ==='edit'" label="菜单">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="confirmRole">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import i18n from '@/lang'
import {
  CreateRole,
  GetRoles,
  DeleteRole,
  UpdateRole,
  UpdateMenus,
  GetMenus
} from '@/api/iot-apis'
import { deepClone } from '@/utils/index'
import { asyncRoutes } from '@/router/index'
import { validAlphabets } from '@/utils/validate'

const routes = deepClone([...asyncRoutes])

const defaultRole = {
  name: '',
  desc: ''
}

export default {
  name: 'Userlist',
  data() {
    const validateRolename = (rule, value, callback) => {
      if (!validAlphabets(value)) {
        callback(new Error('请输入符合格式要求的角色'))
      } else {
        callback()
      }
    }
    return {
      searchKey: 'name',
      searchValue: '',
      selectOptions: [
        {
          key: 0,
          value: 'name',
          label: '角色'
        }
      ],
      listTotalNum: 0,
      currentPage: 1,
      pageSize: 10,
      rules: {
        name: [
          {
            required: true,
            message: '请输入角色,不能为空',
            trigger: 'blur'
          },
          {
            required: true,
            trigger: 'blur',
            validator: validateRolename
          }
        ],
        desc: [
          {
            required: true,
            message: '请输入角色名,不能为空',
            trigger: 'blur'
          }
        ]
      },
      role: Object.assign({}, defaultRole),
      routes: [],
      serviceRoutes: Object.assign([], routes),
      roleList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  watch: {
    searchKey(val) {
      if (val === '') {
        this.currentPage = 1
        this.searchValue = ''
        this.getRoles()
      }
    },
    searchValue(nval, oval) {
      this.searchUser()
    }
  },
  created() {
    this.getRoutes()
    this.getRoles()
  },
  methods: {
    // 获取菜单树
    async getRoutes() {
      const routes = this.generateRoutes(this.serviceRoutes)
      this.routes = this.i18n(routes)
    },
    // 获取用户列表
    async getRoles() {
      var like = {}
      const obj = {
        skip: this.pageSize * (this.currentPage - 1),
        limit: this.pageSize
      }
      if (this.searchValue !== '') {
        like[this.searchKey] = { $regex: this.searchValue, $options: '$i' }
      }
      like = Object.assign(like, {}, { 'name': { '$ne': 'root' }})
      obj.q = JSON.stringify(like)
      const res = await GetRoles(obj)
      this.roleList = res.items
      this.listTotalNum = res.total_count
    },
    // 添加角色
    addRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 编辑角色权限
    async handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.role = deepClone(scope)
      const req = {
        rolename: this.role.name
      }
      // 获取权限列表
      const routeUrl = await GetMenus(req)
      var urlList = []
      for (const u of routeUrl) {
        urlList.push(u.url)
      }
      // 生成权限树
      this.role.routes = this.generateTree(
        deepClone(this.serviceRoutes),
        '/',
        urlList
      )
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.role.routes)
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
    },
    // 生成树
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []
      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)
        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(
            route.children,
            routePath,
            checkedKeys
          )
        }

        if (
          checkedKeys.includes(routePath) ||
          (route.children && route.children.length >= 1)
        ) {
          res.push(route)
        }
      }
      return res
    },
    confirmRole() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const isEdit = this.dialogType === 'edit'
          if (isEdit) {
            const checkedKeys = this.$refs.tree.getCheckedKeys(false)
            this.updateRoleMenus(checkedKeys)
            this.updateRoleDes(this.role)
          } else {
            if (this.role.name === 'root' || this.role.name === 'factory') {
              this.$message({
                message: '不能创建角色名为root和factory的角色',
                type: 'warning'
              })
              return
            }
            CreateRole({ body: this.role }).then(
              res => {
                this.dialogVisible = false
                this.$message({
                  message: '编辑成功',
                  type: 'success'
                })
                this.getRoles()
              }
            ).catch(error => {
              var str = ''
              if (error.message.indexOf('name_1') > -1) {
                str = ', 列表中已存在此角色名,请重新添加'
              }
              this.$message({
                message: '添加失败' + str,
                type: 'error',
                duration: 5000
              })
            })
          }
        } else {
          return false
        }
      })
    },
    async updateRoleMenus(checkedKeys) {
      var routeUrlList = []
      for (const url of checkedKeys) {
        const obj = {
          url
        }
        routeUrlList.push(obj)
      }
      const req = {
        rolename: this.role.name,
        body: routeUrlList
      }
      await UpdateMenus(req)
      this.$message({
        message: '编辑成功',
        type: 'success'
      })
      this.dialogVisible = false
    },
    updateRoleDes(role) {
      const req = {
        name: role.name,
        body: {
          name: role.name,
          desc: role.desc
        }
      }
      UpdateRole(req).then(res => {
        this.getRoles()
      })
    },
    i18n(routes) {
      const app = routes.map(route => {
        route.title = i18n.t(`route.${route.title}`)
        if (route.children) {
          route.children = this.i18n(route.children)
        }
        return route
      })
      return app
    },
    generateRoutes(routes, basePath = '/') {
      const res = []
      for (let route of routes) {
        // skip some route
        if (route.menuhidden) {
          continue
        }
        const onlyOneShowingChild = this.onlyOneShowingChild(
          route.children,
          route
        )
        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }
        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title
        }
        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }
      return false
    },
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getRoles()
    },
    searchUser() {
      this.currentPage = 1
      this.getRoles()
    },

    deleteRole(row) {
      this.$confirm('您确定要删除此角色吗？', '提示', {
        confirm: '确定',
        cancel: '取消',
        type: 'warning'
      })
        .then(() => {
          // 调用删除接口
          if (this.roleList.length === 1 && this.currentPage >= 2) {
            DeleteRole({ name: row.name }).then(res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.currentPage = this.currentPage - 1
              this.getRoles()
            })
          } else {
            DeleteRole({ name: row.name }).then(res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getRoles()
            })
          }
        })
        .catch(() => {})
    }
  }
}
</script>
<style scoped>
.search-input {
  width: 250px;
}
</style>
