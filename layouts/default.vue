<script lang="ts">
import {defineComponent} from 'vue'

definePageMeta({
  middleware: ['sanctum:auth'],
});

</script>

<template>

  <h1> Bienvenidos al sistema </h1>

  <slot/>

</template>

<style scoped>

</style>