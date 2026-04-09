import { HTMLAttributes } from 'react'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function GlassCard({ children, className, ...props }: GlassCardProps) {
  const baseClasses = 'bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl'
  const combined = className ? `${baseClasses} ${className}` : baseClasses
  return (
    <div className={combined} {...props}>
      {children}
    </div>
  )
}
