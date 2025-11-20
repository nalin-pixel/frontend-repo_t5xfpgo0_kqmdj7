import { useEffect, useState } from 'react'

export default function PriceList({ station, onClose }) {
  const [prices, setPrices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/prices/${station.id}`)
        if (!res.ok) throw new Error('Failed to fetch prices')
        const data = await res.json()
        setPrices(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [station.id])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Prices at {station.name}</h3>
          <button onClick={onClose} className="text-slate-600 hover:text-slate-900">Close</button>
        </div>
        {loading ? (
          <p className="text-sm text-slate-500">Loading...</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : prices.length === 0 ? (
          <p className="text-sm text-slate-500">No prices yet.</p>
        ) : (
          <ul className="divide-y divide-slate-200">
            {prices.map((p) => (
              <li key={p.id} className="py-2 flex items-center justify-between">
                <span className="capitalize text-slate-700">{p.fuel_type}</span>
                <span className="font-semibold text-slate-900">${p.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
