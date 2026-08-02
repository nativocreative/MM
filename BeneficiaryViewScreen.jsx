import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ArrowLeft, Send, Lock, Heart } from 'lucide-react'

const DEMO_RESPONSES = [
  "Hola María. Si estás leyendo esto, significa que ya no estoy. Quiero que sepas que te amo más de lo que las palabras pueden expresar.",
  "Guardé este mensaje para el día en que más lo necesitaras. Quiero que recuerdes que eres la persona más fuerte que conozco.",
  "Un día a la vez, amor. No tienes que tener todas las respuestas hoy. Solo respira. Y recuerda: te dejé más mensajes para otros momentos. Busca en el vault.",
  "Nunca olvides lo feliz que fuimos juntos. Cada risa, cada viaje, cada momento tranquilo en casa. Eso es lo que quiero que guardes.",
]

export default function BeneficiaryViewScreen() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user, messages } = useApp()
  const [chatMessages, setChatMessages] = useState([])
  const [input, setInput] = useState('')
  const [showLock, setShowLock] = useState(true)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chatMessages])

  const unlock = () => {
    setShowLock(false)
    setIsUnlocked(true)
    setTimeout(() => {
      setChatMessages([{ type: 'received', text: DEMO_RESPONSES[0], delay: true }])
    }, 600)
  }

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = { type: 'sent', text: input.trim() }
    setChatMessages(prev => [...prev, userMsg])
    setInput('')

    setTimeout(() => {
      const idx = Math.min(chatMessages.length / 2 + 1, DEMO_RESPONSES.length - 1)
      const response = DEMO_RESPONSES[Math.floor(idx)] || DEMO_RESPONSES[DEMO_RESPONSES.length - 1]
      setChatMessages(prev => [...prev, { type: 'received', text: response }])
    }, 1200)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--mm-bg)', animation: 'fadeIn 0.3s ease' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px', borderBottom: '1px solid var(--mm-border)',
        background: 'var(--mm-bg)', zIndex: 10,
      }}>
        <button onClick={() => navigate('/vault')} style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', color: 'var(--mm-text)' }}>
          <ArrowLeft size={22} />
        </button>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'var(--mm-surface)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20,
        }}>{user.avatar}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{user.name}</div>
          <div style={{ fontSize: 11, color: 'var(--mm-text-secondary)' }}>
            {isUnlocked ? 'Legado activado hoy' : 'Vault bloqueado'}
          </div>
        </div>
        <Heart size={20} color="var(--mm-danger)" fill="var(--mm-danger)" />
      </div>

      {/* Lock Overlay */}
      {showLock && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 50, animation: 'fadeIn 0.3s ease',
        }}>
          <div style={{
            background: 'var(--mm-bg)', padding: 32, borderRadius: 20,
            textAlign: 'center', maxWidth: 300, width: '90%',
          }}>
            <Lock size={40} style={{ marginBottom: 12, color: 'var(--mm-text-muted)' }} />
            <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>Vault bloqueado</h3>
            <p style={{ fontSize: 13, color: 'var(--mm-text-secondary)', lineHeight: 1.5, marginBottom: 20 }}>
              Este es un modo demo. En la app real, el vault se desbloquearía tras la verificación de la muerte por testigos designados.
            </p>
            <button
              onClick={unlock}
              style={{
                width: '100%', padding: 14, borderRadius: 12, border: 'none',
                background: 'var(--mm-text)', color: 'var(--mm-bg)',
                fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}
            >
              🔓 Simular desbloqueo
            </button>
          </div>
        </div>
      )}

      {/* Chat */}
      <div ref={scrollRef} style={{
        flex: 1, overflowY: 'auto', padding: '16px',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {chatMessages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.type === 'sent' ? 'flex-end' : 'flex-start',
            maxWidth: '82%',
            padding: '12px 16px',
            borderRadius: msg.type === 'sent' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
            background: msg.type === 'sent' ? 'var(--mm-text)' : 'var(--mm-surface)',
            color: msg.type === 'sent' ? 'var(--mm-bg)' : 'var(--mm-text)',
            fontSize: 14, lineHeight: 1.5,
            animation: 'fadeIn 0.4s ease',
          }}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{
        display: 'flex', gap: 8, padding: '10px 16px 24px',
        borderTop: '1px solid var(--mm-border)',
        background: 'var(--mm-bg)',
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder={isUnlocked ? "Escribe una respuesta..." : "Esperando desbloqueo..."}
          disabled={!isUnlocked}
          style={{
            flex: 1, padding: '12px 16px', borderRadius: 20,
            border: '1px solid var(--mm-border)',
            background: 'var(--mm-surface)', color: 'var(--mm-text)',
            fontSize: 14,
          }}
        />
        <button
          onClick={handleSend}
          disabled={!isUnlocked || !input.trim()}
          style={{
            width: 44, height: 44, borderRadius: '50%',
            border: 'none',
            background: isUnlocked && input.trim() ? 'var(--mm-text)' : 'var(--mm-border)',
            color: isUnlocked && input.trim() ? 'var(--mm-bg)' : 'var(--mm-text-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: isUnlocked && input.trim() ? 'pointer' : 'not-allowed',
            transition: 'all 0.15s ease',
          }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}