import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function Petals({ count = 14 }) {
  const items = useMemo(() => Array.from({ length: count }, () => ({
    x: Math.random() * 100, s: 9 + Math.random() * 12, d: 10 + Math.random() * 9, dl: Math.random() * 10,
    sw: 30 + Math.random() * 60, c: ['#f0a020', '#e2751f', '#f7b8c9'][Math.floor(Math.random() * 3)],
  })), [count])
  return (
    <div className="petals" aria-hidden="true">
      {items.map((p, i) => (
        <motion.span key={i} className="petal" style={{ left: `${p.x}%`, width: p.s, height: p.s * 1.3, background: p.c }}
          initial={{ y: '-8%', opacity: 0 }} animate={{ y: '105vh', x: [0, p.sw, -p.sw, 0], rotate: [0, 180, 360, 560], opacity: [0, 0.85, 0.85, 0] }}
          transition={{ duration: p.d, delay: p.dl, repeat: Infinity, ease: 'linear' }} />
      ))}
    </div>
  )
}
