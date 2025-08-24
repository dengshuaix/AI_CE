/* eslint-disable */
import React, { forwardRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/LoginModal.css'
import { useAuth } from '../hooks/useAuth'
import type { LoginRequest } from '@/types/authTypes'
import { checkAgreement } from '../auth'
import LegalDocumentModal from './LegalDocumentModal'
import PasswordToggleIcon from './PasswordToggleIcon'
import { ASSETS, getAsset } from '@/utils/paths'

interface LoginModalProps {
  // 移除 onLoginSuccess 回调
}

interface LoginModalRef {
  openModal: () => void
  closeModal: () => void
}

// 常量定义
const COMMON_TITLE = '欢迎来到首都教育新地图'
const COMMON_SUBTITLE = '连接你的数字化未来'

// 学校列表（暂时未使用）
// const SCHOOLS = [
//   { value: '', label: '请选择学校' },
//   { value: '北京大学', label: '北京大学' },
//   { value: '清华大学', label: '清华大学' },
//   { value: '中国人民大学', label: '中国人民大学' },
// ]

const LoginModal = forwardRef<LoginModalRef, LoginModalProps>(({}, ref) => {
  // const navigate = useNavigate()
  const [showModal, setShowModal] = useState(true)
  const [showHint, setShowHint] = useState(false)
  const [showHintSud, setShowHintSud] = useState(false)
  const [hintText, setHintText] = useState('')
  const [showPhoneForm, setShowPhoneForm] = useState(false)
  const [showLegalDocument, setShowLegalDocument] = useState(false)
  const [legalDocumentType, setLegalDocumentType] = useState<
    'terms_of_service' | 'privacy_policy'
  >('terms_of_service')

  // 使用登录Hook
  const { login } = useAuth()

  // 登录状态
  const [isLoading, setIsLoading] = useState(false)

  // 手机号登录表单状态
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneVerifyCode, setPhoneVerifyCode] = useState('')
  const [rememberPassword, setRememberPassword] = useState(false)
  const [showPhonePassword, setShowPhonePassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  // 页面加载时检查是否有保存的登录信息
  React.useEffect(() => {
    const savedCredentials = localStorage.getItem('saved_credentials')
    if (savedCredentials) {
      try {
        const { phone, password, remember } = JSON.parse(savedCredentials)
        if (remember) {
          setPhoneNumber(phone || '')
          setPhoneVerifyCode(password || '')
          setRememberPassword(true)
        }
      } catch (error) {
        console.error('解析保存的登录信息失败:', error)
      }
    }
  }, [])

  // 检查用户协议同意状态
  const checkUserAgreement = async (phone: string) => {
    if (!phone || phone.length !== 11) return // 手机号必须是11位

    try {
      const result = await checkAgreement(phone)
      if (result.is_agreed) {
        setAgreeToTerms(true)
      }
    } catch (error) {
      console.error('检查协议状态失败:', error)
    }
  }

  // 处理手机号变化
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value
    setPhoneNumber(newPhoneNumber)

    // 当手机号输入完成（11位）时，检查协议状态
    if (newPhoneNumber.length === 11) {
      checkUserAgreement(newPhoneNumber)
    }
  }

  const showHintMessage = (message: string, isSuccess = false) => {
    setHintText(message)
    if (isSuccess) {
      setShowHintSud(true)
      setTimeout(() => setShowHintSud(false), 1000)
    } else {
      setShowHint(true)
      setTimeout(() => setShowHint(false), 1000)
    }
  }

  // 处理手机号登录
  const handlePhoneLogin = async () => {
    if (!phoneNumber.trim() || !phoneVerifyCode.trim()) {
      showHintMessage('请填写完整的登录信息')
      return
    }

    if (!agreeToTerms) {
      showHintMessage('请先阅读并同意服务条款和隐私协议')
      return
    }

    setIsLoading(true)

    try {
      const loginData: LoginRequest = {
        phone: phoneNumber.trim(),
        password: phoneVerifyCode.trim(),
        is_agreed: agreeToTerms,
      }

      const result = await login(loginData)

      if (result.success) {
        // 如果选择记住密码，保存登录信息
        if (rememberPassword) {
          const credentialsToSave = {
            phone: phoneNumber.trim(),
            password: phoneVerifyCode.trim(),
            remember: true,
          }
          localStorage.setItem(
            'saved_credentials',
            JSON.stringify(credentialsToSave)
          )
        } else {
          // 如果没有选择记住密码，清除保存的信息
          localStorage.removeItem('saved_credentials')
        }

        showHintMessage(result.message, true)

        // 登录成功，useAuth Hook 会自动处理后续流程
        // 不再需要手动处理回调和关闭模态框
      } else {
        showHintMessage(result.message)
      }
    } catch (error) {
      showHintMessage('登录失败，请稍后重试')
      console.error('登录错误:', error)
    } finally {
      setIsLoading(false)
    }
  }

  React.useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }))

  const renderMainLogin = () => (
    <>
      {/* 左侧登录表单 */}
      <div className="modal-left">
        <div className="logo-container">
          <img src={getAsset(ASSETS.LOGIN_UI.LOGO)} alt="Logo" />
        </div>

        <div className="login-content">
          <div className="login-header">
            <h1 className="login-title">{COMMON_TITLE}</h1>
            <p className="login-subtitle">{COMMON_SUBTITLE}</p>
          </div>

          <div className="login-buttons">
            <button
              className="btn-primary"
              onClick={() => setShowPhoneForm(true)}
            >
              手机号登录
            </button>
          </div>
        </div>
      </div>

      {/* 右侧背景图片 */}
      <div className="modal-right"></div>
    </>
  )

  const renderPhoneForm = () => (
    <>
      <div className="modal-left">
        <div className="logo-container">
          <img src={getAsset(ASSETS.LOGIN_UI.LOGO)} alt="Logo" />
        </div>
        <button className="back-button" onClick={() => setShowPhoneForm(false)}>
          <span className="back-arrow">←</span>
          <span className="back-text">返回</span>
        </button>
        <div className="phone-form-content">
          <div className="phone-form-header">
            <h1 className="phone-form-title">欢迎来到首都教育新地图</h1>
            <p className="phone-form-subtitle">连接你的数字化未来</p>
          </div>

          <div className="phone-form-fields">
            <div className="form-field">
              <label>手机号</label>
              <input
                type="tel"
                placeholder="请输入手机号"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </div>

            <div className="form-field">
              <label>密码</label>
              <div className="verify-code-wrapper">
                <input
                  type={showPhonePassword ? 'text' : 'password'}
                  placeholder="请输入密码"
                  value={phoneVerifyCode}
                  onChange={(e) => setPhoneVerifyCode(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPhonePassword(!showPhonePassword)}
                  title={showPhonePassword ? '隐藏密码' : '显示密码'}
                >
                  <PasswordToggleIcon
                    isVisible={showPhonePassword}
                    className="eye-icon"
                  />
                </button>
              </div>
            </div>

            {/* 记住密码复选框 */}
            <div className="form-field remember-password-field">
              <label className="remember-password-label">
                <input
                  type="checkbox"
                  checked={rememberPassword}
                  onChange={(e) => setRememberPassword(e.target.checked)}
                  className="remember-password-checkbox"
                />
                <span className="remember-password-text">记住密码</span>
              </label>
            </div>
          </div>

          <div className="phone-form-footer">
            <button
              className="phone-login-btn"
              onClick={handlePhoneLogin}
              disabled={isLoading}
            >
              {isLoading ? '登录中...' : '登录'}
            </button>
            <div className="agreement">
              <label className="agreement-checkbox-label">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="agreement-checkbox"
                />
                <span className="agreement-checkbox-text">我已阅读并同意</span>
                <button
                  type="button"
                  className="legal-link"
                  onClick={() => {
                    setLegalDocumentType('terms_of_service')
                    setShowLegalDocument(true)
                  }}
                >
                  《服务条款》
                </button>
                <span className="agreement-checkbox-text">和</span>
                <button
                  type="button"
                  className="legal-link"
                  onClick={() => {
                    setLegalDocumentType('privacy_policy')
                    setShowLegalDocument(true)
                  }}
                >
                  《隐私协议》
                </button>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-right"></div>
    </>
  )

  return (
    <div>
      {/* 提示弹窗 */}
      {showHint && <div className="hint-content">{hintText}</div>}
      {showHintSud && (
        <div className="hint-content hint-content-succeed">{hintText}</div>
      )}

      {/* 主弹窗 */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            {showPhoneForm ? renderPhoneForm() : renderMainLogin()}
          </div>
        </div>
      )}

      {/* 法律文档弹窗 */}
      {showLegalDocument && (
        <LegalDocumentModal
          isOpen={showLegalDocument}
          onClose={() => setShowLegalDocument(false)}
          documentType={legalDocumentType}
        />
      )}
    </div>
  )
})

export default LoginModal
