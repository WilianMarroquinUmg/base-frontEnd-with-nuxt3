// https://nuxt.com/docs/api/configuration/nuxt-config

import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import svgLoader from 'vite-svg-loader'
import vuetify from 'vite-plugin-vuetify'
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
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
        mode: 'token',
        baseUrl: 'http://backend-laravel.local/',

        userStateKey: 'sanctum.user.identity',

        redirectIfAuthenticated: true,
        redirectIfUnauthenticated: true,

        endpoints: {
            csrf: '/sanctum/csrf-cookie',
            login: 'api/auth/login',
            logout: 'api/auth/logout',
            user: '/api/user' // Endpoint para obtener el usuario autenticado
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

    css: [
        '@core/scss/template/index.scss',
        '@styles/styles.scss',
        '@/plugins/iconify/icons.css',
    ],

    imports: {
        dirs: ['./@core/utils', './@core/composable/', './plugins/*/composables/*'],
        presets: ['vue-i18n'],
    },

    build: {
        transpile: ['vuetify'],
    },

    vite: {
        define: {'process.env': {}},

        resolve: {
            alias: {
                '@': fileURLToPath(new URL('.', import.meta.url)),
                '@themeConfig': fileURLToPath(new URL('./themeConfig.js', import.meta.url)),
                '@core': fileURLToPath(new URL('./@core', import.meta.url)),
                '@layouts': fileURLToPath(new URL('./@layouts', import.meta.url)),
                '@images': fileURLToPath(new URL('./assets/images/', import.meta.url)),
                '@styles': fileURLToPath(new URL('./assets/styles/', import.meta.url)),
                '@configured-variables': fileURLToPath(new URL('./assets/styles/variables/_template.scss', import.meta.url)),
                '@db': fileURLToPath(new URL('./server/fake-db/', import.meta.url)),
                '@api-utils': fileURLToPath(new URL('./server/utils/', import.meta.url)),
            },
        },

        build: {
            chunkSizeWarningLimit: 5000,
        },

        optimizeDeps: {
            exclude: ['vuetify'],
            entries: [
                './**/*.vue',
            ],
        },

        plugins: [
            svgLoader(),
            vuetify({
                styles: {
                    configFile: 'assets/styles/variables/_vuetify.scss',
                },
            }),
            VueI18nPlugin({
                runtimeOnly: true,
                compositionOnly: true, ssr: true,
                include: [
                    fileURLToPath(new URL('./plugins/i18n/locales/**', import.meta.url)),
                ],
            }),
        ],
    },

    typescript: {
        tsConfig: {
            compilerOptions: {
                paths: {
                    '@/*': ['../*'],
                    '@themeConfig': ['../themeConfig.js'],
                    '@layouts/*': ['../@layouts/*'],
                    '@layouts': ['../@layouts'],
                    '@core/*': ['../@core/*'],
                    '@core': ['../@core'],
                    '@images/*': ['../assets/images/*'],
                    '@styles/*': ['../assets/styles/*'],
                    '@validators': ['../@core/utils/validators'],
                    '@db/*': ['../server/fake-db/*'],
                    '@api-utils/*': ['../server/utils/*'],
                },
            },
        },
    },


})