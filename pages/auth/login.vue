<script lang="ts">
import { defineComponent, ref } from 'vue';
import { FetchError } from 'ofetch';

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      credentials: {
        usuario_dominio: '',
        password: '',
        remember: false,
      },
      errores: '',
    };
  },
  computed: {
    isAuthenticated() {
      const { isAuthenticated } = useSanctumAuth();
      return isAuthenticated.value;
    },
  },
  methods: {
    async loguearme() {

      this.errores = '';

      const { login } = useSanctumAuth();

      try {

        await login(this.credentials);

      } catch (e) {

        if (e instanceof FetchError && e.data) {

          this.errores = e.data.message || 'Ocurrió un error al intentar iniciar sesión.';

        } else {

          this.errores = 'Ocurrió un error inesperado.';

        }

      }

    },

    async getUsers(){

      const  client  = useSanctumClient();

      const { data, error, refresh } = await useAsyncData('users', () =>
          client('/api/users')
      );

      if (error instanceof FetchError && error.data) {

        console.log(error.data);

      } else {

        this.errores = 'Ocurrió un error inesperado.';

      }
    }

  },
  mounted() {
    console.log(this.isAuthenticated);
  },
  setup() {

    definePageMeta({
      layout: 'auth',
    });

    return {};
  },
});
</script>

<template>
  <div>
    <input type="text"
           v-model="credentials.usuario_dominio"
           placeholder="Usuario"
    >
    <input type="password"
           v-model="credentials.password"
           placeholder="Contraseña"
    >

    <button @click="loguearme">Ingresar</button>

    <p v-if="errores"
       v-text="errores"
       class="error-message"
    ></p>

  </div>

  <button @click="getUsers">Obtener Usuarios</button>

</template>

<style scoped>
.error-message {
  color: red;
}
</style>
