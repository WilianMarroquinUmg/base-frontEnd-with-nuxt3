<template>
  <div>

    <h1>Hi! {{ dropdownLabel }} </h1>

      <button @click="salir"
      >
      Cerrar sesion
    </button>

    <button @click="getUsers">Obtener Usuarios</button>

    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import type {User} from "~/models/user";

export default defineComponent({
  data() {
    return {
      dropdownLabel: ''
    }
  },
  methods: {
    salir() {

      const { logout } = useSanctumAuth();

      logout();

    },

    async getUsers(){

        const  client  = useSanctumClient();

      const { data, error, refresh } = await useAsyncData('users', () =>
          client('/api/users')
      );

      if (error.value) {
        console.log(error.value);
      } else {
        console.log(data.value);
      }
    }

  },

  created() {
    const { user } = useSanctumAuth<User>();

    console.log(user.value.nombre);

    this.dropdownLabel = "Hola " + user.value.nombre;

  }


});


</script>
