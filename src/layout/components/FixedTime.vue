<template>
  <div class="codefund">
    <span style="line-height:35px;">
      <el-tag color="#4caf50" size="mini" style="color:#fff;margin-left:15px;">当前时间</el-tag>
      <span style="margin-left:10px;color:#777;">{{ date }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  components: {
  },
  data() {
    return {
      currentRole: '',
      date: new Date()
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.codefund {
    height: 35px;
    width: 100%;
    position: relative;
    top: 55px;
    background-color:#f8f8f8;
    font-family: Helvetica, Arial;
    font-size: 14px;
    color: #212121;
  }
</style>
