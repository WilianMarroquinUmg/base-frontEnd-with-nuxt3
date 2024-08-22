<template>
  <div>

    <h1>Hi! {{ dropdownLabel }} </h1>



      <button @click="salir">
      Cerrar sesion
    </button>


    </div>
</template>

<script setup lang="ts">
import type { User } from '~~/models/user'
//
const { user, logout } = useSanctumAuth<User>()
//
const dropdownLabel = computed(() => `Hey, ${user.value!.nombre}!`)

const salir = async () => {
  await logout()
}




</script>
