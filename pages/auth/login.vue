<script setup lang="ts">

definePageMeta({
  layout: 'auth',
});

const { login } = useSanctumAuth()

const credentials = {
  usuario_dominio: "gyguschacon",
  password: "Gy202400",
  remember: true,
}

const loguearme = async () => {

  await login(credentials)

}

</script>

<template>

<button @click="loguearme">Loguearme!</button>


</template>

<style scoped>

</style>