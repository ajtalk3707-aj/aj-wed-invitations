import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Distinct luxury animated backgrounds & vibrant matching card backgrounds for each celebration
const pageThemes = [
  {
    // Page 1: Divine Ganesh & Royal Couple (Sunlit Golden Amber Brocade)
    title: 'શુભ વિવાહ & યુગલ પરિચય',
    bg: 'radial-gradient(ellipse at 50% 25%, #4a0920 0%, #1c020b 55%, #080104 100%)',
    // Card background: Warm, luminous royal gold parchment with rich amber undertone
    cardBg: 'linear-gradient(165deg, #fffbeb 0%, #fef3c7 38%, #fde68a 75%, #fcd34d 100%)',
    cardBorder: '#d97706',
    cardBorderInner: 'rgba(217, 119, 6, 0.75)',
    cardBorderDashed: 'rgba(217, 119, 6, 0.38)',
    inkColor: '#3d1602',
    accentColor: '#92400e',
    badgeBg: '#fef3c7',
    badgeBorder: '#d97706',
    badgeText: '#92400e',
    detailBg: 'rgba(255, 251, 235, 0.92)',
    detailBorder: 'rgba(217, 119, 6, 0.45)',
    aura: 'rgba(245, 158, 11, 0.32)',
    petalColor: '#b81431',
    bokehColor: '#fcd34d',
    ambientGlow: 'rgba(245, 158, 11, 0.28)',
  },
  {
    // Page 2: Mangal Vivah Sanskar (Sacred Saffron Kesari & Sunset Marigold)
    title: 'વિવાહ સંસ્કાર (માંગલ્યમ્)',
    bg: 'radial-gradient(ellipse at 50% 25%, #521903 0%, #240a01 55%, #0d0300 100%)',
    // Card background: Distinct vibrant sacred kesari saffron glow
    cardBg: 'linear-gradient(165deg, #fff7ed 0%, #ffedd5 38%, #fed7aa 75%, #fdba74 100%)',
    cardBorder: '#ea580c',
    cardBorderInner: 'rgba(234, 88, 12, 0.75)',
    cardBorderDashed: 'rgba(234, 88, 12, 0.38)',
    inkColor: '#381203',
    accentColor: '#9a3412',
    badgeBg: '#ffedd5',
    badgeBorder: '#ea580c',
    badgeText: '#9a3412',
    detailBg: 'rgba(255, 247, 237, 0.92)',
    detailBorder: 'rgba(234, 88, 12, 0.45)',
    aura: 'rgba(249, 115, 22, 0.32)',
    petalColor: '#ea580c',
    bokehColor: '#fed7aa',
    ambientGlow: 'rgba(249, 115, 22, 0.26)',
  },
  {
    // Page 3: Haldi Rasam & Raas Garba (Luminous Bright Turmeric Haldi)
    title: 'હલ્દી રસમ & રાસ-ગરબા',
    bg: 'radial-gradient(ellipse at 50% 25%, #473202 0%, #211601 55%, #0b0700 100%)',
    // Card background: Unmistakable bright sunshine Haldi yellow!
    cardBg: 'linear-gradient(165deg, #fefce8 0%, #fef08a 38%, #fde047 75%, #facc15 100%)',
    cardBorder: '#ca8a04',
    cardBorderInner: 'rgba(202, 138, 4, 0.8)',
    cardBorderDashed: 'rgba(202, 138, 4, 0.42)',
    inkColor: '#361e02',
    accentColor: '#854d0e',
    badgeBg: '#fef08a',
    badgeBorder: '#ca8a04',
    badgeText: '#854d0e',
    detailBg: 'rgba(254, 252, 232, 0.94)',
    detailBorder: 'rgba(202, 138, 4, 0.45)',
    aura: 'rgba(250, 204, 21, 0.36)',
    petalColor: '#eab308',
    bokehColor: '#fef08a',
    ambientGlow: 'rgba(250, 204, 21, 0.28)',
  },
  {
    // Page 4: Shubh Vivah & Royal Baraat (Ruby Sindoor & Rose Velvet)
    title: 'શુભ લગ્ન વિધિ & શાહી બારાત',
    bg: 'radial-gradient(ellipse at 50% 25%, #520718 0%, #230209 55%, #0c0104 100%)',
    // Card background: Ceremonial Sindoor Rose Blush
    cardBg: 'linear-gradient(165deg, #fff1f2 0%, #ffe4e6 38%, #fecdd3 75%, #fda4af 100%)',
    cardBorder: '#e11d48',
    cardBorderInner: 'rgba(225, 29, 72, 0.75)',
    cardBorderDashed: 'rgba(225, 29, 72, 0.38)',
    inkColor: '#430514',
    accentColor: '#9f1239',
    badgeBg: '#ffe4e6',
    badgeBorder: '#e11d48',
    badgeText: '#9f1239',
    detailBg: 'rgba(255, 241, 242, 0.92)',
    detailBorder: 'rgba(225, 29, 72, 0.45)',
    aura: 'rgba(244, 63, 94, 0.32)',
    petalColor: '#e11d48',
    bokehColor: '#fecdd3',
    ambientGlow: 'rgba(244, 63, 94, 0.26)',
  },
  {
    // Page 5: Shubh Sthal Darshan (Nilkanth Farm Emerald Garden Mint)
    title: 'શુભ સ્થળ દર્શન (નીલકંઠ ગાર્ડન)',
    bg: 'radial-gradient(ellipse at 50% 25%, #093822 0%, #031c10 55%, #010c07 100%)',
    // Card background: Fresh, vibrant royal palace garden emerald mint
    cardBg: 'linear-gradient(165deg, #f0fdf4 0%, #dcfce7 38%, #bbf7d0 75%, #86efac 100%)',
    cardBorder: '#059669',
    cardBorderInner: 'rgba(5, 150, 105, 0.75)',
    cardBorderDashed: 'rgba(5, 150, 105, 0.38)',
    inkColor: '#022c22',
    accentColor: '#047857',
    badgeBg: '#dcfce7',
    badgeBorder: '#059669',
    badgeText: '#065f46',
    detailBg: 'rgba(240, 253, 244, 0.92)',
    detailBorder: 'rgba(5, 150, 105, 0.45)',
    aura: 'rgba(16, 185, 129, 0.32)',
    petalColor: '#10b981',
    bokehColor: '#bbf7d0',
    ambientGlow: 'rgba(16, 185, 129, 0.26)',
  },
  {
    // Page 6: Family Blessings (Royal Sapphire Navy & Sky Blue Silk)
    title: 'કુટુંબ સ્નેહ & સ્વજન આશીર્વાદ',
    bg: 'radial-gradient(ellipse at 50% 25%, #092652 0%, #031129 55%, #010612 100%)',
    // Card background: Royal sapphire silk sky blue
    cardBg: 'linear-gradient(165deg, #eff6ff 0%, #dbeafe 38%, #bfdbfe 75%, #93c5fd 100%)',
    cardBorder: '#2563eb',
    cardBorderInner: 'rgba(37, 99, 235, 0.75)',
    cardBorderDashed: 'rgba(37, 99, 235, 0.38)',
    inkColor: '#0c1e3d',
    accentColor: '#1d4ed8',
    badgeBg: '#dbeafe',
    badgeBorder: '#2563eb',
    badgeText: '#1e40af',
    detailBg: 'rgba(239, 246, 255, 0.92)',
    detailBorder: 'rgba(37, 99, 235, 0.45)',
    aura: 'rgba(59, 130, 246, 0.32)',
    petalColor: '#3b82f6',
    bokehColor: '#bfdbfe',
    ambientGlow: 'rgba(59, 130, 246, 0.26)',
  },
  {
    // Page 7: Madhur Kalrav (Romantic Royal Orchid Magenta & Lavender Plum)
    title: 'મધુર કલરવ – પાવન સ્નેહ આશીર્વાદ',
    bg: 'radial-gradient(ellipse at 50% 25%, #450c38 0%, #1f0318 55%, #0d010a 100%)',
    // Card background: Romantic royal orchid lavender
    cardBg: 'linear-gradient(165deg, #faf5ff 0%, #f3e8ff 38%, #e9d5ff 75%, #d8b4fe 100%)',
    cardBorder: '#9333ea',
    cardBorderInner: 'rgba(147, 51, 234, 0.75)',
    cardBorderDashed: 'rgba(147, 51, 234, 0.38)',
    inkColor: '#320645',
    accentColor: '#7e22ce',
    badgeBg: '#f3e8ff',
    badgeBorder: '#9333ea',
    badgeText: '#6b21a8',
    detailBg: 'rgba(250, 245, 255, 0.92)',
    detailBorder: 'rgba(147, 51, 234, 0.45)',
    aura: 'rgba(192, 132, 252, 0.32)',
    petalColor: '#a855f7',
    bokehColor: '#e9d5ff',
    ambientGlow: 'rgba(192, 132, 252, 0.26)',
  },
]

