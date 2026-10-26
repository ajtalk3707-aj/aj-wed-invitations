import { useState, useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { themes, L } from '../data'
import { contactConfig } from '../translations'

function TiltCard({ inv, t, onOpen, index, lang, showcaseT }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 15 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), { stiffness: 150, damping: 15 })
  const glare = useTransform(
    [x, y],
    ([a, b]) => `radial-gradient(circle at ${(a + 0.5) * 100}% ${(b + 0.5) * 100}%, rgba(255,255,255,.35), transparent 55%)`
  )

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }

  const leave = () => {
    x.set(0)
    y.set(0)
  }

  const orderMsg = lang === 'gu'
    ? `નમસ્તે AJ Invitation, મને આ કંકોતરી ડિઝાઇન પસંદ છે: "${inv.title}". કૃપા કરીને મને આની વિગતો અને ઓર્ડર પ્રોસેસ જણાવો.`
    : `Hello AJ Invitation, I love this invitation design: "${inv.title}". Please share details and ordering process.`

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -25 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      style={{ perspective: 1100 }}
      className="flex flex-col"
    >
      {/* Exact Original 3D Tilt Card with Glare and Depth */}
      <motion.button
        type="button"
        onPointerMove={move}
        onPointerLeave={leave}
        onClick={() => onOpen(inv)}
        whileTap={{ scale: 0.97 }}
        style={{
          rotateX: rx,
          rotateY: ry,
          transformStyle: 'preserve-3d',
          background: t.bg,
          '--f1': t.f1,
          '--f2': t.f2,
        }}
        className="group relative block h-[28rem] w-full overflow-hidden rounded-3xl p-5 text-center shadow-2xl ring-1 ring-white/25 cursor-pointer text-left"
      >
        {/* Dynamic Light Glare Reflection */}
        <motion.div className="pointer-events-none absolute inset-0 z-10" style={{ background: glare }} />

        {/* Top Badges */}
        <div style={{ transform: 'translateZ(60px)' }} className="absolute top-4 inset-x-4 z-20 flex items-center justify-between">
          <div className="flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-black/40 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 backdrop-blur-md">
            <img src="/aj-logo.png" alt="AJ" className="h-3.5 w-auto object-contain" />
            <span>AJ INVITATION</span>
          </div>
          {inv.badge && (
            <div className="rounded-full border border-white/40 bg-black/40 px-3 py-0.5 text-xs font-medium text-amber-200 backdrop-blur-md">
              {inv.badge}
            </div>
          )}
        </div>

        {/* Center Royal Arch with 3D Depth */}
        <div
          style={{ transform: 'translateZ(50px)', transformStyle: 'preserve-3d' }}
          className="mx-auto mt-6 w-4/5 rounded-t-[8rem] rounded-b-2xl px-3 pb-6 pt-12 shadow-xl text-center"
        >
          <div
            className="absolute inset-0 rounded-t-[8rem] rounded-b-2xl pointer-events-none"
            style={{
              background: t.card,
              border: `1px solid ${t.accent}`,
              boxShadow: `0 0 0 4px rgba(0,0,0,.2), 0 0 0 5px ${t.accent}`,
            }}
          />
          <div className="relative" style={{ color: t.ink }}>
            <div className="text-3xl filter drop-shadow">{t.glyph}</div>
            <div className="foil font-display text-2xl font-extrabold mt-1">{L.title}</div>
            <div className="foil mt-2 font-display text-xl font-extrabold">{inv.groom}</div>
            <div className="text-xs font-semibold opacity-90">{L.with}</div>
            <div className="foil font-display text-xl font-extrabold">{inv.bride}</div>
            <div className="mt-2 font-display text-xs font-bold opacity-80">{inv.dateLine}</div>
          </div>
        </div>

        {/* Bottom Details with translateZ(80px) */}
        <div style={{ transform: 'translateZ(80px)' }} className="absolute inset-x-0 bottom-4 px-4 text-white drop-shadow text-center">
          <div className="text-lg font-bold tracking-wide text-amber-100">{inv.title}</div>
          <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-amber-200/90 font-medium group-hover:text-white transition">
            <span>{t.name}</span>
            <span>•</span>
            <span className="underline decoration-amber-300 underline-offset-4 font-semibold">
              {lang === 'gu' ? 'કાર્ડ ખોલો →' : 'Open invitation →'}
            </span>
          </div>
        </div>
      </motion.button>

      {/* Action Buttons Toolbar Directly Attached Below the Card */}
      <div className="mt-3 flex items-center gap-2 px-1">
        <button
          type="button"
          onClick={() => onOpen(inv)}
          className="flex-1 min-h-[40px] flex items-center justify-center gap-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/35 border border-amber-400/40 py-2 px-2.5 text-xs sm:text-sm font-bold text-amber-200 hover:text-white transition shadow-sm cursor-pointer active:scale-95"
        >
          <span>👁️</span>
          <span>{showcaseT.previewBtn}</span>
        </button>

        <a
          href={contactConfig.getWhatsAppLink(orderMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[40px] flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 py-2 px-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition cursor-pointer active:scale-95"
        >
          <svg className="w-4 h-4 fill-white flex-shrink-0" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.203c.043.071.043.418-.101.823z" />
          </svg>
          <span className="truncate">{showcaseT.orderBtn}</span>
        </a>
      </div>
    </motion.div>
  )
}

