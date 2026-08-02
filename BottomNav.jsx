import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Mic, Users, Shield } from 'lucide-react'

const items = [
  { path: '/', icon: Home, label: 'Inicio' },
  { path: '/record', icon: Mic, label: 'Grabar' },
  { path: '/beneficiaries', icon: Users, label: 'Familia' },
  { path: '/vault', icon: Shield, label: 'Vault' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: 430,
      display: 'flex',
      justifyContent: 'space-around',
      padding: '8px 0 12px',
      borderTop: '1px solid var(--mm-border)',
      background: 'var(--mm-bg)',
      zIndex: 100,
    }}>
      {items.map(item => {
        const active = location.pathname === item.path
        const Icon = item.icon
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              background: 'none',
              border: 'none',
              color: active ? 'var(--mm-text)' : 'var(--mm-text-muted)',
              fontSize: 11,
              fontWeight: 500,
              padding: '4px 16px',
              transition: 'color 0.15s ease',
            }}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 1.5} />
            {item.label}
          </button>
        )
      })}
    </nav>
  )
}