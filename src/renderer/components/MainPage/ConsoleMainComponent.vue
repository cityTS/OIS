<template>
  <div class="logo">
    <p>监控日志</p>
    <el-input
        type="textarea"
        placeholder="暂无数据..."
        disabled
        v-model="textarea">
    </el-input>
  </div>
</template>

<script>
export default {
  data () {
    return {
      textarea: ''
    }
  },
  mounted () {
    this.getMainProcessLogs()
  },
  methods: {
     getMainProcessLogs () {
      window.electronAPI.getLogs((event, value) => {
        this.textarea = value + '\n' + this.textarea
      })
      // if (logs.length !== 0) {
      //   let text = ''
      //   for (let i = 0; i < logs.length; i++) {
      //     text += logs[i]
      //   }
      //   this.textarea = text
      // }
    }
  }
}
</script>

<style>
.el-textarea__inner {
  min-height: 400px !important;
  /*overflow-y: hidden*/
}

.logo p {
  font-size: 25px;
}
</style>