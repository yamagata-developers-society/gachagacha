<template>
  <div class="container capsule">
    <ClosedCapsule />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.$router.push('/open_capsule');
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
  animation: 2s appear;
}
@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
