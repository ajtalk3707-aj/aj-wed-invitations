import { motion } from 'framer-motion'

export default function StatsBar({ t }) {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-8 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 12, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
        className="rounded-3xl border border-amber-500/30 bg-[#120c24]/90 p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl ring-1 ring-amber-400/20"
      >
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-amber-500/20">
          {t.stats.map((item, index) => (
            <div key={index} className={`flex flex-col items-center ${index > 0 ? 'pt-4 sm:pt-0' : ''}`}>
              <span className="font-['Cinzel'] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-300 drop-shadow-[0_2px_12px_rgba(245,158,11,0.3)]">
                {item.num}
              </span>
              <span className="mt-1 text-xs sm:text-sm font-bold text-amber-100">
                {item.label}
              </span>
              <span className="text-[11px] sm:text-xs text-amber-300/70 mt-0.5">
                {item.sub}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
