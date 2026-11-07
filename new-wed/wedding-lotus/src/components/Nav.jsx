import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../lang.jsx'

export const SECTIONS = ['home', 'invite', 'events', 'venue', 'rsvp']
const ICONS = ['🪷', '💌', '🪔', '📍', '✉️']

export default function Nav() {
  const { t } = useLang()
  const [active, setActive] = useState('home')
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    SECTIONS.forEach((id) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <motion.nav className="dock" initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} aria-label="Sections">
      {SECTIONS.map((id, i) => (
        <button key={id} className={active === id ? 'on' : ''} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })} aria-label={t.nav[i]}>
          {active === id && <motion.span layoutId="dockpill" className="dpill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
          <span className="di">{ICONS[i]}</span><span className="dt">{t.nav[i]}</span>
        </button>
      ))}
    </motion.nav>
  )
}
