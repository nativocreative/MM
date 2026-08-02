import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ChevronRight, Lock, Heart, Users } from 'lucide-react'

const steps = [
  {
    icon: Heart,
    title: 'Bienvenido a Mis Memorias',
    desc: 'Un espacio seguro donde puedes dejar mensajes, consejos y recuerdos para las personas que más amas.',
    color: '#e74c3c',
  },
  {
    icon: Users,
    title: 'Designa a tus seres queridos',
    desc: 'Elige quién podrá acceder a tus memorias y bajo qué condiciones. Tú tienes el control total.',
    color: '#4361ee',
  },
  {
    icon: Lock,
    title: 'Protección de nivel bancario',
    desc: 'Tus memorias se encriptan con AES-256 y se almacenan de forma segura. La clave se divide entre testigos de confianza.',
    color: '#2ecc71',
  },
]

export default function OnboardingScreen() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()
  const { completeOnboarding } = useApp()

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1)
    else {
      completeOnboarding()
      navigate('/')
    }
  }

  const current = steps[step]
  const Icon = current.icon

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
      textAlign: 'center',
      animation: 'fadeIn 0.4s ease',
    }}>
      <div style={{
        width: 80,
        height: 80,
        borderRadius: 24,
        background: current.color + '15',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
      }}>
        <Icon size={36} color={current.color} />
      </div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>{current.title}</h1>
      <p style={{ fontSize: 15, color: 'var(--mm-text-secondary)', lineHeight: 1.6, marginBottom: 40 }}>
        {current.desc}
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
        {steps.map((_, i) => (
          <div key={i} style={{
            width: i === step ? 24 : 8,
            height: 8,
            borderRadius: 4,
            background: i === step ? 'var(--mm-text)' : 'var(--mm-border)',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      <button
        onClick={next}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '14px 32px',
          borderRadius: 12,
          border: 'none',
          background: 'var(--mm-text)',
          color: 'var(--mm-bg)',
          fontSize: 15,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {step === steps.length - 1 ? 'Comenzar' : 'Siguiente'}
        <ChevronRight size={18} />
      </button>

      {step > 0 && (
        <button
          onClick={() => { completeOnboarding(); navigate('/') }}
          style={{
            marginTop: 16,
            background: 'none',
            border: 'none',
            color: 'var(--mm-text-muted)',
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Saltar onboarding
        </button>
      )}
    </div>
  )
}