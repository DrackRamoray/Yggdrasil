import { cwd } from 'node:process';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import pkg from './package.json';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd());

  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@/': new URL('./src/', import.meta.url).pathname,
      },
    },
    define: {
      __VUE_I18N_FULL_INSTALL__: false,
      __VUE_I18N_LEGACY_API__: false,
      YGG_STORAGE_NAMESPACE: JSON.stringify(pkg.name),
      YGG_STORAGE_SECRET: JSON.stringify(env.VITE_YGG_STORAGE_SECRET),
      YGG_STORAGE_IV: JSON.stringify(env.VITE_YGG_STORAGE_IV),
    },
  };
});
