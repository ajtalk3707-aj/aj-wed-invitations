import { motion } from 'framer-motion'
import { contactConfig } from '../translations'

export default function HowItWorks({ lang, t }) {
  return (
    <section id="how-it-works" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-amber-200 uppercase backdrop-blur-md mb-3">
          ✨ {t.howItWorks.badge} ✨
        </div>
        <h2 className="font-['Cinzel'] text-3xl font-extrabold tracking-wide text-white sm:text-4xl lg:text-5xl">
          {t.howItWorks.title}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-amber-100/80">
          {t.howItWorks.subtitle}
        </p>
      </motion.div>

      {/* 3 Step Cards with 3D on-scroll perspective */}
      <div className="grid gap-6 sm:grid-cols-3 relative" style={{ perspective: 1100 }}>
        {t.howItWorks.steps.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, rotateY: index === 0 ? -12 : index === 2 ? 12 : 0, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -7, scale: 1.025, transition: { duration: 0.25 } }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative rounded-3xl border border-amber-500/25 bg-[#140b2b]/90 p-6 sm:p-7 shadow-xl hover:border-amber-400/50 hover:shadow-[0_10px_35px_rgba(245,158,11,0.2)] transition-all flex flex-col justify-between"
          >
            {/* Step Number Tag */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-['Cinzel'] text-3xl sm:text-4xl font-black text-amber-400/30">
                {item.step}
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 border border-amber-400/40 text-xs font-bold text-amber-300">
                ✓
              </span>
            </div>

            <div>
              <h3 className="font-bold text-lg text-amber-100 mb-2 font-['Cinzel']">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-amber-100/75 leading-relaxed font-['Hind_Vadodara']">
                {item.desc}
              </p>
            </div>

            {index === 1 && (
              <div className="mt-4 pt-3 border-t border-amber-500/20">
                <a
                  href={contactConfig.getWhatsAppLink('નમસ્તે AJ Invitation, હું મારા લગ્નની વિગતો મોકલવા માગું છું.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition"
                >
                  <span>💬 9687336426 પર મોકલો</span>
                  <span>→</span>
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
