<template>
  <div class="logo">
    <h1>监控日志</h1>
    <div class="logs">
      {{$store.state.Logs.logList}}
<!--      {{logs}}-->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logs: this.$store.state.Logs.logList,
      timer: null
    }
  },
  methods: {
    getLogs () {
      this.logs = this.$store.state.Logs.logList
    },
    setTimer () {
      if (this.timer == null) {
        this.timer = setInterval(() => {
          this.getLogs()
        }, 5000)
        // 5s save
      }
    }
  },
  created () {
    clearInterval(this.timer)
    this.timer = null
    this.setTimer()
  },
  destroyed () {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style>
.el-textarea__inner {
  min-height: 400px !important;
  /*overflow-y: hidden*/
}

.logo h1 {
  font-size: 25px;
}
.logs {
  white-space: pre-line;
  font-size: 15px;
  height: 400px;
}
</style>
