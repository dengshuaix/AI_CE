// 简单的toast工具
class Toast {
  private container: HTMLDivElement | null = null

  private createContainer() {
    if (this.container) return this.container
    
    this.container = document.createElement('div')
    this.container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      pointer-events: none;
    `
    document.body.appendChild(this.container)
    return this.container
  }

  private show(message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000) {
    const container = this.createContainer()
    
    const toast = document.createElement('div')
    toast.style.cssText = `
      background: ${type === 'success' ? '#52c41a' : type === 'error' ? '#ff4d4f' : '#1890ff'};
      color: white;
      padding: 12px 16px;
      border-radius: 4px;
      margin-bottom: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      transition: all 0.3s ease;
      transform: translateX(100%);
      opacity: 0;
      max-width: 300px;
      word-wrap: break-word;
    `
    toast.textContent = message
    
    container.appendChild(toast)
    
    // 动画进入
    setTimeout(() => {
      toast.style.transform = 'translateX(0)'
      toast.style.opacity = '1'
    }, 10)
    
    // 自动移除
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)'
      toast.style.opacity = '0'
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast)
        }
      }, 300)
    }, duration)
  }

  success(message: string, duration?: number) {
    this.show(message, 'success', duration)
  }

  error(message: string, duration?: number) {
    this.show(message, 'error', duration)
  }

  info(message: string, duration?: number) {
    this.show(message, 'info', duration)
  }
}

export const toast = new Toast()

// 为了兼容之前的代码，导出message对象
export const message = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  info: (msg: string) => toast.info(msg),
}
