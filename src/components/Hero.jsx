import { motion, useScroll, useTransform } from 'framer-motion'
import { contactConfig } from '../translations'

export default function Hero({ lang, t }) {
  const { scrollY } = useScroll()

  // 3D Scroll-linked transforms for the Hero teaser card
  const cardRotateX = useTransform(scrollY, [0, 500], [0, 15])
  const cardScale = useTransform(scrollY, [0, 500], [1, 0.94])
  const cardTranslateY = useTransform(scrollY, [0, 500], [0, 40])

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 text-center">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Shubh Ganesh Shloka Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3 inline-flex items-center gap-2"
        >
          <span className="text-2xl filter drop-shadow">🪔</span>
          <span className="font-['Baloo_Bhai_2'] text-base sm:text-lg font-bold tracking-widest text-amber-300/90">
            ॥ શ્રી ગણેશાય નમઃ ॥
          </span>
          <span className="text-2xl filter drop-shadow">🪔</span>
        </motion.div>

        {/* AJ 3D Brand Logo Showcase with Continuous Floating Levitation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 0.8 },
            y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="mb-4 flex justify-center"
        >
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500/30 via-emerald-500/25 to-amber-500/30 blur-2xl opacity-80 group-hover:opacity-100 transition duration-700 pointer-events-none" />
            <img
              src="/aj-logo.png"
              alt="AJ Invitation Logo"
              className="relative h-20 w-auto sm:h-24 object-contain drop-shadow-[0_0_25px_rgba(56,189,248,0.7)] group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </motion.div>

        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-500/15 via-purple-900/40 to-amber-500/15 px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold text-amber-200 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <span>✨</span>
            <span>{t.hero.badge}</span>
            <span>✨</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-['Cinzel'] text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight sm:leading-tight"
        >
          {t.hero.title1}{' '}
          <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-100 bg-clip-text text-transparent foil drop-shadow-[0_4px_25px_rgba(245,158,11,0.4)]">
            {t.hero.titleHighlight}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-5 max-w-3xl text-sm sm:text-base lg:text-lg text-amber-100/80 leading-relaxed font-['Hind_Vadodara']"
        >
          {t.hero.description}
        </motion.p>

        {/* Primary Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4"
        >
          {/* WhatsApp Direct Chat */}
          <a
            href={contactConfig.getWhatsAppLink('નમસ્તે AJ Invitation, મને તમારા રોયલ ડિજિટલ કંકોતરી વિશે સંપૂર્ણ માહિતી આપો.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_35px_rgba(34,197,94,0.7)] transition transform hover:-translate-y-0.5 whatsapp-pulse"
          >
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.203c.043.071.043.418-.101.823z" />
            </svg>
            <span>{t.hero.ctaWhatsApp}</span>
          </a>

          {/* Explore Designs Button */}
          <a
            href="#designs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-amber-400/50 bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 px-7 py-3.5 text-sm sm:text-base font-bold text-amber-200 hover:text-white hover:border-amber-300 transition transform hover:-translate-y-0.5 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
          >
            <span>✨</span>
            <span>{t.hero.ctaDesigns}</span>
            <span>↓</span>
          </a>

          {/* Quick Call Button */}
          <a
            href={contactConfig.getPhoneLink()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-black/40 px-6 py-3.5 text-sm sm:text-base font-semibold text-amber-100 hover:border-amber-400 hover:text-white transition"
          >
            <span>📞</span>
            <span>{t.hero.ctaCall}</span>
          </a>
        </motion.div>

        {/* Feature Highlights Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-amber-200/90"
        >
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 backdrop-blur-sm">
            ⚡ {lang === 'gu' ? '૨૪ કલાકમાં ડિલિવરી' : '24-Hour Express Delivery'}
          </span>
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 backdrop-blur-sm">
            📱 {lang === 'gu' ? '૧૦૦% મોબાઈલ ફ્રેન્ડલી' : '100% Mobile Optimized'}
          </span>
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 backdrop-blur-sm">
            🎵 {lang === 'gu' ? 'મધુર શરણાઈ સંગીત સાથે' : 'Auspicious Shehnai Music'}
          </span>
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 backdrop-blur-sm">
            📍 {lang === 'gu' ? 'ગુગલ મેપ લાઈવ લોકેશન' : 'Live Google Map Navigation'}
          </span>
        </motion.div>

        {/* Visual Showcase Teaser Preview with 3D on-scroll tilt */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          style={{
            perspective: 1200,
            rotateX: cardRotateX,
            scale: cardScale,
            y: cardTranslateY,
            transformStyle: 'preserve-3d',
          }}
          className="mt-12 mx-auto max-w-2xl"
        >
          <div className="relative rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#1b1236]/90 via-[#120a24]/95 to-[#090715] p-5 sm:p-7 shadow-[0_0_50px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/20 backdrop-blur-xl hover:shadow-[0_0_65px_rgba(245,158,11,0.4)] transition-shadow">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-3 left-3 text-amber-400/50 text-xs">❖</div>
            <div className="absolute top-3 right-3 text-amber-400/50 text-xs">❖</div>
            <div className="absolute bottom-3 left-3 text-amber-400/50 text-xs">❖</div>
            <div className="absolute bottom-3 right-3 text-amber-400/50 text-xs">❖</div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-3">
                <img src="/aj-logo.png" alt="AJ Logo" className="h-6 w-auto object-contain drop-shadow" />
                <span className="rounded-full bg-amber-500/20 border border-amber-400/30 px-3 py-0.5 text-[11px] font-semibold text-amber-300 uppercase tracking-widest">
                  AJ INVITATION ROYAL STUDIO
                </span>
              </div>

              <h2 className="font-['Noto_Serif_Gujarati'] text-xl sm:text-2xl font-extrabold text-amber-100">
                {lang === 'gu' ? 'ચિ. જસમત સંગ ચિ. આરતી' : 'Ch. Jasmat & Ch. Aarti'}
              </h2>

              <p className="mt-1 font-['Baloo_Bhai_2'] text-sm sm:text-base text-amber-300 font-bold tracking-wider">
                ॥ શુભ વિવાહ મહોત્સવ ॥
              </p>

              <div className="mt-4 flex items-center gap-3 text-xs sm:text-sm text-amber-200/80">
                <span>🗓️ ૧૩-૦૨-૨૦૨૫</span>
                <span>•</span>
                <span>📍 જૂનાગઢ, ગુજરાત</span>
                <span>•</span>
                <span>🎶 મ્યુઝિક સાથે</span>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 w-full">
                <a
                  href="#designs"
                  className="rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 px-5 py-2 text-xs sm:text-sm font-bold text-amber-100 transition shadow-sm"
                >
                  👁️ {lang === 'gu' ? 'તમામ નમૂનાઓ જુઓ' : 'Explore All Live Themes'}
                </a>
                <a
                  href={contactConfig.getWhatsAppLink('નમસ્તે AJ Invitation, મારે આવી રોયલ કંકોતરી બનાવડાવવી છે.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2 text-xs sm:text-sm font-bold text-white transition shadow-sm"
                >
                  💬 {lang === 'gu' ? 'ઓર્ડર કરો (WhatsApp)' : 'Order Custom Card'}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
