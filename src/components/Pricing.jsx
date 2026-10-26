import { motion } from 'framer-motion'
import { contactConfig } from '../translations'

export default function Pricing({ lang, t }) {
  return (
    <section id="pricing" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-amber-200 uppercase backdrop-blur-md mb-3">
          ✨ {t.pricing.badge} ✨
        </div>
        <h2 className="font-['Cinzel'] text-3xl font-extrabold tracking-wide text-white sm:text-4xl lg:text-5xl">
          {t.pricing.title}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-amber-100/80">
          {t.pricing.subtitle}
        </p>
      </motion.div>

      {/* 3 Pricing Cards with 3D on-scroll perspective */}
      <div className="grid gap-6 sm:grid-cols-3 items-stretch" style={{ perspective: 1200 }}>
        {t.pricing.plans.map((plan, index) => {
          const isFeatured = !!plan.featured

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, rotateX: 18, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: isFeatured ? 1.07 : 1.03, transition: { duration: 0.3 } }}
              style={{ transformStyle: 'preserve-3d' }}
              className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 shadow-2xl transition-all ${
                isFeatured
                  ? 'border-2 border-amber-400 bg-gradient-to-b from-[#251545] via-[#1b0e36] to-[#120826] scale-100 sm:scale-105 z-20 shadow-[0_0_40px_rgba(245,158,11,0.3)] animate-float-gentle'
                  : 'border border-amber-500/25 bg-[#140b2b]/90 hover:border-amber-400/50'
              }`}
            >
              {/* Most popular badge with pulse glow */}
              {isFeatured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-4 py-1 text-xs font-extrabold text-black uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.6)]">
                  ★ {t.pricing.popularTag} ★
                </div>
              )}

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                  {plan.tag}
                </div>
                <h3 className="font-['Cinzel'] text-xl sm:text-2xl font-bold text-white mb-3">
                  {plan.name}
                </h3>

                <div className="flex items-baseline gap-1 my-4 pb-4 border-b border-amber-500/20">
                  <span className="font-['Cinzel'] text-3xl sm:text-4xl font-extrabold text-amber-300">
                    {plan.price}
                  </span>
                  <span className="text-xs text-amber-200/70">
                    {lang === 'gu' ? '/ લાઈફટાઈમ કાર્ડ' : '/ Lifetime Link'}
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-amber-100/80 mb-6">
                  {plan.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold mt-0.5">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={contactConfig.getWhatsAppLink(`નમસ્તે AJ Invitation, હું ${plan.name} (${plan.price}) પ્લાન ઓર્ડર કરવા માગું છું.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 rounded-2xl py-3 px-4 text-xs sm:text-sm font-bold transition shadow-lg ${
                  isFeatured
                    ? 'bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 text-white hover:from-emerald-500 hover:to-green-400 whatsapp-pulse'
                    : 'bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 hover:text-white'
                }`}
              >
                <span>💬</span>
                <span>{plan.cta}</span>
              </a>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
