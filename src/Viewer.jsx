import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PAGE_MAP } from './Pages'
import { pagesOf } from './data'

const Particles = ({ glyph }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {Array.from({ length: 16 }, (_, i) => (
      <span key={i} className="glyph" style={{ left: `${(i * 37) % 100}%`, fontSize: 12 + (i % 4) * 5, opacity: 0.6, animationDuration: `${12 + (i % 6) * 3}s`, animationDelay: `-${i * 1.7}s` }}>{glyph}</span>
    ))}
  </div>
)
const flip = {
  enter: (d) => ({ opacity: 0, rotateY: d * 70, x: d * 120, scale: 0.9 }),
  center: { opacity: 1, rotateY: 0, x: 0, scale: 1 },
  exit: (d) => ({ opacity: 0, rotateY: -d * 70, x: -d * 120, scale: 0.9 }),
}
export default function Viewer({ inv, t, onClose }) {
  const pages = pagesOf(inv)
  const [mode, setMode] = useState('pages') // 'pages' | 'scroll'
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const [playing, setPlaying] = useState(false)
  const box = useRef(null)
  const go = (n) => { const c = Math.max(0, Math.min(pages.length - 1, n)); setDir(c >= i ? 1 : -1); setI(c) }

  useEffect(() => { // page-by-page autoplay
    if (mode !== 'pages' || !playing) return
    const id = setTimeout(() => (i < pages.length - 1 ? go(i + 1) : setPlaying(false)), 8000)
    return () => clearTimeout(id)
  }, [mode, playing, i])
  useEffect(() => { // continuous auto-scroll
    if (mode !== 'scroll' || !playing || !box.current) return
    const el = box.current; let y = el.scrollTop, raf
    const step = () => { y += 0.7; el.scrollTop = y; if (el.scrollTop + el.clientHeight >= el.scrollHeight - 2) return setPlaying(false); raf = requestAnimationFrame(step) }
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf)
  }, [mode, playing])
  useEffect(() => {
    const k = (e) => { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1); if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  })
  const Btn = ({ on, ...p }) => <button {...p} className={`rounded-full border px-4 py-1 text-sm backdrop-blur transition ${on ? 'bg-white/90 text-black' : 'bg-black/30 text-white'} border-white/40`} />

  return (
    <motion.div className="fixed inset-0 z-50" style={{ background: t.bg }} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.6 }}>
      <Particles glyph={t.glyph} />
      <div className="absolute inset-x-0 top-0 z-20 flex flex-wrap items-center justify-between gap-2 p-3">
        <Btn onClick={onClose}>← Back</Btn>
        <div className="flex gap-2">
          <Btn on={mode === 'pages'} onClick={() => { setMode('pages'); setPlaying(false) }}>Page by page</Btn>
          <Btn on={mode === 'scroll'} onClick={() => { setMode('scroll'); setPlaying(false) }}>Auto scroll</Btn>
          <Btn on={playing} onClick={() => setPlaying(!playing)}>{playing ? '❚❚ Pause' : '▶ Play'}</Btn>
        </div>
      </div>
      {mode === 'pages' ? (
        <div className="absolute inset-0" style={{ perspective: 1600 }}>
          <AnimatePresence custom={dir} mode="wait">
            {(() => { const Pg = PAGE_MAP[pages[i]]; return (
              <motion.div key={i} custom={dir} variants={flip} initial="enter" animate="center" exit="exit" transition={{ duration: 0.7, ease: [0.3, 0.8, 0.2, 1] }}
                drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={(_, o) => { if (o.offset.x < -80) go(i + 1); else if (o.offset.x > 80) go(i - 1) }}
                className="absolute inset-0 overflow-y-auto px-4 pb-28 pt-20"><div className="flex min-h-full items-center py-6"><Pg inv={inv} t={t} /></div></motion.div>) })()}
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-center gap-4">
            <Btn onClick={() => go(i - 1)} disabled={i === 0}>‹</Btn>
            <div className="flex gap-2">{pages.map((_, n) => <button key={n} onClick={() => go(n)} className={`h-2 rounded-full transition-all ${n === i ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} />)}</div>
            <Btn onClick={() => go(i + 1)} disabled={i === pages.length - 1}>›</Btn>
          </div>
        </div>
      ) : (
        <div ref={box} className="absolute inset-0 space-y-24 overflow-y-auto px-4 pb-32 pt-24">
          {pages.map((p) => { const Pg = PAGE_MAP[p]; return <Pg key={p} inv={inv} t={t} /> })}
        </div>
      )}
    </motion.div>
  )
}
