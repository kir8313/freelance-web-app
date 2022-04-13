<template>
  <p class="text-white">
    Куда лезешь на {{ val }}? Нет такой страницы :)
  </p>
</template>

<script>
export default {
  setup() {
    return {
      val: window.location.pathname.replace('/', "")
    }
  }
}
</script>

<style scoped>
</style>