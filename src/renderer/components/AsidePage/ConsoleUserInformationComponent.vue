<template>
  <div class="jk">
    <div class="big-video" id="big-video" style="width: 100%;margin-top: 110px">
      <video id="screen" style="width: 100%"></video>
    </div>
<!--    <el-button @click="stopRecord"></el-button>-->
<!--    TODO 摄像头源-->
<!--    <div class="big-video" id="big-video" style="width: 100%; margin-top: 110px">-->
<!--      <video id="camera" style="width: 100%"></video>-->
<!--    </div>-->
    <el-button class="out-button" @click="out">退出登录</el-button>
  </div>
</template>
<script>
import {desktopCapturer} from 'electron'
import fs from 'fs'
// window.addEventListener('beforeunload', (ev) => {
//   // Setting any value other than undefined here will prevent the window
//   // from closing or reloading
//   ev.returnValue = true
// })
export default {
  data () {
    return {
      recorder: undefined,
      timer: null,
      count: 0
    }
  },
  mounted () {
    this.screenSharing()
  },
  methods: {
    screenSharing () {
      desktopCapturer.getSources({types: ['window', 'screen']}).then((sources) => {
        for (const source of sources) {
          if (source.name === 'Entire Screen') {
            this.getInitStream(source)
            return
          }
        }
      })
    },
    getInitStream (source) {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: source.id
          }
        }
      }).then(stream => {
        this.previewStream(stream)
        this.createRecorder(stream)
      })
    },
    sleep (ms) {
      let t = new Date().getTime()
      while (new Date().getTime() < t + ms) {}
    },
    previewStream (stream) {
      const video = document.getElementById('screen')
      // const video = this.$el.querySelector('video')
      video.srcObject = stream
      video.onloadedmetadata = e => video.play()
    },
    createRecorder (stream) {
      this.recorder = new MediaRecorder(stream)
      this.recorder.start()
      this.recorder.ondataavailable = event => {
        let blob = new Blob([event.data], {
          type: 'video/mp4'
        })
        this.saveMedia(blob)
      }
      this.recorder.onerror = err => {
        console.log('[异常] 视频录制系统异常:' + err)
      }
      // this.$store.dispatch('setRecorder', this.recorder)
      // console.log(this.$store.state.Counter.recorder)
      // console.log(this.recorder)
    },
    getFormatTime () {
      let date = new Date()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      if (minute < 10) minute = '0' + minute
      if (second < 10) second = '0' + second
      return date.getFullYear() + '' + month + '' + day + hour + '' + minute + '' + second
    },
    saveMedia (blob) {
      let reader = new FileReader()
      reader.onload = () => {
        let buffer = Buffer.from(reader.result)
        let date = this.getFormatTime()
        let path = date + '-ois.mp4'
        fs.writeFile(path, buffer, {}, (err, res) => {
          if (err) return console.error(err)
        })
      }
      reader.onerror = err => console.log('[异常] 视频录制系统异常:' + err)
      reader.readAsArrayBuffer(blob)
    },
    stopRecord () {
      // this.$store.state.Counter.recorder.stop()
      this.recorder.stop()
    },
    setTimer () {
      if (this.timer == null) {
        this.timer = setInterval(() => {
          this.stopRecord()
          this.screenSharing()
        }, 600000)
        // 10min save
      }
    },
    checkOut (value) {
      if (value === '我已知晓退出后不可再次登录') {
        return true
      }
      return false
    },
    out () {
      this.$prompt(`<p>请输入：<span style="color: red"><i>我已知晓退出后不可再次登录</i></span></p>`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: this.checkOut,
        inputErrorMessage: '验证不正确',
        dangerouslyUseHTMLString: true
      }).then((value) => {
        // this.$http.post('/logs', {name: this.$store.state.Token.name, level: '信息', content: this.getFormatTime() + '-' + this.$store.state.Token.name + ':' + '退出登录', examinationId: this.$store.state.Token.examinationId})
        this.$http.get('/login').then(res => {
          if (res.code === 0) {
            // this.$store.dispatch('clearToken')
            localStorage.clear()
            this.$store.dispatch('clearLog')
            this.$message({
              type: 'success',
              message: '退出成功'
            })
            this.stopRecord()
            this.$router.push({path: '/login'})
          } else {
            this.$message({
              type: 'info',
              message: '服务器连接异常，退出失败'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '服务器连接异常，退出失败'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出'
        })
      })
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
.jk {
  display:flex;
  flex-direction:column;
}
.out-button {
  margin-top:auto
}
</style>
