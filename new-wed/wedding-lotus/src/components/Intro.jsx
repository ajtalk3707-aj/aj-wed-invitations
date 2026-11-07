import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lotus from './Lotus.jsx'
import LangToggle from './LangToggle.jsx'
import { useLang } from '../lang.jsx'

/* ── rangoli: three rings, one revealed by each lamp ── */
const GOLD = '#f3c56b'
const E = ({ on, i, cy, rx, ry, rot }) => (
  <g transform={`rotate(${rot} 110 110)`}>
    <motion.ellipse cx="110" cy={cy} rx={rx} ry={ry} stroke={GOLD} strokeWidth="1.3" style={{ fill: 'rgba(243,197,107,.13)' }}
      initial={{ pathLength: 0, opacity: 0 }} animate={on ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{ delay: i * 0.07, duration: 1.5, ease: 'easeInOut' }} />
  </g>
)
const C = ({ on, r, dash }) => (
  <motion.circle cx="110" cy="110" r={r} fill="none" stroke={GOLD} strokeWidth="1.1" strokeDasharray={dash}
    initial={{ pathLength: 0, opacity: 0 }} animate={on ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 2, ease: 'easeInOut' }} />
)
function Rangoli({ n }) {
  return (
    <motion.svg className="rangoli" viewBox="0 0 220 220" aria-hidden="true" animate={{ rotate: 360 }} transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}>
      <C on={n > 0} r={14} />
      {Array.from({ length: 8 }, (_, k) => <E key={'a' + k} on={n > 0} i={k} cy={80} rx={8} ry={18} rot={k * 45} />)}
      <C on={n > 1} r={46} dash="3 5" />
      {Array.from({ length: 16 }, (_, k) => <E key={'b' + k} on={n > 1} i={k} cy={48} rx={5} ry={13} rot={k * 22.5} />)}
      <C on={n > 2} r={94} />
      {Array.from({ length: 12 }, (_, k) => <E key={'c' + k} on={n > 2} i={k} cy={28} rx={7} ry={12} rot={15 + k * 30} />)}
      {Array.from({ length: 36 }, (_, k) => {
        const a = (k * 10 * Math.PI) / 180
        return (
          <motion.circle key={'d' + k} cx={110 + Math.sin(a) * 104} cy={110 - Math.cos(a) * 104} r="1.8" fill={GOLD}
            initial={{ opacity: 0, scale: 0 }} animate={n > 2 ? { opacity: 1, scale: 1 } : {}} transition={{ delay: k * 0.04, duration: 0.5 }} />
        )
      })}
    </motion.svg>
  )
}

/* ── a clay lamp you can tap ── */
function Diya({ lit, hint, label, onTap }) {
  return (
    <div className="diya-col">
      <motion.button className={`diya ${lit ? 'lit' : ''}`} onClick={onTap} disabled={lit} aria-label={label} whileTap={{ scale: 0.92 }}>
        {!lit && hint && <motion.i className="hintring" animate={{ scale: [1, 1.9], opacity: [0.7, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />}
        <AnimatePresence>
          {lit && (
            <>
              <motion.i className="aura" initial={{ scale: 0, opacity: 0 }} animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity }} />
              <motion.i className="flame" initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, scaleY: [1, 1.2, 0.92, 1.12, 1], rotate: [-3, 3, -2, 2, -3] }}
                transition={{ scale: { type: 'spring', stiffness: 160, damping: 9 }, scaleY: { duration: 1.5, repeat: Infinity }, rotate: { duration: 1.6, repeat: Infinity } }} />
            </>
          )}
        </AnimatePresence>
        <span className="wick" />
        <span className="bowl" />
      </motion.button>
      <motion.span className="dlabel" animate={{ opacity: lit ? 1 : 0.35, y: lit ? 0 : 4 }}>{label}</motion.span>
    </div>
  )
}

export default function Intro({ onOpen, onZoom, onDone }) {
  const { t } = useLang()
  const [lit, setLit] = useState([false, false, false])
  const [stage, setStage] = useState('play') // play | bloom | flash | zoom
  const first = useRef(true)
  const n = lit.filter(Boolean).length
  const next = lit.indexOf(false)

  const light = (i) => {
    if (first.current) { first.current = false; onOpen() }
    setLit((l) => l.map((v, k) => (k === i ? true : v)))
  }
  const skip = () => {
    if (first.current) { first.current = false; onOpen() }
    setLit([true, true, true])
  }

  useEffect(() => {
    if (n < 3) return
    const ts = [
      setTimeout(() => setStage('bloom'), 1500),
      setTimeout(() => setStage('flash'), 4700),
      setTimeout(() => { setStage('zoom'); onZoom() }, 5700),
      setTimeout(onDone, 7400),
    ]
    return () => ts.forEach(clearTimeout)
    // eslint-disable-next-line
  }, [n])

  const flies = useMemo(() => Array.from({ length: 28 }, () => ({ x: Math.random() * 100, d: 7 + Math.random() * 8, dl: Math.random() * 7, s: 2 + Math.random() * 3 })), [])
  const bloom = stage !== 'play'

  return (
    <motion.div className="intro" animate={{ opacity: stage === 'zoom' ? 0 : 1 }} transition={{ duration: 1.6 }}>
      {flies.map((f, i) => (
        <motion.i key={i} className="fly" style={{ left: `${f.x}%`, width: f.s, height: f.s }}
          animate={{ y: [0, -window.innerHeight * 0.8], opacity: [0, 0.9, 0] }} transition={{ duration: f.d, delay: f.dl, repeat: Infinity }} />
      ))}
      <div className="intro-lang"><LangToggle /></div>

      <div className="intro-col">
        <div className="mandala">
          <motion.div className="glowdisc" animate={{ opacity: 0.15 + n * 0.22, scale: 0.8 + n * 0.12 }} transition={{ duration: 1.6 }} />
          <Rangoli n={n} />
          <Lotus className="lotus-intro" open={bloom} />
        </div>

        <div className="hintbox" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p key={n} className={n === 3 ? 'hint final' : 'hint'} initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }} transition={{ duration: 0.9 }}>
              {t.intro.hints[n]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="diyas">
          {t.intro.lamps.map((label, i) => (
            <Diya key={i} lit={lit[i]} hint={i === next && stage === 'play'} label={label} onTap={() => light(i)} />
          ))}
        </div>
        {n === 0 && <motion.p className="taphint" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.5, 1] }} transition={{ delay: 2, duration: 2.5 }}>{t.intro.tap}</motion.p>}
      </div>

      {n < 3 && <button className="skip" onClick={skip}>{t.intro.skip}</button>}

      <AnimatePresence>
        {stage === 'flash' && (
          <motion.div className="flood" initial={{ scale: 0, opacity: 1 }} animate={{ scale: 80, opacity: 1 }} transition={{ duration: 1.3, ease: 'easeIn' }} />
        )}
      </AnimatePresence>
      {(stage === 'zoom') && <div className="flood full" />}
    </motion.div>
  )
}
