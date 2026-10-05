import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const monorepoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, monorepoRoot, '')
  const rpcUrl = env.VITE_RPC_URL ?? 'http://localhost:3002/rpc'
  const rpcOrigin = new URL(rpcUrl).origin

  return {
    define: {
      'import.meta.env.VITE_RPC_URL': JSON.stringify(rpcUrl),
    },
    resolve: { tsconfigPaths: true },
    optimizeDeps: {
      exclude: ['@tanstack-start-hono/validators'],
    },
    ssr: {
      noExternal: ['@tanstack-start-hono/validators'],
    },
    server: {
      proxy: {
        '/rpc': {
          target: rpcOrigin,
          changeOrigin: true,
        },
      },
    },
    plugins: [
      devtools(),
      nitro({
        rollupConfig: { external: [/^@sentry\//] },
        routeRules: {
          '/rpc/**': {
            proxy: `${rpcUrl}/**`,
          },
        },
      }),
      tailwindcss(),
      tanstackStart(),
      viteReact(),
      babel({ presets: [reactCompilerPreset()] }),
    ],
  }
})
