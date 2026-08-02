import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import Card from '../components/Card.jsx'
import { ArrowLeft, UserPlus, Trash2, Check, X } from 'lucide-react'

const relations = ['Esposo/a', 'Hijo/a', 'Padre/Madre', 'Hermano/a', 'Amigo/a', 'Otro']

export default function BeneficiariesScreen({ showToast }) {
  const navigate = useNavigate()
  const { beneficiaries, addBeneficiary, removeBeneficiary } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [relation, setRelation] = useState('Hijo/a')
  const [accessLevel, setAccessLevel] = useState('total')

  const handleAdd = () => {
    if (!name.trim() || !email.trim()) {
      showToast('Completa nombre y email')
      return
    }
    addBeneficiary({
      name: name.trim(),
      email: email.trim(),
      relation,
      avatar: relation.includes('Espos') ? '👩' : relation.includes('Hij') ? '👦' : relation.includes('Padre') ? '👴' : '👤',
      accessLevel,
      isWitness: false,
    })
    showToast('✅ ' + name + ' añadido como beneficiario')
    setName(''); setEmail(''); setShowForm(false)
  }

  return (
    <div style={{ padding: '16px 20px 100px', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0 12px' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', color: 'var(--mm-text)' }}>
          <ArrowLeft size={24} />
        </button>
        <h2 style={{ margin: 0, fontSize: 18 }}>Beneficiarios</h2>
      </div>

      {beneficiaries.map(b => (
        <Card key={b.id}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'var(--mm-surface)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22,
            }}>{b.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{b.name}</div>
              <div style={{ fontSize: 12, color: 'var(--mm-text-secondary)' }}>
                {b.relation} • {b.accessLevel === 'total' ? 'Acceso total' : 'Acceso restringido'}
                {b.isWitness && ' • Testigo de activación'}
              </div>
            </div>
            <button
              onClick={() => { removeBeneficiary(b.id); showToast('Beneficiario eliminado') }}
              style={{ background: 'none', border: 'none', color: 'var(--mm-danger)', cursor: 'pointer', padding: 4 }}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </Card>
      ))}

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          style={{
            width: '100%', padding: 14, borderRadius: 12, border: '1px dashed var(--mm-border)',
            background: 'transparent', color: 'var(--mm-text-secondary)',
            fontSize: 14, fontWeight: 500, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <UserPlus size={18} /> Añadir beneficiario
        </button>
      ) : (
        <Card variant="accent">
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Nuevo beneficiario</h3>
          <input
            value={name} onChange={e => setName(e.target.value)}
            placeholder="Nombre completo"
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--mm-border)',
              background: 'var(--mm-bg)', color: 'var(--mm-text)', fontSize: 14, marginBottom: 10,
            }}
          />
          <input
            value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--mm-border)',
              background: 'var(--mm-bg)', color: 'var(--mm-text)', fontSize: 14, marginBottom: 10,
            }}
          />
          <select
            value={relation} onChange={e => setRelation(e.target.value)}
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--mm-border)',
              background: 'var(--mm-bg)', color: 'var(--mm-text)', fontSize: 14, marginBottom: 10,
            }}
          >
            {relations.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Nivel de acceso</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['total', 'restringido'].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setAccessLevel(lvl)}
                  style={{
                    flex: 1, padding: '10px', borderRadius: 10,
                    border: '1px solid ' + (accessLevel === lvl ? 'var(--mm-text)' : 'var(--mm-border)'),
                    background: accessLevel === lvl ? 'var(--mm-text)' : 'transparent',
                    color: accessLevel === lvl ? 'var(--mm-bg)' : 'var(--mm-text-secondary)',
                    fontSize: 13, fontWeight: 500, cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setShowForm(false)} style={{
              flex: 1, padding: 12, borderRadius: 12, border: '1px solid var(--mm-border)',
              background: 'transparent', color: 'var(--mm-text-secondary)', fontSize: 14, cursor: 'pointer',
            }}>Cancelar</button>
            <button onClick={handleAdd} style={{
              flex: 1, padding: 12, borderRadius: 12, border: 'none',
              background: 'var(--mm-text)', color: 'var(--mm-bg)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}>Guardar</button>
          </div>
        </Card>
      )}
    </div>
  )
}