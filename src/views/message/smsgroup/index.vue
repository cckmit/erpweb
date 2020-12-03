<template>
  <div class="app-container">
    <span class="blue-vertical-bar">短信群发&nbsp;&nbsp;</span>
    <hr class="black-line">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="cardStyle">
          <div slot="header">
            <span>通讯簿分组</span>
            <el-button style="float: right; padding: 3px 0;color:#13ce66" type="text" @click="confirmTree">确认</el-button>
            <el-button style="float: right; margin-right:5px;padding: 3px 0;color:#ff4949" type="text" @click="resetCheckedTree">重选</el-button>
          </div>
          <el-tree
            ref="tree"
            :props="defaultProps"
            :data="groupTreelist"
            :default-expanded-keys="deFaultExpandedKeys"
            highlight-current
            node-key="id"
            show-checkbox
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span class="flex-item" :title="data.label">
                <i v-show="data.address_book || data.id === 'addressbook'" class="el-icon-folder-opened" />
                {{ data.label }}</span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card class="cardStyle">
          <el-form ref="dataForm" :model="smsgroupform" :rules="rules" label-width="140px">
            <el-form-item label="发送号码：" prop="telephones">
              <el-input
                v-model="smsgroupform.telephones"
                placeholder="请从左侧通讯簿里选择"
                type="textarea"
                disabled="disabled"
                :autosize="{ minRows: 3, maxRows: 8}"
              />
            </el-form-item>
            <el-form-item label="附加号码：" prop="attach_num">
              <el-input
                v-model="smsgroupform.attach_num"
                placeholder="请输入附加号码(注：连续输入号码即可,系统自动匹配逗号分割)"
                clearable
                @input="phoneCheck"
                @change="phoneChange"
              />
            </el-form-item>
            <el-form-item label="发送内容：" prop="content">
              <el-input
                v-model="smsgroupform.content"
                :autosize="{ minRows: 4, maxRows: 8}"
                maxlength="694"
                minlength="1"
                style="width:70%;"
                type="textarea"
                placeholder="请输入发送内容"
              />
            </el-form-item>
            <el-form-item label="">
              <span>
                注：短信内容不能超过694字,每70字发送一条短信，电子签名为：“迪森电气”.
              </span>
            </el-form-item>
            <el-form-item label="定时发送时间：" prop="time">
              <el-date-picker
                v-model="smsgroupform.time"
                :picker-options="pickerOptions"
                type="datetime"
                placeholder="发送时间"
                value-format="timestamp"
                format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
            <el-form-item label="">
              <el-button
                type="primary"
                :disabled="confimDisable"
                @click="sendConfrm('dataForm')"
              >确认发送</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { GetFullMesTrees, CreateDelayedSend } from '@/api/iot-apis'
