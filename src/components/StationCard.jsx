export default function StationCard({ station, onViewPrices }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{station.name}</h3>
          <p className="text-slate-600 text-sm">{station.address}, {station.city}, {station.state} {station.zip_code || ''}</p>
          {station.phone && <p className="text-slate-500 text-sm mt-1">{station.phone}</p>}
          <div className="mt-2 flex flex-wrap gap-2">
            {station.fuel_types?.map(ft => (
              <span key={ft} className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700 border border-slate-200">{ft}</span>
            ))}
          </div>
          {station.amenities?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {station.amenities.map(am => (
                <span key={am} className="px-2 py-0.5 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{am}</span>
              ))}
            </div>
          )}
        </div>
        <button onClick={() => onViewPrices(station)} className="text-sm font-medium text-blue-600 hover:text-blue-700">View Prices</button>
      </div>
    </div>
  )
}
