<template>
  <div :class="`fib fi-${isoCode} logo rounded bg-cover`" />
</template>

<script setup>
defineProps({
  isoCode: String
})
</script>

<style scoped lang="scss">
.logo {
  max-width: 5rem;
  max-height: 3.75rem;
  aspect-ratio: 16/9;
  height: 100%;
}
</style>
