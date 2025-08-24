import React from 'react';
import { Button, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';
import logoImg from '../../assets/logo.png';

interface NavigationProps {
  onScrollToSection: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onScrollToSection }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  // 处理导航点击事件
  const handleNavigationClick = (sectionId: string) => {
    if (isHomePage) {
      // 在首页，执行滚动到指定区域
      onScrollToSection(sectionId);
    } else {
      // 在其他页面，先跳转到首页，然后滚动到指定区域
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  // AI助教下拉菜单
  const teacherMenuItems: MenuProps['items'] = [
    {
      key: 'curriculum',
      label: '课程建设',
      onClick: () => handleNavigationClick('teacher-section')
    },
    {
      key: 'preparation',
      label: '教师备课',
      onClick: () => handleNavigationClick('teacher-section')
    },
    {
      key: 'assessment',
      label: '教学评测',
      onClick: () => handleNavigationClick('teacher-section')
    },
    {
      key: 'insights',
      label: '课堂洞察',
      onClick: () => handleNavigationClick('teacher-section')
    }
  ];

  // AI助学下拉菜单
  const studentMenuItems: MenuProps['items'] = [
    {
      key: 'agent',
      label: '学科智能体',
      onClick: () => handleNavigationClick('student-section')
    },
    {
      key: 'companion',
      label: 'AI学伴',
      onClick: () => handleNavigationClick('student-section')
    }
  ];

  // AI助管下拉菜单
  const institutionMenuItems: MenuProps['items'] = [
    {
      key: 'digital-human',
      label: '数字人',
      onClick: () => handleNavigationClick('institution-section')
    },
    {
      key: 'management-software',
      label: '管理端软件',
      onClick: () => handleNavigationClick('institution-section')
    }
  ];

  return (
    <header className="navigation-header">
      <div className="navigation-header__content">
        {/* Logo */}
        <div className="navigation-logo">
          <div className="navigation-logo__icon">
            <img src={logoImg} alt="智谱" />
          </div>
          <span className="navigation-logo__text">智谱</span>
        </div>

        {/* 导航菜单 */}
        <div className="navigation-menu">
          <div 
            className="navigation-item" 
            onClick={() => handleNavigationClick('ai-engine-section')}
          >
            学科AI引擎
            <DownOutlined className="navigation-arrow" />
          </div>
          
          <Dropdown menu={{ items: teacherMenuItems }} placement="bottomCenter">
            <div className="navigation-item navigation-dropdown">
              AI助教
              <DownOutlined className="navigation-arrow" />
            </div>
          </Dropdown>
          
          <Dropdown menu={{ items: studentMenuItems }} placement="bottomCenter">
            <div className="navigation-item navigation-dropdown">
              AI助学
              <DownOutlined className="navigation-arrow" />
            </div>
          </Dropdown>
          
          <Dropdown menu={{ items: institutionMenuItems }} placement="bottomCenter">
            <div className="navigation-item navigation-dropdown">
              AI助管
              <DownOutlined className="navigation-arrow" />
            </div>
          </Dropdown>
          
          <div 
            className="navigation-item" 
            onClick={() => navigate('/about')}
          >
            关于我们
          </div>
        </div>

        <div className='navigation-login-container'>
          {/* 登录按钮 */}
          <Button 
            type="primary" 
            className="navigation-login-btn"
          >
            登录
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
