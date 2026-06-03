import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Button, Select, Space } from 'antd';
import styles from './index.less';

const CITY_OPTIONS = [
  {
    label: '北京',
    value: 'beijing',
  },
  {
    label: '上海',
    value: 'shanghai',
  },
  {
    label: '广州',
    value: 'guangzhou',
  },
  {
    label: '深圳',
    value: 'shenzhen',
  },
];

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const masterProps = useModel('@@qiankunStateFromMaster');

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
        <Space direction="vertical" size="middle">
          <div>
            <span style={{ marginRight: 8 }}>当前城市（来自主应用）：</span>
            <Select
              options={CITY_OPTIONS}
              value={masterProps?.city}
              style={{ width: 120 }}
              onChange={(value) => {
                masterProps?.setCity?.(value);
              }}
            />
          </div>
          <Button type="primary" onClick={() => history.push('/access')}>
            跳转权限演示页面
          </Button>
        </Space>
      </div>
    </PageContainer>
  );
};

export default HomePage;
