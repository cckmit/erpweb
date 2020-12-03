<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="14">
        <el-card class="cardStyle">
          <span class="blue-vertical-bar">通讯簿列表</span>
          <hr class="black-line">
          <el-select v-model="searchKey" placeholder="全部" class="filter-item" style="width: 140px">
            <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-input v-model="searchValue" placeholder="请输入搜索内容" style="width: 200px;" class="filter-item" clearable />
          <el-button type="primary" class="filter-item" style="margin-left: 10px;" icon="el-icon-edit" @click="addAddressbook">添加</el-button>
          <el-button type="primary" class="filter-item" style="margin-left: 10px;" @click="importInfo">导入</el-button>
          <a href="static/unitAddressBook.xlsx" download=""><el-button class="filter-item" type="info">文件模板</el-button></a>
          <!-- 通讯簿列表 -->
          <el-table ref="multipleTable" :data="addressbookList" border style="margin-top:8px;">
            <el-table-column type="index" width="55" align="center" :index="indexMethod" />
            <el-table-column property="contact" label="姓名" />
            <el-table-column property="telephone" label="手机号码" />
            <el-table-column property="unit" label="单位" />
            <el-table-column property="station" label="岗位" />
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="editAddressBook(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteAddressbook(scope.$index, scope.row.id)">删除</el-button>
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
      </el-col>
      <!-- 通讯簿分组 -->
      <el-col :span="10">
        <el-card class="cardStyle">
          <span class="blue-vertical-bar">通讯簿分组</span>
          <hr class="black-line">
          <span class="custom-tree-title">
            <span class="flex-item">分组名称</span>
            <span class="flex-item">备注</span>
            <span class="flex-item">操作</span>
          </span>
          <el-tree
            ref="tree"
            :props="defaultProps"
            :default-expanded-keys="deFaultExpandedKeys"
            node-key="id"
            highlight-current
            :load="loadNode"
            lazy
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span class="flex-item" :title="data.group_name">
                <i v-if="data.id === 'addressbook'" class="el-icon-folder-opened" />
                <i v-else class="el-icon-document" />
                {{ data.group_name }}</span>
              <span class="flex-item">{{ data.remark }}</span>
              <span>
                <el-button
                  :title="'查看'"
                  type="text"
                  icon="el-icon-s-unfold"
                  :disabled="data.id === 'addressbook'"
                  @click="() => view(node, data)"
                />
                <el-button
                  :title="'添加'"
                  type="text"
                  icon="el-icon-plus"
                  @click="() => append(node, data)"
                />
                <el-button
                  :title="'修改'"
                  type="text"
                  icon="el-icon-edit"
                  :disabled="data.id === 'addressbook'"
                  @click="() => edit(node, data)"
                />
                <el-button
                  :title="'删除'"
                  type="text"
                  icon="el-icon-delete"
                  :disabled="data.id === 'addressbook'"
                  @click="() => remove(node, data)"
                />
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
    </el-row>
    <!-- 添加/编辑企业通讯录对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :before-close="CloseDialog" top="11vh">
      <el-form ref="dataForm" :model="newBookUser" :rules="rules" label-width="100px">
        <el-form-item label="姓名" prop="contact">
          <el-input v-model="newBookUser.contact" style="width:90%" clearable @blur="checkDupliConfrim(newBookUser.contact, 'contact', 'company_address_book')" />
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="newBookUser.telephone" style="width:90%" clearable @blur="checkDupliConfrim(newBookUser.telephone, 'telephone', 'company_address_book')" />
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-select v-model="newBookUser.unit" placeholder="请选择单位">
            <el-option
              v-for="item in companyOptions"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="岗位" prop="station">
          <el-input v-model="newBookUser.station" style="width:90%" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="CloseDialog">取消</el-button>
        <el-button type="primary" :disabled="confimDisable" @click="dialogStatus==='create'?createConfrmUser('dataForm'):updateConfrmUser('dataForm')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 导入对话框 -->
    <el-dialog title="导入信息" :visible.sync="dialogImportFormVisible" :close-on-click-modal="false" top="11vh">
      <el-form ref="dataForm" label-width="120px">
        <el-form-item label="请选择文件:" prop="">
          <el-input v-model="cmdFile" placeholder="" readonly style="width:300px;">
            <el-button slot="append" icon="el-icon-plus" @click="pushCMDFile()" />
          </el-input>
          <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls, .csv" @change="changeCMDFile">
        </el-form-item>
        <el-form-item label="" prop="">
          <span>文件要求excel、或csv格式</span>
        </el-form-item>
        <el-form-item label="导入的数据:" prop="">
          <el-table :data="importData" class="tb-edit" border height="200">
            <el-table-column label="姓名">
              <template slot-scope="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.contact" size="small" placeholder="" />
                <span v-else>{{ scope.row.contact }}</span>
              </template>
            </el-table-column>
            <el-table-column label="电话号码">
              <template slot-scope="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.telephone" size="small" placeholder="" />
                <span v-else>{{ scope.row.telephone }}</span>
              </template>
            </el-table-column>
            <el-table-column label="单位">
              <template slot-scope="scope">
                <el-select v-if="scope.row.edit" v-model="scope.row.unit" placeholder="请选择单位">
                  <el-option
                    v-for="item in companyOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
                <span v-else>{{ scope.row.unit }}</span>
              </template>
            </el-table-column>
            <el-table-column label="岗位">
              <template slot-scope="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.station" size="small" placeholder="" />
                <span v-else>{{ scope.row.station }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="180">
              <template slot-scope="scope">
                <el-button v-if="scope.row.edit" size="mini" type="success" @click="ConfirmCom(scope.row)">保存</el-button>
                <el-button v-else size="mini" type="primary" @click="scope.row.edit=!scope.row.edit">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteport(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportFormVisible = false">取消</el-button>
        <el-button v-if="createDisable" type="primary" @click="importInfoCheck">校验</el-button>
        <el-button v-else type="success" @click="createImportData()">确定</el-button>
      </div>
    </el-dialog>
    <!-- 添加/编辑子级分组 -->
    <el-dialog :title="textMapChild[dialogStatusChild]" :visible.sync="dialogZiFormVisible" :close-on-click-modal="false" :before-close="CloseGroupDialog" top="11vh">
      <el-form ref="dataFormChild" :model="newChild" :rules="rulesChild" label-width="120px">
        <el-form-item label="分组名称" prop="group_name">
          <el-input v-model="newChild.group_name" clearable maxlength="16" minlength="1" @blur="checkDupliConfrim(newChild.group_name, 'groupname', 'company_group')" />
        </el-form-item>
        <el-form-item label="分组成员" prop="address_book_id">
          <el-select v-model="newChild.address_book_id" multiple filterable placeholder="请选择成员" style="width:100%" @change="changeContact">
            <el-option
              v-for="item in addressBookOptions"
              :key="item.id"
              :label="item.contact"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分组隧道" prop="tunnel_id">
          <el-select v-model="newChild.tunnel_id" multiple filterable placeholder="请选择隧道" style="width:100%">
            <el-option
              v-for="item in tunnelOptions"
              :key="item.id"
              :label="item.tunnel_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="newChild.remark" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogZiFormVisible = false">取消</el-button>
        <el-button type="primary" :disabled="confimDisable" @click="dialogStatusChild==='create'?appendConfirm():updateConfrm()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { GetCompanyAddressBooks, CreateCompanyAddressBook, DeleteCompanyAddressBook, UpdateCompanyAddressBook, InsertCompanyAddressBooks, GetCompanyGroupsByID,
  GetTunnels, CreateCompanyGroup, DeleteCompanyGroup, UpdateCompanyGroup, MessageCheckDuplicateData, MessageCheckInsertDuplicateData, GetCompanysByID } from '@/api/iot-apis'
import { validPhone } from '@/utils/validate'
import XLSX from 'xlsx'

export default {
  name: 'ComapanyAddressbook',
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error('Please enter the correct phone'))
      } else {
        callback()
      }
    }
    return {
      searchKey: 'contact',
      searchValue: '',
      selectOptions: [
        {
          key: 0,
          value: 'contact',
          label: '姓名'
        },
        {
          key: 1,
          value: 'unit',
          label: '单位'
        },
        {
          key: 2,
          value: 'station',
          label: '岗位'
        }
      ],
      listTotalNum: 0,
      currentPage: 1,
      pageSize: 10,
      addressbookList: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑企业通讯薄',
        create: '添加企业通讯薄'
      },
      newBookUser: {},
      companyOptions: [],
      editContact: '',
      editTelephone: '',
      rules: {
        contact: [
          { required: true, message: '请输入姓名,不能为空', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入手机号码,不能为空', trigger: 'blur' },
          { required: true, message: '请输入正确手机号', trigger: 'blur', validator: validatePhone }
        ]
      },
      confimDisable: false,
      dialogImportFormVisible: false,
      importData: [],
      cmdFile: '',
      createDisable: true,
      dialogZiFormVisible: false,
      newChild: {
        group_name: '',
        address_book_id: [],
        tunnel_id: [],
        remark: ''
      },
      editGroupname: '',
      addressBookOptions: [],
      tunnelOptions: [],
      parentid: '',
      datachildren: [],
      rulesChild: {
        group_name: [
          { required: true, message: '请输入分组名称,不能为空', trigger: 'blur' }
        ]
      },
      dialogStatusChild: '',
      textMapChild: {
        update: '编辑子级分组信息',
        create: '添加子级分组信息'
      },
      currentInfo: {
        id: '',
        group_name: '',
        remark: ''
      },
      defaultProps: {
        id: 'id',
        children: 'children',
        group_name: 'group_name',
        remark: 'remark',
        address_book: 'address_book',
        tunnel_id: 'tunnel_id',
        isLeaf: 'leaf'
      },
      deFaultExpandedKeys: []
    }
  },
  watch: {
    searchValue(nval, oval) {
      this.currentPage = 1
      this.listTotalNum = this.listTotalNum
      this.getBookList()
    }
  },
  created() {
    this.getBookList()
    this.getAlltunnellist()
  },
  methods: {
    getBookList() {
      var like = {}
      var obj = {
        limit: this.pageSize,
        skip: this.pageSize * (this.currentPage - 1)
      }
      like[this.searchKey] = { '$regex': this.searchValue, '$options': '$i' }
      obj.q = JSON.stringify(like)
      GetCompanyAddressBooks(obj).then(res => {
        this.addressbookList = res.items
        this.listTotalNum = res.total_count
      })
    },
    async loadNode(node, resolve) {
      if (node.level === 0) {
        var list = [
          {
            group_name: '通讯薄分组',
            id: 'addressbook',
            remark: ''
          }
        ]
        this.deFaultExpandedKeys = ['addressbook']
        return resolve(list)
      } else {
        const { items } = await GetCompanyGroupsByID({ 'id': node.data.id })
        const List = this.getTreeRootlist(items)
        return resolve(List)
      }
    },
    getTreeRootlist(data) {
      if (data && data.length === 0) {
        return []
      }
      const List = []
      for (var item of data) {
        var treeobj = {
          group_name: item.group_name,
          id: item.id,
          remark: item.remark,
          address_book: item.address_book,
          tunnel_name: item.tunnel_name,
          tunnel_id: item.tunnel_id
        }
        List.push(treeobj)
      }
      return List
    },
    addAddressbook() {
      this.newBookUser = {
        contact: '',
        telephone: '',
        unit: '',
        station: ''
      }
      this.dialogStatus = 'create'
      this.getCompanyslist()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    getCompanyslist() {
      GetCompanysByID({ 'id': 'root' }).then((res) => {
        this.companyOptions = res.items
      })
    },
    CloseDialog() {
      this.dialogFormVisible = false
      this.confimDisable = false
    },
    checkDupliConfrim(value, datatype, table) {
      var flag = this.checkFalg(value, datatype)
      if (flag || this.dialogStatus === 'create' || this.dialogStatusChild === 'create') {
        MessageCheckDuplicateData({ 'data': value, 'dataType': datatype, 'table': table }).then(res => {
          this.confimDisable = false
        }).catch(error => {
          if (error) {
            this.$message({
              message: '列表里已经有此信息：' + value + '，请重新填写',
              type: 'warning'
            })
          }
          this.confimDisable = true
        })
      } else {
        this.confimDisable = false
      }
    },
    checkFalg(value, datatype) {
      var flag = false
      switch (datatype) {
        case 'contact':
          if (this.editContact !== value) {
            flag = true
          }
          break
        case 'telephone':
          if (this.editTelephone !== value) {
            flag = true
          }
          break
        case 'groupname':
          if (this.editGroupname !== value) {
            flag = true
          }
          break
      }
      return flag
    },
    createConfrmUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var obj = {
            body: this.newBookUser
          }
          CreateCompanyAddressBook(obj).then(res => {
            this.getBookList()
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.dialogFormVisible = false
          }).catch((error) => {
            var str = this.getErrorInfo(error)
            this.$message({
              message: '添加失败' + str,
              type: 'error'
            })
          })
        } else {
          return false
        }
      })
    },
    editAddressBook(row) {
      this.newBookUser = Object.assign({}, row)
      this.editContact = row.contact
      this.editTelephone = row.telephone
      this.newBookUser.id = row.id
      this.dialogStatus = 'update'
      this.getCompanyslist()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateConfrmUser() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          var obj = {
            body: this.newBookUser,
            id: this.newBookUser.id
          }
          UpdateCompanyAddressBook(obj).then(res => {
            this.dialogFormVisible = false
            this.getBookList()
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          }).catch((error) => {
            var str = this.getErrorInfo(error)
            this.$message({
              message: '修改失败' + str,
              type: 'error'
            })
          })
        }
      })
    },
    getErrorInfo(error) {
      var str = ''
      if (error.message.indexOf('contact_1') > -1) {
        str = ', 列表中已经存在此姓名，请重新填写'
      }
      if (error.message.indexOf('telephone_1') > -1) {
        str = ', 列表中已经存在此电话号码，请重新填写'
      }
      if (error.message.indexOf('groupname_1') > -1) {
        str = ', 已经存在此组名，请重新填写'
      }
      return str
    },
    indexMethod(index) {
      if (this.currentPage <= 1) {
        return index + 1
      } else {
        return (this.currentPage * 10 + 1 + index) - 10
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getBookList()
    },
    deleteAddressbook(index, row) {
      this.$confirm('您确定要删除此条信息吗？', '提示', {
        confirm: '确定',
        cancel: '取消',
        type: 'warning'
      })
        .then(() => {
          DeleteCompanyAddressBook({ id: row }).then(
            res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              if (this.addressbookList.length === 1 && this.currentPage >= 2) {
                this.currentPage = this.currentPage - 1
              }
              this.getBookList()
            }
          )
        }).catch(() => {})
    },
    importInfo() {
      this.dialogImportFormVisible = true
      this.getCompanyslist()
    },
    pushCMDFile() {
      this.$refs['excel-upload-input'].click()
    },
    changeCMDFile(e) {
      const files = e.target.files
      const rawFile = files[0]
      if (!this.isExcel(rawFile)) {
        this.$message.error('Only supports upload .xlsx, .xls, .csv suffix files')
        return false
      }
      this.cmdFile = rawFile.name
      this.readerData(rawFile)
      this.$refs['excel-upload-input'].value = null
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    },
    readerData(rawFile) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const fixedData = this.fixData(data)
          const workbook = XLSX.read(fixedData, { type: 'binary' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const results = XLSX.utils.sheet_to_json(worksheet, { raw: false, header: 'A' })
          this.generateData({ results })
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    fixData(data) {
      let o = ''
      let l = 0
      const w = 10240
      for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
    generateData({ results }) {
      if (results.length === 0) {
        this.$message({
          message: '文件数据为空',
          type: 'warning'
        })
      } else {
        this.importData = this.analyseInputData(results)
      }
    },
    analyseInputData(list) {
      list.splice(0, 1)
      const results = []
      var comynamelist = []
      for (var c of this.companyOptions) {
        comynamelist.push(c.name)
      }
      for (const item of list) {
        var obj = {
          edit: false,
          contact: item.A,
          telephone: item.B,
          unit: item.C,
          station: item.D
        }
        if (obj.contact === '' || obj.telephone === '') {
          this.$message({
            message: '姓名和电话号不能为空',
            type: 'warning'
          })
          break
        }
        if (comynamelist.indexOf(obj.unit) === -1) {
          this.$message({
            type: 'warning',
            message: '单位‘' + obj.unit + '’不在组织结构列表里，请重新导入',
            duration: 5000
          })
          break
        }
        results.push(obj)
      }
      return results
    },
    importInfoCheck() {
      if (this.importData.length === 0) {
        this.$message({
          message: '文件数据为空',
          type: 'warning'
        })
        return
      }
      MessageCheckInsertDuplicateData({ 'body': this.importData }).then((res) => {
        if (res.info === 'OK') {
          this.createDisable = false
        }
      }).catch((error) => {
        if (error) {
          this.$message({
            message: error.message,
            type: 'warning'
          })
          this.cmdFile = ''
          this.$refs['excel-upload-input'].value = null
          this.createDisable = true
        }
      })
    },
    createImportData() {
      InsertCompanyAddressBooks({ 'body': this.importData }).then((res) => {
        this.$message({
          type: 'success',
          message: '导入成功'
        })
        this.getBookList()
        this.dialogImportFormVisible = false
        this.cmdFile = ''
        this.importData = []
        this.$refs['excel-upload-input'].value = null
        this.createDisable = true
      }).catch((error) => {
        var str = this.getErrorInfo(error)
        this.$message({
          message: '导入失败' + str,
          type: 'error'
        })
        this.cmdFile = ''
        this.$refs['excel-upload-input'].value = null
        this.createDisable = true
      })
    },
    deleteport(index) {
      this.importData.splice(index, 1)
    },
    ConfirmCom(v) {
      v.edit = false
    },
    append(node, data) {
      this.getAlladdressbooklist()
      this.newChild = {
        group_name: '',
        address_book_id: [],
        tunnel_id: [],
        remark: ''
      }
      this.datachildren = node
      this.parentid = data.id
      this.dialogStatusChild = 'create'
      this.dialogZiFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataFormChild'].clearValidate()
      })
    },
    CloseGroupDialog(done) {
      this.dialogZiFormVisible = false
      this.confimDisable = false
    },
    getAlladdressbooklist() {
      var obj = {
        limit: 0,
        skip: 0
      }
      GetCompanyAddressBooks(obj).then(res => {
        this.addressBookOptions = res.items
      })
    },
    getAlltunnellist() {
      var obj = {
        limit: 0,
        skip: 0
      }
      GetTunnels(obj).then(res => {
        this.tunnelOptions = res.items
      })
    },
    appendConfirm() {
      this.$refs['dataFormChild'].validate((valid) => {
        if (valid) {
          var obj = {
            parentid: this.parentid,
            body: this.newChild
          }
          CreateCompanyGroup(obj).then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            var objzi = {
              id: res.id,
              group_name: res.group_name,
              remark: res.remark,
              address_book: res.address_book,
              tunnel_id: res.tunnel_id,
              isLeaf: true
            }
            this.dialogZiFormVisible = false
            this.$refs.tree.append(objzi, this.datachildren)
            this.datachildren = {}
          }).catch((error) => {
            var str = this.getErrorInfo(error)
            this.$message({
              message: '添加失败' + str,
              type: 'error'
            })
          })
        }
      })
    },
    edit(node, data) {
      this.getAlladdressbooklist()
      this.dialogStatusChild = 'update'
      this.dialogZiFormVisible = true
      this.newChild = Object.assign({}, data)
      this.editGroupname = this.newChild.group_name
      var address_book_idlist = []
      for (var item of data.address_book) {
        address_book_idlist.push(item.id)
      }
      this.newChild.address_book_id = address_book_idlist
      this.currentInfo = data
      this.$nextTick(() => {
        this.$refs['dataFormChild'].clearValidate()
      })
    },
    changeContact() {
      this.$forceUpdate()
    },
    updateConfrm() {
      this.$refs['dataFormChild'].validate((valid) => {
        if (valid) {
          var obj = {
            body: this.newChild,
            id: this.newChild.id
          }
          UpdateCompanyGroup(obj).then(
            res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.dialogZiFormVisible = false
              this.currentInfo.group_name = res.group_name
              this.currentInfo.remark = res.remark
              this.currentInfo.tunnel_id = res.tunnel_id
              this.currentInfo.address_book_id = []
              for (var item of res.address_book) {
                this.currentInfo.address_book_id.push(item.id)
              }
            }
          ).catch(error => {
            var str = this.getErrorInfo(error)
            this.$message({
              message: '修改失败' + str,
              type: 'error'
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
          DeleteCompanyGroup({ id: data.id }).then(
            res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.$refs.tree.remove(data)
            }
          )
        }).catch(() => {})
    },
    view(node, data) {
      this.$router.push({
        path: '/message/groupdetail',
        name: 'GroupDetail',
        params: { datailData: data }
      })
    }
  }
}
</script>
<style scoped>
.excel-upload-input {
  display: none;
}
.custom-tree-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    margin-top: 8px;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    padding-right: 8px;
  }
.custom-tree-node  .flex-item {
    width: 120px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.custom-tree-title .flex-item {
    width: 70px;
    height:32px;
}
</style>
