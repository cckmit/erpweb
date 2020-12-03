<template>
  <div class="app-container">
    <span class="blue-vertical-bar">组织机构&nbsp;&nbsp;</span>
    <hr class="black-line">
    <div style="margin-bottom:15px;">
      <el-input
        v-model="filterText"
        clearable
        placeholder="组织机构名称"
        style="width:220px;"
      />
      <el-select v-model="searchFactory" clearable placeholder="厂家" class="filter-item" style="width: 140px" @change="changeFactory">
        <el-option
          v-for="item in ifOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-edit"
        style="margin-left:12px;"
        @click="addCompany"
      >添加第一级组织机构</el-button>
      <!-- :accordion="true" :load="loadNode" lazy-->
    </div>
    <div class="invoice-list">
      <ul class="invoice-header">
        <li class="invoice-item">名称</li>
        <li class="invoice-item">厂家</li>
        <li class="invoice-item">简称</li>
        <li class="invoice-item">地址</li>
        <li class="invoice-item">操作</li>
      </ul>
      <el-tree
        id="orTree"
        ref="tree"
        :data="datalist"
        :props="defaultProps"
        :default-expanded-keys="selectExpand"
        node-key="id"
        highlight-current
      >
        <div slot-scope="{ node, data }" class="custom-tree-node">
          <span class="table_info_node">
            <span class="table_info_item" :title="data.name">{{ data.name }}</span>
            <span class="table_info_item">{{ data.factory }}</span>
            <span class="table_info_item">{{ data.short }}</span>
            <span class="table_info_item" :title="data.address">{{ data.address }}</span>
            <!-- <span class="flex-item">{{ data.status }}</span>
          <span class="flex-item">{{ data.desc }}</span> -->
            <span class="table_info_item">
              <el-button
                type="text"
                size=""
                icon="el-icon-plus"
                @click="() => append(node, data)"
              >增加</el-button>
              <el-button
                type="text"
                size=""
                icon="el-icon-edit"
                @click="() => edit(node, data)"
              >编辑</el-button>
              <el-button
                type="text"
                size=""
                icon="el-icon-delete"
                @click="() => remove(node, data)"
              >删除</el-button>
            </span>
          </span>
        </div>
      </el-tree>

    </div>
    <!-- 添加第一级对话框  :load="loadNode"-->
    <el-dialog title="添加第一级组织" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="11vh">
      <el-form ref="dataForm" :model="newForm" :rules="rulesOne" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="newForm.name" style="width:90%" placeholder="支持汉字,a-z、A-Z、0-9组合,长度限制1-16" clearable maxlength="16" minlength="1" />
        </el-form-item>
        <el-form-item label="厂家" prop="factory">
          <el-select v-model="newForm.factory" placeholder="请选择">
            <el-option
              v-for="item in ifOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="简称" prop="short">
          <el-input v-model="newForm.short" style="width:90%" maxlength="24" minlength="1" placeholder="" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="newForm.address" style="width:90%" clearable placeholder="" />
        </el-form-item>
        <!-- <el-form-item label="状态" prop="status">
          <el-select v-model="newForm.status" placeholder="请选择">
            <el-option
              v-for="item in statuOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="newForm.desc" type="textarea" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="createData()"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 添加子级 -->
    <el-dialog title="添加子级组织" :visible.sync="dialogZiFormVisible" :close-on-click-modal="false" top="11vh">
      <el-form ref="dataFormChild" :model="newChild" :rules="rulesChild" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="newChild.name" style="width:90%" placeholder="支持汉字,a-z、A-Z、0-9组合,长度限制1-16" clearable maxlength="16" minlength="1" />
        </el-form-item>
        <el-form-item label="厂家" prop="factory">
          <el-select v-model="newChild.factory" placeholder="请选择" disabled>
            <el-option
              v-for="item in ifOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="简称" prop="short">
          <el-input v-model="newChild.short" style="width:90%" placeholder="" maxlength="24" minlength="1" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="newChild.address" style="width:90%" clearable placeholder="" />
        </el-form-item>
        <!-- <el-form-item label="状态" prop="status">
          <el-select v-model="newChild.status" placeholder="请选择">
            <el-option
              v-for="item in statuOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="newChild.desc" type="textarea" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogZiFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="appendConfirm()"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑信息对话框 -->
    <el-dialog title="编辑当前信息" :visible.sync="dialogEditFormVisible" :close-on-click-modal="false" top="11vh">
      <el-form ref="dataFormEdit" :model="editForm" :rules="rulesEdit" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name" style="width:90%" placeholder="支持汉字,a-z、A-Z、0-9组合,长度限制1-16" clearable maxlength="16" minlength="1" />
        </el-form-item>
        <el-form-item label="厂家" prop="factory">
          <el-select v-model="editForm.factory" placeholder="请选择" :disabled="zieditFlag">
            <el-option
              v-for="item in ifOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="简称" prop="short">
          <el-input v-model="editForm.short" style="width:90%" placeholder="" maxlength="24" minlength="1" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editForm.address" style="width:90%" clearable placeholder="" />
        </el-form-item>
        <!-- <el-form-item label="状态" prop="status">
          <el-select v-model="editForm.status" placeholder="请选择">
            <el-option
              v-for="item in statuOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="editForm.desc" type="textarea" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="editConfirm()"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { CreateCompany, GetCompanys, GetCompanysByID, UpdateCompany, DeleteCompany, GetFullTrees } from '@/api/iot-apis'

