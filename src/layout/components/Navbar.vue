<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="!sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatarlogo" class="user-avatar">
          <!-- <img :src="avatar+'?d=identicon'" class="user-avatar"> -->
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <span
            style="display:inline-block;line-height:33px;border-bottom:1px solid #ebeef5;font-weight:600;margin-left:12px;"
          >{{ userinfoname }}</span>
          <router-link to="/">
            <el-dropdown-item>{{ $t('navbar.dashboard') }}</el-dropdown-item>
          </router-link>
          <router-link to="/profile/index">
            <el-dropdown-item>{{ $t('navbar.profile') }}</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      userinfoname: '',
      interval: null,
      showbaojing: false,
      avatarlogo: require('@/assets/userlogo.png'),
      srcurl: require('@/assets/alert.mp3'),
      flagloop: true
    }
  },
  computed: {
    ...mapGetters(['alertNum', 'sidebar', 'avatar', 'device', 'userInfo', 'auth'])
  },
  watch: {
    alertNum(val) {
      if (val > 0) {
        setTimeout(() => {
          this.openAudio()
        }, 1000)
      }
    },
    auth(val) {
      if (val) {
        this.sendCurrentAlertsRequest()
      }
    }
  },
  created() {
    this.userinfoname = this.$store.getters.name
  },
  mounted() {
    if (this.interval !== null) {
      window.clearInterval(this.interval)
      this.interval = null
    }
    if (this.auth) {
      this.sendCurrentAlertsRequest()
    }
  },
  beforeDestroy() {
    window.clearInterval(this.interval)
  },
  methods: {
    openAudio() {
      this.$nextTick(() => {
        const audio = document.getElementById('buttonAudio')
        if (audio) {
          audio.play()
        }
      })
    },
    closeAudio() {
      const audio = document.getElementById('buttonAudio')
      if (audio) {
        audio.pause()
      }
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    closeSideBar() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$store.dispatch('socket/close')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    sendCurrentAlertsRequest() {
      const a =	{
        'query': JSON.stringify({}),
        'skip': 0,
        'limit': 10,
        'user_id': this.userInfo.id,
        'user_role': this.userInfo.role
      }
      const msg =	{
        'type': 'alert_type',
        'request': JSON.stringify(a)
      }
      this.$store.dispatch('socket/send', JSON.stringify(msg))
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
a {
  text-decoration: none;
}

.an {
  -webkit-animation: 0.5s infinite blink;
  animation: 0.5s infinite blink;
}

.commodity-sign-wrap {
  animation: blink 1s infinite;
  -webkit-animation: blink 1s infinite;
  /*Safari and Chrome*/
}
@keyframes blink {
  0%,
  100% {
    color: red;
  }
  50% {
    color: #ff0;
  }
}
@-webkit-keyframes blink {
  0%,
  100% {
    color: red;
  }
  50% {
    color: #ff0;
  }
}

@keyframes blink1 {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 100;
  }

  100% {
    opacity: 0;
  }
}

@-webkit-keyframes blink1 {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 100;
  }

  100% {
    opacity: 0;
  }
}
</style>
