import { useState } from 'react'

export default function StationForm({ onCreated }) {
  const [form, setForm] = useState({
    name: '', address: '', city: '', state: '', zip_code: '', phone: '',
    fuel_types: '', amenities: '', open_24_hours: false, hours: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const body = {
        ...form,
        fuel_types: form.fuel_types.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean),
        amenities: form.amenities.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean),
      }
      const res = await fetch(`${base}/api/stations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if (!res.ok) throw new Error('Failed to create station')
      await res.json()
      setForm({ name: '', address: '', city: '', state: '', zip_code: '', phone: '', fuel_types: '', amenities: '', open_24_hours: false, hours: '' })
      onCreated?.()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="grid sm:grid-cols-2 gap-3">
      <input className="input" placeholder="Name" name="name" value={form.name} onChange={handleChange} required />
      <input className="input" placeholder="Phone" name="phone" value={form.phone} onChange={handleChange} />
      <input className="input sm:col-span-2" placeholder="Address" name="address" value={form.address} onChange={handleChange} required />
      <input className="input" placeholder="City" name="city" value={form.city} onChange={handleChange} required />
      <input className="input" placeholder="State (e.g., CA)" name="state" value={form.state} onChange={handleChange} required maxLength={2} />
      <input className="input" placeholder="ZIP" name="zip_code" value={form.zip_code} onChange={handleChange} />
      <input className="input sm:col-span-2" placeholder="Fuel types (comma-separated)" name="fuel_types" value={form.fuel_types} onChange={handleChange} />
      <input className="input sm:col-span-2" placeholder="Amenities (comma-separated)" name="amenities" value={form.amenities} onChange={handleChange} />
      <input className="input sm:col-span-2" placeholder="Hours" name="hours" value={form.hours} onChange={handleChange} />
      <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" name="open_24_hours" checked={form.open_24_hours} onChange={handleChange} /> Open 24 hours</label>
      <div className="sm:col-span-2 flex justify-end">
        <button disabled={loading} className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">{loading ? 'Saving...' : 'Add Station'}</button>
      </div>
      {error && <p className="sm:col-span-2 text-sm text-red-600">{error}</p>}
    </form>
  )
}
