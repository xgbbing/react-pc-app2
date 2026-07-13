module.exports = {
  // 继承官方的约定式提交规范
  extends: ['@commitlint/config-conventional'],
  // 自定义规则（可根据团队需求调整）
  rules: {
    // 限制标题的最大长度为 100 个字符
    'header-max-length': [2, 'always', 100],
    // 限制允许的提交类型（type），不在列表内的类型将被拦截
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 Bug
        'docs', // 文档更新
        'style', // 代码格式调整（不影响代码运行）
        'refactor', // 代码重构（非新增功能、非修复 Bug）
        'perf', // 性能优化
        'test', // 增加或修改测试用例
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回滚代码
      ],
    ],
  },
};
