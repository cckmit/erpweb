<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  created() {
    // if (this.$store.getters.currentRole === 'user') {
    //   this.currentRole = 'editorDashboard'
    // } else {
    //   this.currentRole = 'adminDashboard'
    // }
  }
}
</script>
