import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import SegmentedControl from '../components/SegmentedControl.jsx'
import { ArrowLeft, Mic, Square, Video, Type, Save } from 'lucide-react'

const recTypes = [
  { value: 'texto', label: 'Texto' },
  { value: 'voz', label: 'Voz' },
  { value: 'video', label: 'Video' },
]

const triggers = [
  { value: 'inmediato', label: 'Tras mi muerte' },
  { value: 'cumpleanos', label: 'Su cumpleaños' },
  { value: 'graduacion', label: 'Su graduación' },
  { value: 'boda', label: 'Su boda' },
  { value: 'custom', label: 'Fecha personalizada' },
]

export default function RecordScreen({ showToast }) {
  const navigate = useNavigate()
  const { beneficiaries, addMessage } = useApp()
  const [recType, setRecType] = useState('texto')
  const [isRecording, setIsRecording] = useState(false)
  const [recSeconds, setRecSeconds] = useState(0)
  const [hasRecording, setHasRecording] = useState(false)
  const [target, setTarget] = useState(beneficiaries[0]?.name || '')
  const [trigger, setTrigger] = useState('inmediato')
  const [content, setContent] = useState('')
  const intervalRef = useRef(null)

  const toggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true)
      setHasRecording(false)
      setRecSeconds(0)
      intervalRef.current = setInterval(() => setRecSeconds(s => s + 1), 1000)
    } else {
      setIsRecording(false)
      setHasRecording(true)
      clearInterval(intervalRef.current)
    }
  }

  const formatTime = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, '0')
    const sec = String(s % 60).padStart(2, '0')
    return m + ':' + sec
  }

  const handleSave = () => {
    if (recType === 'texto' && !content.trim()) {
      showToast('Escribe un mensaje primero')
      return
    }
    if (recType === 'voz' && !hasRecording) {
      showToast('Graba un mensaje de voz primero')
      return
    }

    const msg = {
      type: recType,
      content: recType === 'texto' ? content : '[Grabación de voz: ' + formatTime(recSeconds) + ']',
      target,
      trigger,
      duration: recType === 'voz' ? recSeconds : undefined,
    }
    addMessage(msg)
    showToast('✅ Mensaje guardado en el Vault')
    navigate('/')
  }

  return (
    <div style={{ padding: '16px 20px 100px', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0 12px' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', color: 'var(--mm-text)' }}>
          <ArrowLeft size={24} />
        </button>
        <h2 style={{ margin: 0, fontSize: 18 }}>Nuevo mensaje</h2>
      </div>

      <SegmentedControl options={recTypes} value={recType} onChange={setRecType} />

      <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Para quién</label>
      <select
        value={target}
        onChange={e => setTarget(e.target.value)}
        style={{
          width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--mm-border)',
          background: 'var(--mm-bg)', color: 'var(--mm-text)', fontSize: 14, marginBottom: 14,
        }}
      >
        {beneficiaries.map(b => (
          <option key={b.id} value={b.name}>{b.name} ({b.relation})</option>
        ))}
        <option value="todos">Toda mi familia</option>
      </select>

      <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Cuándo entregar</label>
      <select
        value={trigger}
        onChange={e => setTrigger(e.target.value)}
        style={{
          width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--mm-border)',
          background: 'var(--mm-bg)', color: 'var(--mm-text)', fontSize: 14, marginBottom: 14,
        }}
      >
        {triggers.map(t => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>

      {recType === 'texto' && (
        <>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Escribe aquí lo que quieres decirles..."
            rows={8}
            style={{
              width: '100%', padding: '14px', borderRadius: 12, border: '1px solid var(--mm-border)',
              background: 'var(--mm-bg)', color: 'var(--mm-text)', fontSize: 14, lineHeight: 1.6,
              resize: 'none', marginBottom: 16,
            }}
          />
          <div style={{ fontSize: 12, color: 'var(--mm-text-muted)', textAlign: 'right', marginBottom: 8 }}>
            {content.length} caracteres
          </div>
        </>
      )}

      {recType === 'voz' && (
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <button
            onClick={toggleRecord}
            style={{
              width: 90, height: 90, borderRadius: '50%',
              border: '3px solid ' + (isRecording ? 'var(--mm-danger)' : 'var(--mm-danger)'),
              background: isRecording ? 'rgba(231,76,60,0.1)' : 'transparent',
              cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              animation: isRecording ? 'pulse 1s infinite' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            {isRecording ? <Square size={32} color="var(--mm-danger)" /> : <Mic size={36} color="var(--mm-danger)" />}
          </button>
          <div style={{ fontSize: 28, fontWeight: 700, marginTop: 20, fontVariantNumeric: 'tabular-nums' }}>
            {formatTime(recSeconds)}
          </div>
          <div style={{ fontSize: 13, color: 'var(--mm-text-secondary)', marginTop: 8 }}>
            {isRecording ? 'Grabando... toca para detener' : hasRecording ? 'Grabación lista' : 'Toca para grabar'}
          </div>
          {hasRecording && (
            <button
              onClick={() => { setHasRecording(false); setRecSeconds(0); }}
              style={{
                marginTop: 12, background: 'none', border: 'none',
                color: 'var(--mm-text-muted)', fontSize: 13, cursor: 'pointer',
              }}
            >
              🗑️ Borrar y regrabar
            </button>
          )}
        </div>
      )}

      {recType === 'video' && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div style={{
            width: 90, height: 90, borderRadius: '50%',
            border: '3px solid var(--mm-accent)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Video size={36} color="var(--mm-accent)" />
          </div>
          <p style={{ fontSize: 13, color: 'var(--mm-text-secondary)', marginTop: 16 }}>
            La cámara se abriría aquí.<br/>En la app real, usarías getUserMedia.
          </p>
        </div>
      )}

      <button
        onClick={handleSave}
        style={{
          width: '100%', padding: 14, borderRadius: 12, border: 'none',
          background: 'var(--mm-text)', color: 'var(--mm-bg)',
          fontSize: 15, fontWeight: 600, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
      >
        <Save size={18} /> Guardar en el Vault
      </button>
    </div>
  )
}