import { validPhone } from '@/utils/validate'
export default {
  name: 'Smsgrouplist',
  components: { },
  data() {
    return {
      groupTreelist: [],
      allGroupData: [],
      deFaultExpandedKeys: [],
      defaultProps: {
        id: 'id',
        children: 'children',
        label: 'label',
        telephone: 'telephone',
        address_book: 'address_book'
      },
      smsgroupform: {
        telephones: '',
        people_name: '',
        attach_num: '',
        content: '',
        time: ''
      },
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      rules: {
        content: [
          { required: true, message: '请输入发送内容,不能为空', trigger: 'blur' }
        ],
        time: [
          {
            required: true,
            message: '请选择发送时间',
            trigger: 'change'
          }
        ]
      },
      confimDisable: false
    }
  },
  watch: {
  },
  created() {
    this.getTreelist()
  },
  methods: {
    async getTreelist() {
      var obj = {
        limit: 0,
        skip: 0
      }
      const { items } = await GetFullMesTrees(obj)
      for (var item of items) {
        if (item.parent_id === 'addressbook') {
          this.allGroupData = []
          for (var v of item.children_ids) {
            this.findid(v, items)
          }
        }
      }
      this.groupTreelist = [
        {
          id: 'addressbook',
          label: '企业通讯簿',
          children: this.allGroupData
        }
      ]
      this.deFaultExpandedKeys = ['addressbook']
    },
    findid(v, items) {
      for (var item of items) {
        if (v === item.parent_id) {
          var obj = {
            id: v,
            label: item.company_group.group_name,
            address_book: item.company_group.address_book,
            children: this.findChiLd(item.children_ids, items, item.company_group.address_book)
          }
          this.allGroupData.push(obj)
        }
      }
    },
    findChiLd(idlist, data, address_book) {
      var addresslist = []
      for (var address of address_book) {
        var aobj = {
          id: address.id,
          label: address.contact,
          telephone: address.telephone,
          children: []
        }
        addresslist.push(aobj)
      }
      var list = []
      for (var i of idlist) {
        for (var item of data) {
          if (i === item.parent_id) {
            var obj = {
              id: i,
              label: item.company_group.group_name,
              address_book: item.company_group.address_book,
              children: this.findChiLd(item.children_ids, data, item.company_group.address_book)
            }
            list.push(obj)
          }
        }
      }
      var grouplist = []
      grouplist = addresslist.concat(list)
      return grouplist
    },
    resetCheckedTree() {
      this.smsgroupform.telephones = ''
      this.getTreelist()
      // this.$nextTick(() => {
      //   this.$refs.tree.setCheckedKeys([])
      // })
    },
    confirmTree() {
      var seletNodes = this.$refs.tree.getCheckedNodes()
      var selectPhone = []
      var selectName = []
      for (var item of seletNodes) {
        if (item.children.length === 0) {
          selectPhone.push(item.telephone)
          selectName.push(item.label)
        }
      }
      var filterPhone = this.filterCheck(selectPhone) // selectPhone去重
      this.smsgroupform.telephones = String(filterPhone.join(','))
      var filterName = this.filterCheck(selectName) // selectName去重
      this.smsgroupform.people_name = String(filterName.join(','))
    },
    filterCheck(data) {
      var list = []
      data.forEach(function(item) {
        list.includes(item) ? null : list.push(item)
      })
      return list
    },
    phoneCheck(val) {
      this.smsgroupform.attach_num = val.replace(/\D/g, '').replace(/...........(?!$)/g, '$&,')
    },
    phoneChange(val) {
      if (val !== '') {
        const valuearr = val.split(',')
        for (var i = 0; i < valuearr.length; i++) {
          if (!validPhone(valuearr[i])) {
            this.$message({
              type: 'warning',
              message: '第' + (i + 1) + '个手机号码格式不正确'
            })
            this.confimDisable = true
            return
          } else {
            this.confimDisable = false
          }
        }
        var filterAttachPhone = this.filterCheck(valuearr)
        var telephones = this.smsgroupform.telephones.split(',')
        for (var m = 0; m < filterAttachPhone.length; m++) {
          for (var n = 0; n < telephones.length; n++) {
            if (filterAttachPhone[m] === telephones[n]) {
              filterAttachPhone.splice(m, 1)
            }
          }
        }
        this.smsgroupform.attach_num = String(filterAttachPhone.join(','))
      } else {
        this.confimDisable = false
      }
    },
    sendConfrm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.smsgroupform.telephones === '' && this.smsgroupform.attach_num === '') {
            this.$message({
              type: 'warning',
              message: '发送号码不能为空'
            })
            return
          }
          this.smsgroupform.time = this.smsgroupform.time / 1000
          var obj = {
            body: this.smsgroupform
          }
          CreateDelayedSend(obj).then(res => {
            this.$message({
              type: 'success',
              message: '发送成功！'
            })
            this.getTreelist()
            this.smsgroupform = {
              telephones: '',
              people_name: '',
              attach_num: '',
              content: '',
              time: ''
            }
            this.$nextTick(() => {
              this.$refs['dataForm'].clearValidate()
            })
          }).catch(error => {
            this.$message({
              type: 'danger',
              message: '发送失败！' + error
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
</style>
