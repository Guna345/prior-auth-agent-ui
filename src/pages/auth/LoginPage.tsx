import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthCard from '../../components/auth/AuthCard'
import ElsaiLogo from '../../components/auth/ElsaiLogo'
import { useAuth } from '../../contexts/AuthContext'
import type { LoginFormData } from '../../types/auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState<LoginFormData>({ email: '', password: '' })
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError('')
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const success = login(form.email, form.password)
    if (success) {
      navigate('/dashboard', { replace: true })
    } else {
      setError('Invalid email or password.')
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at 60% 40%, #7B6CF5 0%, #4E3FBB 100%)' }}
    >
      <AuthCard>
        <p className="text-center text-xs text-gray-400 mb-3">Welcome to</p>
        <ElsaiLogo />
        <p className="text-center text-xs text-gray-400 mt-2 mb-6">Sign in to get started</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#5B4FCF] focus:ring-1 focus:ring-[#5B4FCF] transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#5B4FCF] focus:ring-1 focus:ring-[#5B4FCF] transition"
          />

          {error && (
            <p className="text-xs text-red-500 -mt-1">{error}</p>
          )}

          <div className="text-right -mt-1">
            <a href="#" className="text-xs text-gray-500 underline hover:text-gray-700">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5B4FCF] hover:bg-[#4E43BB] text-white text-sm font-medium rounded-lg py-2.5 transition-colors cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-[#5B4FCF] underline hover:text-[#4E43BB] cursor-pointer bg-transparent border-none"
          >
            Create account
          </button>
        </p>
      </AuthCard>
    </div>
  )
}
