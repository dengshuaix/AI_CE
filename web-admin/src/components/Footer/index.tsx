import React from 'react';
import { Typography } from 'antd';
import { 
  QrcodeOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import './Footer.css';

const { Text } = Typography;
import haipai from '../../assets/haipai.png';


/**
 * 首页底部组件
 */
const Footer: React.FC = () => {
  return (
    <footer className="homepage-footer">
      <div className="homepage-container">
        <div className="homepage-footer__top">
          <div className='homepage-footer__left'>
            <div className="homepage-footer__logo">
              <div className="homepage-footer__logo-icon">
                <img src="/src/assets/logo.png" alt="智语logo" />
              </div>
              <span className="homepage-footer__logo-text">智谱</span>
            </div>
          </div>
          <div className="homepage-footer__nav-menu">
            <span>学科AI引擎</span>
            <span>AI助教</span>
            <span>AI助学</span>
            <span>AI助管</span>
            <span>关于我们</span>
          </div>
        </div>
          <div className="homepage-footer__bottom">
            <div className="homepage-footer__qr-codes">
              <div className='homepage-footer__qr-codes-left'>
                <div className="homepage-footer__qr-item">
                    <img src={haipai} alt="" />
                    <Text>微信公众号</Text>
                </div>
                <div className="homepage-footer__qr-item item-customer">
                    <img src={haipai} alt="" />
                    <Text>联系客服</Text>
                </div>
              </div>
              <div className="homepage-footer__contact-info">
                <div className="homepage-footer__contact-item">
                    <span>联系电话</span>
                    <span>400-123-4567</span>
                </div>
                <div className="homepage-footer__contact-item">
                    <span>商务合作</span>
                    <span>service@zhipuai.cn</span>
                </div>
                <div className="homepage-footer__contact-item">
                    <span>公司地址</span>
                    <span>北京市海淀区中关村东路1号院9号楼10层</span>
                </div>
                </div>
            </div>
            
            <div className="homepage-footer__copyright">
              <div className='homepage-footer__copyright-left'>
                <span className='homepage-footer__copyright-left-text'>
                    京ICP备20011824号-12
                </span>
              </div>
              <div className='homepage-footer__copyright-right'>
                <span className='homepage-footer__copyright-right-text'>
                    Copyright @ 2025 北京智谱华章科技股份有限公司
                </span>
              </div>
            </div>
          </div>
        
      </div>
    </footer>
  );
};

export default Footer;
