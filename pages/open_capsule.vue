<template>
  <div class="container capsule">
    <OpenCapsule />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.$router.push('/result');
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
}
.capsule {
  animation: 3s appear;
}
@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
