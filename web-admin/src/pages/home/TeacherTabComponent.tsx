import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import './css/TeacherTabComponent.css';

// 导入SVG图标
import kechengjiansheIcon from '../../assets/kechengjianshe.svg';
import zhihuizhujiaoIcon from '../../assets/zhihuizhujiao.svg';
import xuexipingceIcon from '../../assets/xuexipingce.svg';
import jiaoxuedongchaIcon from '../../assets/jiaoxuedongcha.svg';
import icoCatalogueGoIcon from '../../assets/ico_catalogue_go.svg';

// 导入图片资源
import jiaoxueziyuankuImg from '../../assets/jiaoxueziyuanku.png';
import tupujiansheImg from '../../assets/tupujianshe.png';
import jiaoxuejihuaImg from '../../assets/jiaoxuejihua.png';
import jiaoxuejiangyiImg from '../../assets/jiaoxuejiangyi.png';
import studentAgentImg from '../../assets/student-agent.png';
import zuoyetuisongImg from '../../assets/zuoyetuisong.png';
import zidongpigaiImg from '../../assets/zidongpigai.png';
import xuetangpingguImg from '../../assets/xuetangpinggu.png';
import xueqingfenxiImg from '../../assets/xueqingfenxi.png';

const TeacherTabComponent = () => {
  const [activeTab, setActiveTab] = useState('curriculum');
  const [activeSubMenu, setActiveSubMenu] = useState('resource');
  const [hoveredSubMenu, setHoveredSubMenu] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Tab数据配置
  const tabsData = [
    {
      key: 'curriculum',
      title: '课程建设',
      icon: kechengjiansheIcon,
      subMenus: [
        {
          key: 'resource',
          title: '教学资源库',
          icon: xuexipingceIcon,
          description: '老师建设自己的教学大纲，设置课时，与上课时间，设置每次主题课的教学/课件资料、习题等，并支持将课件习题发布给学生。',
          imageUrl: jiaoxueziyuankuImg,
          features: ['资源分类管理', '智能推荐', '在线预览', '批量导入']
        },
        {
          key: 'graph',
          title: '图谱建设',
          icon: xuexipingceIcon,
          description: '通过资料解析图谱，并支持知识点增删改，知识点与教学资料关联等',
          imageUrl: tupujiansheImg,
          features: ['知识图谱构建', '节点管理', '关系编辑', '可视化展示']
        }
      ]
    },
    {
      key: 'assistant',
      title: '智慧助教',
      icon: zhihuizhujiaoIcon,
      subMenus: [
        {
          key: 'ai-teaching',
          title: '教学计划',
          icon: xuexipingceIcon,
          description: 'AI生成教学计划',
          imageUrl: jiaoxuejihuaImg,
          features: ['智能答疑', '作业批改', '学习建议', '进度跟踪']
        },
        {
          key: 'interactive',
          title: '教案讲义',
          icon: xuexipingceIcon,
          description: 'AI生成教案文档、讲义ppt',
          imageUrl: jiaoxuejiangyiImg,
          features: ['实时互动', '课堂反馈', '参与度统计', '效果评估']
        }
      ]
    },
    {
      key: 'assessment',
      title: '学习评测',
      icon: xuexipingceIcon,
      subMenus: [
        {
          key: 'evaluation',
          title: '出题助手',
          icon: xuexipingceIcon,
          description: '题库建设、题库出题、AI出题',
          imageUrl: studentAgentImg,
          features: ['多维度评测', '实时跟踪', '智能分析', '报告生成']
        },
        {
          key: 'progress',
          title: '作业推送',
          icon: xuexipingceIcon,
          description: '作业定时推送，跟进作业完成进度，让学生更高效地完成作业',
          imageUrl: zuoyetuisongImg,
          features: ['进度可视化', '状态监控', '目标设定', '提醒功能']
        },
        {
          key: 'auto-grade',
          title: '自动批改',
          icon: xuexipingceIcon,
          description: '题库建设、题库出题、AI出题',
          imageUrl: zidongpigaiImg,
          features: ['进度可视化', '状态监控', '目标设定', '提醒功能']
        }
      ]
    },
    {
      key: 'insights',
      title: '教学洞察',
      icon: jiaoxuedongchaIcon,
      subMenus: [
        {
          key: 'analytics',
          title: '学堂评估',
          icon: xuexipingceIcon,
          description: '分析课堂录制数据，解析语音切片，关联知识点，记录互动情况，对老师教学水平、课堂活跃度进行智能分析',
          imageUrl: xuetangpingguImg,
          features: ['数据挖掘', '趋势分析', '预测模型', '决策支持']
        },
        {
          key: 'reports',
          title: '学情分析',
          icon: xuexipingceIcon,
          description: '记录老师、学生在平台内学习轨迹、进度、习题数据，对学生的学习质量进行横纵分析',
          imageUrl: xueqingfenxiImg,
          features: ['自动报告', '多维度分析', '可视化展示', '导出功能']
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
    <div className="teacher-tab-container">
      {/* 顶部Tab导航 */}
      <div className="teacher-tab-header">
        <div className="teacher-tab-navigation">
          {tabsData.map((tab, index) => (
            <React.Fragment key={tab.key}>
              <button 
                className={`teacher-tab-nav-button ${activeTab === tab.key ? 'teacher-tab-active' : ''}`}
                onClick={() => handleTabChange(tab.key)}
              >
                <span className="teacher-tab-icon">
                  <img src={tab.icon} alt={tab.title} width="20" height="20" />
                </span>
                {tab.title}
              </button>
              {index < tabsData.length - 1 && <span className="teacher-tab-separator">
                <img src={icoCatalogueGoIcon} alt=">" width="16" height="16" />
              </span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="teacher-tab-content">
        {/* 左侧二级菜单 */}
        <div className="teacher-sub-menu-panel">
          <div className="teacher-sub-menu-list">
            {displayTab?.subMenus.map(subMenu => (
              <div
                key={subMenu.key}
                className={`teacher-sub-menu-item ${(activeSubMenu === subMenu.key && !hoveredSubMenu) ? 'teacher-sub-menu-active' : ''} ${hoveredSubMenu === subMenu.key ? 'teacher-sub-menu-hover' : ''}`}
                onClick={() => handleSubMenuClick(subMenu.key)}
                onMouseEnter={() => handleSubMenuHover(subMenu.key)}
                onMouseLeave={handleSubMenuLeave}
              >
                <div className="teacher-sub-menu-content">
                  <div className="teacher-sub-menu-name">
                    <div className="teacher-sub-menu-icon">
                      <img src={subMenu.icon} alt={subMenu.title} width="20" height="20" />
                    </div>
                    <span>{subMenu.title}</span>
                  </div>
                  {((activeSubMenu === subMenu.key && !hoveredSubMenu) || hoveredSubMenu === subMenu.key) && (
                    <p className="teacher-sub-menu-description">{subMenu.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* 操作按钮 */}
          <div className="teacher-action-buttons">
            <Button type="primary" size="large" className="teacher-primary-action">
                立即体验
            </Button>
          </div>
        </div>

        {/* 右侧图片展示区域 */}
        <div className="teacher-image-panel">
          {displaySubMenu && (
            <div className="teacher-image-content">
              <div className="teacher-image-container">
                <img 
                  src={displaySubMenu.imageUrl} 
                  alt={displaySubMenu.title} 
                  className="teacher-feature-image"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherTabComponent;
