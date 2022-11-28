<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginInfo" :rules="loginRules" label-width="70px" label-position="right">
      <el-form-item label="学号" prop="studentNumber">
        <el-input v-model="loginInfo.studentNumber"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="loginInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="考试码" prop="examinationId">
        <el-input v-model="loginInfo.examinationId"></el-input>
      </el-form-item>
    </el-form>
    <button round @click="login">登录系统</button>
  </div>
</template>


<script>
const storage = require('electron-localstorage')
export default {
  data () {
    return {
      loginInfo: {
        studentNumber: undefined,
        name: undefined,
        examinationId: undefined
      },
      loginRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'change' }
        ],
        studentNumber: [
          {required: true, message: '请输入学号', trigger: 'blur'},
          {pattern: /^\d{10}$/, message: '学号必须为10位数字', trigger: 'change'}
        ],
        examinationId: [
          {required: true, message: '请输入考试码', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.unRegister()
  },
  methods: {
    unRegister () {
      this.$http.put('/login')
    },
    login () {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.$http.post('/login', this.loginInfo).then((res) => {
            if (res.code === 0) {
              storage.setItem('name', this.loginInfo.name)
              storage.setItem('studentNumber', this.loginInfo.studentNumber)
              storage.setItem('examinationId', this.loginInfo.examinationId)
              // this.$store.dispatch('setToken', [this.loginInfo.name, this.loginInfo.studentNumber, this.loginInfo.examinationId])
              this.$message.success(this.loginInfo.name + ',欢迎您')
              this.$router.push({path: '/'})
            } else {
              this.$message.error(res.msg)
            }
          }).catch(() => {
            this.$message.error('连接服务器失败,请检查网络配置')
          })
        }
      })
    }
  }
}
</script>


<style>
.el-form-item__content > .el-input {
  width: 222px;
}
.login {
  margin-top: 10px;
}

.login button {
  margin-left: 155px;
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
</style>
