/*
 * @Description: vite 配置
 * @Date: 2022-07-19 14:17:29
 * @LastEditTime: 2022-07-22 17:38:05
 * @FilePath: \vite-vue3-admin\vite.config.ts
 */
import { ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import path from 'path' // ts如果报错 npm i @types/node -D
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createHtmlPlugin } from 'vite-plugin-html'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import ifdef from 'vite-plugin-ifdef'
import { getThemeVariables } from 'ant-design-vue/dist/theme'
import eslintPlugin from 'vite-plugin-eslint' //导入包
// defineOptions 定义 name、components等，不用写两个script
import DefineOptions from 'unplugin-vue-define-options/vite'
import resolveExternalsPlugin from 'vite-plugin-resolve-externals'
import { visualizer } from 'rollup-plugin-visualizer'
const path = require('path')
/** vite-plugin-ifdef插件的配置项 */
// 可以直接在script命名 name 属性，但是这个不怎么需要
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
// vue 自动导入
import AutoImport from 'unplugin-auto-import/vite'
// 自动导入图片，再也不用import img 了
import ViteImages from 'vite-plugin-vue-images'
/** vite-plugin-ifdef插件的配置项，解决开发环境按需导入，加载less过慢的问题 */
type IfdefConfig = { 'ifdef-define': any; 'ifdef-option': any }

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfig & IfdefConfig => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      DefineOptions(),
      VueSetupExtend(),
      AutoImport({
        // 可以自定义文件生成的位置，默认是根目录下，使用ts的建议放src目录下
        dts: 'src/auto-imports.d.ts',
        imports: ['vue'],
        // 解决eslint报错问题
        eslintrc: {
          enabled: true,
        },
      }),
      ViteImages({
        dirs: ['src/assets/images'], // 指明图片存放目录
      }),
      ifdef(),
      Components({
        /**
         * 开发环境(serve命令)若配置importStyle会导致使用ant-design的组件加载时间长达10s以上，
         * 故仅在打包环境(build命令)按需加载ant-design的样式，开发环境全量引入样式文件
         * https://github.com/antfu/unplugin-vue-components/issues/361
         */
        resolvers: [
          AntDesignVueResolver({
            importStyle: command === 'build' ? 'less' : false,
          }),
        ],
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
      visualizer(),
      resolveExternalsPlugin({
        // dayjs: 'dayjs',
        'lodash-es': '_',
      }),
    ],
    'ifdef-define': {
      COMMAND: command,
    },
    // 注意此处有坑，vite-plugin-ifdef的文档中给的键名 ifdef-config 是错误的
    'ifdef-option': {
      verbose: false,
    },
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
  }
}