export default {
  name: 'Organization',
  components: {},
  filters: {
  },
  data() {
    return {
      defaultProps: {
        id: 'id',
        children: 'children',
        name: 'name',
        factory: 'factory',
        short: 'short',
        address: 'address',
        status: 'status',
        desc: 'desc',
        isLeaf: 'leaf'
      },
      datalist: [],
      unitOptions: [],
      unitEditOptions: [],
      dialogFormVisible: false,
      dialogZiFormVisible: false,
      dialogEditFormVisible: false,
      rootid: 'root',
      parentid: '',
      newForm: {
        name: '',
        factory: '否',
        short: '',
        address: '',
        status: '',
        desc: ''
      },
      ifOptions: [{
        name: '是',
        value: '是'
      }, {
        name: '否',
        value: '否'
      }],
      newChild: {
        name: '',
        factory: '否',
        short: '',
        address: '',
        status: '',
        desc: ''
      },
      editForm: {
        name: '',
        factory: '',
        short: '',
        address: '',
        status: '',
        desc: ''
      },
      datachildren: [],
      currentInfo: {
        id: '',
        name: '',
        address: '',
        status: '',
        desc: ''
      },
      statuOptions: [{
        name: '开启',
        value: '开启'
      }, {
        name: '关闭',
        value: '关闭'
      }],
      rulesOne: {
        name: [
          {
            required: true,
            message: '请输入名称,不能为空',
            trigger: 'blur'
          }
        ],
        short: [
          {
            required: true,
            message: '请输入简称,不能为空',
            trigger: 'blur'
          }
        ]
      },
      rulesChild: {
        name: [
          {
            required: true,
            message: '请输入名称,不能为空',
            trigger: 'blur'
          }
        ],
        short: [
          {
            required: true,
            message: '请输入简称,不能为空',
            trigger: 'blur'
          }
        ]
      },
      rulesEdit: {
        name: [
          {
            required: true,
            message: '请输入名称,不能为空',
            trigger: 'blur'
          }
        ],
        short: [
          {
            required: true,
            message: '请输入简称,不能为空',
            trigger: 'blur'
          }
        ]
      },
      zieditFlag: false,
      filterText: '',
      searchFactory: '',
      selectExpand: [],
      allTreeData: []
    }
  },
  watch: {
    filterText(val) {
      this.filterNode(val)
    }
  },
  created() {
  },
  mounted() {
    this.getAllTree()
  },
  methods: {
    getUnitlist() {
      var unitobj = {
        limit: 0,
        skip: 0,
        q: ''
      }
      GetCompanys(unitobj).then(res => {
        this.unitOptions = res.items
      })
    },
    async loadNode(node, resolve) {
      if (node.level === 0) {
        const { items } = await GetCompanysByID({ 'id': this.rootid })
        const List = this.getTreeRootlist(items)
        return resolve(List)
      } else {
        const { items } = await GetCompanysByID({ 'id': node.data.id })
        const List = this.getTreeRootlist(items)
        return resolve(List)
      }
    },
    async getAllTree() {
      var obj = {
        limit: 0,
        skip: 0
      }
      const { items } = await GetFullTrees(obj)
      for (var item of items) {
        if (item.parent_id === 'root') {
          this.datalist = []
          for (var v of item.children_ids) {
            this.findid(v, items)
          }
        }
      }
      this.allTreeData = JSON.parse(JSON.stringify(this.datalist))
    },
    findid(v, items) {
      for (var item of items) {
        if (v === item.parent_id) {
          var obj = {
            id: v,
            name: item.company.name,
            factory: item.company.factory,
            short: item.company.short || '',
            address: item.company.address || '',
            status: item.company.status || '',
            desc: item.company.desc || '',
            children: this.findChiLd(item.children_ids, items)
          }
          this.datalist.push(obj)
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
              short: item.company.short || '',
              address: item.company.address || '',
              status: item.company.status || '',
              desc: item.company.desc || '',
              children: this.findChiLd(item.children_ids, items)
            }
            data.push(obj)
          }
        }
      }
      return data
    },
    getTreeRootlist(data) {
      if (data && data.length === 0) {
        return []
      }
      const List = []
      for (var item of data) {
        var treeobj = {
          name: item.name,
          id: item.id,
          factory: item.factory,
          short: item.short || '',
          address: item.address || '',
          status: item.status || '',
          desc: item.desc || ''
        }
        List.push(treeobj)
      }
      return List
    },
    addCompany() {
      this.newForm = {
        name: '',
        factory: '否',
        short: '',
        address: '',
        status: '',
        desc: ''
      }
      this.filterText = ''
      this.dialogFormVisible = true
      this.getUnitlist()
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          var obj = {
            parentid: 'root',
            body: this.newForm
          }
          CreateCompany(obj).then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            var obj = {
              id: res.id,
              name: res.name,
              factory: res.factory,
              short: res.short,
              address: res.address,
              status: res.status,
              desc: res.desc,
              children: []
            }
            this.datalist.push(obj)
          }).catch(error => {
            var str = ''
            if (error.message.indexOf('short_1') > -1) {
              str = ', 列表中已经存在此简称,请重新添加'
            }
            this.$message({
              message: '添加失败' + str,
              type: 'error',
              duration: 5000
            })
          })
        }
      })
    },
    append(node, data) {
      this.newChild = {
        name: '',
        address: '',
        status: '',
        desc: ''
      }
      this.newChild.factory = data.factory
      this.datachildren = node
      this.dialogZiFormVisible = true
      this.getUnitlist()
      this.$nextTick(() => {
        this.$refs['dataFormChild'].clearValidate()
      })
      this.parentid = data.id
    },
    appendConfirm() {
      this.$refs['dataFormChild'].validate((valid) => {
        if (valid) {
          var ziobj = {
            parentid: this.parentid,
            body: this.newChild
          }
          CreateCompany(ziobj).then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            var objzi = {
              id: res.id,
              factory: res.factory,
              short: res.short,
              name: res.name,
              address: res.address,
              status: res.status,
              desc: res.desc,
              children: []
            }
            this.dialogZiFormVisible = false
            this.$refs.tree.append(objzi, this.datachildren)
            this.datachildren = {}
          }).catch(error => {
            var str = ''
            if (error.message.indexOf('short_1') > -1) {
              str = ', 列表中已经存在此简称,请重新添加'
            }
            this.$message({
              message: '添加失败' + str,
              type: 'error',
              duration: 5000
            })
          })
        }
      })
    },
    edit(node, data) {
      if (node.level === 1) {
        this.zieditFlag = false
      } else {
        this.zieditFlag = true
      }
      this.editForm = Object.assign({}, data)
      this.currentInfo = data
      this.dialogEditFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataFormEdit'].clearValidate()
      })
    },
    editConfirm() {
      this.$refs['dataFormEdit'].validate((valid) => {
        if (valid) {
          var obj = {
            body: this.editForm,
            id: this.editForm.id
          }
          UpdateCompany(obj).then(
            res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.dialogEditFormVisible = false
              this.currentInfo.name = res.name
              this.currentInfo.factory = res.factory
              this.currentInfo.short = res.short
              this.currentInfo.desc = res.desc
              this.currentInfo.status = res.status
              this.currentInfo.address = res.address
              this.getAllTree()
            }
          ).catch(error => {
            var str = ''
            if (error.message.indexOf('short_1') > -1) {
              str = ', 列表中已经存在此简称,请重新编辑'
            }
            this.$message({
              message: '修改失败' + str,
              type: 'error',
              duration: 5000
            })
          })
        }
      })
    },
    remove(node, data) {
      this.$confirm('您确定要删除吗？', '提示', {
        confirm: '确定',
        cancel: '取消',
        type: 'warning'
      })
        .then(() => {
          DeleteCompany({ id: data.id }).then(
            res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.$refs.tree.remove(data)
            }
          )
        })
        .catch(() => {})
    },
    filterNode(value, nameflag) {
      this.selectExpand = []
      const List = JSON.parse(JSON.stringify(this.allTreeData))
      if (value === '') {
        this.datalist = List
      } else {
        if (nameflag === 'fact') {
          this.datalist = this.judgeFact(value, List)
        } else {
          this.datalist = this.judgeNode(value, List)
        }
      }
    },
    judgeNode(value, List, father) {
      const result = []
      let flag
      for (const item of List) {
        if (father || item.name.indexOf(value) !== -1) {
          flag = true
          this.selectExpand.push(item.id)
        } else {
          flag = false
        }
        if (item.children && item.children.length > 0) {
          item.children = this.judgeNode(value, item.children, flag)
          if (item.children.length > 0) {
            flag = true
          }
        }
        if (flag || father) {
          result.push(item)
        }
      }
      return result
    },
    judgeFact(value, List, father) {
      const result = []
      let flag
      for (const item of List) {
        if (father || item.factory === value) {
          flag = true
        } else {
          flag = false
        }
        if (item.children && item.children.length > 0) {
          item.children = this.judgeNode(value, item.children, flag)
          if (item.children.length > 0) {
            flag = true
          }
        }
        if (flag || father) {
          result.push(item)
        }
      }
      return result
    },
    changeFactory(val) {
      if (val === null) {
        this.searchFactory = ''
      }
      this.filterNode(this.searchFactory, 'fact')
    }
  }
}
</script>
<style lang="scss">
.invoice-list {
    border: 1px solid #ebeef5;
    height: calc(80vh - 64px);
    overflow: auto;
    margin-top: 10px;
    .invoice-header {
      background-color: #f8f8f9;
      display: flex;
      padding-left: 23px;
      border-bottom: 1px solid #ebeef5;
      list-style: none;
      color:#515358;
      font-weight: 500;
      .invoice-item {
        padding: 10px;
        padding-right: 0;
        flex: 1;
        border-left: 1px solid #ebeef5;
        padding-left: 10px;
      }
    }
    .el-tree-node__content {
      height: 40px;
      border-bottom: 1px solid #dfe6ec;
    }
    .el-tree-node__children {
      .el-tree-node__content {
        background: #fff;
        border-bottom: 1px solid #dfe6ec;
      }
    }
    .custom-tree-node {
      width: 100%;
      height: 100%;
      .table_info_node {
        display: flex;
        height: 100%;
        .table_info_item {
          flex: 1;
          height: 100%;
          padding-left: 10px;
          line-height: 40px;
        }
      }
    }
  }
</style>
