import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx' 
import path from 'path'; // ts如果报错 npm i @types/node -D
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';

import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { getThemeVariables } from 'ant-design-vue/dist/theme';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    vueJsx(),
    Components({
      resolvers: [AntDesignVueResolver({importStyle: "less"})],
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
          /* 引入 antd less 的变量（https://www.antdv.com/docs/vue/customize-theme-cn） */
          modifyVars: {
            ...getThemeVariables({ dark: false }),
            // 覆盖 antd 的主题颜色
            'primary-color': '#0960bd',

            // 自定义全局 less 变量
            margin: '20px'
          },
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
