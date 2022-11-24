<template>
  <div class="jk">
    <div class="big-video" id="big-video" style="width: 100%;margin-top: 110px">
      <video id="screen" style="width: 100%"></video>
    </div>
<!--    TODO 摄像头源-->
<!--    <div class="big-video" id="big-video" style="width: 100%; margin-top: 110px">-->
<!--      <video id="camera" style="width: 100%"></video>-->
<!--    </div>-->
  </div>
</template>
<script>
import {desktopCapturer} from 'electron'

export default {
  mounted () {
    this.screenSharing()
  },
  methods: {
    screenSharing () {
      desktopCapturer.getSources({types: ['window', 'screen']}).then((sources) => {
        console.log(sources)
        for (const source of sources) {
          if (source.name === 'Entire Screen') {
            this.getInitStream(source)
            return
          }
        }
        // const source = sources.find(item => item.name === 'Screen 2')
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
        console.log(stream)
        this.previewStream(stream)
      })
    },
    previewStream (stream) {
      const video = document.getElementById('screen')
      // const video = this.$el.querySelector('video')
      video.srcObject = stream
      video.onloadedmetadata = e => video.play()
    }
  }
}
</script>

<style>

</style>