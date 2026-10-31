import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gujaratiInvitationData } from './invitationData'
import LayoutDarbari from './LayoutDarbari'
import LayoutHeritagePeacock from './LayoutHeritagePeacock'
import LayoutModernFloral from './LayoutModernFloral'
import './DigitalPdfInvitation.css'

export const layoutThemes = [
  {
    id: 'darbari',
    name: '૧. દરબારી કંકુ-સોનેરી',
    subTitle: 'રોયલ જરોખા & કળશ લેઆઉટ',
    accentColor: '#d4af37',
    badgeColor: '#b91c1c',
    bgGradient: 'radial-gradient(circle at 50% 25%, #35040b 0%, #110103 100%)',
  },
  {
    id: 'heritage',
    name: '૨. શાહી પન્ના & મોરપિચ્છ',
    subTitle: 'હેરિટેજ કુંદન & મોર લેઆઉટ',
    accentColor: '#eab308',
    badgeColor: '#047857',
    bgGradient: 'radial-gradient(circle at 50% 25%, #05261d 0%, #010d0a 100%)',
  },
  {
    id: 'floral',
    name: '૩. મોડર્ન બોહો ફ્લોરલ',
    subTitle: 'રોઝ-ગોલ્ડ & પેમ્પસ લેઆઉટ',
    accentColor: '#f43f5e',
    badgeColor: '#be185d',
    bgGradient: 'radial-gradient(circle at 50% 25%, #fed7aa 0%, #fbcfe8 50%, #f472b6 100%)',
  },
]

