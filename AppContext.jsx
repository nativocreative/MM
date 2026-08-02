import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

const DEFAULT_STATE = {
  user: {
    name: 'Carlos Pérez',
    avatar: '👨',
    plan: 'eterno',
    vaultActive: false,
    vaultActivatedAt: null,
  },
  messages: [
    {
      id: 1,
      type: 'text',
      content: 'Hola María. Si estás leyendo esto, significa que ya no estoy. Quiero que sepas que te amo más de lo que las palabras pueden expresar.',
      target: 'María González',
      trigger: 'inmediato',
      createdAt: '2026-07-15T10:00:00Z',
      status: 'locked',
    },
    {
      id: 2,
      type: 'text',
      content: 'Lucas, mi hijo. El día que te gradúes, quiero que recuerdes esto: nunca dejes de aprender. El mundo necesita tu curiosidad.',
      target: 'Lucas Pérez',
      trigger: 'graduacion',
      createdAt: '2026-07-20T14:30:00Z',
      status: 'locked',
    },
    {
      id: 3,
      type: 'voice',
      content: '[Grabación de voz: 2:34]',
      target: 'María González',
      trigger: 'cumpleanos',
      createdAt: '2026-07-25T09:00:00Z',
      status: 'locked',
      duration: 154,
    },
  ],
  beneficiaries: [
    {
      id: 1,
      name: 'María González',
      email: 'maria@email.com',
      relation: 'Esposa',
      avatar: '👩',
      accessLevel: 'total',
      isWitness: true,
      status: 'active',
    },
    {
      id: 2,
      name: 'Lucas Pérez',
      email: 'lucas@email.com',
      relation: 'Hijo',
      avatar: '👦',
      accessLevel: 'restricted',
      restrictionNote: 'Mensajes desde los 18 años',
      isWitness: false,
      status: 'active',
    },
  ],
  vault: {
    encryption: 'AES-256-GCM',
    storageProvider: 'AWS S3 Glacier',
    backupFrequency: 'diario',
    lastBackup: '2026-08-02T08:00:00Z',
    keyShards: 3,
    keyShardsRequired: 2,
    storageYears: 50,
    totalSizeMB: 245,
  },
  onboardingComplete: false,
}

export function AppProvider({ children }) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('mm_app_state')
    return saved ? JSON.parse(saved) : DEFAULT_STATE
  })

  useEffect(() => {
    localStorage.setItem('mm_app_state', JSON.stringify(state))
  }, [state])

  const addMessage = (message) => {
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, { ...message, id: Date.now(), createdAt: new Date().toISOString(), status: 'locked' }]
    }))
  }

  const addBeneficiary = (beneficiary) => {
    setState(prev => ({
      ...prev,
      beneficiaries: [...prev.beneficiaries, { ...beneficiary, id: Date.now(), status: 'pending' }]
    }))
  }

  const removeBeneficiary = (id) => {
    setState(prev => ({
      ...prev,
      beneficiaries: prev.beneficiaries.filter(b => b.id !== id)
    }))
  }

  const completeOnboarding = () => {
    setState(prev => ({ ...prev, onboardingComplete: true }))
  }

  const activateVault = () => {
    setState(prev => ({
      ...prev,
      user: { ...prev.user, vaultActive: true, vaultActivatedAt: new Date().toISOString() }
    }))
  }

  const value = {
    ...state,
    addMessage,
    addBeneficiary,
    removeBeneficiary,
    completeOnboarding,
    activateVault,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}