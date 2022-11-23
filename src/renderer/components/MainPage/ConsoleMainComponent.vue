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
  }
}
</script>

<style>
.el-textarea__inner {
  min-height: 400px !important;
  /*overflow-y: hidden*/
}
.logo  p {
  font-size: 25px;
}
</style>