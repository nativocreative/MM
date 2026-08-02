import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import Card from '../components/Card.jsx'
import { ArrowLeft, Shield, HardDrive, Key, Clock, Database, Trash2, Eye } from 'lucide-react'

export default function VaultScreen({ showToast }) {
  const navigate = useNavigate()
  const { vault, messages, beneficiaries, user } = useApp()

  const formatDate = (iso) => {
    if (!iso) return 'Nunca'
    return new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const vaultStats = [
    { icon: Database, label: 'Mensajes', value: messages.length },
    { icon: HardDrive, label: 'Almacenamiento', value: vault.totalSizeMB + ' MB' },
    { icon: Key, label: 'Fragmentos clave', value: vault.keyShards + '/' + vault.keyShardsRequired },
    { icon: Clock, label: 'Años de storage', value: vault.storageYears },
  ]

  return (
    <div style={{ padding: '16px 20px 100px', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0 12px' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', color: 'var(--mm-text)' }}>
          <ArrowLeft size={24} />
        </button>
        <h2 style={{ margin: 0, fontSize: 18 }}>Vault de Legado</h2>
      </div>

      <Card variant="success">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'rgba(46,204,113,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Shield size={22} color="var(--mm-success)" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Vault protegido</div>
            <div style={{ fontSize: 12, color: 'var(--mm-text-secondary)', marginTop: 2 }}>
              Encriptación {vault.encryption} • {vault.storageProvider} • Último backup: {formatDate(vault.lastBackup)}
            </div>
          </div>
        </div>
      </Card>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 10,
        marginBottom: 16,
      }}>
        {vaultStats.map(stat => (
          <div key={stat.label} style={{
            border: '1px solid var(--mm-border)',
            borderRadius: 12,
            padding: 14,
            textAlign: 'center',
          }}>
            <stat.icon size={20} style={{ marginBottom: 6, color: 'var(--mm-text-muted)' }} />
            <div style={{ fontSize: 20, fontWeight: 700 }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: 'var(--mm-text-secondary)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Configuración de seguridad</h3>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Testigos de activación</div>
            <div style={{ fontSize: 12, color: 'var(--mm-text-secondary)', marginTop: 2 }}>
              Se requieren {vault.keyShardsRequired} de {vault.keyShards} testigos para activar el vault
            </div>
          </div>
          <span style={{
            fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
            padding: '3px 10px', borderRadius: 6,
            background: 'rgba(46,204,113,0.1)', color: 'var(--mm-success)',
          }}>Activo</span>
        </div>
      </Card>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Período de gracia</div>
            <div style={{ fontSize: 12, color: 'var(--mm-text-secondary)', marginTop: 2 }}>
              30 días de notificación antes de la activación definitiva
            </div>
          </div>
          <span style={{
            fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
            padding: '3px 10px', borderRadius: 6,
            background: 'var(--mm-border)', color: 'var(--mm-text-secondary)',
          }}>30 días</span>
        </div>
      </Card>

      <h3 style={{ fontSize: 14, fontWeight: 600, margin: '16px 0 10px' }}>Beneficiarios con acceso</h3>
      {beneficiaries.map(b => (
        <Card key={b.id}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 22 }}>{b.avatar}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{b.name}</div>
              <div style={{ fontSize: 11, color: 'var(--mm-text-secondary)' }}>
                {b.accessLevel === 'total' ? 'Acceso total a todo el contenido' : b.restrictionNote || 'Acceso restringido'}
              </div>
            </div>
          </div>
        </Card>
      ))}

      <Card onClick={() => navigate('/beneficiary-view/1')} variant="accent">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Eye size={20} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Ver como beneficiario</div>
            <div style={{ fontSize: 12, color: 'var(--mm-text-secondary)' }}>Simula cómo verán tus seres queridos el contenido</div>
          </div>
        </div>
      </Card>

      <button
        onClick={() => showToast('⚠️ Esta acción requiere verificación de identidad adicional')}
        style={{
          width: '100%', padding: 14, borderRadius: 12,
          border: '1px solid var(--mm-danger)',
          background: 'transparent', color: 'var(--mm-danger)',
          fontSize: 14, fontWeight: 600, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          marginTop: 8,
        }}
      >
        <Trash2 size={18} /> Eliminar mi legado permanentemente
      </button>
    </div>
  )
}