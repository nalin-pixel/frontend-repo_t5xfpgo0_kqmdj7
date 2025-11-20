import { useState } from 'react'

export default function PriceForm({ station, onAdded }) {
  const [fuel_type, setFuelType] = useState('regular')
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/api/prices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ station_id: station.id, fuel_type, price: Number(price), source: 'user' })
      })
      if (!res.ok) throw new Error('Failed to add price')
      await res.json()
      setPrice('')
      onAdded?.()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="flex items-end gap-2">
      <div>
        <label className="block text-xs text-slate-600">Fuel</label>
        <select value={fuel_type} onChange={(e) => setFuelType(e.target.value)} className="input">
          <option value="regular">Regular</option>
          <option value="midgrade">Midgrade</option>
          <option value="premium">Premium</option>
          <option value="diesel">Diesel</option>
        </select>
      </div>
      <div>
        <label className="block text-xs text-slate-600">Price</label>
        <input value={price} onChange={(e) => setPrice(e.target.value)} className="input" placeholder="e.g. 4.29" required />
      </div>
      <button disabled={loading} className="px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50">{loading ? 'Adding...' : 'Add'}</button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </form>
  )
}
