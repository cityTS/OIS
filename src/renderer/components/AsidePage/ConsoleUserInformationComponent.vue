<template>
  <div class="big-video" id="big-video"> <video></video> </div>

</template>
<script>
import {desktopCapturer} from 'electron'
export default {
  methods: {
    screenSharing () {
      desktopCapturer.getSources({types: ['window', 'screen']}).then((sources) => {
        console.log(sources)
        const source = sources.find(item => item === 'Screen 2')
        this.getInitStream(source)
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
      const video = document.querySelector('video')
      // const video = this.$el.querySelector('video')
      video.srcObject = stream
      video.onloadedmetadata = e => video.play()
    }
  }
}
</script>
