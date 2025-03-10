import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index'],
  outDir: 'dist',
  declaration: true,
  rollup: {
    emitCJS: true,
  },
  externals: [
    'h3',
    'nitro',
    'nuxt',
  ],
})
