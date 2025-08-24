import React, { useState, useEffect, useRef } from 'react'
import '../css/LegalDocumentModal.css'
import { API_BASE_URL } from '@/config/env'

// 声明全局PDF.js类型
declare global {
  interface Window {
    pdfjsLib: any
  }
}

// 声明PDF.js类型
interface PDFJS {
  getDocument: (url: string) => any
  GlobalWorkerOptions: {
    workerSrc: string
  }
}

// 动态加载PDF.js
const loadPdfJs = async (): Promise<PDFJS | null> => {
  try {
    // 动态加载PDF.js库
    const script = document.createElement('script')
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
    script.async = true

    return new Promise((resolve, reject) => {
      script.onload = () => {
        // 等待PDF.js加载完成
        const checkPdfJs = () => {
          if (window.pdfjsLib) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc =
              'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
            resolve(window.pdfjsLib)
          } else {
            setTimeout(checkPdfJs, 100)
          }
        }
        checkPdfJs()
      }
      script.onerror = reject
      document.head.appendChild(script)
    })
  } catch (error) {
    console.error('加载PDF.js失败:', error)
    return null
  }
}

interface LegalDocument {
  name: string
  filename: string
  url: string
  exists: boolean
  content?: string // 添加文档内容字段
}

interface LegalDocumentsResponse {
  code: number
  message: string
  data: {
    terms_of_service: LegalDocument
    privacy_policy: LegalDocument
  }
}

interface LegalDocumentModalProps {
  isOpen: boolean
  onClose: () => void
  documentType: 'terms_of_service' | 'privacy_policy'
}

