import type { ReactNode } from 'react'

interface SocialButtonProps {
  icon: ReactNode
  label: string
  onClick?: () => void
}

export default function SocialButton({ icon, label, onClick }: SocialButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-2.5 px-4 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}
