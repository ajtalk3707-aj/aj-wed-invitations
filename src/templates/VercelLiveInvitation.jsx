import { useState } from 'react'
import { motion } from 'framer-motion'

export default function VercelLiveInvitation({ inv, onClose }) {
  const [loading, setLoading] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex flex-col bg-[#0b0c16] text-white"
    >
      {/* Top Bar with Title, Controls, and Open in New Tab */}
      <header className="relative z-20 flex h-16 items-center justify-between border-b border-white/10 bg-black/60 px-4 py-2 backdrop-blur-xl sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/20 px-4 py-1.5 text-sm font-semibold text-amber-200 transition hover:bg-amber-500/30 hover:scale-105 active:scale-95"
          >
            ← પાછા જાઓ (Back)
          </button>
          <div className="hidden sm:block">
            <h2 className="text-base font-bold text-amber-100">{inv.title}</h2>
            <p className="text-xs text-amber-200/70">{inv.groom} સંગ {inv.bride}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Vercel Live Demo
          </span>
          <a
            href={inv.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-white/20 hover:scale-105 active:scale-95"
          >
            <span>Open in New Tab ↗</span>
          </a>
        </div>
      </header>

      {/* Frame Container */}
      <div className="relative flex-1 w-full h-full bg-[#111322]">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0d0a1f] text-amber-100">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-400/30 border-t-amber-400"></div>
            <p className="font-['Noto_Serif_Gujarati',serif] text-sm text-amber-200/80">આમંત્રણ લોડ થઈ રહ્યું છે... (Loading Invitation)</p>
          </div>
        )}
        <iframe
          src={inv.url}
          title={inv.title}
          className="h-full w-full border-0"
          onLoad={() => setLoading(false)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </motion.div>
  )
}
