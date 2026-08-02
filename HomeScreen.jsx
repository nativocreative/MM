import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import Card from '../components/Card.jsx'
import { Mic, Users, Shield, MessageSquare, Clock, TrendingUp } from 'lucide-react'

export default function HomeScreen({ showToast }) {
  const navigate = useNavigate()
  const { messages, beneficiaries, user, vault } = useApp()

  const progress = Math.min(100, Math.round((messages.length / 10) * 100))

  const quickActions = [
    { icon: Mic, title: 'Grabar un mensaje', desc: 'Voz, video o texto para tus seres queridos.', path: '/record', variant: 'accent' },
    { icon: Users, title: 'Mis beneficiarios', desc: 'Gestiona quién puede acceder a tu legado.', path: '/beneficiaries', variant: 'default' },
    { icon: Shield, title: 'Vault de legado', desc: 'Seguridad, reglas de desbloqueo y estado.', path: '/vault', variant: 'success' },
  ]

  return (
    <div style={{ padding: '20px 20px 100px', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ textAlign: 'center', padding: '24px 0 16px' }}>
        <div style={{
          width: 64, height: 64, borderRadius: 18,
          background: 'var(--mm-text)', color: 'var(--mm-bg)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, fontWeight: 700, marginBottom: 12,
        }}>
          🕊️
        </div>
        <h1 style={{ fontSize: 22, margin: 0 }}>Mis Memorias</h1>
        <p style={{ fontSize: 13, color: 'var(--mm-text-secondary)', marginTop: 4 }}>
          Hola, {user.name.split(' ')[0]}. Tu legado está al {progress}%.
        </p>
      </div>

      {quickActions.map(action => (
        <Card key={action.path} onClick={() => navigate(action.path)} variant={action.variant}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'var(--mm-surface)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <action.icon size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{action.title}</div>
              <div style={{ fontSize: 12, color: 'var(--mm-text-secondary)', marginTop: 2 }}>{action.desc}</div>
            </div>
            <span style={{ fontSize: 18, color: 'var(--mm-text-muted)' }}>›</span>
          </div>
        </Card>
      ))}

      <div style={{
        background: 'var(--mm-surface)',
        borderRadius: 14,
        padding: 16,
        marginTop: 8,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Progreso del legado</span>
          <span style={{ fontSize: 13, fontWeight: 700 }}>{progress}%</span>
        </div>
        <div style={{ height: 6, background: 'var(--mm-border)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: progress + '%',
            background: 'var(--mm-text)',
            borderRadius: 3,
            transition: 'width 0.5s ease',
          }} />
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
          marginTop: 16,
          textAlign: 'center',
        }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{messages.length}</div>
            <div style={{ fontSize: 11, color: 'var(--mm-text-secondary)' }}>Mensajes</div>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{beneficiaries.length}</div>
            <div style={{ fontSize: 11, color: 'var(--mm-text-secondary)' }}>Beneficiarios</div>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{vault.storageYears}</div>
            <div style={{ fontSize: 11, color: 'var(--mm-text-secondary)' }}>Años</div>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Últimos mensajes</h3>
          {messages.slice(-2).map(msg => (
            <Card key={msg.id} variant="default">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>{msg.type === 'voice' ? '🎙️' : '💬'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Para: {msg.target}</div>
                  <div style={{ fontSize: 12, color: 'var(--mm-text-secondary)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {msg.type === 'voice' ? msg.content : msg.content.substring(0, 60) + '...'}
                  </div>
                </div>
                <span style={{
                  fontSize: 10,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: 'var(--mm-border)',
                  color: 'var(--mm-text-secondary)',
                }}>{msg.status}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}