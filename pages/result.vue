<template>
  <div class="container">
    <div class="result">
      あなたの番号は...
      <div class="card">
        <div class="boxno">
          {{ this.$store.getters['box/boxno'] }}
        </div>
        <div class="registed-email">
          受付メールアドレス<br />
          {{ email }}
        </div>
      </div>
      <div class="nextstep">
        ご利用いただき、ありがとうございました。<br />
        <a href="/" target="_self">
          <div class="back_button">
            最初の画面に戻る
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      email: this.$store.getters['email'],
      boxno: this.$store.getters['box/boxno']
    }
  },
  methods: {
    ...mapActions({
      getData: "box/getData",
    }),
  },
  created: async function () {
    await this.getData(this.email);
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
}
.result {
  animation: 1s appear;
}
.card {
  width: 398px;
  height: 185px;
  margin: 20px 0;
  padding: 0;
  border: 1px solid;
  align-items: flex-end;
  animation: 5s card_fadein;
}
.boxno {
  width: 100%;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 80px;
  font-weight: bold; 
  animation: 10s boxno_fadein;
}
.registed-email {
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: 10s boxno_fadein;
}

.back_button {
  width: 398px;
  background: #00467C;
  color: #F4F4F4;
  margin-top: 10px;
  padding: 10px;
  font-size: 25px;
  line-height: 1em;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
@keyframes card_fadein {
  0% {
    opacity: 0;
    margin: 0;
    padding: 0;
    width: 0%;
    height: 185px;
  }
  100% {
    width: 398px;
  }
}
@keyframes boxno_fadein {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
