import React from 'react'

export default function Toast({ message }) {
  return (
    <div style={{
      position: 'fixed',
      top: 60,
      left: '50%',
      transform: 'translateX(-50%)',
      maxWidth: 380,
      width: '90%',
      padding: '12px 20px',
      borderRadius: 12,
      background: 'var(--mm-text)',
      color: 'var(--mm-bg)',
      fontSize: 13,
      textAlign: 'center',
      zIndex: 200,
      animation: 'toastIn 0.3s ease',
      boxShadow: 'var(--mm-shadow-lg)',
    }}>
      {message}
    </div>
  )
}