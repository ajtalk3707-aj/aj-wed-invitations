import { contactConfig } from '../translations'

export default function Footer({ lang, t }) {
  return (
    <footer className="relative z-10 border-t border-amber-500/20 bg-[#06040f] pt-14 pb-24 sm:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/aj-logo.png"
                alt="AJ Invitation Logo"
                className="h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.55)]"
              />
              <div className="flex flex-col">
                <span className="font-['Cinzel'] text-xl font-black tracking-wider text-amber-200">
                  AJ INVITATION
                </span>
                <span className="text-xs font-semibold text-amber-400/80 -mt-0.5">
                  {lang === 'gu' ? 'શાહી ડિજિટલ કંકોતરી & વિડીયો' : 'Royal Digital & Video Cards'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-amber-100/75 leading-relaxed font-['Hind_Vadodara'] max-w-sm">
              {t.footer.desc}
            </p>

            <div className="pt-2 text-xs text-amber-300/80 font-['Baloo_Bhai_2'] leading-loose">
              વક્રતુંડ મહાકાય, સૂર્યકોટિ સમપ્રભ ।<br />
              નિર્વિઘ્નં કુરુ મે દેવ, સર્વકાર્યેષુ સર્વદા ॥
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-['Cinzel'] text-sm font-bold tracking-wider text-amber-200 uppercase">
              {t.footer.quickLinks}
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-100/70">
              <li>
                <a href="#designs" className="hover:text-amber-300 transition">
                  {t.nav.designs}
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-amber-300 transition">
                  {t.nav.features}
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-amber-300 transition">
                  {t.nav.occasions}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-amber-300 transition">
                  {t.nav.howItWorks}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-amber-300 transition">
                  {t.nav.pricing}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-300 transition">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-['Cinzel'] text-sm font-bold tracking-wider text-amber-200 uppercase">
              {t.footer.contactInfo}
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-amber-100/80 font-['Hind_Vadodara']">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">💬</span>
                <span>WhatsApp:</span>
                <a
                  href={contactConfig.getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-amber-300 hover:underline"
                >
                  +91 {contactConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>Phone:</span>
                <a
                  href={contactConfig.getPhoneLink()}
                  className="font-bold text-amber-300 hover:underline"
                >
                  +91 {contactConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span>Email:</span>
                <a
                  href={contactConfig.getEmailLink()}
                  className="font-bold text-amber-300 hover:underline break-all"
                >
                  {contactConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-amber-200/70">
                <span>📍</span>
                <span>{lang === 'gu' ? contactConfig.locationGu : contactConfig.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-500/15 pt-6 text-center text-xs text-amber-200/60 font-['Hind_Vadodara']">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
