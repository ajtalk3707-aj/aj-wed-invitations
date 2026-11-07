import { motion, useScroll, useSpring } from 'framer-motion'
import LangToggle from './LangToggle.jsx'
import { useLang } from '../lang.jsx'

export default function TopBar({ music }) {
  const { t } = useLang()
  const { scrollYProgress } = useScroll()
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  return (
    <motion.header className="top" initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>
      <span className="brand">{t.hero.initials}</span>
      <div className="tools">
        <LangToggle />
        <motion.button className={`mus ${music.playing ? 'on' : ''}`} onClick={music.toggle} whileTap={{ scale: 0.88 }}
          aria-label={music.playing ? 'Mute music' : 'Play music'} aria-pressed={music.playing}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 9v6h4l5 4V5L8 9H4z" />
            {music.playing ? <><path d="M16.5 8.5a5 5 0 0 1 0 7" /><path d="M19 6a8.5 8.5 0 0 1 0 12" /></> : <path d="M17 9l5 6M22 9l-5 6" />}
          </svg>
          {music.playing && <span className="eq"><i /><i /><i /></span>}
        </motion.button>
      </div>
      <motion.div className="progress" style={{ scaleX: w }} />
    </motion.header>
  )
}
