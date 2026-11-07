import { motion } from 'framer-motion'
import { useLang } from '../lang.jsx'

export default function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang" role="group" aria-label="Language">
      {[['gu', 'ગુ'], ['en', 'EN']].map(([k, label]) => (
        <button key={k} onClick={() => setLang(k)} aria-pressed={lang === k} className={lang === k ? 'on' : ''}>
          {lang === k && <motion.span layoutId="langpill" className="pill" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
          <span>{label}</span>
        </button>
      ))}
    </div>
  )
}