// Framer Motion Animation Variants - Silky Smooth & Leisurely Luxurious Easing
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16, // leisurely, unhurried reveal cadence
      delayChildren: 0.12,   // gentle breath before starting
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
  },
}

const itemFadeUp = {
  hidden: { opacity: 0, y: 16, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
  },
}

const itemSlideLeft = {
  hidden: { opacity: 0, x: -16, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
}

const itemSlideRight = {
  hidden: { opacity: 0, x: 16, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
}

const itemScalePop = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(2px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function SwarnaMandap3DInvitation({ inv, onClose }) {
  const [cur, setCur] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [flowersActive, setFlowersActive] = useState(false)

  // Photos
  const [groomPhoto, setGroomPhoto] = useState(inv.photos?.groom || null)
  const [bridePhoto, setBridePhoto] = useState(inv.photos?.bride || null)

  // Touch Swipe Refs for Mobile
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  // Audio Context Ref
  const audioCtxRef = useRef(null)
  const synthNodesRef = useRef(null)

  const pagesCount = 7
  const currentTheme = pageThemes[cur] || pageThemes[0]

  const groomName = inv.groom || 'ચિ. દર્શન'
  const brideName = inv.bride || 'ચિ. ઈશિતા'
  const dateLine = inv.dateLine || 'તા. ૧૩-૦૨-૨૦૨૫, ગુરુવાર'
  const venueName = inv.venue?.name || 'નીલકંઠ ફાર્મ પાર્ટી પ્લોટ'
  const venueLines = inv.venue?.lines || ['જૂનાગઢ બાયપાસ રોડ', 'કાંકરડા ચોકડી, જૂનાગઢ.']

  // Load photos from storage
  useEffect(() => {
    try {
      const g = localStorage.getItem(`wed_mandap_groom_${inv.id}`)
      if (g) setGroomPhoto(g)
      const b = localStorage.getItem(`wed_mandap_bride_${inv.id}`)
      if (b) setBridePhoto(b)
    } catch (e) {}
  }, [inv.id])

  const handlePhotoUpload = (e, type) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const m = 700
        const sc = Math.min(1, m / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = img.width * sc
        canvas.height = img.height * sc
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
        if (type === 'groom') {
          setGroomPhoto(dataUrl)
          try { localStorage.setItem(`wed_mandap_groom_${inv.id}`, dataUrl) } catch (err) {}
        } else {
          setBridePhoto(dataUrl)
          try { localStorage.setItem(`wed_mandap_bride_${inv.id}`, dataUrl) } catch (err) {}
        }
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  const go = (n) => {
    setCur(Math.max(0, Math.min(pagesCount - 1, n)))
  }

  // Mobile Touch Gestures for horizontal swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    const deltaY = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) go(cur + 1)
      else go(cur - 1)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(cur + 1)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(cur - 1)
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [cur])

  // Auto-play / Presentation mode with generous reading time
  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setCur((c) => (c + 1) % pagesCount)
    }, 6500)
    return () => clearInterval(timer)
  }, [autoPlay])

  // Traditional Shehnai & Tanpura Web Audio Synthesizer
  const toggleMusic = () => {
    if (musicPlaying) stopMusic()
    else startMusic()
  }

  const startMusic = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') ctx.resume()

      stopMusic()

      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0.12, ctx.currentTime)
      masterGain.connect(ctx.destination)

      // Tanpura Drone (C#3 / G#3)
      const baseFreq = 138.59
      const freqs = [baseFreq, baseFreq * 1.5, baseFreq * 2]
      const droneNodes = freqs.map((f, i) => {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = i === 0 ? 'sine' : 'triangle'
        osc.frequency.setValueAtTime(f, ctx.currentTime)

        const lfo = ctx.createOscillator()
        const lfoGain = ctx.createGain()
        lfo.frequency.value = 0.25 + i * 0.1
        lfoGain.gain.value = 0.9
        lfo.connect(osc.frequency)
        lfo.start()

        g.gain.setValueAtTime(0.035 / (i + 1), ctx.currentTime)
        osc.connect(g)
        g.connect(masterGain)
        osc.start()
        return { osc, lfo, g }
      })

      // Shehnai Yaman Melody Notes
      const yamanScale = [277.18, 311.13, 349.23, 392.0, 415.3, 466.16, 554.37]
      const phrase = [0, 2, 4, 3, 2, 4, 6, 5, 4, 2, 1, 0, 2, 0]
      let noteIdx = 0

      const playNextNote = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return
        const noteFreq = yamanScale[phrase[noteIdx % phrase.length]]
        noteIdx++

        const noteOsc = ctx.createOscillator()
        const noteGain = ctx.createGain()
        const filter = ctx.createBiquadFilter()

        noteOsc.type = 'sawtooth'
        noteOsc.frequency.setValueAtTime(noteFreq, ctx.currentTime)
        noteOsc.frequency.exponentialRampToValueAtTime(noteFreq * 1.01, ctx.currentTime + 0.3)
        noteOsc.frequency.exponentialRampToValueAtTime(noteFreq, ctx.currentTime + 0.8)

        filter.type = 'bandpass'
        filter.frequency.setValueAtTime(860, ctx.currentTime)
        filter.Q.setValueAtTime(2.6, ctx.currentTime)

        const now = ctx.currentTime
        noteGain.gain.setValueAtTime(0.001, now)
        noteGain.gain.linearRampToValueAtTime(0.065, now + 0.22)
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 1.1)

        noteOsc.connect(filter)
        filter.connect(noteGain)
        noteGain.connect(masterGain)

        noteOsc.start(now)
        noteOsc.stop(now + 1.15)
      }

      const melodyInterval = setInterval(playNextNote, 1250)
      synthNodesRef.current = { droneNodes, masterGain, melodyInterval }
      setMusicPlaying(true)
    } catch (err) {
      console.warn('Audio waiting:', err)
    }
  }

  const stopMusic = () => {
    if (synthNodesRef.current) {
      if (synthNodesRef.current.melodyInterval) clearInterval(synthNodesRef.current.melodyInterval)
      if (synthNodesRef.current.droneNodes) {
        synthNodesRef.current.droneNodes.forEach(({ osc, lfo }) => {
          try { osc.stop(); lfo.stop() } catch (e) {}
        })
      }
      synthNodesRef.current = null
    }
    setMusicPlaying(false)
  }

  useEffect(() => {
    return () => {
      stopMusic()
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close() } catch (e) {}
      }
    }
  }, [])

  // Flower Shower trigger
  const triggerFlowerShower = () => {
    setFlowersActive(true)
    setTimeout(() => setFlowersActive(false), 5500)
  }

  // Calendar .ics download
  const downloadCalendar = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Swarna Elegance Wedding Invitation//GU',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'SUMMARY:શુભ વિવાહ – દર્શન સંગ ઈશિતા (Wedding)',
      'DESCRIPTION:બે હૃદયનું મિલન, બે પરિવારનો સંગમ… આપ સપરિવાર પધારી નવદંપતીને આશીર્વાદ આપશો.',
      'LOCATION:' + venueName + ', જૂનાગઢ',
      'DTSTART:20250212T063000Z',
      'DTEND:20250213T183000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.setAttribute('download', 'wedding-darshan-ishita.ics')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Pre-generated Particles for Background
  const bokehParticles = Array.from({ length: 26 }, (_, i) => ({
    id: i,
    left: `${(i * 13 + 7) % 100}%`,
    top: `${(i * 17 + 5) % 100}%`,
    size: 3 + (i % 5),
    dur: 5.5 + (i % 4) * 1.5,
    delay: -((i * 0.4) % 4),
    opacity: 0.25 + (i % 5) * 0.12,
  }))

  const fallingPetals = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: `${(i * 9 + 4) % 100}%`,
    size: 14 + (i % 12),
    dur: 7.5 + (i % 4) * 1.8,
    delay: -((i * 0.6) % 8),
  }))

  // Decorative SVGs
  const GoldenKalashSVG = (
    <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto drop-shadow-[0_0_8px_rgba(212,175,55,0.7)]" viewBox="0 0 80 80">
      <defs>
        <linearGradient id="kalashGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff3bf" />
          <stop offset="40%" stopColor="#d4af37" />
          <stop offset="80%" stopColor="#8c6d1f" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="22" r="10" fill="#663300" stroke="#d4af37" strokeWidth="1.5" />
      <path d="M40 22 C32 14, 25 18, 22 26 C30 24, 36 24, 40 22 Z" fill="#2d6a4f" stroke="#d4af37" strokeWidth="1" />
      <path d="M40 22 C48 14, 55 18, 58 26 C50 24, 44 24, 40 22 Z" fill="#2d6a4f" stroke="#d4af37" strokeWidth="1" />
      <path d="M40 22 C40 10, 40 10, 40 8 C40 12, 40 18, 40 22 Z" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 26 L52 26 L49 32 L56 46 C58 54, 54 62, 40 62 C26 62, 22 54, 24 46 L31 32 Z" fill="url(#kalashGold)" stroke="#59400f" strokeWidth="1.5" />
      <ellipse cx="40" cy="30" rx="13" ry="3" fill="#ffe066" stroke="#8c6d1f" strokeWidth="1" />
      <g stroke="#990000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M40 40 L40 54 M33 47 L47 47 M40 40 L44 40 M40 54 L36 54 M33 47 L33 43 M47 47 L47 51" />
      </g>
    </svg>
  )

  const RoyalJharokhaArch = (
    <svg className="w-full h-8 sm:h-10" style={{ color: currentTheme.cardBorder, transition: 'color 1.2s ease' }} viewBox="0 0 400 44" preserveAspectRatio="none">
      <path
        d="M0 0 L400 0 L400 8 C360 8, 350 22, 320 22 C290 22, 280 8, 250 8 C230 8, 220 36, 200 42 C180 36, 170 8, 150 8 C120 8, 110 22, 80 22 C50 22, 40 8, 0 8 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="200" cy="20" r="5" fill={currentTheme.cardBorder} />
      <circle cx="200" cy="20" r="2.5" fill="#5c0a1f" />
      <circle cx="80" cy="12" r="3" fill={currentTheme.cardBorder} />
      <circle cx="320" cy="12" r="3" fill={currentTheme.cardBorder} />
    </svg>
  )

  const OrnateMandapCrest = (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-center gap-2 my-1.5 sm:my-2 select-none"
    >
      <span className="h-[1.5px] w-12 sm:w-16" style={{ background: `linear-gradient(to right, transparent, ${currentTheme.cardBorder})`, transition: 'background 1.2s ease' }} />
      <svg className="w-5 h-5 animate-spin" style={{ animationDuration: '36s', color: currentTheme.cardBorder, transition: 'color 1.2s ease' }} viewBox="0 0 40 40">
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse key={i} cx="20" cy="9" rx="2.5" ry="5.5" transform={`rotate(${i * 45} 20 20)`} fill="currentColor" />
        ))}
        <circle cx="20" cy="20" r="4" fill={currentTheme.accentColor} stroke="#fff" strokeWidth="1" />
      </svg>
      <span className="h-[1.5px] w-12 sm:w-16" style={{ background: `linear-gradient(to left, transparent, ${currentTheme.cardBorder})`, transition: 'background 1.2s ease' }} />
    </motion.div>
  )

  return (
    <div
      className="swarna-elegance-root fixed inset-0 z-50 overflow-hidden font-['Hind_Vadodara',sans-serif] select-none flex flex-col justify-between"
      style={{
        background: currentTheme.bg,
        color: currentTheme.inkColor,
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style>{`
        .swarna-elegance-root {
          --gold: #d4af37;
          --gold-light: #fff3c4;
          --gold-dark: #8c6d1f;
          --crimson: #4a0c1f;
          --velvet: #28040f;
          transition: background 1.5s cubic-bezier(0.22, 1, 0.36, 1), color 0.9s ease;
        }

        /* Animated Glowing Aura Rings in Background */
        .bg-aura {
          position: fixed; inset: 0; pointer-events: none; overflow: hidden;
        }
        .aura-circle {
          position: absolute; left: 50%; top: 50%;
          border-radius: 50%;
          transition: border-color 1.5s ease, box-shadow 1.5s ease;
          animation: auraFloat 34s ease-in-out infinite alternate;
        }
        @keyframes auraFloat {
          0% { transform: translate(-50%, -50%) scale(0.95) rotate(0deg); }
          100% { transform: translate(-50%, -50%) scale(1.08) rotate(180deg); }
        }

        /* Floating background bokeh dots */
        .bokeh-dot {
          position: absolute; border-radius: 50%;
          animation: bokehFloat linear infinite alternate;
          transition: background 1.5s ease;
        }
        @keyframes bokehFloat {
          0% { transform: translateY(0px) scale(0.8); opacity: 0.2; }
          100% { transform: translateY(-35px) scale(1.2); opacity: 0.7; }
        }

        /* Ambient floating flower petals */
        .bg-petal {
          position: absolute; pointer-events: none; border-radius: 0 100% 0 100%;
          animation: petalDrift linear infinite;
        }
        @keyframes petalDrift {
          0% { transform: translateY(-40px) rotate(0deg); opacity: 0; }
          15% { opacity: 0.75; }
          85% { opacity: 0.75; }
          100% { transform: translateY(105vh) rotate(420deg); opacity: 0; }
        }

        /* Luxury Gold Foil Typography */
        .elegance-foil {
          background: linear-gradient(105deg, #996e1a 15%, #ffd966 45%, #996e1a 75%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: foilSheen 8s linear infinite;
          font-family: 'Noto Serif Gujarati', serif;
        }
        @keyframes foilSheen {
          to { background-position: -250% 0; }
        }

        /* Dynamic Card Inner Borders */
        .elegance-card::before {
          content: "";
          position: absolute; inset: 7px;
          border: 1.5px solid var(--card-border-inner, rgba(212, 175, 55, 0.75));
          border-radius: 18px;
          pointer-events: none;
          z-index: 5;
          transition: border-color 1.2s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .elegance-card::after {
          content: "";
          position: absolute; inset: 10px;
          border: 1px dashed var(--card-border-dashed, rgba(212, 175, 55, 0.4));
          border-radius: 15px;
          pointer-events: none;
          z-index: 5;
          transition: border-color 1.2s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Hanging Garlands swaying gently */
        .garland {
          transform-origin: top center;
          animation: garlandSway 8s ease-in-out infinite alternate;
        }
        @keyframes garlandSway {
          from { transform: rotate(-2.5deg); }
          to { transform: rotate(2.5deg); }
        }

        /* Gentle pulse animation for sacred icons */
        @keyframes gentleGlow {
          0%, 100% { opacity: 0.88; transform: scale(1); filter: drop-shadow(0 0 4px rgba(212, 175, 55, 0.4)); }
          50% { opacity: 1; transform: scale(1.06); filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.8)); }
        }
        .gentle-pulse {
          animation: gentleGlow 4s ease-in-out infinite;
        }

        /* Interactive Detail Item hover & entrance micro-animations */
        .detail-item-box {
          transition: transform 0.4s ease, box-shadow 0.4s ease, background 0.9s ease, border-color 0.9s ease;
        }
        .detail-item-box:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
        }
      `}</style>

      {/* Dynamic Animated Atmospheric Background (Theme changes per page) */}
      <div className="bg-aura">
        <div
          className="aura-circle"
          style={{
            width: '85vmin',
            height: '85vmin',
            borderColor: currentTheme.aura,
            boxShadow: `0 0 70px ${currentTheme.ambientGlow}`,
          }}
        />
        <div
          className="aura-circle"
          style={{
            width: '60vmin',
            height: '60vmin',
            borderColor: currentTheme.aura,
            animationDuration: '40s',
          }}
        />
        <div
          className="aura-circle"
          style={{
            width: '110vmin',
            height: '110vmin',
            borderColor: currentTheme.aura,
            animationDuration: '55s',
          }}
        />

        {bokehParticles.map((b) => (
          <span
            key={b.id}
            className="bokeh-dot"
            style={{
              left: b.left,
              top: b.top,
              width: `${b.size}px`,
              height: `${b.size}px`,
              background: currentTheme.bokehColor,
              animationDuration: `${b.dur}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}

        {fallingPetals.map((p) => (
          <span
            key={p.id}
            className="bg-petal"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size * 1.3}px`,
              background: `radial-gradient(ellipse at 30% 30%, #fff, ${currentTheme.petalColor})`,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Hanging Decorative Torans on Top */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-20 flex justify-around opacity-80">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="garland flex flex-col items-center" style={{ animationDelay: `${i * 0.4}s` }}>
            <div className="w-1 h-6 sm:h-9 bg-gradient-to-b from-[#d4af37] to-[#e68a00]" />
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#e68a00] border border-[#d4af37] shadow-[0_0_8px_#e68a00]" />
            <div className="w-3 h-3 rounded-full bg-[#ffd000] border border-[#d4af37] mt-0.5" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#b81431] mt-0.5" />
            <div className="w-2 h-3.5 bg-[#d4af37] mt-0.5 rounded-b-full" />
          </div>
        ))}
      </div>

      {/* Top Header Bar */}
      <header className="relative z-40 flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-full border border-[#d4af37]/60 bg-[#1e050d]/80 px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-bold text-[#fce08a] shadow-lg backdrop-blur hover:bg-[#340917] active:scale-95 transition"
          >
            <span>← પાછા જાઓ</span>
          </button>
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#fce08a]/90 bg-[#28040f]/70 px-3 py-1 rounded-full border border-[#d4af37]/30">
            <span>✨ {currentTheme.title}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Flower Shower Button */}
          <button
            onClick={triggerFlowerShower}
            title="પુષ્પવૃષ્ટિ"
            className="flex items-center gap-1 rounded-full border border-[#d4af37]/60 bg-[#28040f]/85 px-3 py-1 sm:py-1.5 text-xs font-bold text-[#fce08a] shadow-md hover:bg-[#46091e] active:scale-95 transition"
          >
            <span>🌸</span>
            <span className="hidden sm:inline">પુષ્પવૃષ્ટિ</span>
          </button>

          {/* Music Toggle */}
          <button
            onClick={toggleMusic}
            title={musicPlaying ? 'સંગીત બંધ કરો' : 'શરણાઈ સંગીત ચાલુ કરો'}
            className="flex items-center gap-1 rounded-full border border-[#d4af37]/60 bg-[#28040f]/85 px-3 py-1 sm:py-1.5 text-xs font-bold text-[#fce08a] shadow-md hover:bg-[#46091e] active:scale-95 transition"
          >
            <span>{musicPlaying ? '🎵' : '🔇'}</span>
            <span className="hidden sm:inline">{musicPlaying ? 'શરણાઈ ચાલુ' : 'સંગીત'}</span>
            {musicPlaying && (
              <span className="flex items-end gap-0.5 h-3 ml-0.5">
                <span className="w-0.5 h-full bg-[#fce08a] animate-pulse" />
                <span className="w-0.5 h-2 bg-[#fce08a] animate-ping" />
              </span>
            )}
          </button>

          {/* Auto-Play Toggle */}
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            title="ઓટો પ્લે સ્લાઇડશો"
            className={`flex items-center gap-1 rounded-full border px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-bold transition shadow ${
              autoPlay
                ? 'border-emerald-400 bg-emerald-950/80 text-emerald-300 animate-pulse'
                : 'border-[#d4af37]/60 bg-[#28040f]/85 text-[#fce08a] hover:bg-[#46091e]'
            }`}
          >
            <span>{autoPlay ? '⏸ થોભો' : '▶ પ્લે'}</span>
          </button>
        </div>
      </header>

      {/* Main Luxury Animated Card Container - Dynamic Card Background per theme & Silky Smooth Motion */}
      <main className="relative z-30 flex-1 flex items-center justify-center p-3 sm:p-5 overflow-hidden">
        <div
          className="relative w-full max-w-[400px] h-[75vh] sm:h-[80vh] max-h-[640px] rounded-3xl border-2 sm:border-3 ring-4 ring-[#1b030b] flex flex-col justify-between overflow-hidden elegance-card transition-all duration-1000"
          style={{
            borderColor: currentTheme.cardBorder,
            color: currentTheme.inkColor,
            boxShadow: `0 0 35px ${currentTheme.ambientGlow}, 0 20px 60px rgba(0,0,0,0.85)`,
            '--card-border-inner': currentTheme.cardBorderInner,
            '--card-border-dashed': currentTheme.cardBorderDashed,
          }}
        >
          {/* Animated Cross-fading Card Background Layer (Truly dynamic per ceremony theme!) */}
          <AnimatePresence>
            <motion.div
              key={`card-bg-${cur}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                background: currentTheme.cardBg,
              }}
            />
          </AnimatePresence>

          {/* Subtle Rotating Sacred Mandala Watermark */}
          <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-10 overflow-hidden">
            <svg
              className="w-72 h-72 animate-spin select-none"
              style={{
                animationDuration: '65s',
                color: currentTheme.accentColor,
                transition: 'color 1.2s ease',
              }}
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" strokeWidth="0.8" />
              {Array.from({ length: 12 }, (_, i) => (
                <ellipse key={i} cx="50" cy="22" rx="4" ry="12" transform={`rotate(${i * 30} 50 50)`} />
              ))}
              {Array.from({ length: 12 }, (_, i) => (
                <circle key={`c-${i}`} cx="50" cy="14" r="2" transform={`rotate(${i * 30} 50 50)`} />
              ))}
            </svg>
          </div>

          {/* Ornate Rajputana Arch at Card Top */}
          <div className="relative z-10 pt-2 px-3 text-center">
            {RoyalJharokhaArch}
          </div>

          {/* Animated Card Body with Framer Motion (Silky smooth, gentle leisurely easing) */}
          <div className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-6 py-2 scrollbar-none flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={cur}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="my-auto text-center"
              >
                {/* PAGE 1: ॐ શ્રી ગણેશાય નમઃ & COUPLE REVEAL */}
                {cur === 0 && (
                  <div>
                    <motion.div variants={itemScalePop} className="text-3xl filter drop-shadow gentle-pulse" style={{ color: currentTheme.cardBorder }}>
                      ॐ
                    </motion.div>
                    <motion.p variants={itemFadeUp} className="font-['Noto_Serif_Gujarati',serif] text-xs sm:text-sm font-semibold mt-1 leading-relaxed" style={{ color: currentTheme.accentColor }}>
                      વક્રતુંડ મહાકાય, સૂર્યકોટિ સમપ્રભ ।<br />
                      નિર્વિઘ્નં કુરુ મે દેવ, સર્વકાર્યેષુ સર્વદા ॥
                    </motion.p>

                    <motion.h2 variants={itemFadeUp} className="elegance-foil text-2xl sm:text-3xl font-extrabold mt-1">
                      શુભ વિવાહ
                    </motion.h2>
                    {OrnateMandapCrest}

                    {/* Interactive Photo Upload Frames with Smooth Staggered Slide In */}
                    <motion.div variants={itemFadeUp} className="flex items-center justify-center gap-3 my-2">
                      {/* Groom Photo Frame */}
                      <motion.div variants={itemSlideLeft} className="flex flex-col items-center">
                        <label
                          className="relative w-22 h-30 sm:w-26 sm:h-34 rounded-t-[2.8rem] rounded-b-xl overflow-hidden border-2 shadow-[0_6px_16px_rgba(0,0,0,0.22)] ring-2 ring-[#d4af37]/40 cursor-pointer group transition-all duration-700"
                          style={{
                            borderColor: currentTheme.cardBorder,
                            background: 'linear-gradient(to bottom, #fef3c7, #fde68a)',
                          }}
                        >
                          {groomPhoto ? (
                            <img src={groomPhoto} alt="Groom" className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center" style={{ color: currentTheme.accentColor }}>
                              <span className="text-3xl">🤵</span>
                              <span className="text-[0.62rem] font-bold mt-0.5">ફોટો ઉમેરો</span>
                            </div>
                          )}
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, 'groom')} />
                        </label>
                        <span className="elegance-foil text-sm sm:text-base font-bold mt-1">{groomName}</span>
                        <span className="text-[0.65rem] font-bold" style={{ color: currentTheme.accentColor }}>(વરરાજા)</span>
                      </motion.div>

                      <motion.div variants={itemScalePop} className="flex flex-col items-center px-1">
                        <span className="text-rose-600 text-xl gentle-pulse">♥</span>
                        <span className="font-['Noto_Serif_Gujarati',serif] text-xs font-bold" style={{ color: currentTheme.accentColor }}>સંગ</span>
                      </motion.div>

                      {/* Bride Photo Frame */}
                      <motion.div variants={itemSlideRight} className="flex flex-col items-center">
                        <label
                          className="relative w-22 h-30 sm:w-26 sm:h-34 rounded-t-[2.8rem] rounded-b-xl overflow-hidden border-2 shadow-[0_6px_16px_rgba(0,0,0,0.22)] ring-2 ring-[#d4af37]/40 cursor-pointer group transition-all duration-700"
                          style={{
                            borderColor: currentTheme.cardBorder,
                            background: 'linear-gradient(to bottom, #fef3c7, #fde68a)',
                          }}
                        >
                          {bridePhoto ? (
                            <img src={bridePhoto} alt="Bride" className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center" style={{ color: currentTheme.accentColor }}>
                              <span className="text-3xl">👰</span>
                              <span className="text-[0.62rem] font-bold mt-0.5">ફોટો ઉમેરો</span>
                            </div>
                          )}
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, 'bride')} />
                        </label>
                        <span className="elegance-foil text-sm sm:text-base font-bold mt-1">{brideName}</span>
                        <span className="text-[0.65rem] font-bold" style={{ color: currentTheme.accentColor }}>(કન્યા)</span>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      variants={itemScalePop}
                      className="mt-1.5 inline-block rounded-full border px-3.5 py-0.5 text-xs font-bold transition-all duration-800"
                      style={{
                        background: currentTheme.badgeBg,
                        borderColor: currentTheme.badgeBorder,
                        color: currentTheme.badgeText,
                      }}
                    >
                      {dateLine}
                    </motion.div>

                    <motion.div variants={itemFadeUp} className="mt-2 text-[0.72rem] font-medium leading-relaxed" style={{ color: currentTheme.inkColor }}>
                      <span className="font-bold block text-xs" style={{ color: currentTheme.accentColor }}>નિમંત્રક :</span>
                      {inv.inviters?.map((line, lidx) => (
                        <span key={lidx} className="block">{line}</span>
                      )) || 'શ્રી ………………………… પરિવાર, સુરત'}
                    </motion.div>
                  </div>
                )}

                {/* PAGE 2: વિવાહ સંસ્કાર (Formal Announcement) */}
                {cur === 1 && (
                  <div>
                    <motion.div variants={itemScalePop}>
                      {GoldenKalashSVG}
                    </motion.div>
                    <motion.span variants={itemFadeUp} className="text-xs font-bold tracking-widest uppercase mt-1 block" style={{ color: currentTheme.accentColor }}>
                      ॥ માંગલ્યમ્ ॥
                    </motion.span>
                    <motion.h2 variants={itemFadeUp} className="elegance-foil text-2xl sm:text-3xl font-extrabold mt-1">
                      વિવાહ સંસ્કાર
                    </motion.h2>
                    {OrnateMandapCrest}

                    <motion.p variants={itemFadeUp} className="font-['Noto_Serif_Gujarati',serif] text-xs sm:text-sm leading-relaxed mt-2" style={{ color: currentTheme.inkColor }}>
                      સ્નેહીશ્રી, આપ સર્વેને જણાવતાં અત્યંત હર્ષ થાય છે કે અમારા પરિવારના ચિરંજીવી
                    </motion.p>

                    <motion.div
                      variants={itemScalePop}
                      className="detail-item-box my-3 p-3.5 rounded-2xl border shadow-inner transition-all duration-800"
                      style={{
                        background: currentTheme.detailBg,
                        borderColor: currentTheme.detailBorder,
                      }}
                    >
                      <div className="elegance-foil text-xl sm:text-2xl font-black">{groomName}</div>
                      <div className="text-xs font-bold my-1" style={{ color: currentTheme.accentColor }}>સંગે પ્રભુતામાં પગલાં પાડશે</div>
                      <div className="elegance-foil text-xl sm:text-2xl font-black">{brideName}</div>
                    </motion.div>

                    <motion.p variants={itemFadeUp} className="font-['Noto_Serif_Gujarati',serif] text-xs sm:text-sm leading-relaxed" style={{ color: currentTheme.inkColor }}>
                      બે હૃદયનું મિલન, બે પરિવારનો સંગમ…<br />
                      આપ સપરિવાર પધારી નવદંપતીને સ્નેહભર્યા આશીર્વાદ આપી અમારા આનંદમાં વધારો કરશો એવી નમ્ર વિનંતી સહ આમંત્રણ.
                    </motion.p>

                    <motion.div variants={itemFadeUp} className="mt-3 flex items-center justify-center gap-2 text-xs font-bold" style={{ color: currentTheme.accentColor }}>
                      <span>🎺</span>
                      <span>મંગલમ્ ભગવાન વિષ્ણુ, મંગલમ્ ગરુડધ્વજ</span>
                      <span>🥁</span>
                    </motion.div>
                  </div>
                )}

                {/* PAGE 3: દિવસ ૧ (હલ્દી, મંડપ મુહૂર્ત, રાસ-ગરબા) */}
                {cur === 2 && (
                  <div>
                    <motion.span variants={itemFadeUp} className="text-xs font-bold tracking-wider" style={{ color: currentTheme.accentColor }}>
                      શુભ માંગલિક પ્રસંગો
                    </motion.span>
                    <motion.h2 variants={itemFadeUp} className="elegance-foil text-2xl font-extrabold mt-0.5">
                      દિવસ ૧ : રસમ & ગરબા
                    </motion.h2>
                    <motion.div
                      variants={itemScalePop}
                      className="inline-block mt-0.5 px-3 py-0.5 rounded-full border text-xs font-bold transition-all duration-800"
                      style={{
                        background: currentTheme.badgeBg,
                        borderColor: currentTheme.badgeBorder,
                        color: currentTheme.badgeText,
                      }}
                    >
                      બુધવાર, તા. ૧૨-૦૨-૨૦૨૫
                    </motion.div>
                    {OrnateMandapCrest}

                    <div className="space-y-2.5 text-left mt-2">
                      <motion.div
                        variants={itemSlideLeft}
                        className="detail-item-box p-2.5 sm:p-3 rounded-xl border-l-4 shadow-xs"
                        style={{
                          background: currentTheme.detailBg,
                          borderColor: currentTheme.detailBorder,
                          borderLeftColor: '#ca8a04',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs sm:text-sm flex items-center gap-1" style={{ color: currentTheme.inkColor }}>
                            <span>🟡</span> હલ્દી રસમ (પીઠી ઉત્સવ)
                          </span>
                          <span className="text-[0.7rem] font-extrabold" style={{ color: currentTheme.accentColor }}>બપોરે ૧૨:૦૦ કલાકે</span>
                        </div>
                        <p className="text-[0.7rem] mt-0.5" style={{ color: currentTheme.inkColor, opacity: 0.85 }}>સ્વરુચી ભોજન સહ પીઠી ચોળવાનો માંગલિક ઉત્સવ</p>
                      </motion.div>

                      <motion.div
                        variants={itemSlideRight}
                        className="detail-item-box p-2.5 sm:p-3 rounded-xl border-l-4 shadow-xs"
                        style={{
                          background: currentTheme.detailBg,
                          borderColor: currentTheme.detailBorder,
                          borderLeftColor: '#a16207',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs sm:text-sm flex items-center gap-1" style={{ color: currentTheme.inkColor }}>
                            <span>🛕</span> મંડપ મુહૂર્ત & ગણેશ
                          </span>
                          <span className="text-[0.7rem] font-extrabold" style={{ color: currentTheme.accentColor }}>શુભ મુહૂર્તે</span>
                        </div>
                        <p className="text-[0.7rem] mt-0.5" style={{ color: currentTheme.inkColor, opacity: 0.85 }}>સ્થળ : {venueName}</p>
                      </motion.div>

                      <motion.div
                        variants={itemSlideLeft}
                        className="detail-item-box p-2.5 sm:p-3 rounded-xl border-l-4 shadow-xs"
                        style={{
                          background: currentTheme.detailBg,
                          borderColor: currentTheme.detailBorder,
                          borderLeftColor: '#b91c1c',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs sm:text-sm flex items-center gap-1" style={{ color: currentTheme.inkColor }}>
                            <span>💃</span> પ્રેમ રાસ & ગરબા
                          </span>
                          <span className="text-[0.7rem] font-extrabold text-red-700">સાંજે ૯:૦૦ કલાકે</span>
                        </div>
                        <p className="text-[0.7rem] mt-0.5" style={{ color: currentTheme.inkColor, opacity: 0.85 }}>ઢોલના ધબકારે અને દાંડિયાની રમઝટ સાથે રાસ-ગરબા</p>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* PAGE 4: દિવસ ૨ (જાન પ્રસ્થાન, હસ્તમેળાપ, ભોજન) */}
                {cur === 3 && (
                  <div>
                    <motion.span variants={itemFadeUp} className="text-xs font-bold tracking-wider" style={{ color: currentTheme.accentColor }}>
                      પરમ પાવન ઘડી
                    </motion.span>
                    <motion.h2 variants={itemFadeUp} className="elegance-foil text-2xl font-extrabold mt-0.5">
                      દિવસ ૨ : શુભ વિવાહ
                    </motion.h2>
                    <motion.div
                      variants={itemScalePop}
                      className="inline-block mt-0.5 px-3 py-0.5 rounded-full border text-xs font-bold transition-all duration-800"
                      style={{
                        background: currentTheme.badgeBg,
                        borderColor: currentTheme.badgeBorder,
                        color: currentTheme.badgeText,
                      }}
                    >
                      ગુરુવાર, તા. ૧૩-૦૨-૨૦૨૫
                    </motion.div>
                    {OrnateMandapCrest}

                    <div className="space-y-2.5 text-left mt-2">
                      <motion.div
                        variants={itemSlideLeft}
                        className="detail-item-box p-2.5 sm:p-3 rounded-xl border-l-4 shadow-xs"
                        style={{
                          background: currentTheme.detailBg,
                          borderColor: currentTheme.detailBorder,
                          borderLeftColor: '#e11d48',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs sm:text-sm flex items-center gap-1" style={{ color: currentTheme.inkColor }}>
                            <span>🐎</span> જાન પ્રસ્થાન (શાહી બારાત)
                          </span>
                          <span className="text-[0.7rem] font-extrabold" style={{ color: currentTheme.accentColor }}>બપોરે ૨:૩૦ કલાકે</span>
                        </div>
                        <p className="text-[0.7rem] mt-0.5" style={{ color: currentTheme.inkColor, opacity: 0.85 }}>વરઘોડા સહ શુભ જાન પ્રસ્થાન</p>
                      </motion.div>

                      <motion.div
                        variants={itemSlideRight}
                        className="detail-item-box p-2.5 sm:p-3 rounded-xl border-l-4 shadow-xs"
                        style={{
                          background: currentTheme.detailBg,
                          borderColor: currentTheme.detailBorder,
                          borderLeftColor: '#d97706',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs sm:text-sm flex items-center gap-1" style={{ color: currentTheme.inkColor }}>
                            <span>💍</span> હસ્તમેળાપ & સપ્તપદી
                          </span>
                          <span className="text-[0.7rem] font-extrabold" style={{ color: currentTheme.accentColor }}>શુભ ચોઘડિયે</span>
                        </div>
                        <p className="text-[0.7rem] mt-0.5" style={{ color: currentTheme.inkColor, opacity: 0.85 }}>અગ્નિ સાક્ષીએ પવિત્ર મંગલ ફેરા & સિંદૂર દાન</p>
                      </motion.div>

                      <motion.div
                        variants={itemSlideLeft}
                        className="detail-item-box p-2.5 sm:p-3 rounded-xl border-l-4 shadow-xs"
                        style={{
                          background: currentTheme.detailBg,
                          borderColor: currentTheme.detailBorder,
                          borderLeftColor: '#059669',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs sm:text-sm flex items-center gap-1" style={{ color: currentTheme.inkColor }}>
                            <span>🍽️</span> પ્રીતિ ભોજન સમારંભ
                          </span>
                          <span className="text-[0.7rem] font-extrabold text-emerald-800">સાંજે ૭:૦૦ થી…</span>
                        </div>
                        <p className="text-[0.7rem] mt-0.5" style={{ color: currentTheme.inkColor, opacity: 0.85 }}>સ્થળ : {venueName}</p>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* PAGE 5: શુભ સ્થળ દર્શન (Venue, Maps, Calendar) */}
                {cur === 4 && (
                  <div>
                    <motion.span variants={itemFadeUp} className="text-xs font-bold tracking-wider" style={{ color: currentTheme.accentColor }}>
                      શુભ મંગલ સ્થળ
                    </motion.span>
                    <motion.h2 variants={itemFadeUp} className="elegance-foil text-2xl font-extrabold mt-0.5">
                      શુભ સ્થળ દર્શન
                    </motion.h2>
                    {OrnateMandapCrest}

                    <motion.div
                      variants={itemScalePop}
                      className="detail-item-box p-3.5 sm:p-4 rounded-2xl border shadow-sm my-3 transition-all duration-800"
                      style={{
                        background: currentTheme.detailBg,
                        borderColor: currentTheme.detailBorder,
                      }}
                    >
                      <span className="text-3xl">🏛️</span>
                      <h3 className="elegance-foil text-base sm:text-lg font-bold mt-1">{venueName}</h3>
                      <p className="text-xs sm:text-sm font-medium mt-1" style={{ color: currentTheme.inkColor }}>
                        {venueLines.join(', ')}
                      </p>
                    </motion.div>

                    <motion.div variants={itemFadeUp} className="grid grid-cols-2 gap-2 mt-3">
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(venueName + ' ' + venueLines.join(' '))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-600 bg-emerald-700 text-white px-3 py-2.5 text-xs font-bold shadow hover:bg-emerald-800 active:scale-95 transition"
                      >
                        <span>📍</span>
                        <span>ગૂગલ મેપ્સ</span>
                      </a>

                      <button
                        onClick={downloadCalendar}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-amber-600 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-3 py-2.5 text-xs font-bold shadow hover:opacity-90 active:scale-95 transition cursor-pointer"
                      >
                        <span>📅</span>
                        <span>કેલેન્ડર સેવ</span>
                      </button>
                    </motion.div>

                    <motion.p variants={itemFadeUp} className="text-[0.72rem] font-semibold mt-4" style={{ color: currentTheme.accentColor }}>
                      આપની પધરામણી અમારા માટે પરમ આનંદ અને સૌભાગ્ય સમાન છે.
                    </motion.p>
                  </div>
                )}

                {/* PAGE 6: કુટુંબ સ્નેહ – લિ. સ્નેહાધીન & દર્શનાભિલાષી */}
                {cur === 5 && (
                  <div>
                    <motion.span variants={itemFadeUp} className="text-xs font-bold tracking-wider" style={{ color: currentTheme.accentColor }}>
                      સમસ્ત સ્નેહી સ્વજન
                    </motion.span>
                    <motion.h2 variants={itemFadeUp} className="elegance-foil text-2xl font-extrabold mt-0.5">
                      કુટુંબ સ્નેહ
                    </motion.h2>
                    {OrnateMandapCrest}

                    <motion.div variants={itemFadeUp} className="grid grid-cols-2 gap-2.5 text-left my-2.5">
                      <motion.div
                        variants={itemSlideLeft}
                        className="detail-item-box p-2.5 sm:p-3 rounded-xl border"
                        style={{
                          background: currentTheme.detailBg,
                          borderColor: currentTheme.detailBorder,
                        }}
                      >
                        <span className="font-bold text-[0.72rem] block mb-1" style={{ color: currentTheme.accentColor }}>લિ. સ્નેહાધીન :</span>
                        <ul className="text-[0.68rem] space-y-0.5" style={{ color: currentTheme.inkColor }}>
                          {inv.family?.sneh?.map((m, sidx) => (
                            <li key={sidx}>• {m}</li>
                          )) || (
                            <>
                              <li>• શ્રી …………………… પરિવાર</li>
                              <li>• શ્રી …………………… પરિવાર</li>
                            </>
                          )}
                        </ul>
                      </motion.div>

                      <motion.div
                        variants={itemSlideRight}
                        className="detail-item-box p-2.5 sm:p-3 rounded-xl border"
                        style={{
                          background: currentTheme.detailBg,
                          borderColor: currentTheme.detailBorder,
                        }}
                      >
                        <span className="font-bold text-[0.72rem] block mb-1" style={{ color: currentTheme.accentColor }}>લિ. દર્શનાભિલાષી :</span>
                        <ul className="text-[0.68rem] space-y-0.5" style={{ color: currentTheme.inkColor }}>
                          {inv.family?.darshan?.map((m, sidx) => (
                            <li key={sidx}>• {m}</li>
                          )) || (
                            <>
                              <li>• શ્રી …………………… પરિવાર</li>
                              <li>• શ્રી …………………… પરિવાર</li>
                            </>
                          )}
                        </ul>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      variants={itemFadeUp}
                      className="detail-item-box p-2.5 rounded-xl border text-left text-[0.72rem] space-y-1"
                      style={{
                        background: currentTheme.detailBg,
                        borderColor: currentTheme.detailBorder,
                      }}
                    >
                      <div><b style={{ color: currentTheme.accentColor }}>મોસાળ પક્ષ :</b> {inv.family?.mosal?.join(', ') || 'શ્રી …………………… પરિવાર'}</div>
                      <div><b style={{ color: currentTheme.accentColor }}>બાણેજ પક્ષ :</b> {inv.family?.banej?.join(', ') || 'પરમ, જાનવી, પ્રિયંક, વિધ્યા'}</div>
                      <div><b style={{ color: currentTheme.accentColor }}>ફર્મ :</b> {inv.family?.firm?.join(', ') || '………………………… ઈન્ડસ્ટ્રીઝ'}</div>
                    </motion.div>
                  </div>
                )}

                {/* PAGE 7: મધુર કલરવ – સ્નેહ આશીર્વાદ */}
                {cur === 6 && (
                  <div>
                    <motion.span variants={itemFadeUp} className="text-xs font-bold tracking-wider" style={{ color: currentTheme.accentColor }}>
                      પાવન સ્નેહ આશીર્વાદ
                    </motion.span>
                    <motion.h2 variants={itemFadeUp} className="elegance-foil text-2xl font-extrabold mt-0.5">
                      મધુર કલરવ
                    </motion.h2>
                    {OrnateMandapCrest}

                    <motion.div
                      variants={itemScalePop}
                      className="detail-item-box my-3.5 p-4 rounded-2xl border shadow-sm space-y-3"
                      style={{
                        background: currentTheme.detailBg,
                        borderColor: currentTheme.detailBorder,
                      }}
                    >
                      <span className="text-3xl">🕊️</span>
                      <p className="font-['Noto_Serif_Gujarati',serif] text-xs sm:text-sm leading-relaxed" style={{ color: currentTheme.inkColor }}>
                        લગ્નના શુભ પ્રસંગે પ્રેમ અને સ્નેહની લાગણીઓ સાથે આપ સૌની હાજરી અમારા માટે અમૂલ્ય આશીર્વાદ સમાન છે.
                      </p>
                      <p className="font-['Noto_Serif_Gujarati',serif] text-xs sm:text-sm font-semibold leading-relaxed" style={{ color: currentTheme.accentColor }}>
                        બે હૃદયનું મિલન, બે પરિવારનો સંગમ…<br />
                        આપની હાજરી અમારા આનંદનો ઉત્સવ બનાવશે.
                      </p>
                    </motion.div>

                    <motion.div
                      variants={itemFadeUp}
                      className="detail-item-box mt-3.5 p-3 rounded-2xl border text-center shadow-xs"
                      style={{
                        background: currentTheme.badgeBg,
                        borderColor: currentTheme.badgeBorder,
                      }}
                    >
                      <span className="text-sm font-bold font-['Noto_Serif_Gujarati',serif] block" style={{ color: currentTheme.accentColor }}>
                        પધારશો જ, એવી નમ્ર અપેક્ષા સહ.
                      </span>
                      <span className="text-xs font-semibold mt-1 block" style={{ color: currentTheme.inkColor, opacity: 0.85 }}>
                        – લિ. આપના સ્નેહીજન સૌ પરિવાર
                      </span>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Card Footer Indicator */}
          <div
            className="relative z-10 px-5 py-2.5 border-t flex items-center justify-between text-[0.68rem] font-bold transition-all duration-1000"
            style={{
              borderColor: currentTheme.detailBorder,
              color: currentTheme.accentColor,
            }}
          >
            <span>પાન {cur + 1} / {pagesCount}</span>
            <span className="font-semibold">✨ રોયલ પરિણય</span>
            <span>{groomName.replace('ચિ. ', '')} & {brideName.replace('ચિ. ', '')}</span>
          </div>
        </div>
      </main>

      {/* Floating Bottom Navigation Bar */}
      <footer className="relative z-40 flex items-center justify-center gap-3 px-4 pb-3 sm:pb-4 pt-1">
        {/* Prev Button */}
        <button
          onClick={() => go(cur - 1)}
          disabled={cur === 0}
          aria-label="Previous Page"
          className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-[#d4af37] bg-[#1a030c]/90 text-lg font-bold text-[#ffd966] shadow-lg backdrop-blur transition disabled:opacity-25 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
        >
          ‹
        </button>

        {/* Quick Card Dots Navigation with Animated Indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-[#17020a]/85 px-3 py-2 rounded-full border border-[#d4af37]/40 backdrop-blur-md shadow-lg">
          {Array.from({ length: pagesCount }, (_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to page ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                i === cur
                  ? 'w-7 sm:w-8 shadow-md'
                  : 'w-2.5 bg-white/30 hover:bg-white/60'
              }`}
              style={{
                background: i === cur ? `linear-gradient(to right, #ffd966, ${currentTheme.cardBorder})` : undefined,
                boxShadow: i === cur ? `0 0 10px ${currentTheme.cardBorder}` : undefined,
              }}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => go(cur + 1)}
          disabled={cur === pagesCount - 1}
          aria-label="Next Page"
          className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-[#d4af37] bg-[#1a030c]/90 text-lg font-bold text-[#ffd966] shadow-lg backdrop-blur transition disabled:opacity-25 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
        >
          ›
        </button>
      </footer>
    </div>
  )
}
