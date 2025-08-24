import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Input, message, Space, Typography } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

/**
 * 登录页面组件
 */
const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/', { replace: true })
    } else {
      setIsChecking(false)
    }
  }, [navigate])

  const onFinish = async (_values: { username: string; password: string }) => {
    localStorage.setItem('token', 'mock-token')
    message.success('登录成功')
    navigate('/', { replace: true })
  }

  // 如果正在检查认证状态，显示加载
  if (isChecking) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card style={{ width: 360 }}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div style={{ textAlign: 'center' }}>
            <Title level={3} style={{ marginBottom: 0 }}>AI-CE 管理系统</Title>
            <div style={{ color: '#999' }}>请登录您的账户</div>
          </div>
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input prefix={<UserOutlined />} placeholder="admin" autoComplete="username" />
            </Form.Item>
            <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="123456" autoComplete="current-password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>登录</Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  )
}

export default LoginPage
