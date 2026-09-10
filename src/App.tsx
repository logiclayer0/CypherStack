import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import NostrProfile from './pages/NostrProfile'
import AgentVerify from './pages/AgentVerify'
import Compare from './pages/Compare'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1, paddingTop: '72px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/nostr" element={<NostrProfile />} />
          <Route path="/agent" element={<AgentVerify />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App