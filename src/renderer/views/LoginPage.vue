<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/img/gxu-logo.png" alt="electron-vue">
    <main>
      <div class="left-side">
        <span class="title">
          欢迎使用广西大学在线监考系统!
        </span>
        <login-form-component></login-form-component>
      </div>

      <div class="right-side">
        <div class="doc">
          <div class="title">关于本系统</div>
          <p>
            本系统承担程序设计类考试、比赛等场景的技术监考工作，为了你我公平的竞争环境，如您发现了系统BUG，请联系广西大学计算机协会相关人员或电邮开发者sct.cn@outlook.com
          </p>
        </div>
        <div class="doc">
          <br><br>
          <div class="title alt">祝您考试(竞赛)武运昌隆！</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import LoginFormComponent from '../components/LandingPage/LoginFormComponent'

export default {
  name: 'landing-page',
  components: { LoginFormComponent },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style>
/*@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');*/

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body { font-family: 'Source Sans Pro', sans-serif; }

#wrapper {
  background:
      radial-gradient(
          ellipse at top left,
          rgb(97, 196, 173) 40%,
          rgba(229, 229, 229, 0.47) 100%
      );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div { flex-basis: 50%; }

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: .8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}
</style>
