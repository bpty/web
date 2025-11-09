import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import devtools from 'solid-devtools/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: '/web/',
  plugins: [
    tsconfigPaths(),
    devtools(),
    solidPlugin({
      babel: {
        targets: '>0.5%, not dead',
        assumptions: {
          constantReexports: true,
          constantSuper: true,
          enumerableModuleMeta: true,
          ignoreFunctionLength: true,
          ignoreToPrimitiveHint: true,
          iterableIsArray: true,
          mutableTemplateObject: true,
          noClassCalls: true,
          noDocumentAll: true,
          noIncompleteNsImportDetection: true,
          noNewArrows: true,
          noUninitializedPrivateFieldAccess: true,
          objectRestNoSymbols: true,
          privateFieldsAsProperties: true,
          privateFieldsAsSymbols: true,
          pureGetters: true,
          setClassMethods: true,
          setComputedProperties: true,
          setPublicClassFields: true,
          setSpreadProperties: true,
          skipForOfIteratorClosing: true,
          superIsCallableConstructor: true,
        },
      },
    }),
  ],
  server: {
    port: 3000,
    proxy: {
      '/repository': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/admin': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
    fs: {
      allow: ['..'],
    },
  },
  build: {
    target: 'es2020',
  },
})
