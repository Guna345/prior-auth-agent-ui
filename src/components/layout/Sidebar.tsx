import { useNavigate, useLocation } from 'react-router-dom'
import elsaiLogo from '../../assets/Elsai logo black.png'

const navItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    label: 'Patients List',
    path: '/patients',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <line x1="15" y1="11" x2="21" y2="11"/><line x1="15" y1="16" x2="21" y2="16"/>
      </svg>
    ),
  },
  {
    label: 'Air Handling',
    path: '/air-handling',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
  {
    label: 'Configuration Panel',
    path: '/configuration',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8m-4-4v4"/>
      </svg>
    ),
  },
  {
    label: 'User Management',
    path: '/user-management',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
]

const bottomItems = [
  {
    label: "What's new",
    path: '/whats-new',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 15.09 8.26 22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    label: 'Documentation',
    path: '/documentation',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside
      className="w-60 min-h-screen flex flex-col shrink-0"
      style={{ backgroundColor: '#FCFCFF', borderRight: '1px solid #EEEEEC' }}
    >
      {/* Logo */}
      <div className="px-5 pt-6 pb-5">
        <img src={elsaiLogo} alt="Elsai" className="h-8 w-auto" />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map(item => {
          const active = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={
                active
                  ? { backgroundColor: '#F7F5FF', color: '#5C3FEE', borderRadius: '8px' }
                  : { color: '#262A33', borderRadius: '8px' }
              }
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors text-left hover:opacity-80"
            >
              <span style={{ color: active ? '#5C3FEE' : '#9CA3AF' }}>{item.icon}</span>
              <span className={active ? 'font-medium' : 'font-normal'}>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 pt-2 space-y-0.5" style={{ borderTop: '1px solid #EEEEEC' }}>
        {bottomItems.map(item => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors text-left hover:opacity-70"
            style={{ color: '#9CA3AF', borderRadius: '8px' }}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}

        {/* User info */}
        <div className="flex items-center gap-2.5 px-3 py-2 mt-1">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#F7F5FF', color: '#5C3FEE' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium truncate" style={{ color: '#262A33' }}>Jamie Smith</p>
            <p className="text-xs font-semibold" style={{ color: '#5C3FEE', fontFamily: "'Space Mono', monospace" }}>
              260/300
            </p>
            <p className="text-[10px]" style={{ color: '#9CA3AF', marginTop: '-2px' }}>Credits</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
