import { motion } from 'framer-motion'
import { contactConfig } from '../translations'

export default function Occasions({ lang, t }) {
  return (
    <section id="occasions" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-amber-200 uppercase backdrop-blur-md mb-3">
          ✨ {t.occasions.badge} ✨
        </div>
        <h2 className="font-['Cinzel'] text-3xl font-extrabold tracking-wide text-white sm:text-4xl lg:text-5xl">
          {t.occasions.title}
        </h2>
      </motion.div>

      {/* Grid of occasions with 3D on-scroll perspective */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1100 }}>
        {t.occasions.items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 45, rotateX: 12, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
            style={{ transformStyle: 'preserve-3d' }}
            className="flex flex-col justify-between rounded-3xl border border-amber-500/20 bg-[#140c29]/80 p-5 sm:p-6 shadow-lg hover:border-amber-400/50 hover:bg-[#191033] hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)] transition"
          >
            <div>
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-base sm:text-lg text-amber-200 mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-amber-100/75 leading-relaxed font-['Hind_Vadodara']">
                {item.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-500/15">
              <a
                href={contactConfig.getWhatsAppLink(`નમસ્તે AJ Invitation, મને ${item.title} માટે કાર્ડ બનાવડાવવું છે.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white transition"
              >
                <span>{lang === 'gu' ? 'આ પ્રસંગ માટે ઓર્ડર કરો' : 'Order for this occasion'}</span>
                <span>→</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
