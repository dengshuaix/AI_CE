import React from 'react'
import { Layout, Typography, Row, Col } from 'antd'

import './css/AboutPage.css'
import Navigation from '../../components/Header/Navigation'
import Footer from '../../components/Footer'
import Hero from '../../components/Hero'
import aboutBannerImg from '../../assets/about_banner.png'
import aboutZhipu from '../../assets/about_zhipu.png'

const { Content } = Layout
const { Paragraph } = Typography

/**
 * 关于我们页面组件
 */
const AboutPage: React.FC = () => {
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

  return (
    <Layout className="about-portal">
      {/* 顶部导航栏 */}
      <Navigation onScrollToSection={scrollToSection} />

      <Content className="about-content">
        {/* Hero 区域 */}
        <Hero
          title="智谱AI"
          subtitle="专注中文认知大模型，赋能应用"
          description="自主创新的算法、领先的中文认知大模型企业"
          backgroundImage={aboutBannerImg}
          className="about-hero"
        />

        {/* 公司简介区域 */}
        <section id="company-intro" className="about-section">
          <div className="about-container">
            <Row gutter={[48, 32]} className="about-company-content">
              <Col xs={24} lg={12}>
                <div className="about-company__text">
                  <Paragraph className="about-company__title">关于智谱</Paragraph>
                  <Paragraph className="about-company__description">
                  北京智谱华章科技股份有限公司（简称“智谱”）致力于打造新一代认知智能大模型，专注于做大模型的中国创新。公司合作研发了中英双语千亿级超大规模预训练模型GLM-130B，并基于此推出对话模型ChatGLM，开源单卡版模型ChatGLM-6B。同时，团队还打造了AIGC模型及产品矩阵，包括AI提效助手智谱清言（chatglm.cn）、高效率代码模型CodeGeeX、多模态理解模型CogVLM和文生图模型CogView等。公司践行Model as a Service（MaaS）的市场理念，推出大模型MaaS开放平台（https://open.bigmodel.cn/），打造高效率、通用化的“模型即服务”AI开发新范式。通过认知大模型链接物理世界的亿级用户，智谱基于完整的模型生态和全流程技术支持，为千行百业带来持续创新与变革，加速迈向通用人工智能的时代。
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <div className="about-company__image">
                  <img src={aboutZhipu} alt="智谱AI团队" />
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </Content>
      {/* 底部区域 */}
      <Footer />
    </Layout>
  )
}

export default AboutPage
