<template>
  <el-container style="height: 100%">
    <el-aside width="400px"><console-aside-component></console-aside-component></el-aside>
    <el-container>
      <el-main><console-main-component></console-main-component></el-main>
      <el-footer><console-footer-component></console-footer-component></el-footer>
    </el-container>
  </el-container>
</template>

<script>
import ConsoleFooterComponent from '@/components/FooterPage/ConsoleFooterComponent.vue'
import ConsoleMainComponent from '@/components/MainPage/ConsoleMainComponent.vue'
import ConsoleAsideComponent from '@/components/AsidePage/ConsoleUserInformationComponent.vue'
export default {
  components: {ConsoleFooterComponent, ConsoleMainComponent, ConsoleAsideComponent},
  methods: {
  }
}
</script>
<style>
html,body,#app {
  height: 100%;
}
</style>
