import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { contactConfig } from '../translations'

export default function Navbar({ lang, setLang, t }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleLanguage = () => {
    setLang(prev => (prev === 'gu' ? 'en' : 'gu'))
  }

  const navLinks = [
    { href: '#designs', label: t.nav.designs },
    { href: '#features', label: t.nav.features },
    { href: '#occasions', label: t.nav.occasions },
    { href: '#how-it-works', label: t.nav.howItWorks },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#contact', label: t.nav.contact },
  ]

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-amber-500/20 bg-[#090715]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="relative flex items-center justify-center">
            <img
              src="/aj-logo.png"
              alt="AJ Invitation Logo"
              className="h-10 w-auto sm:h-12 object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.55)] group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-['Cinzel'] text-lg sm:text-xl font-black tracking-wider text-amber-200 group-hover:text-amber-100 transition">
              AJ INVITATION
            </span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-amber-400/80 -mt-1">
              {lang === 'gu' ? 'રોયલ ડિજિટલ કંકોતરી' : 'Royal Digital & Video Cards'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs xl:text-sm font-medium text-amber-100/80 hover:text-amber-300 transition duration-150"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions: Language Toggle + WhatsApp / Call */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-200 hover:bg-amber-500/20 hover:border-amber-400/60 transition shadow-sm cursor-pointer"
            title="Switch Language"
          >
            <span className="text-sm">🌐</span>
            <span className="tracking-wide">
              {lang === 'gu' ? 'ENG' : 'ગુજરાતી'}
            </span>
          </button>

          {/* Quick Call */}
          <a
            href={contactConfig.getPhoneLink()}
            className="hidden xl:flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-black/40 px-3.5 py-1.5 text-xs font-medium text-amber-100 hover:border-amber-400 hover:text-white transition"
          >
            <span>📞</span>
            <span>{contactConfig.displayPhone}</span>
          </a>

          {/* Direct WhatsApp Button */}
          <a
            href={contactConfig.getWhatsAppLink('નમસ્તે AJ Invitation, મને તમારા ડિજિટલ કંકોતરી વિશે માહિતી આપો.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 px-4 py-1.5 text-xs font-bold text-white shadow-[0_0_15px_rgba(34,197,94,0.35)] hover:shadow-[0_0_22px_rgba(34,197,94,0.6)] transition cursor-pointer"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.203c.043.071.043.418-.101.823z" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Right Controls: Language toggle + Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Quick Lang toggle on mobile */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-200"
          >
            <span>{lang === 'gu' ? 'ENG' : 'ગુજરાતી'}</span>
          </button>

          {/* Quick WhatsApp icon button on mobile */}
          <a
            href={contactConfig.getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md"
            aria-label="WhatsApp"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.203c.043.071.043.418-.101.823z" />
            </svg>
          </a>

          {/* Hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/30 bg-[#160f2e] text-amber-200"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? (
              <span className="text-xl font-bold">✕</span>
            ) : (
              <span className="text-xl">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-amber-500/20 bg-[#0d0a1f]/98 px-6 py-5 lg:hidden"
          >
            <div className="flex flex-col gap-4 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="rounded-lg py-2 text-base font-semibold text-amber-100 hover:bg-amber-500/10 hover:text-amber-300 transition"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-3 border-t border-amber-500/20 flex flex-col gap-3">
                <a
                  href={contactConfig.getPhoneLink()}
                  className="flex items-center justify-center gap-2 rounded-xl border border-amber-400/30 bg-amber-500/10 py-2.5 text-sm font-bold text-amber-200"
                >
                  <span>📞 Call: {contactConfig.displayPhone}</span>
                </a>
                <a
                  href={contactConfig.getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 py-2.5 text-sm font-bold text-white shadow-lg"
                >
                  <span>💬 Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
