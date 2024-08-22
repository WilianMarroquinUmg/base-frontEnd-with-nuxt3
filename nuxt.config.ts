// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["nuxt-auth-sanctum"],

  ssr: true,

  vite: {
    optimizeDeps: {
      include: ['pusher-js'],
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  sanctum: {
    mode : 'token',
    baseUrl: 'http://sigua.local/',

    userStateKey: 'sanctum.user.identity',

    redirectIfAuthenticated: true,
    redirectIfUnauthenticated: true,

    endpoints: {
      csrf: '/sanctum/csrf-cookie',
      login: 'api/auth/login',
      logout: 'api/auth/logout',
      user: '/api/auth/user' // Endpoint para obtener el usuario autenticado
    },

    client: {
      retry: false,
    },

    csrf: {
      cookie: 'XSRF-TOKEN',
      header: 'X-XSRF-TOKEN',
    },

    redirect: {
      keepRequestedRoute: false,
      onLogin: '/',
      onLogout: '/auth/login',
      onAuthOnly: '/auth/login',
      onGuestOnly: '/',
    },

    globalMiddleware: {
      enabled: false,
      allow404WithoutAuth: true,
    },

    globalMiddleware: {
      enabled: true,
    },
    logLevel: 3,
  },

})