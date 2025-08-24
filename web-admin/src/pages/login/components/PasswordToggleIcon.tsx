import React from 'react'

interface PasswordToggleIconProps {
  isVisible: boolean
  className?: string
}

const PasswordToggleIcon: React.FC<PasswordToggleIconProps> = ({
  isVisible,
  className = '',
}) => {
  if (isVisible) {
    // 密码可见时的图标（普通眼睛 - 表示当前密码是可见的）
    return (
      <svg
        className={className}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 眼睛轮廓 */}
        <path
          d="M12 5C7 5 2.73 8.11 1 12.5c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
          fill="currentColor"
          fillOpacity="0.85"
        />
        {/* 瞳孔 */}
        <circle cx="12" cy="12.5" r="2.5" fill="currentColor" />
      </svg>
    )
  }

  // 密码隐藏时的图标（眼睛被划掉 - 表示当前密码是隐藏的）
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 眼睛轮廓 */}
      <path
        d="M12 5C7 5 2.73 8.11 1 12.5c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
        fill="currentColor"
        fillOpacity="0.85"
      />
      {/* 瞳孔 */}
      <circle cx="12" cy="12.5" r="2.5" fill="currentColor" />
      {/* 划掉线 */}
      <line
        x1="4"
        y1="20"
        x2="20"
        y2="4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeOpacity="0.9"
      />
    </svg>
  )
}

export default PasswordToggleIcon
