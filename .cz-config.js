/*
 * @Description:
 * @Date: 2022-06-14 11:44:14
 * @LastEditTime: 2022-07-22 15:03:03
 * @FilePath: \vite-element-plus-admin\.cz-config.js
 */
module.exports = {
  // 可选类型
  types: [
    {
      value: 'feat',
      name: 'feat: 新功能',
    },
    {
      value: 'fix',
      name: 'fix: 修复 BUG',
    },
    {
      value: 'docs',
      name: 'docs: 文档变更，比如README',
    },
    {
      value: 'style',
      name: 'style: 代码格式(不影响代码运行的变动)',
    },
    {
      value: 'refactor',
      name: 'refactor: 重构（既不修复错误，也不添加新功能）',
    },
    {
      value: 'perf',
      name: 'perf：优化相关，比如提高性能、体验',
    },
    {
      value: 'test',
      name: 'test：增加测试，包括单元测试、集成测试等',
    },
    {
      value: 'chore',
      name: 'chore: 构建过程或辅助工具的变动（非src和test的修改，发布版本等）',
    },
    {
      value: 'revert',
      name: 'revert: 回退，（恢复先前的提交）',
    },
    {
      value: 'build',
      name: 'build: 系统构建或者外部依赖项的更改',
    },
    {
      value: 'ci',
      name: 'ci: 自动化流程配置或脚本修改',
    },
  ],
  messages: {
    type: '请选择提交的类型: ',
    customScope: '请输入修改的范围（可选）',
    subject: '请简要描述提交（必填）',
    body: '请输入详细的描述（可选）',
    footer: '请输入要关闭的issue（可选）',
    confirmCommit: '确认要使用以上信息提交吗？(y/n)',
  },
  // 跳过步骤
  skipQuestions: ['body', 'footer'],
  // 长度限制，默认就是72
  // subjectLimit: 72
}
