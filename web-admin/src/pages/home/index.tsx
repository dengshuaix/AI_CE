import React, { useEffect } from 'react'
import { 
  Layout
} from 'antd'
import { useLocation } from 'react-router-dom'

import './css/HomePage.css'
import TabComponent from './tabComponent'
import SupportingEeducation from './supportingEeducation'
import TeacherTabComponent from './TeacherTabComponent'
import Navigation from '../../components/Header/Navigation'
import Footer from '../../components/Footer'
import Hero from '../../components/Hero'
import bannerImg from '../../assets/banner.png'

const { Content } = Layout


/**
 * 海π教学平台首页组件
 */
const HomePage: React.FC = () => {
  const location = useLocation();
  
  // 锚点跳转函数
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // 处理从其他页面跳转过来的滚动逻辑
  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      // 延迟执行，确保页面完全加载
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  }, [location.state]);

  return (
    <Layout className="homepage-portal">
      {/* 顶部导航栏 */}
      <Navigation onScrollToSection={scrollToSection} />

      <Content className="homepage-content">
        {/* Hero 区域 */}
        <Hero
          title="海π教学平台"
          subtitle="教师精准教学,学生个性化培养"
          description="和教委建联合实验室背书，地方会议+政策文件背书，每个学科一套，学科内标准化"
          backgroundImage={bannerImg}
          className="homepage-hero"
        />

        {/* 学科AI引擎区域 */}
        <section id="ai-engine-section" className="homepage-section">
          <div className="homepage-container">
            <div className='homepage-section__header'>
              <div className="homepage-section__title">
                <span>学科AI引擎</span>
              </div>
              <div className='homepage-section__subtitle'>
                <span>和教委建联合实验室背书，地方会议+政策文件背书，每个学科一套，学科内标准化</span>
              </div>
            </div>
            <div className="homepage-engine-content">
              <div className="homepage-engine__text-content">
                <p className="homepage-engine__title">
                  学科大模型
                </p>
                <p className='homepage-engine__sub-title'>
                  基于智谱GLM4.5全球领先基座大模型展开垂域训练
                </p>
                <ul>
                  <li>
                    <p>
                      <span className='homepage-knowledge__list-item-title'></span>
                      <span className='homepage-knowledge__list-item-text'>准确度</span>
                    </p>
                    <p className='homepage-knowledge__list-item-subText'>教学资源库描述，教学资源库描述教学资源库描述。</p>
                  </li>
                  <li>
                    <p>
                      <span className='homepage-knowledge__list-item-title'></span>
                      <span className='homepage-knowledge__list-item-text'>逻辑性</span>
                    </p>
                    <p className='homepage-knowledge__list-item-subText'>教学资源库描述，教学资源库描述教学资源库描述。</p>
                  </li>
                  <li>
                    <p>
                      <span className='homepage-knowledge__list-item-title'></span>
                      <span className='homepage-knowledge__list-item-text'>引导性</span>
                    </p>
                    <p className='homepage-knowledge__list-item-subText'>教学资源库描述，教学资源库描述教学资源库描述。</p>
                  </li>
                </ul>
              </div>
              <div className='homepage-engine__image'>
                <img src="../../assets/xuekedamoxing.png" alt="" />
              </div>
            </div>
            <div className="homepage-knowledge-content">
              <div className='homepage-knowledge__image'>
                <img src="../../assets/zhishitupu.png" alt="" />
              </div>
              <div className="homepage-knowledge__text-content">
                <p className="homepage-knowledge__title">
                  专业知识图谱
                </p>
                <p className='homepage-knowledge__sub-title'>
                  结合教育部最新权威标准
                </p>
                <ul>
                  <li>
                    <p>
                      <span className='homepage-knowledge__list-item-title'></span>
                      <span className='homepage-knowledge__list-item-text'>学习资源</span>
                    </p>
                    <p className='homepage-knowledge__list-item-subText'>符合国家教育最新标准</p>
                  </li>
                  <li>
                    <p>
                      <span className='homepage-knowledge__list-item-title'></span>
                      <span className='homepage-knowledge__list-item-text'>知识点</span>
                    </p>
                    <p className='homepage-knowledge__list-item-subText'>通过知识点和知识网络展开一系列教学活动</p>
                  </li>
                  <li>
                    <p>
                      <span className='homepage-knowledge__list-item-title'></span>
                      <span className='homepage-knowledge__list-item-text'>核心素养</span>
                    </p>
                    <p className='homepage-knowledge__list-item-subText'>模型解析、人工矫正，打造标准的学科知识图谱</p>
                  </li>
                  <li>
                    <p>
                      <span className='homepage-knowledge__list-item-title'></span>
                      <span className='homepage-knowledge__list-item-text'>教学活动</span>
                    </p>
                    <p className='homepage-knowledge__list-item-subText'>模型解析、人工矫正，打造标准的学科知识图谱</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 助教区域 */}
        <section id="teacher-section" className="teacher-section">
          <div className="teacher-section__container">
            <div>
              <p className="teacher-section__title">
                为教师打造，辅助素养教育
              </p>
              <p className='teacher-section__subtitle'>
                打通教与学全链路数据，发挥数字智能价值，赋能课堂精准教与学
              </p>
            </div>
            <div className="teacher-section__content">
              <TeacherTabComponent />
            </div>
          </div>
        </section>

        {/* 助学区域 */}
        <section id="student-section" className="student-section">
          <div className="student-section__container">
            <div>
              <h1 className="student-section__title">
                为学生打造，助力全方面成长
              </h1>
              <h3 className='student-section__subtitle'>
                个性学（学情精准诊断、路径科学规划、自主学习培养），科学管（智能管理、科学决策、共育成长）
              </h3>
            </div>
            <div className="student-section__content">
              <TabComponent></TabComponent>
            </div>
          </div>
        </section>

        {/* 助管区域 */}
        <section id="institution-section" className="institution-section">
          <div className="institution-section__container">
            <div>
              <h1 className="institution-section__title">
                助力教育机构
              </h1>
              <h3 className='institution-section__subtitle'>
                个性学（学情精准诊断、路径科学规划、自主学习培养），科学管（智能管理、科学决策、共育成长）
              </h3>
            </div>
            <div className="institution-section__content">
              <SupportingEeducation></SupportingEeducation>
            </div>
          </div>
        </section>
      </Content>

      {/* 底部区域 */}
      <Footer />
    </Layout>
  )
}

export default HomePage


