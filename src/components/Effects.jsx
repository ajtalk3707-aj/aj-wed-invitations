import { useMemo } from 'react'

export default function Effects() {
  // Generate stable random particle positions for golden sparkle dust
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 4.1 + 7) % 96}%`,
      top: `${(i * 7.3 + 12) % 92}%`,
      size: (i % 3) + 2, // 2px to 4px
      duration: 10 + (i % 8) * 2,
      delay: (i % 7) * 1.5,
      opacity: 0.25 + (i % 5) * 0.15
    }))
  }, [])

  // Floating spiritual glyphs rising upwards (from original codebase)
  const floatingGlyphs = useMemo(() => {
    const symbols = ['ॐ', '✨', '🪔', '卐', '✨', '🪔', 'ॐ', '✨']
    return symbols.map((sym, i) => ({
      id: i,
      symbol: sym,
      left: `${(i * 12.5 + 6) % 92}%`,
      duration: 18 + (i % 5) * 4,
      delay: (i * 2.5) % 15,
      size: (i % 2 === 0) ? '18px' : '24px'
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Radial Gradient Aura in Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] max-w-7xl h-[650px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/15 via-purple-900/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-rose-600/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Floating Gold Sparkle Dust */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-amber-300 shadow-[0_0_8px_#f59e0b] animate-pulse"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Floating Sacred Glyphs (ॐ, ✨, 🪔) Rising Upwards */}
      {floatingGlyphs.map((g) => (
        <span
          key={g.id}
          className="glyph text-amber-300/40 select-none"
          style={{
            left: g.left,
            fontSize: g.size,
            animationDuration: `${g.duration}s`,
            animationDelay: `${g.delay}s`,
          }}
        >
          {g.symbol}
        </span>
      ))}

      {/* TOP-RIGHT MANDALA - CONTINUOUS ROTATION */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 opacity-15 pointer-events-none"
        style={{
          animation: 'spinContinuous 45s linear infinite',
          willChange: 'transform'
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full fill-amber-300">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 6" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="#f59e0b" strokeWidth="1" />
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d="M 100 100 C 90 60, 110 60, 100 25 C 90 60, 110 60, 100 100"
              transform={`rotate(${i * 30} 100 100)`}
              fill="rgba(245, 158, 11, 0.25)"
              stroke="#f59e0b"
              strokeWidth="0.8"
            />
          ))}
          <circle cx="100" cy="100" r="18" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1.5" />
        </svg>
      </div>

      {/* BOTTOM-LEFT MANDALA - CONTINUOUS ROTATION (REVERSE) */}
      <div
        className="absolute bottom-10 -left-32 w-80 h-80 opacity-15 pointer-events-none"
        style={{
          animation: 'spinContinuousReverse 50s linear infinite',
          willChange: 'transform'
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full fill-amber-300">
          <circle cx="100" cy="100" r="85" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 5" />
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d="M 100 100 Q 80 50, 100 20 Q 120 50, 100 100"
              transform={`rotate(${i * 45} 100 100)`}
              fill="rgba(245, 158, 11, 0.2)"
              stroke="#f59e0b"
              strokeWidth="0.8"
            />
          ))}
        </svg>
      </div>
    </div>
  )
}
