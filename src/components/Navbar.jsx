import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-slate-200/60">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 font-semibold text-slate-800">
            <img src="/fuel.svg" alt="Fuel" className="h-6 w-6" />
            Gas Finder
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/" className="text-slate-600 hover:text-slate-900">Home</Link>
            <Link to="/test" className="text-slate-600 hover:text-slate-900">System</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
