import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {
    theme: {
      token: {
        colorPrimary: '#ff4d00',
      },
    },
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'React PC App2',
  },
  base: '/app2',
  publicPath: '/app2/',
  history: {
    type: 'browser',
  },
  routes: [
    {
      name: '首页',
      path: '/',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
  ],
  npmClient: 'pnpm',
  // utoopack: {},
  // 核心：确保打包格式为 UMD
  mfsu: false, // 注意：Umi 4 开启 qiankun slave 时通常需要关闭 mfsu 或做特殊处理
  qiankun: {
    slave: {},
  },
});
