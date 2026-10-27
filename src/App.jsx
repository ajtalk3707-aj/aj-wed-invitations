import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import UniversalViewer from './UniversalViewer'
import { invitations, themes } from './data'
import { translations } from './translations'

// Landing page components
import Effects from './components/Effects'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import DesignShowcase from './components/DesignShowcase'
import Features from './components/Features'
import Occasions from './components/Occasions'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import MobileStickyBar from './components/MobileStickyBar'

const Backdrop = () => (
  <div
    className="fixed inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_50%_30%,#2a1a5e,#0d0a1f_70%)] pointer-events-none"
    style={{ perspective: 1200 }}
  >
    <div className="ring" style={{ width: '80vmin', height: '80vmin' }} />
    <div className="ring b" style={{ width: '60vmin', height: '60vmin' }} />
    <div className="ring" style={{ width: '110vmin', height: '110vmin', animationDuration: '70s' }} />
  </div>
)

export default function App() {
  const [lang, setLang] = useState('gu') // Default Gujarati, easily switchable to English
  const [sel, setSel] = useState(null)

  const t = translations[lang]

  return (
    <div className="min-h-screen relative bg-[#090715] text-[#fdf0e8] overflow-x-hidden selection:bg-amber-500 selection:text-black">
      {/* 3D Celestial Rings & Ambient Background Glow */}
      <Backdrop />

      {/* Floating Sparkles, Stardust & Mandala Effects */}
      <Effects />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar lang={lang} setLang={setLang} t={t} />

        <main className="flex-1">
          {/* Hero Section with Extra Royal Wow Effects & Direct 3D Orbit Launch */}
          <Hero lang={lang} t={t} onOpen={setSel} defaultInv={invitations[0]} />

          {/* Trust Numbers & Metrics */}
          <StatsBar t={t} />

          {/* "Choose" Section: Interactive Portfolio with Category Filters */}
          <DesignShowcase
            list={invitations}
            onOpen={setSel}
            lang={lang}
            t={t}
          />

          {/* Features / Why Choose AJ Invitation */}
          <Features t={t} />

          {/* Occasions Covered */}
          <Occasions lang={lang} t={t} />

          {/* How It Works: 3 Steps to Order */}
          <HowItWorks lang={lang} t={t} />

          {/* Pricing & Packages */}
          <Pricing lang={lang} t={t} />

          {/* Testimonials from Real Gujarati Couples */}
          <Testimonials t={t} />

          {/* Frequently Asked Questions */}
          <FAQ lang={lang} t={t} />

          {/* Comprehensive Contact Section with Interactive Form */}
          <ContactSection lang={lang} t={t} />
        </main>

        {/* Footer */}
        <Footer lang={lang} t={t} />
      </div>

      {/* Mobile Sticky Action Bar & Floating WhatsApp */}
      <MobileStickyBar lang={lang} />

      {/* Full-Screen Interactive Universal Invitation Viewer */}
      <AnimatePresence>
        {sel && (
          <UniversalViewer
            key={sel.id}
            inv={sel}
            t={themes[sel.theme] || themes.royalGold}
            onClose={() => setSel(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
