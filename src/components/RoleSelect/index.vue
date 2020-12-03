<template>
  <el-dropdown trigger="click" @command="handleSetCurrentRole">
    <span class="el-dropdown-link">
      {{ currentRole|changeRoleShow }}<i class="el-icon-arrow-down el-icon--right" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of roles" :key="item" :disabled="currentRole===item" :command="item">
        {{ item|changeRoleShow }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'

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
    }
  },
  data() {
    return {
      sizeOptions: [
        { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' }
      ],
      newroles: []
    }
  },
  computed: {
    // currentRole() {
    //   return this.$store.getters.currentRole
    // },
    ...mapGetters([
      'roles',
      'currentRole'
    ])
  },
  mounted() {
    // this.newroles = []
    // for (var i = 0; i < this.roles.length; i++) {
    //   if (this.roles[i] !== 'root') {
    //     this.newroles.push(this.roles[i])
    //   }
    // }
  },
  methods: {
    handleSetCurrentRole(role) {
      this.$store.dispatch('user/changeRoles', role).then(() => {
        this.$emit('change')
      })
      sessionStorage.setItem('currentrole', role)
      this.refreshView()
      this.$message({
        message: 'Switch Role Success',
        type: 'success'
      })
    },
    refreshView() {
      // In order to make the cached page re-rendered
      this.$store.dispatch('tagsView/delAllCachedViews', this.$route)

      const { fullPath } = this.$route

      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      })
    }
  }

}
</script>
