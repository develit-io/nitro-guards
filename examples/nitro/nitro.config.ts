import nitroGuards from '@develit-io/nitro-guards'

// https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'server',

  modules: [
    nitroGuards,
  ],

  compatibilityDate: '2025-03-05',
})
