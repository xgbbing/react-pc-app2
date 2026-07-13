// 运行时配置
import type { RunTimeLayoutConfig } from '@umijs/max';
import { App, ConfigProvider } from 'antd';
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

let cachedMasterProps: any = {};

export function rootContainer(container: React.ReactNode) {
  const isQiankun = window.__POWERED_BY_QIANKUN__;
  const masterProps = cachedMasterProps?.data || {};
  const isEmbed = masterProps?.mode === 'embed';
  const appId = isEmbed ? 'react-pc-app2-embed' : 'react-pc-app2';
  const containerId = `root-${appId}`;
  return (
    <ConfigProvider
      getPopupContainer={(triggerNode?: HTMLElement) => {
        // 如果在 qiankun 环境下，强制挂载到子应用根节点
        if (isQiankun) {
          const targetNode = document.getElementById(containerId);
          return targetNode || document.body;
        }
        // 独立运行时，挂载到触发节点或 body
        return (triggerNode?.parentNode || document.body) as HTMLElement;
      }}
    >
      <App
        // 关键：为 message 强制指定容器，并手动打上 qiankun 样式隔离属性
        message={{
          getContainer: () => {
            const container =
              document.getElementById(containerId) || document.body;
            // 手动注入 qiankun 样式隔离属性，解决动态 DOM 样式丢失问题
            if (isQiankun && !container.hasAttribute('data-qiankun')) {
              container.setAttribute('data-qiankun', appId);
              // 注意：这里的 appId 必须和主应用注册子应用时的 name 保持一致！
            }
            return container;
          },
        }}
      >
        {container}
      </App>
    </ConfigProvider>
  );
}

// 动态修改客户端渲染选项（解决微前端挂载点问题）
export function modifyClientRenderOpts(memo: any) {
  const isQiankun = window.__POWERED_BY_QIANKUN__;
  const masterProps = cachedMasterProps?.data || {};
  const isEmbed = masterProps?.mode === 'embed';
  const appId = isEmbed ? 'react-pc-app2-embed' : 'react-pc-app2';
  const containerId = `root-${appId}`;
  return {
    ...memo,
    // 判断是否在 qiankun 环境下运行，如果是，指定渲染到特定容器
    rootElement: isQiankun ? containerId : memo.rootElement,
  };
}

const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
  // 子应用的异常处理逻辑
  console.error('子应用发生未捕获的 Promise 拒绝:', event.reason);
  // event.preventDefault();
};

const handleError = (event: ErrorEvent) => {
  // 子应用的异常处理逻辑
  console.error('子应用发生错误:', event.error);
  // event.preventDefault();
};

export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    console.log('[App2] bootstrap', props);
    // 在子应用加载时注册
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);
  },
  // 应用 render 之前触发
  async mount(props: any) {
    console.log('[App2] mount', props);
    cachedMasterProps = props || {};
    // 根据主应用传递的 mode 进行差异化处理
    if (props.mode === 'embed') {
      // 嵌入模式：隐藏子应用自带的侧边栏/顶部导航，适配局部容器
      console.log('当前为嵌入模式');
      // 可以在这里通过全局状态或 Context 通知子应用 Layout 隐藏导航
    } else {
      // 全屏模式：正常展示完整布局
      console.log('当前为全屏模式');
    }
  },
  // 应用卸载之后触发
  async unmount(props: any) {
    console.log('[App2] unmount', props);
    cachedMasterProps = {};
    window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    window.removeEventListener('error', handleError);
  },
};

export const layout: RunTimeLayoutConfig = () => {
  return {
    pure: true,
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};