const LegalDocumentModal: React.FC<LegalDocumentModalProps> = ({
  isOpen,
  onClose,
  documentType,
}) => {
  const [documentData, setDocumentData] = useState<LegalDocument | null>(null)
  const [documentContent, setDocumentContent] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPdf, setIsPdf] = useState(false)
  const [pdfJsLoaded, setPdfJsLoaded] = useState(false)
  const [pdfJsInstance, setPdfJsInstance] = useState<PDFJS | null>(null)
  const [pendingPdfUrl, setPendingPdfUrl] = useState<string | null>(null)
  const pdfContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      // 先加载PDF.js库，然后获取文档
      loadPdfJs()
        .then((pdfJs) => {
          if (pdfJs) {
            console.log('PDF.js库加载成功')
            setPdfJsInstance(pdfJs)
            setPdfJsLoaded(true)
            // 获取文档信息
            fetchLegalDocuments(pdfJs)
          } else {
            console.error('PDF.js库加载失败')
            setError('PDF.js库加载失败')
          }
        })
        .catch((error) => {
          console.error('PDF.js库加载出错:', error)
          setError('PDF.js库加载出错')
        })
    }
  }, [isOpen])

  // 监听pdfJsLoaded状态变化
  useEffect(() => {
    console.log('pdfJsLoaded状态变化:', pdfJsLoaded)
  }, [pdfJsLoaded])

  // 当容器引用可用且有待渲染的PDF时，开始渲染
  useEffect(() => {
    if (pdfContainerRef.current && pendingPdfUrl && pdfJsInstance && isPdf) {
      console.log('容器已就绪，开始渲染PDF:', pendingPdfUrl)
      renderPdf(pendingPdfUrl, pdfJsInstance)
      setPendingPdfUrl(null) // 清除待渲染的URL
    }
  }, [pdfContainerRef.current, pendingPdfUrl, pdfJsInstance, isPdf])

  const fetchLegalDocuments = async (pdfJs: PDFJS) => {
    setLoading(true)
    setError(null)

    try {
      // 使用完整的API URL
      const apiUrl = API_BASE_URL || 'http://localhost:5001'
      const response = await fetch(`${apiUrl}/api/files/legal-documents`)
      const data: LegalDocumentsResponse = await response.json()

      if (data.code === 200) {
        const document = data.data[documentType]
        if (document && document.exists) {
          setDocumentData(document)

          // 如果文档有内容，直接使用；否则尝试获取PDF内容
          if (document.content) {
            setDocumentContent(document.content)
          } else {
            // 尝试获取PDF文件内容，传递PDF.js实例
            await fetchDocumentContent(document.url, pdfJs)
          }
        } else {
          setError('文档不存在')
        }
      } else {
        setError('获取文档失败')
      }
    } catch (err) {
      setError('网络错误，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  // 获取PDF文档内容
  const fetchDocumentContent = async (url: string, pdfJs: PDFJS) => {
    try {
      // 尝试直接获取文档内容
      const response = await fetch(url)
      if (response.ok) {
        const contentType = response.headers.get('content-type')

        if (contentType && contentType.includes('text/')) {
          // 如果是文本文件，直接显示内容
          const text = await response.text()
          setDocumentContent(text)
          setIsPdf(false)
        } else if (contentType && contentType.includes('application/pdf')) {
          // 如果是PDF文件，设置待渲染状态
          setIsPdf(true)
          setPendingPdfUrl(url)
          console.log('设置待渲染PDF URL:', url)
        } else {
          // 其他类型的文件，尝试作为文本读取
          const text = await response.text()
          setDocumentContent(text)
          setIsPdf(false)
        }
      } else {
        setDocumentContent('无法获取文档内容，请稍后重试。')
        setIsPdf(false)
      }
    } catch (err) {
      setDocumentContent('无法获取文档内容，请稍后重试。')
      setIsPdf(false)
    }
  }

  // 渲染PDF内容
  const renderPdf = async (url: string, pdfJs: PDFJS) => {
    console.log('开始渲染PDF, URL:', url)
    console.log('PDF.js实例:', pdfJs)
    console.log('容器引用:', pdfContainerRef.current)

    if (!pdfContainerRef.current) {
      console.error('容器引用不存在')
      setDocumentContent('容器引用不存在，无法显示PDF内容。')
      return
    }

    try {
      // 清空容器并显示加载状态
      if (pdfContainerRef.current) {
        pdfContainerRef.current.innerHTML =
          '<div class="loading">正在渲染PDF...</div>'
      }

      console.log('开始获取PDF文档...')
      const loadingTask = pdfJs.getDocument(url)
      const pdf = await loadingTask.promise
      console.log('PDF文档获取成功，页数:', pdf.numPages)

      // 清空容器
      if (pdfContainerRef.current) {
        pdfContainerRef.current.innerHTML = ''
      }

      // 渲染所有页面
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum)
        const viewport = page.getViewport({ scale: 1.0 })

        // 创建canvas元素
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width

        // 将页面渲染到canvas
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        }

        await page.render(renderContext).promise

        // 将canvas添加到容器
        if (pdfContainerRef.current) {
          pdfContainerRef.current.appendChild(canvas)

          // 在页面之间添加分隔
          if (pageNum < pdf.numPages) {
            const separator = document.createElement('div')
            separator.style.height = '20px'
            separator.style.borderBottom = '1px solid #e5e7eb'
            pdfContainerRef.current.appendChild(separator)
          }
        }
      }

      // 渲染完成后，设置状态
      setIsPdf(true)
      setDocumentContent('') // 清空文本内容，因为现在显示的是PDF
      console.log('PDF渲染完成')
    } catch (err) {
      console.error('PDF渲染失败:', err)
      setDocumentContent('PDF渲染失败，请稍后重试。')
      setIsPdf(false)

      // 如果渲染失败，清空容器
      if (pdfContainerRef.current) {
        pdfContainerRef.current.innerHTML = ''
      }
    }
  }

  // 格式化文档内容
  const formatDocumentContent = (content: string): string => {
    // 如果是HTML内容，直接返回
    if (content.includes('<') && content.includes('>')) {
      return content
    }

    // 将普通文本转换为HTML格式
    return content
      .replace(/\n/g, '<br>')
      .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
      .replace(/\s{2}/g, '&nbsp;&nbsp;')
  }

  const handleDownload = () => {
    if (documentData?.url) {
      window.open(documentData.url, '_blank')
    }
  }

  if (!isOpen) return null

  return (
    <div className="legal-document-overlay" onClick={onClose}>
      <div
        className="legal-document-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="legal-document-header">
          <h3>
            {documentType === 'terms_of_service' ? '服务条款' : '隐私协议'}
          </h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="legal-document-content">
          {loading && <div className="loading">加载中...</div>}

          {error && <div className="error">{error}</div>}

          {documentData && !loading && !error && (
            <div className="document-info">
              <div className="document-name">{documentData.name}</div>

              {/* 显示文档内容 */}
              <div className="document-content-display">
                <div className="content-header">文档内容：</div>

                {isPdf ? (
                  // PDF内容显示
                  <div className="pdf-container" ref={pdfContainerRef}>
                    {pendingPdfUrl ? (
                      <div className="loading">准备渲染PDF...</div>
                    ) : (
                      <div className="loading">正在加载PDF内容...</div>
                    )}
                  </div>
                ) : (
                  // 文本内容显示
                  <div className="content-text">
                    {documentContent ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: formatDocumentContent(documentContent),
                        }}
                      />
                    ) : (
                      '正在加载文档内容...'
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LegalDocumentModal
