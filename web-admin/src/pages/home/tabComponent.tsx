import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import './css/tabComponent.css';

// 导入SVG图标
import kechengjiansheIcon from '../../assets/kechengjianshe.svg';
import zhihuizhujiaoIcon from '../../assets/zhihuizhujiao.svg';
import xuexipingceIcon from '../../assets/xuexipingce.svg';
import icoCatalogueGoIcon from '../../assets/ico_catalogue_go.svg';

// 导入图片资源
import jiaoxueziyuankuImg from '../../assets/jiaoxueziyuanku.png';
import jiaoxuejihuaImg from '../../assets/jiaoxuejihua.png';

const TeacherTabComponent = () => {
  const [activeTab, setActiveTab] = useState('curriculum');
  const [activeSubMenu, setActiveSubMenu] = useState('resource');
  const [hoveredSubMenu, setHoveredSubMenu] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Tab数据配置
  const tabsData = [
    {
      key: 'curriculum',
      title: '学科智能体',
      icon: kechengjiansheIcon,
      subMenus: [
        {
          key: 'resource',
          title: '官方海π学科智能体',
          icon: xuexipingceIcon,
          description: '数学、物理、化学、英语、语文',
          imageUrl: jiaoxueziyuankuImg,
          features: ['资源分类管理', '智能推荐', '在线预览', '批量导入']
        }
      ]
    },
    {
      key: 'assistant',
      title: 'AI学伴',
      icon: zhihuizhujiaoIcon,
      subMenus: [
        {
          key: 'ai-teaching',
          title: '个性化精准学习路径',
          icon: xuexipingceIcon,
          description: '根据学习进度、学习质量数据，进行个性作业推荐、错题巩固、生成个性化学习方案',
          imageUrl: jiaoxuejihuaImg,
          features: ['智能答疑', '作业批改', '学习建议', '进度跟踪']
        }
      ]
    }
  ];

  // 获取当前显示的tab数据
  const displayTab = tabsData.find(tab => tab.key === activeTab);
  

  
  // 获取当前显示的子菜单（hover优先，否则显示active）
  const displaySubMenu = hoveredSubMenu 
    ? displayTab?.subMenus.find(sub => sub.key === hoveredSubMenu)
    : displayTab?.subMenus.find(sub => sub.key === activeSubMenu);

  // 处理Tab切换
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    // 切换到第一个子菜单
    const newTab = tabsData.find(tab => tab.key === key);
    if (newTab && newTab.subMenus.length > 0) {
      setActiveSubMenu(newTab.subMenus[0].key);
    }
    resetAutoPlay();
  };

  // 处理二级菜单点击
  const handleSubMenuClick = (key: string) => {
    setActiveSubMenu(key);
    resetAutoPlay();
  };

  // 处理二级菜单hover
  const handleSubMenuHover = (key: string) => {
    setHoveredSubMenu(key);
  };

  // 处理二级菜单hover离开
  const handleSubMenuLeave = () => {
    setHoveredSubMenu(null);
  };

  // 自动轮播逻辑
  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setActiveTab(prevTab => {
        const currentIndex = tabsData.findIndex(tab => tab.key === prevTab);
        const nextIndex = (currentIndex + 1) % tabsData.length;
        const nextTab = tabsData[nextIndex];
        setActiveSubMenu(nextTab.subMenus[0].key);
        return nextTab.key;
      });
    }, 6000); // 每6秒切换一次
  };

  // 重置自动轮播
  const resetAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startAutoPlay();
  };

  // 组件挂载和卸载时处理自动轮播
  useEffect(() => {
    startAutoPlay();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="tab-component__container">
      {/* 顶部Tab导航 */}
      <div className="tab-component__header">
        <div className="tab-component__navigation">
          {tabsData.map((tab, index) => (
            <React.Fragment key={tab.key}>
              <button 
                className={`tab-component__nav-button ${activeTab === tab.key ? 'tab-component__nav-button--active' : ''}`}
                onClick={() => handleTabChange(tab.key)}
              >
                <span className="tab-component__nav-icon">
                  <img src={tab.icon} alt={tab.title} width="20" height="20" />
                </span>
                {tab.title}
              </button>
              {index < tabsData.length - 1 && <span className="tab-component__separator">
                <img src={icoCatalogueGoIcon} alt=">" width="16" height="16" />
              </span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="tab-component__content">
        {/* 右侧图片展示区域 */}
        <div className="tab-component__image-panel">
          {displaySubMenu && (
            <div className="tab-component__image-content">
              <div className="tab-component__image-container">
                <img 
                  src={displaySubMenu.imageUrl} 
                  alt={displaySubMenu.title} 
                  className="tab-component__feature-image"
                />
              </div>
            </div>
          )}
        </div>

        {/* 左侧二级菜单 */}
        <div className="tab-component__submenu-panel">
          <div className="tab-component__submenu-list">
            {displayTab?.subMenus.map(subMenu => (
              <div
                key={subMenu.key}
                className={`tab-component__submenu-item ${(activeSubMenu === subMenu.key && !hoveredSubMenu) ? 'tab-component__submenu-item--active' : ''} ${hoveredSubMenu === subMenu.key ? 'tab-component__submenu-item--hover' : ''}`}
                onClick={() => handleSubMenuClick(subMenu.key)}
                onMouseEnter={() => handleSubMenuHover(subMenu.key)}
                onMouseLeave={handleSubMenuLeave}
              >
                <div className="tab-component__submenu-content">
                  <div className="tab-component__submenu-name">
                    <div className="tab-component__submenu-icon">
                      <img src={subMenu.icon} alt={subMenu.title} width="20" height="20" />
                    </div>
                    <span>{subMenu.title}</span>
                  </div>
                  {((activeSubMenu === subMenu.key && !hoveredSubMenu) || hoveredSubMenu === subMenu.key) && (
                    <p className="tab-component__submenu-description">{subMenu.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* 操作按钮 */}
          <div className="tab-component__action-buttons">
            <Button type="primary" size="large" className="tab-component__primary-action">
                立即体验
            </Button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TeacherTabComponent;
