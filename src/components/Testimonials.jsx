import { motion } from 'framer-motion'

export default function Testimonials({ t }) {
  return (
    <section id="reviews" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-amber-200 uppercase backdrop-blur-md mb-3">
          ✨ {t.testimonials.badge} ✨
        </div>
        <h2 className="font-['Cinzel'] text-3xl font-extrabold tracking-wide text-white sm:text-4xl lg:text-5xl">
          {t.testimonials.title}
        </h2>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="grid gap-6 sm:grid-cols-3">
        {t.testimonials.items.map((rev, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="flex flex-col justify-between rounded-3xl border border-amber-500/25 bg-[#140c29]/90 p-6 sm:p-7 shadow-xl"
          >
            <div>
              {/* 5 Golden Stars */}
              <div className="flex items-center gap-1 text-amber-400 text-sm mb-3">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-amber-100/85 leading-relaxed font-['Hind_Vadodara'] italic">
                “{rev.quote}”
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-amber-500/20 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 font-bold text-sm border border-amber-400/40">
                {rev.author[0]}
              </div>
              <div>
                <div className="font-bold text-sm text-amber-200">
                  {rev.author}
                </div>
                <div className="text-[11px] text-amber-300/70">
                  📍 {rev.city}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
