import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../lang.jsx'
import { CFG } from '../copy.js'

const target = new Date(CFG.weddingISO).getTime()
const calc = () => {
  const d = Math.max(0, target - Date.now())
  return [Math.floor(d / 864e5), Math.floor(d / 36e5) % 24, Math.floor(d / 6e4) % 60, Math.floor(d / 1e3) % 60, d]
}

export default function Countdown() {
  const { t, lang } = useLang()
  const [v, setV] = useState(calc)
  useEffect(() => { const i = setInterval(() => setV(calc()), 1000); return () => clearInterval(i) }, [])
  const nf = new Intl.NumberFormat(lang === 'gu' ? 'gu-IN-u-nu-gujr' : 'en-IN', { minimumIntegerDigits: 2 })

  if (v[4] <= 0) return <p className="cd-done">{t.hero.cdDone}</p>
  return (
    <div className="cd">
      <p className="cd-title">{t.hero.cdTitle}</p>
      <div className="cd-row">
        {t.hero.units.map((u, i) => (
          <div className="cd-box" key={u}>
            <div className="cd-num">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span key={v[i]} initial={{ y: -18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 18, opacity: 0 }} transition={{ duration: 0.35 }}>
                  {nf.format(v[i])}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="cd-unit">{u}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
