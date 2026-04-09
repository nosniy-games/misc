import Link from 'next/link'
import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-neon-blue to-neon-violet flex items-center justify-center">
            <Zap className="w-3 h-3 text-white" />
          </div>
          <span className="font-black text-sm tracking-tight">
            RBLX{' '}
            <span className="bg-gradient-to-r from-neon-blue to-neon-violet bg-clip-text text-transparent">
              HUB
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <Link href="/catalog" className="hover:text-gray-300 transition-colors">Catalog</Link>
          <Link href="/profile" className="hover:text-gray-300 transition-colors">Profile</Link>
          <Link href="/login" className="hover:text-gray-300 transition-colors">Login</Link>
        </div>

        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} RBLX HUB. Not affiliated with Roblox Corporation.
        </p>
      </div>
    </footer>
  )
}
