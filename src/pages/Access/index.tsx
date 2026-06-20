import { PageContainer } from '@ant-design/pro-components';
import { Access, history, useAccess } from '@umijs/max';
import { Button } from 'antd';

const AccessPage: React.FC = () => {
  const access = useAccess();
  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <Access accessible={access.canSeeAdmin}>
        <Button>只有 Admin 可以看到这个按钮</Button>
      </Access>
      <Button style={{ marginTop: 16 }} onClick={() => history.push('/')}>
        返回首页
      </Button>
    </PageContainer>
  );
};

export default AccessPage;