export default function DesignShowcase({ list, onOpen, lang, t }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: t.showcase.allTab },
    { id: 'royal', label: t.showcase.royalTab },
    { id: 'live', label: t.showcase.liveTab },
    { id: 'floral', label: t.showcase.floralTab },
    { id: 'orbit', label: t.showcase.orbitTab },
  ]

  const filteredList = useMemo(() => {
    if (activeCategory === 'all') return list
    if (activeCategory === 'royal') {
      return list.filter(i => i.template === 'swarna-mandap' || i.template === 'royal' || i.theme === 'royalGold')
    }
    if (activeCategory === 'live') {
      return list.filter(i => i.template === 'vercel-live')
    }
    if (activeCategory === 'floral') {
      return list.filter(i => i.template === 'floral' || i.template === 'marigold' || i.theme === 'marigold')
    }
    if (activeCategory === 'orbit') {
      return list.filter(i => i.template === 'orbit' || i.template === 'emerald')
    }
    return list
  }, [activeCategory, list])

  return (
    <section id="designs" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-amber-200 uppercase backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          ✨ {t.showcase.badge} ✨
        </div>

        <h2 className="font-['Cinzel'] text-3xl font-extrabold tracking-wide text-amber-100 sm:text-5xl drop-shadow-md">
          {t.showcase.title}
        </h2>

        <p className="mt-3 text-sm sm:text-base text-amber-100/80 max-w-2xl mx-auto font-['Hind_Vadodara']">
          {t.showcase.subtitle}
        </p>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105'
                  : 'bg-[#181133] border border-amber-500/30 text-amber-200 hover:bg-amber-500/15 hover:border-amber-400/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Cards Grid: 1 col on mobile, 2 on tablet, 3 on desktop with 3D perspective */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1200 }}>
        {filteredList.map((inv, index) => (
          <TiltCard
            key={inv.id}
            inv={inv}
            t={themes[inv.theme] || themes.royalGold}
            index={index}
            onOpen={() => onOpen(inv)}
            lang={lang}
            showcaseT={t.showcase}
          />
        ))}
      </div>

      {/* Custom Bespoke Invitation Order Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-14 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-[#1d1238] via-[#2a1752] to-[#1d1238] p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
      >
        <div className="max-w-xl">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-300 font-bold text-sm mb-1">
            <span>✨</span>
            <span>{lang === 'gu' ? 'કસ્ટમ કંકોતરી & વિડીયો સેવા' : 'Custom Video & Bespoke Cards'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-['Cinzel']">
            {t.showcase.customOrderBanner.title}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-amber-100/80">
            {t.showcase.customOrderBanner.desc}
          </p>
        </div>

        <a
          href={contactConfig.getWhatsAppLink('નમસ્તે AJ Invitation, મારે સ્પેશિયલ કસ્ટમ કંકોતરી / વિડીયો કંકોતરી માટે વાત કરવી છે.')}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.7)] transition transform hover:scale-105"
        >
          <span>💬</span>
          <span>{t.showcase.customOrderBanner.btn}</span>
        </a>
      </motion.div>
    </section>
  )
}
