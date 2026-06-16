import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  return {
    build: {
      outDir: mode === 'production' ? 'release' : 'dist',
    },
    plugins: [
      classicEmberSupport(),
      ember(),
      babel({
        babelHelpers: 'runtime',
        extensions,
      }),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'inline',
        manifest: false,
        workbox: {
          globPatterns: ['**/*.{js,css,html,png,svg,woff,ttf,eot,ico,json}'],
        },
      }),
    ],
  };
});