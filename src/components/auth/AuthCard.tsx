import type { ReactNode } from 'react'

interface AuthCardProps {
  children: ReactNode
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl px-8 py-8 w-full max-w-sm mx-4">
      {children}
    </div>
  )
}
