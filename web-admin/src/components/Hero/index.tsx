import React from 'react'
import { Typography } from 'antd'
import './Hero.css'

const { Paragraph } = Typography

/**
 * Hero组件接口定义
 */
interface HeroProps {
  /** 主标题 */
  title: string
  /** 副标题 */
  subtitle: string
  /** 描述文字 */
  description: string
  /** 背景图片路径 */
  backgroundImage: string
  /** 自定义样式类名 */
  className?: string
}

/**
 * Hero区域组件
 * 用于展示页面主要内容的横幅区域，支持自定义文案和背景图片
 */
const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  className = ''
}) => {
  return (
    <section 
      className={`hero ${className}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="hero__content">
        <div className="hero__text">
          <div className="hero__title">
            <span>{title}</span>
          </div>
          <div className="hero__subtitle">
            <span>{subtitle}</span>
          </div>
          <Paragraph className="hero__description">
            {description}
          </Paragraph>
        </div>
      </div>
    </section>
  )
}

export default Hero
