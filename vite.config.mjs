import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';

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
    ],
  };
});