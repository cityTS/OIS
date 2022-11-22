<template>
  <vue-record-video @result="onResult"></vue-record-video>
</template>

<script>
export default {
  methods: {
    onResult (data) {
      console.log('The blob data:', data)
      console.log('Downloadable video', window.URL.createObjectURL(data))
    }
  }
}
</script>