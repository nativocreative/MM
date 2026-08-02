import React, { useState } from 'react'

export default function SegmentedControl({ options, value, onChange }) {
  return (
    <div style={{
      display: 'flex',
      background: 'var(--mm-surface)',
      borderRadius: 10,
      padding: 3,
      marginBottom: 16,
    }}>
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          style={{
            flex: 1,
            padding: '8px 4px',
            border: 'none',
            background: value === opt.value ? 'var(--mm-bg)' : 'transparent',
            color: value === opt.value ? 'var(--mm-text)' : 'var(--mm-text-secondary)',
            fontSize: 13,
            fontWeight: value === opt.value ? 600 : 500,
            borderRadius: 8,
            cursor: 'pointer',
            boxShadow: value === opt.value ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
            transition: 'all 0.15s ease',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}