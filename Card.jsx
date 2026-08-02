import React from 'react'

export default function Card({ children, onClick, style = {}, variant = 'default' }) {
  const variants = {
    default: { borderColor: 'var(--mm-border)', background: 'transparent' },
    success: { borderColor: 'rgba(46,204,113,0.3)', background: 'rgba(46,204,113,0.05)' },
    danger: { borderColor: 'rgba(231,76,60,0.3)', background: 'rgba(231,76,60,0.05)' },
    accent: { borderColor: 'rgba(67,97,238,0.3)', background: 'rgba(67,97,238,0.05)' },
  }

  return (
    <div
      onClick={onClick}
      style={{
        border: '1px solid',
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.15s ease',
        ...variants[variant],
        ...style,
      }}
      onMouseEnter={e => onClick && (e.currentTarget.style.borderColor = 'var(--mm-text-muted)')}
      onMouseLeave={e => onClick && (e.currentTarget.style.borderColor = variants[variant].borderColor)}
    >
      {children}
    </div>
  )
}