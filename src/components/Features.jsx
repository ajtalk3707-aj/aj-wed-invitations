import { motion } from 'framer-motion'

export default function Features({ t }) {
  return (
    <section id="features" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-amber-200 uppercase backdrop-blur-md mb-3 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          ✨ {t.features.badge} ✨
        </div>
        <h2 className="font-['Cinzel'] text-3xl font-extrabold tracking-wide text-white sm:text-4xl lg:text-5xl">
          {t.features.title}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-amber-100/80">
          {t.features.subtitle}
        </p>
      </motion.div>

      {/* 6 Feature Cards with 3D on-scroll perspective */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1100 }}>
        {t.features.items.map((feat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 45, rotateX: 14, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: idx * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -7, scale: 1.025, transition: { duration: 0.25 } }}
            style={{ transformStyle: 'preserve-3d' }}
            className="group relative rounded-3xl border border-amber-500/25 bg-gradient-to-b from-[#191033]/90 to-[#0e0821]/95 p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-amber-400/60 hover:shadow-[0_15px_35px_rgba(245,158,11,0.2)] transition-all duration-300"
          >
            {/* Ambient Card Glow on Hover */}
            <div className="absolute inset-0 rounded-3xl bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-600/30 to-amber-400/20 border border-amber-400/40 text-2xl shadow-inner group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <h3 className="font-bold text-base sm:text-lg text-amber-100 group-hover:text-amber-300 transition">
                {feat.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-amber-100/75 leading-relaxed font-['Hind_Vadodara']">
              {feat.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