export default function DigitalPdfInvitation({ onClose, initialTheme = 'darbari' }) {
  // Normalize initial theme name
  const getInitialLayout = (id) => {
    if (id === 'emerald-royal' || id === 'heritage') return 'heritage'
    if (id === 'blush-ivory' || id === 'floral' || id === 'rose') return 'floral'
    return 'darbari'
  }

  const [currentLayoutId, setCurrentLayoutId] = useState(() => getInitialLayout(initialTheme))
  const [viewMode, setViewMode] = useState('booklet') // 'booklet' or 'slider'
  const [activePageIndex, setActivePageIndex] = useState(0)
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)
  const audioContextRef = useRef(null)
  const musicOscillatorsRef = useRef([])

  const data = gujaratiInvitationData
  const activeLayoutInfo = layoutThemes.find(l => l.id === currentLayoutId) || layoutThemes[0]

  // Auspicious Shehnai & Tanpura Synthesizer
  const toggleMusic = () => {
    if (isPlayingMusic) {
      stopMusic()
    } else {
      startMusic()
    }
  }

  const startMusic = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return

      const ctx = new AudioCtx()
      audioContextRef.current = ctx

      // Tanpura base drone chords
      const base = 146.83 // D3
      const freqs = [base, base * 1.5, base * 2, base * 1.25]
      const oscs = []

      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = idx % 2 === 0 ? 'triangle' : 'sine'
        osc.frequency.setValueAtTime(f, ctx.currentTime)
        gain.gain.setValueAtTime(0.035, ctx.currentTime)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        oscs.push({ osc, gain })
      })

      // Shehnai Auspicious melody notes (Bhairavi / Yaman Raga)
      const melodyNotes = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33, 440.0, 369.99]
      let step = 0
      const timer = setInterval(() => {
        if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
          clearInterval(timer)
          return
        }
        const mOsc = ctx.createOscillator()
        const mGain = ctx.createGain()
        mOsc.type = 'sawtooth' // shehnai reed sound
        mOsc.frequency.setValueAtTime(melodyNotes[step % melodyNotes.length], ctx.currentTime)

        mGain.gain.setValueAtTime(0.02, ctx.currentTime)
        mGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2)

        mOsc.connect(mGain)
        mGain.connect(ctx.destination)
        mOsc.start()
        mOsc.stop(ctx.currentTime + 1.2)
        step++
      }, 1400)

      musicOscillatorsRef.current = { oscs, timer }
      setIsPlayingMusic(true)
    } catch (err) {
      console.warn('Audio synthesis could not start:', err)
    }
  }

  const stopMusic = () => {
    if (musicOscillatorsRef.current) {
      if (musicOscillatorsRef.current.timer) clearInterval(musicOscillatorsRef.current.timer)
      if (musicOscillatorsRef.current.oscs) {
        musicOscillatorsRef.current.oscs.forEach(({ osc }) => {
          try { osc.stop(); osc.disconnect() } catch (e) {}
        })
      }
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close() } catch (e) {}
    }
    setIsPlayingMusic(false)
  }

  useEffect(() => {
    return () => stopMusic()
  }, [])

  // Print as PDF
  const handlePrintPdf = () => {
    setViewMode('booklet')
    setTimeout(() => {
      window.print()
    }, 200)
  }

  // Share to WhatsApp
  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `💐 શ્રી ગણેશાય નમઃ 💐\n\nસ્નેહીશ્રી, અમારા ચિ. ${data.couple.groom.name} સંગ ચિ. ${data.couple.bride.name} ના શુભ વિવાહ પ્રસંગે આપ સપરિવાર પધારી નવદંપતીને આશીર્વાદ આપશો.\n\n📅 લગ્ન તિથિ: ${data.couple.weddingDateShort}\n📍 સ્થળ: ${data.venue.name}, જૂનાગઢ.\n\nડીજીટલ કંકોતરી જોવા માટે અહી ક્લિક કરો: ${window.location.href}`
    )
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank')
  }

  // Determine active layout renderer
  let pages = []
  if (currentLayoutId === 'heritage') {
    pages = LayoutHeritagePeacock({ data, onShareWhatsApp: handleShareWhatsApp })
  } else if (currentLayoutId === 'floral') {
    pages = LayoutModernFloral({ data, onShareWhatsApp: handleShareWhatsApp })
  } else {
    pages = LayoutDarbari({ data, onShareWhatsApp: handleShareWhatsApp })
  }

  return (
    <div
      className="min-h-screen w-full relative py-6 px-3 sm:px-6 transition-all duration-700 font-sans"
      style={{
        background: activeLayoutInfo.bgGradient,
      }}
    >
      {/* Top Floating Control Bar (Hidden on print) */}
      <div className="no-print sticky top-3 z-50 mx-auto max-w-5xl bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-3 sm:p-4 mb-6 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-white">
        {/* Left: Back & Title */}
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition flex items-center gap-1"
            >
              ← પાછા જાઓ
            </button>
          )}
          <div>
            <span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold block">
              ૩ અલગ-અલગ લેઆઉટ • ડિજિટલ કંકોતરી (PDF Ready)
            </span>
            <span className="text-sm font-semibold">{activeLayoutInfo.name}</span>
          </div>
        </div>

        {/* Center: 3 Separate Layout Selectors */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {layoutThemes.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setCurrentLayoutId(l.id)
                setActivePageIndex(0)
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                currentLayoutId === l.id
                  ? 'ring-2 ring-white shadow-xl scale-105'
                  : 'opacity-70 hover:opacity-100 bg-white/10'
              }`}
              style={{
                backgroundColor: currentLayoutId === l.id ? l.badgeColor : undefined,
                color: '#fff',
              }}
            >
              <span>{l.id === 'darbari' ? '🏛️' : l.id === 'heritage' ? '🦚' : '🌸'}</span>
              <span>{l.name}</span>
            </button>
          ))}
        </div>

        {/* Right: Actions (View Mode, Audio, Print/PDF, WhatsApp) */}
        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <button
            onClick={() => setViewMode(prev => prev === 'booklet' ? 'slider' : 'booklet')}
            className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium transition"
            title="વ્યૂ મોડ બદલો"
          >
            {viewMode === 'booklet' ? '📖 સ્લાઇડર' : '📑 બુકલેટ'}
          </button>

          {/* Music Toggle */}
          <button
            onClick={toggleMusic}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 ${
              isPlayingMusic ? 'bg-amber-400 text-black font-bold animate-pulse' : 'bg-white/10 hover:bg-white/20'
            }`}
            title="શરણાઈ મંગલ ધૂન"
          >
            <span>{isPlayingMusic ? '🔊' : '🎵'}</span>
            <span className="hidden md:inline">{isPlayingMusic ? 'સંગીત ચાલુ' : 'શરણાઈ'}</span>
          </button>

          {/* Print / Save as PDF Button */}
          <button
            onClick={handlePrintPdf}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-black font-extrabold text-xs shadow-lg transition flex items-center gap-1.5"
            title="પીડીએફ તરીકે સેવ કરો અથવા પ્રિન્ટ કરો"
          >
            <span>🖨️</span>
            <span>PDF પ્રિન્ટ</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pdf-container mx-auto max-w-4xl">
        {viewMode === 'booklet' ? (
          // Booklet Mode: All 4 Pages stacked vertically for continuous viewing and PDF print
          <div className="space-y-8 sm:space-y-12">
            {pages.map((renderFn, index) => (
              <div key={index} className="flex justify-center">
                {renderFn()}
              </div>
            ))}
          </div>
        ) : (
          // Slider Mode: Interactive Page-by-Page Flip
          <div className="flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentLayoutId}-${activePageIndex}`}
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full flex justify-center"
              >
                {pages[activePageIndex]()}
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation Bar */}
            <div className="no-print mt-6 flex items-center gap-4 bg-black/70 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/20 text-white shadow-xl">
              <button
                disabled={activePageIndex === 0}
                onClick={() => setActivePageIndex(prev => Math.max(0, prev - 1))}
                className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent transition text-xs font-bold"
              >
                ◀ પાછળ
              </button>

              <div className="flex items-center gap-2">
                {pages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePageIndex(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      activePageIndex === idx ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/30'
                    }`}
                  />
                ))}
              </div>

              <button
                disabled={activePageIndex === pages.length - 1}
                onClick={() => setActivePageIndex(prev => Math.min(pages.length - 1, prev + 1))}
                className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent transition text-xs font-bold"
              >
                આગળ ▶
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Quick Action on Mobile */}
      <div className="no-print fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={handlePrintPdf}
          className="bg-amber-400 hover:bg-amber-300 text-black font-extrabold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs border-2 border-white/40 transition hover:scale-105"
        >
          <span>📄</span> PDF ડાઉનલોડ
        </button>
      </div>
    </div>
  )
}
