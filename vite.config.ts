import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx' 
import path from 'path'; // ts如果报错 npm i @types/node -D
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';

import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    vueJsx(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[name]',
    })
  ],
  css: {
    preprocessorOptions: {
       less: {
        //  modifyVars: {
        //    hack: `true; @import (reference) "${path.resolve('src/assets/styles/base.less')}";`,
        //  },
        // additionalData:  `@import "${path.resolve(__dirname, 'src/assets/styles/base.less')}";`
         javascriptEnabled: true
       }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      comps: path.resolve(__dirname, 'src/components'),
      '#': path.resolve(__dirname, 'type'),
    },
  },
})
