/*
 * @Description: vite 配置
 * @Date: 2022-07-19 14:17:29
 * @LastEditTime: 2022-07-22 17:38:05
 * @FilePath: \vite-vue3-admin\vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import path from 'path' // ts如果报错 npm i @types/node -D
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createHtmlPlugin } from 'vite-plugin-html'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { getThemeVariables } from 'ant-design-vue/dist/theme'
import eslintPlugin from 'vite-plugin-eslint' //导入包
import DefineOptions from 'unplugin-vue-define-options/vite'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    DefineOptions(),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: 'less' })],
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[name]',
    }),
    createHtmlPlugin({
      minify: process.env.NODE_ENV === 'production',
      inject: {
        data: {
          title: '平台管理系统',
        },
      },
    }),
    // 增加下面的配置项,这样在运行时就能检查eslint规范
    eslintPlugin({
      include: [
        'src/**/*.ts',
        'src/**/*.d.ts',
        'src/**/*.tsx',
        'src/**/*.vue',
        'types/**/*.d.ts',
        'types/**/*.ts',
      ],
      exclude: ['./node_modules/**'],
      // cache: false,
      // emitWarning: false,
      // emitError: false,
      // failOnWarning: false,
      // failOnError: false,
      // throwOnWarning: false,
    }),
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
          margin: '20px',
        },
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      comps: path.resolve(__dirname, 'src/components'),
      '#': path.resolve(__dirname, 'type'),
    },
  },
  server: {
    host: '0.0.0.0',
    // https: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3004',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
