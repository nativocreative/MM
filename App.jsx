import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.jsx'
import RecordScreen from './screens/RecordScreen.jsx'
import BeneficiariesScreen from './screens/BeneficiariesScreen.jsx'
import VaultScreen from './screens/VaultScreen.jsx'
import BeneficiaryViewScreen from './screens/BeneficiaryViewScreen.jsx'
import OnboardingScreen from './screens/OnboardingScreen.jsx'
import BottomNav from './components/BottomNav.jsx'
import Toast from './components/Toast.jsx'
import { AppProvider } from './context/AppContext.jsx'

function AppContent() {
  const navigate = useNavigate()
  const location = useLocation()
  const [toast, setToast] = useState(null)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const hideNav = location.pathname === '/onboarding' || location.pathname.startsWith('/beneficiary-view')

  return (
    <>
      <Routes>
        <Route path="/onboarding" element={<OnboardingScreen />} />
        <Route path="/" element={<HomeScreen showToast={showToast} />} />
        <Route path="/record" element={<RecordScreen showToast={showToast} />} />
        <Route path="/beneficiaries" element={<BeneficiariesScreen showToast={showToast} />} />
        <Route path="/vault" element={<VaultScreen showToast={showToast} />} />
        <Route path="/beneficiary-view/:id" element={<BeneficiaryViewScreen />} />
      </Routes>
      {toast && <Toast message={toast} />}
      {!hideNav && <BottomNav />}
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}