import { useState, useEffect, useRef } from 'react'
import groupPng from '../../assets/Group.png'

const PURPLE = '#5C3FEE'
const FONT   = "'Space Grotesk', sans-serif"

interface ChatMessage { role: 'assistant' | 'user'; text: string }

interface SubmissionWorkspaceProps {
  uploadedFile: File | null
  onReUpload: () => void
}

export default function SubmissionWorkspace({ uploadedFile, onReUpload }: SubmissionWorkspaceProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [messages, setMessages]     = useState<ChatMessage[]>([
    { role: 'assistant', text: 'You can prompt and modify the form details.' },
  ])
  const [chatInput, setChatInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!uploadedFile) { setPreviewUrl(null); return }
    const url = URL.createObjectURL(uploadedFile)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [uploadedFile])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function sendMessage() {
    const text = chatInput.trim()
    if (!text) return
    setMessages(prev => [...prev, { role: 'user', text }])
    setChatInput('')
  }

  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden', borderTop: '1px solid #ECECEC' }}>

      {/* Document Preview — 65% */}
      <div style={{ flex: '0 0 65%', minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '20px 24px 20px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexShrink: 0 }}>
          <span style={{ fontSize: '15px', fontWeight: 600, color: '#262A33', fontFamily: FONT }}>
            {uploadedFile?.name ?? 'ABL Healthcare Form'}
          </span>
          <button onClick={onReUpload} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: PURPLE, fontFamily: FONT }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={PURPLE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Re Upload Form
          </button>
        </div>
        <div style={{ flex: 1, border: '1px solid #ECECEC', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {previewUrl ? (
            <iframe src={previewUrl} title="Document Preview" style={{ width: '100%', height: '100%', border: 'none' }} />
          ) : (
            <div style={{ textAlign: 'center' }}>
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#9CA3AF', fontFamily: FONT }}>Document Preview</p>
            </div>
          )}
        </div>
      </div>

      {/* AI Chat Panel — 35% */}
      <div style={{ flex: '0 0 35%', minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderLeft: '1px solid #ECECEC', backgroundColor: '#F7F5FF', padding: '20px' }}>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', justifyContent: 'center' }}>
          {messages.map((msg, i) =>
            msg.role === 'assistant' ? (
              <div key={i} style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '32px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', boxShadow: '0 2px 16px rgba(92,63,238,0.06)' }}>
                <img src={groupPng} alt="AI assistant" style={{ width: '40px', height: '40px' }} />
                <p style={{ margin: 0, fontSize: '14px', color: '#757C8D', fontFamily: FONT, lineHeight: '1.6', textAlign: 'center' }}>{msg.text}</p>
              </div>
            ) : (
              <div key={i} style={{ alignSelf: 'flex-end', maxWidth: '85%' }}>
                <div style={{ backgroundColor: PURPLE, borderRadius: '12px', padding: '12px 16px' }}>
                  <p style={{ margin: 0, fontSize: '13px', color: '#FFFFFF', fontFamily: FONT, lineHeight: '1.5' }}>{msg.text}</p>
                </div>
              </div>
            )
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ marginTop: '14px', flexShrink: 0, border: '1px solid #E3E5E8', borderRadius: '12px', padding: '12px 14px 10px', backgroundColor: '#FFFFFF' }}>
          <input
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Enter the prompt..."
            style={{ width: '100%', border: 'none', outline: 'none', fontSize: '14px', fontFamily: FONT, color: '#262A33', backgroundColor: 'transparent', boxSizing: 'border-box', marginBottom: '8px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={sendMessage} style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: PURPLE, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"/>
                <polyline points="5 12 12 5 19 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
