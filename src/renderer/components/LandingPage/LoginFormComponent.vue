<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginInfo" :rules="loginRules" label-width="50px" label-position="right">
      <el-form-item label="学号" prop="studentNumber">
        <el-input v-model="loginInfo.studentNumber"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="loginInfo.name"></el-input>
      </el-form-item>
    </el-form>
    <button round @click="login">登录系统</button>
  </div>
</template>


<script>
export default {
  data () {
    return {
      loginInfo: {
        studentNumber: undefined,
        name: undefined
      },
      loginRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'change' }
        ],
        studentNumber: [
          {required: true, message: '请输入学号', trigger: 'blur'},
          {pattern: /^\d{10}$/, message: '学号必须为10位数字', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          // TODO 登录请求
        } else {
          console.log('出错啦')
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
  margin-top: 40px;
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
