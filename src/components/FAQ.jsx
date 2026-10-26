import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { contactConfig } from '../translations'

export default function FAQ({ lang, t }) {
  const [openIdx, setOpenIdx] = useState(0)

  const toggle = (idx) => {
    setOpenIdx(prev => (prev === idx ? null : idx))
  }

  return (
    <section className="relative z-10 mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-amber-200 uppercase backdrop-blur-md mb-3">
          ✨ {t.faq.badge} ✨
        </div>
        <h2 className="font-['Cinzel'] text-3xl font-extrabold tracking-wide text-white sm:text-4xl">
          {t.faq.title}
        </h2>
      </motion.div>

      {/* Accordion */}
      <div className="space-y-3.5">
        {t.faq.items.map((item, index) => {
          const isOpen = openIdx === index

          return (
            <div
              key={index}
              className="rounded-2xl border border-amber-500/25 bg-[#140b2b]/90 overflow-hidden transition"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-amber-100 hover:text-amber-300 transition cursor-pointer"
              >
                <span>{item.q}</span>
                <span className={`text-xl transition-transform ${isOpen ? 'rotate-180 text-amber-400' : 'text-amber-500/70'}`}>
                  ▾
                </span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-amber-500/15"
                  >
                    <p className="p-5 text-xs sm:text-sm text-amber-100/80 font-['Hind_Vadodara'] leading-relaxed bg-black/20">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      <div className="mt-8 text-center">
        <a
          href={contactConfig.getWhatsAppLink('નમસ્તે AJ Invitation, મને એક પ્રશ્ન પૂછવો છે.')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-300 hover:text-white transition"
        >
          <span>💬 {lang === 'gu' ? 'બીજો કોઈ પ્રશ્ન છે? વોટ્સએપ પર પૂછો (૯૬૮૭૩૩૬૪૨૬)' : 'Have more questions? Ask directly on WhatsApp (9687336426)'}</span>
          <span>→</span>
        </a>
      </div>
    </section>
  )
}
