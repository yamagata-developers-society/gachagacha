<template>
  <div class="container initshow">
    <div class="contents">
      <Gacha />
      <div class="right-panel">
        <div class="title">
          ガチャガチャを回しましょう！
        </div>
        <div class="message">
          Some message here
        </div>
        <form @submit.prevent class="form" novalidate="true">
          <span style="color:red;">{{Validation.result}}</span>
          <div class="email">
            Email:&nbsp;
            <input 
              class="input-email" type="text" name="email"
              v-model="email" placeholder="sample@example.com" @blur="checkForm" />
          </div>
          <button type="submit" class="submit" @click="getCapsule">ガチャを回す！</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      Validation: {
        result: ""
      }
    }
  },
  methods: {
    async getCapsule() {
      this.$store.commit("setEmail", this.email)
      if(this.checkForm()) {
        this.$router.push('/start_gacha')
      }
    },
    checkMailPattern(inputdata) {
      const regex = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
      return regex.test(inputdata);
    },
    checkForm() {
      var checkResult = false
      var target = this.email
      if (!target || !this.checkMailPattern(target)){
        this.Validation.result="メールアドレスを入力してください"
      } else {
        checkResult = true
        this.Validation.result=""
      }
      return checkResult
    }
  }
}
</script>
<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #29323A;
}
.initshow {
  animation: 3s appear;
}

.contents {
  display: flex;
  justify-content: center;
  align-content: flex-start;
}

.right-panel {
  width: 400px;
  height: 100%;
  margin: 10px;
}

.title {
  margin: 10px;
  text-align: center;
  font-family: fantasy;
  font-size: 20px;
  font-weight: bold; 
  line-height: 1em;
}

.message {
  width: 350px;
  height: 150px;
  margin: 10px;
  text-align: left;
  display: flex;
  align-items: center;
  line-height: 1em;
}

.form {
  padding: 10px;
  border: 1px dotted;
  align-items: flex-end;
  text-align: center;
}
.email {
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
}
.input-email {
  width: 80%;
  text-align: center;
}

.submit {
  width: 70%;
  background: #00467C;
  color: #F4F4F4;
  font-size: 30px;
  margin-top: 5%;
  text-align: center; 
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
