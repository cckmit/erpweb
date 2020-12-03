<template>
  <div class="app-container">
    <span class="blue-vertical-bar">号段管理</span>
    <hr class="black-line">
    <div class="filter-container">
      <el-select v-model="searchKey" placeholder="全部" class="filter-item" style="width: 140px">
        <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="searchValue" placeholder="请输入搜索内容" style="width: 200px;" class="filter-item" clearable />
      <!-- <el-button
        type="primary"
        class="filter-item"
        icon="el-icon-edit"
        @click="addInfo"
      >添加</el-button> -->
    </div>
    <el-card>
      <el-table :data="tableData" border fit>
        <el-table-column property="operator" label="运营商" />
        <el-table-column property="section_number" label="号段" min-width="300" />
        <el-table-column property="node" label="备注" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editInfo(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" :disabled="true" @click="deleteInfo(scope.$index, scope.row.id)">删除</el-button>
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
    <!-- 添加／编辑对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="11vh">
      <el-form ref="dataForm" :model="newForm" :rules="rules" label-width="100px">
        <el-form-item v-if="dialogStatus === 'create'" label="运营商" prop="operator">
          <el-input v-model="newForm.operator" style="width:90%" clearable />
        </el-form-item>
        <el-form-item v-if="dialogStatus === 'update'" label="运营商" prop="">
          <el-input v-model="newForm.operator" :disabled="true" style="width:90%" clearable />
        </el-form-item>
        <el-form-item label="号段" prop="section_number">
          <el-input
            v-model="newForm.section_number"
            placeholder="连续输入号段即可,系统自动匹配逗号分割"
            clearable
            style="width:90%"
            @input="numberCheck"
          />
        </el-form-item>
        <el-form-item label="备注" prop="node">
          <el-input v-model="newForm.node" style="width:90%" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createConfrm():updateConfrm()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetSectionNumbers, DeleteSectionNumber, CreateSectionNumber, UpdateSectionNumber, MessageCheckDuplicateData } from '@/api/iot-apis'

export default {
  name: 'Paragraphlist',
  components: { },
  data() {
    const validateOperator = (rule, value, callback) => {
      if (this.editOperator !== value) {
        MessageCheckDuplicateData({ 'data': value, 'dataType': 'operator', 'table': 'section_number' }).then(res => {
          callback()
        }).catch(error => {
          if (error) {
            callback(new Error('列表里已经有此运营商：' + value + '，请重新填写'))
          }
        })
      } else {
        callback()
      }
    }
    return {
      searchKey: 'operator',
      searchValue: '',
      selectOptions: [
        {
          key: 0,
          value: 'operator',
          label: '运营商'
        }
      ],
      listTotalNum: 0,
      currentPage: 1,
      pageSize: 10,
      tableData: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑号段信息',
        create: '添加号段信息'
      },
      newForm: {},
      rules: {
        operator: [
          { required: true, message: '请输入运营商，不能为空', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateOperator }
        ],
        section_number: [
          { required: true, message: '请输入号段，不能为空', trigger: 'blur' }
        ]
      },
      editOperator: ''
    }
  },
  watch: {
    searchValue(nval, oval) {
      this.currentPage = 1
      this.getList()
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      var like = {}
      var obj = {
        limit: this.pageSize,
        skip: this.pageSize * (this.currentPage - 1)
      }
      like[this.searchKey] = { '$regex': this.searchValue, '$options': '$i' }
      obj.q = JSON.stringify(like)
      GetSectionNumbers(obj).then(res => {
        this.tableData = res.items
        this.listTotalNum = res.total_count
      })
    },
    addInfo() {
      this.newForm = {
        operator: '',
        section_number: '',
        node: ''
      }
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    numberCheck(val) {
      this.newForm.section_number = val.replace(/\D/g, '').replace(/...(?!$)/g, '$&,')
    },
    createConfrm() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          var obj = {
            body: this.newForm
          }
          CreateSectionNumber(obj).then(res => {
            this.getList()
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.dialogFormVisible = false
          }).catch((error) => {
            console.log(error)
          })
        } else {
          return false
        }
      })
    },
    editInfo(row) {
      this.newForm = Object.assign({}, row)
      this.editOperator = row.operator
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateConfrm() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          var obj = {
            body: this.newForm,
            id: this.newForm.id
          }
          UpdateSectionNumber(obj).then(res => {
            this.dialogFormVisible = false
            this.getList()
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          }).catch((error) => {
            console.log(error)
          })
        }
      })
    },
    deleteInfo(index, row) {
      this.$confirm('您确定要删除此运营商所有号段吗？', '提示', {
        confirm: '确定',
        cancel: '取消',
        type: 'warning'
      })
        .then(() => {
          DeleteSectionNumber({ id: row }).then(
            res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              if (this.tableData.length === 1 && this.currentPage >= 2) {
                this.currentPage = this.currentPage - 1
              }
              this.getList()
            }
          )
        }).catch(() => {})
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    }
  }
}
</script>
<style scoped>
</style>
