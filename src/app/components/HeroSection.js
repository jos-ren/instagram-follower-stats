'use client'

import { Typography, Card, Row, Col, Button } from 'antd';
import { SearchOutlined, LockOutlined, BarChartOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export function HeroSection() {
  const features = [
    {
      icon: <SearchOutlined style={{ fontSize: '48px' }} />,
      title: "Deep Insights",
      description: "Identify mutual followers, find unfollowers, and see your complete network overview"
    },
    {
      icon: <LockOutlined style={{ fontSize: '48px' }} />,
      title: "100% Private",
      description: "Your data remains on your device — no login, no cloud storage, just total privacy."
    },
    {
      icon: <BarChartOutlined style={{ fontSize: '48px' }} />,
      title: "Export & Share",
      description: "Download your analysis as an Excel file for further analysis or record-keeping."
    }
  ];

  return (
    <div style={{ padding: '60px 0' }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={14} xl={12}>
          <Title level={1} style={{ textAlign: 'center', marginBottom: '20px' }}>
            Analyze Your Instagram Network
          </Title>
          <Paragraph style={{ textAlign: 'center', fontSize: '18px', marginBottom: '40px' }}>
          Gain valuable insights into your Instagram connections. See who follows you back, identify unfollowers, and analyze your network effortlessly — no login required and everything stays private on your device.          </Paragraph>
          
          <Row gutter={[16, 16]} justify="center">
            {features.map((feature, index) => (
              <Col xs={24} sm={8} key={index}>
                <Card
                  hoverable
                  style={{ textAlign: 'center' }}
                  cover={<div style={{ padding: '24px 0' }}>{feature.icon}</div>}
                >
                  <Card.Meta
                    title={feature.title}
                    description={feature.description}
                  />
                </Card>
              </Col>
            ))}
          </Row>
          
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Button type="primary" size="large">
              Learn how to export your data
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

