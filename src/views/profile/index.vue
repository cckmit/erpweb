<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">

        <el-col :span="24" :xs="24">
          <user-card :user="user" />
        </el-col>

        <!-- <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Activity" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="Timeline" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="Account" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col> -->

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
// import Activity from './components/Activity'
// import Timeline from './components/Timeline'
// import Account from './components/Account'
import { GetUserInfo } from '@/api/iot-apis'

export default {
  name: 'Profile',
  components: { UserCard
    // Activity,
    // Timeline,
    // Account
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
        avatar: '',
        roles: [],
        role: '',
        id: '',
        telephone: '',
        created_at: '',
        updated_at: '',
        password: ''
      },
      activeTab: 'activity'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'id'
    ])
  },
  created() {
    this.getuser()
  },
  methods: {
    getuser() {
      const req = {
        userId: this.$store.getters.id
      }
      GetUserInfo(req).then(res => {
        this.user = res
      })
    }
  }
}
</script>
