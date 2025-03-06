import type { Nitro } from 'nitropack'
import type { Nuxt } from 'nuxt/schema'

export * from './runtime/defineGuardEventHandler'
export * from './runtime/defineNitroGuard'

async function nitroModule(nitro: Nitro) {
  // Skip loader entirely if imports disabled
  if (nitro.options.imports === false) {
    return
  }

  // Auto imports from guards dir
  nitro.options.imports.dirs = nitro.options.imports.dirs || []
  nitro.options.imports.dirs.push(`${nitro.options.srcDir}/guards`)

  // Auto import defineGuardEventHandler and defineNitroGuard
  nitro.options.imports.imports = nitro.options.imports.imports || []
  nitro.options.imports.imports.push({
    from: '@develit-io/nitro-guards',
    name: 'defineGuardEventHandler',
  })

  nitro.options.imports.imports.push({
    from: '@develit-io/nitro-guards',
    name: 'defineNitroGuard',
  })
}

// Dual compatibility with Nuxt and Nitro Modules
export default function nitroGuards(arg1: unknown, arg2: unknown) {
  if ((arg2 as Nuxt)?.options?.nitro) {
    (arg2 as Nuxt).hooks.hookOnce('nitro:config', (nitroConfig) => {
      nitroConfig.modules = nitroConfig.modules || []
      nitroConfig.modules.push(nitroModule)
    })
  }
  else {
    nitroModule(arg1 as Nitro)
  }
}
