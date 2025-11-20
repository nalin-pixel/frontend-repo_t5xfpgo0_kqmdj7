import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import StationCard from './components/StationCard'
import StationForm from './components/StationForm'
import PriceList from './components/PriceList'
import PriceForm from './components/PriceForm'

function App() {
  const [stations, setStations] = useState([])
  const [filters, setFilters] = useState({ city: '', state: '', fuel_type: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showPricesFor, setShowPricesFor] = useState(null)

  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const loadStations = async () => {
    try {
      setLoading(true)
      setError('')
      const params = new URLSearchParams()
      if (filters.city) params.set('city', filters.city)
      if (filters.state) params.set('state', filters.state)
      if (filters.fuel_type) params.set('fuel_type', filters.fuel_type)
      const res = await fetch(`${base}/api/stations?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to load stations')
      const data = await res.json()
      setStations(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadStations() }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Find Gas Stations</h1>
          <p className="text-slate-600">Search by city/state and view crowdsourced prices.</p>
        </section>

        <section className="mb-8">
          <div className="grid sm:grid-cols-4 gap-3">
            <input className="input" placeholder="City" value={filters.city} onChange={(e)=>setFilters(f=>({...f, city: e.target.value}))} />
            <input className="input" placeholder="State" value={filters.state} onChange={(e)=>setFilters(f=>({...f, state: e.target.value.toUpperCase()}))} maxLength={2} />
            <select className="input" value={filters.fuel_type} onChange={(e)=>setFilters(f=>({...f, fuel_type: e.target.value}))}>
              <option value="">Any fuel</option>
              <option value="regular">Regular</option>
              <option value="midgrade">Midgrade</option>
              <option value="premium">Premium</option>
              <option value="diesel">Diesel</option>
            </select>
            <button onClick={loadStations} className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Search</button>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-3">
            {loading ? (
              <p className="text-slate-500">Loading stations...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : stations.length === 0 ? (
              <p className="text-slate-500">No stations found. Add one below!</p>
            ) : (
              stations.map((s) => (
                <StationCard key={s.id} station={s} onViewPrices={setShowPricesFor} />
              ))
            )}
          </div>
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-3">Add a Station</h3>
              <StationForm onCreated={loadStations} />
            </div>
          </div>
        </section>
      </main>

      {showPricesFor && (
        <div>
          <PriceList station={showPricesFor} onClose={() => setShowPricesFor(null)} />
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white border border-slate-200 rounded-full shadow-lg px-4 py-2">
            <PriceForm station={showPricesFor} onAdded={() => {}} />
          </div>
        </div>
      )}

      {/* Tailwind helpers */}
      <style>{`
        .input { @apply w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60; }
      `}</style>
    </div>
  )
}

export default App
