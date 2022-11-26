<template>
  <div class="logo">
    <p>监控日志</p>
    <el-input>
        type="textarea"
        disabled
        placeholder="暂无数据..."
    </el-input>
  </div>
</template>

<script>
// window.electronAPI.getLogs((_event, value) => {
//   console.log(value)
//   let text = document.querySelector('input')
//   text.innerText = value + '\n' + text.innerText
// })
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
