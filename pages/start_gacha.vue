<template>
  <div class="container start_gacha">
    <div class="contents">
      <Gacha />
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.$router.push('/get_capsule');
    })
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

.start_gacha {
  animation: 3s fluffy;
}

@keyframes fluffy {
  0% { transform:translateX(0) }
  5% { transform:translateX(0) }
  10% { transform:translateX(0) }
  20% { transform:translateX(-15px) }
  25% { transform:translateX(0) }
  30% { transform:translateX(-15px) }
  50% { transform:translateX(0) }
  100% { transform:translateX(0) }
}
</style>
