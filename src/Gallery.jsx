import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { L, themes } from './data'

function TiltCard({ inv, t, onOpen, index }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 15 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), { stiffness: 150, damping: 15 })
  const glare = useTransform([x, y], ([a, b]) => `radial-gradient(circle at ${(a + 0.5) * 100}% ${(b + 0.5) * 100}%,rgba(255,255,255,.35),transparent 55%)`)
  const move = (e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5) }
  const leave = () => { x.set(0); y.set(0) }

  return (
    <motion.div initial={{ opacity: 0, y: 60, rotateX: -25 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: index * 0.1, duration: 0.8 }} style={{ perspective: 1100 }}>
      <motion.button onPointerMove={move} onPointerLeave={leave} onClick={onOpen} whileTap={{ scale: 0.97 }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', background: t.bg, '--f1': t.f1, '--f2': t.f2 }}
        className="group relative block h-[28rem] w-full overflow-hidden rounded-3xl p-5 text-center shadow-2xl ring-1 ring-white/25 cursor-pointer">
        <motion.div className="pointer-events-none absolute inset-0 z-10" style={{ background: glare }} />

        {/* Badge */}
        {inv.badge && (
          <div style={{ transform: 'translateZ(60px)' }} className="absolute top-4 right-4 z-20 rounded-full border border-white/40 bg-black/40 px-3 py-0.5 text-xs font-medium text-amber-200 backdrop-blur-md">
            {inv.badge}
          </div>
        )}

        <div style={{ transform: 'translateZ(50px)', transformStyle: 'preserve-3d' }} className="mx-auto mt-6 w-4/5 rounded-t-[8rem] rounded-b-2xl px-3 pb-6 pt-12 shadow-xl">
          <div className="absolute inset-0 rounded-t-[8rem] rounded-b-2xl" style={{ background: t.card, border: `1px solid ${t.accent}`, boxShadow: `0 0 0 4px rgba(0,0,0,.2),0 0 0 5px ${t.accent}` }} />
          <div className="relative" style={{ color: t.ink }}>
            <div className="text-3xl filter drop-shadow">{t.glyph}</div>
            <div className="foil font-display text-2xl font-extrabold mt-1">{L.title}</div>
            <div className="foil mt-2 font-display text-xl font-extrabold">{inv.groom}</div>
            <div className="text-xs font-semibold opacity-90">{L.with}</div>
            <div className="foil font-display text-xl font-extrabold">{inv.bride}</div>
            <div className="mt-2 font-display text-xs font-bold opacity-80">{inv.dateLine}</div>
          </div>
        </div>

        <div style={{ transform: 'translateZ(80px)' }} className="absolute inset-x-0 bottom-4 px-4 text-white drop-shadow">
          <div className="text-lg font-bold tracking-wide text-amber-100">{inv.title}</div>
          <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-amber-200/90 font-medium group-hover:text-white transition">
            <span>{t.name}</span>
            <span>•</span>
            <span className="underline decoration-amber-300 underline-offset-4 font-semibold">Open invitation →</span>
          </div>
        </div>
      </motion.button>
    </motion.div>
  )
}

export default function Gallery({ list, onOpen }) {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-5 py-14">
      <motion.header initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1 text-xs font-semibold tracking-wider text-amber-200 uppercase backdrop-blur-md mb-4">
          ✨ Royal Gujarati Wedding Collection ✨
        </div>
        <h1 className="font-display text-4xl font-extrabold tracking-wide text-amber-100 sm:text-6xl drop-shadow-md">
          શુભ વિવાહ – Wedding Invitations
        </h1>
        <p className="mt-3 text-base sm:text-lg text-amber-100/80 max-w-2xl mx-auto">
          Choose any card below to experience the full interactive invitation with animated pages, music & festive Gujarati rituals
        </p>
      </motion.header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((inv, n) => (
          <TiltCard key={inv.id} inv={inv} t={themes[inv.theme]} index={n} onOpen={() => onOpen(inv)} />
        ))}
      </div>
    </div>
  )
}
