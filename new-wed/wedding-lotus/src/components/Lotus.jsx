import { useId } from 'react'
import { motion } from 'framer-motion'

const petal = (L, w) => `M0 0 C ${w} ${-L * 0.25}, ${w} ${-L * 0.72}, 0 ${-L} C ${-w} ${-L * 0.72}, ${-w} ${-L * 0.25}, 0 0 Z`
const RINGS = [
  { n: 12, L: 98, w: 17, off: 0, d: 0 },
  { n: 10, L: 82, w: 17, off: 18, d: 0.25 },
  { n: 8, L: 64, w: 15, off: 0, d: 0.5 },
  { n: 6, L: 46, w: 12, off: 30, d: 0.75 },
]

export default function Lotus({ open, delay = 0, className }) {
  const id = 'lg' + useId().replace(/:/g, '')
  return (
    <svg className={className} viewBox="0 0 220 220" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#fff4f6" /><stop offset=".55" stopColor="#f7b8c9" /><stop offset="1" stopColor="#d9547e" />
        </linearGradient>
        <radialGradient id={id + 'c'}><stop offset="0" stopColor="#fff2b0" /><stop offset="1" stopColor="#f0a020" /></radialGradient>
      </defs>
      {RINGS.map((r, ri) =>
        Array.from({ length: r.n }, (_, k) => (
          <g key={`${ri}-${k}`} transform={`translate(110 118) rotate(${r.off + (k * 360) / r.n})`}>
            <motion.path d={petal(r.L, r.w)} fill={`url(#${id})`} stroke="rgba(255,255,255,.55)" strokeWidth=".8"
              style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={open ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: delay + r.d + k * 0.05, type: 'spring', stiffness: 55, damping: 11 }} />
          </g>
        ))
      )}
      <motion.circle cx="110" cy="118" r="11" fill={`url(#${id}c)`} initial={{ scale: 0 }} animate={{ scale: open ? [0, 1.3, 1] : 0 }}
        transition={{ delay: delay + 1.1, duration: 1 }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
      {open && Array.from({ length: 14 }, (_, k) => {
        const a = (k * 360) / 14, x = 110 + Math.sin((a * Math.PI) / 180) * 19, y = 118 - Math.cos((a * Math.PI) / 180) * 19
        return <circle key={k} cx={x} cy={y} r="1.6" fill="#fff6c8" />
      })}
    </svg>
  )
}
