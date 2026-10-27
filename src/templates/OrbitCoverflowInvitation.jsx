import { useState, useEffect, useRef, useCallback } from 'react'

export default function OrbitCoverflowInvitation({ inv, onClose }) {
  const pagesCount = 8
  const [cur, setCur] = useState(0)
  const [curFloat, setCurFloat] = useState(0)
  const [tilt, setTilt] = useState({ mx: 0, my: 0, tx: 0, ty: 0, sx: '50%', sy: '40%' })
  const [groomPhoto, setGroomPhoto] = useState(inv.photos?.groom || null)
  const [bridePhoto, setBridePhoto] = useState(inv.photos?.bride || null)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [scrollHint, setScrollHint] = useState(true)

  const audioControllerRef = useRef(null)
  const targetPosRef = useRef(0)
  const currentPosRef = useRef(0)
  const isDraggingRef = useRef(false)
  const touchStartYRef = useRef(0)
  const touchStartXRef = useRef(0)
  const lastTouchTimeRef = useRef(0)
  const snapTimeoutRef = useRef(null)
  const animFrameRef = useRef(null)

  const groomName = inv.groom || 'ચિ. દર્શન'
  const brideName = inv.bride || 'ચિ. ઈશિતા'
  const dateLine = inv.dateLine || 'તા. ૧૩-૦૨-૨૦૨૫, ગુરુવાર'
  const venueName = inv.venue?.name || 'નીલકંઠ ફાર્મ પાર્ટી પ્લોટ'
  const venueLines = inv.venue?.lines || ['જૂનાગઢ બાયપાસ રોડ', 'કાંકરડા ચોકડી, જૂનાગઢ.']

  // Load photos from localStorage
  useEffect(() => {
    try {
      const g = localStorage.getItem(`wed_orbit_groom_${inv.id}`)
      if (g) setGroomPhoto(g)
      const b = localStorage.getItem(`wed_orbit_bride_${inv.id}`)
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
          try { localStorage.setItem(`wed_orbit_groom_${inv.id}`, dataUrl) } catch (err) {}
        } else {
          setBridePhoto(dataUrl)
          try { localStorage.setItem(`wed_orbit_bride_${inv.id}`, dataUrl) } catch (err) {}
        }
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  // Smooth Spring Loop for Scroll & Navigation
  const startSpringLoop = useCallback(() => {
    if (animFrameRef.current) return

    const loop = () => {
      const diff = targetPosRef.current - currentPosRef.current
      if (Math.abs(diff) > 0.001) {
        currentPosRef.current += diff * 0.16
        setCurFloat(currentPosRef.current)
        const rounded = Math.round(currentPosRef.current)
        setCur(Math.max(0, Math.min(pagesCount - 1, rounded)))
        animFrameRef.current = requestAnimationFrame(loop)
      } else {
        currentPosRef.current = targetPosRef.current
        setCurFloat(targetPosRef.current)
        setCur(targetPosRef.current)
        animFrameRef.current = null
      }
    }
    animFrameRef.current = requestAnimationFrame(loop)
  }, [pagesCount])

  const goToPage = useCallback((index) => {
    const target = Math.max(0, Math.min(pagesCount - 1, index))
    targetPosRef.current = target
    setScrollHint(false)
    startSpringLoop()
  }, [pagesCount, startSpringLoop])

  // Mouse Wheel / Trackpad Scroll Navigation
  useEffect(() => {
    let wheelAcc = 0
    let lastWheelTime = 0

    const handleWheel = (e) => {
      // Don't intercept if scrolling inside an overflowable card element if any
      const targetCard = e.target.closest('.card-inner-scroll')
      if (targetCard && targetCard.scrollHeight > targetCard.clientHeight) {
        const atTop = targetCard.scrollTop === 0 && e.deltaY < 0
        const atBottom = targetCard.scrollTop + targetCard.clientHeight >= targetCard.scrollHeight && e.deltaY > 0
        if (!atTop && !atBottom) return
      }

      e.preventDefault()
      setScrollHint(false)
      const now = Date.now()

      // Normalize wheel delta across various mice/trackpads
      const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 80)
      wheelAcc += delta

      targetPosRef.current = Math.max(
        0,
        Math.min(pagesCount - 1, targetPosRef.current + delta * 0.0035)
      )
      startSpringLoop()

      // Clear previous snap timeout
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current)

      // Snap to nearest integer page after scrolling stops
      snapTimeoutRef.current = setTimeout(() => {
        targetPosRef.current = Math.max(0, Math.min(pagesCount - 1, Math.round(targetPosRef.current)))
        startSpringLoop()
      }, 160)

      lastWheelTime = now
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current)
    }
  }, [pagesCount, startSpringLoop])

  // Touch Swipe for Mobile (Vertical & Horizontal)
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) return
      touchStartYRef.current = e.touches[0].clientY
      touchStartXRef.current = e.touches[0].clientX
      lastTouchTimeRef.current = Date.now()
      isDraggingRef.current = true
    }

    const handleTouchMove = (e) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return
      const currentY = e.touches[0].clientY
      const currentX = e.touches[0].clientX
      const diffY = touchStartYRef.current - currentY
      const diffX = touchStartXRef.current - currentX

      // Check dominant axis
      const dominantDiff = Math.abs(diffY) > Math.abs(diffX) ? diffY : diffX

      // Check if user is scrolling inside an inner card
      const targetCard = e.target.closest('.card-inner-scroll')
      if (targetCard && targetCard.scrollHeight > targetCard.clientHeight) {
        const atTop = targetCard.scrollTop === 0 && diffY < 0
        const atBottom = targetCard.scrollTop + targetCard.clientHeight >= targetCard.scrollHeight && diffY > 0
        if (!atTop && !atBottom) return
      }

      if (Math.abs(dominantDiff) > 8) {
        e.preventDefault()
        setScrollHint(false)
        targetPosRef.current = Math.max(
          0,
          Math.min(pagesCount - 1, targetPosRef.current + dominantDiff * 0.006)
        )
        touchStartYRef.current = currentY
        touchStartXRef.current = currentX
        startSpringLoop()
      }
    }

    const handleTouchEnd = () => {
      if (!isDraggingRef.current) return
      isDraggingRef.current = false
      targetPosRef.current = Math.max(0, Math.min(pagesCount - 1, Math.round(targetPosRef.current)))
      startSpringLoop()
    }

    const stageEl = document.getElementById('stage')
    if (stageEl) {
      stageEl.addEventListener('touchstart', handleTouchStart, { passive: true })
      stageEl.addEventListener('touchmove', handleTouchMove, { passive: false })
      stageEl.addEventListener('touchend', handleTouchEnd, { passive: true })
    }

    return () => {
      if (stageEl) {
        stageEl.removeEventListener('touchstart', handleTouchStart)
        stageEl.removeEventListener('touchmove', handleTouchMove)
        stageEl.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [pagesCount, startSpringLoop])

  // Mouse 3D Gyro / Parallax Tilt
  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setTilt({
        mx: x,
        my: y,
        tx: x * 8,
        ty: -y * 6,
        sx: `${50 + x * 40}%`,
        sy: `${40 + y * 35}%`,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        goToPage(cur + 1)
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        goToPage(cur - 1)
      }
      if (e.key === 'Home') goToPage(0)
      if (e.key === 'End') goToPage(pagesCount - 1)
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [cur, goToPage, onClose, pagesCount])

  // Web Audio Synthesized Auspicious Shehnai / Wedding Melodic Drone
  const toggleAudio = () => {
    if (isAudioPlaying) {
      if (audioControllerRef.current) {
        audioControllerRef.current.stop()
        audioControllerRef.current = null
      }
      setIsAudioPlaying(false)
    } else {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        if (ctx.state === 'suspended') ctx.resume()

        const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25]
        let active = true
        let step = 0
        const melody = [
          { n: 2, d: 0.7 }, { n: 3, d: 0.6 }, { n: 4, d: 0.9 },
          { n: 3, d: 0.5 }, { n: 2, d: 0.6 }, { n: 0, d: 1.1 },
          { n: 2, d: 0.7 }, { n: 4, d: 0.8 }, { n: 5, d: 1.0 },
          { n: 4, d: 0.6 }, { n: 2, d: 0.7 }, { n: 1, d: 0.9 }
        ]

        const interval = setInterval(() => {
          if (!active || ctx.state === 'suspended') return
          const m = melody[step % melody.length]
          step++

          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          const filter = ctx.createBiquadFilter()

          osc.type = 'triangle'
          osc.frequency.setValueAtTime(notes[m.n % notes.length], ctx.currentTime)

          filter.type = 'lowpass'
          filter.frequency.setValueAtTime(1200, ctx.currentTime)

          gain.gain.setValueAtTime(0.001, ctx.currentTime)
          gain.gain.linearRampToValueAtTime(0.09, ctx.currentTime + 0.1)
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + m.d)

          osc.connect(filter)
          filter.connect(gain)
          gain.connect(ctx.destination)

          osc.start(ctx.currentTime)
          osc.stop(ctx.currentTime + m.d + 0.05)
        }, 750)

        audioControllerRef.current = {
          stop: () => {
            active = false
            clearInterval(interval)
            try { ctx.close() } catch (e) {}
          }
        }
        setIsAudioPlaying(true)
      } catch (err) {
        console.error('Audio init error', err)
      }
    }
  }

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioControllerRef.current) {
        audioControllerRef.current.stop()
      }
    }
  }, [])

  // Decorative SVGs
  const MandalaSVG = (
    <svg className="mandala" viewBox="0 0 60 60">
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse
          key={i}
          cx="30"
          cy="11"
          rx="4"
          ry="10"
          transform={`rotate(${i * 30} 30 30)`}
          fill={i % 2 ? '#b8860b' : '#f59e0b'}
        />
      ))}
      <circle cx="30" cy="30" r="7" fill="#fef08a" stroke="#b45309" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="3" fill="#78350f" />
    </svg>
  )

  const DividerSVG = (
    <svg className="div-svg" viewBox="0 0 180 20">
      <path d="M4 10C35 3 65 17 85 10" />
      <path d="M176 10C145 3 115 17 95 10" />
      <g>
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse
            key={i}
            cx="90"
            cy="4.5"
            rx="2.2"
            ry="4.5"
            transform={`rotate(${i * 45} 90 10)`}
          />
        ))}
        <circle cx="90" cy="10" r="2.5" fill="#fde047" />
      </g>
    </svg>
  )

  const KalashSVG = (
    <svg className="w-9 h-9 mx-auto my-1 text-amber-500 fill-current drop-shadow-md" viewBox="0 0 24 24">
      <path d="M12 2c-.6 0-1.1.4-1.3 1L9.2 6H6c-.6 0-1 .4-1 1s.4 1 1 1h.4l1.1 9.2C7.8 19.3 9.6 21 11.7 21h.6c2.1 0 3.9-1.7 4.2-3.8L17.6 8H18c.6 0 1-.4 1-1s-.4-1-1-1h-3.2l-1.5-3c-.2-.6-.7-1-1.3-1zm0 2.5l1 2h-2l1-2zm-3.6 5.5h7.2l-.9 7.4c-.2 1.2-1.2 2.1-2.4 2.1h-.6c-1.2 0-2.2-.9-2.4-2.1L8.4 10z" />
    </svg>
  )

  const DandiyaSVG = (
    <div className="flex items-center justify-center gap-1.5 my-1 text-amber-500 text-xl filter drop-shadow">
      <span className="transform -rotate-45">🥢</span>
      <span className="text-sm">✨</span>
      <span className="transform rotate-45">🥢</span>
    </div>
  )

  const dustList = Array.from({ length: 32 }, (_, i) => ({
    id: i,
    left: `${(i * 13 + 4) % 100}%`,
    top: `${(i * 19 + 7) % 100}%`,
    s: `${2 + (i % 4)}px`,
    dur: `${4 + (i % 5)}s`,
    op: 0.3 + (i % 6) * 0.1,
  }))

  const fallingColors = ['#f59e0b', '#d97706', '#fbbf24', '#f43f5e']
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${(i * 15 + 6) % 100}%`,
    dur: `${8 + (i % 5) * 2}s`,
    del: `-${(i * 1.5) % 12}s`,
    col: fallingColors[i % 4],
  }))

  const progressPercent = Math.min(100, Math.max(0, ((curFloat) / (pagesCount - 1)) * 100))

  return (
    <div className="orbit-theme fixed inset-0 z-50 overflow-hidden font-['Noto_Serif_Gujarati',sans-serif] text-[#1b2340] select-none">
      <style>{`
        .orbit-theme {
          --w: min(86vw, 375px);
          --h: min(76vh, 76svh, 630px);
          --gold: #d97706;
          --gold-light: #fef08a;
          --gold-glow: rgba(245, 158, 11, 0.45);
          background: radial-gradient(ellipse at 50% 30%, #171b3c, #070918 75%);
        }

        .orbit-theme #bg {
          position: fixed; inset: 0; perspective: 1200px; overflow: hidden; pointer-events: none;
        }

        /* 3D Celestial Orbiting Golden Rings */
        .orbit-theme .ring {
          position: absolute; left: 50%; top: 50%; width: var(--s); height: var(--s);
          margin: calc(var(--s)/-2) 0 0 calc(var(--s)/-2); border-radius: 50%;
          border: 1.5px solid rgba(251, 191, 36, 0.35);
          box-shadow: 0 0 35px rgba(245, 158, 11, 0.3), inset 0 0 35px rgba(245, 158, 11, 0.15);
          animation: var(--a) var(--t) linear infinite;
        }
        .orbit-theme .ring::after {
          content: ""; position: absolute; left: 50%; top: -6px; width: 12px; height: 12px;
          margin-left: -6px; border-radius: 50%; background: #fef08a;
          box-shadow: 0 0 20px 6px rgba(254, 240, 138, 0.95);
        }
        @keyframes o1 { from { transform: rotateX(72deg) rotateZ(0); } to { transform: rotateX(72deg) rotateZ(360deg); } }
        @keyframes o2 { from { transform: rotateY(72deg) rotateZ(0); } to { transform: rotateY(72deg) rotateZ(-360deg); } }
        @keyframes o3 { from { transform: rotateX(55deg) rotateY(40deg) rotateZ(0); } to { transform: rotateX(55deg) rotateY(40deg) rotateZ(360deg); } }

        .orbit-theme .dust {
          position: absolute; border-radius: 50%; background: #fef08a;
          animation: dfloat var(--t) ease-in-out infinite alternate;
        }
        @keyframes dfloat { to { transform: translateY(-45px); } }

        /* 3D Coverflow Stage */
        .orbit-theme #stage {
          position: fixed; inset: 0; perspective: 1400px; transform-style: preserve-3d;
          touch-action: pan-y;
        }
        .orbit-theme #deck {
          position: absolute; inset: 0; transform-style: preserve-3d;
          transition: transform 0.15s ease-out;
        }

        /* 3D Coverflow Card */
        .orbit-theme .page {
          --ink: #1e1b4b;
          --h1: #b45309;
          --h2: #fbbf24;
          --paper1: #fffbeb;
          --paper2: #fef3c7;
          position: absolute; left: 50%; top: 50%; width: var(--w); height: var(--h);
          margin: calc(var(--h)/-2) 0 0 calc(var(--w)/-2);
          overflow-y: auto; scrollbar-width: none; display: flex; flex-direction: column;
          padding: 24px 14px 20px;
          color: var(--ink); border-radius: 20px; cursor: pointer;
          background: linear-gradient(165deg, var(--paper1), var(--paper2));
          border: 2px solid #f59e0b;
          box-shadow: 0 0 0 4px rgba(7, 9, 24, 0.85), 0 0 0 5px rgba(245, 158, 11, 0.6), 0 25px 60px rgba(0, 0, 0, 0.7);
          transform: translateX(calc(var(--d) * 64%)) translateZ(calc(var(--ad) * -270px)) rotateY(calc(var(--d) * -38deg)) scale(calc(1 - var(--ad) * 0.06));
          opacity: calc(1 - var(--ad) * 0.32); visibility: visible;
          transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.25, 1), opacity 0.25s, filter 0.25s, box-shadow 0.25s;
          filter: brightness(calc(1 - var(--ad) * 0.3));
          user-select: none;
        }
        .orbit-theme .page::-webkit-scrollbar { display: none; }
        .orbit-theme .page.hide { visibility: hidden; opacity: 0; pointer-events: none; }

        .orbit-theme .page.active {
          cursor: auto;
          transform: rotateY(calc(var(--tx) * 1deg)) rotateX(calc(var(--ty) * 1deg)) translateZ(40px);
          box-shadow: 0 0 0 4px rgba(7, 9, 24, 0.85), 0 0 0 5px #f59e0b, 0 0 80px rgba(245, 158, 11, 0.5), 0 35px 75px rgba(0, 0, 0, 0.75);
          filter: brightness(1); opacity: 1;
        }

        /* Color Variations for 8 Wedding Cards */
        .orbit-theme .p1 { --paper1: #fffdf5; --paper2: #fef2d0; --ink: #2d1804; }
        .orbit-theme .p2 { --paper1: #f3faf5; --paper2: #dcf2e3; --ink: #06381e; --h1: #047857; --h2: #f59e0b; }
        .orbit-theme .p3 { --paper1: #fefce8; --paper2: #fef08a; --ink: #451a03; --h1: #b45309; --h2: #eab308; }
        .orbit-theme .p4 { --paper1: #fef2f2; --paper2: #fed7aa; --ink: #500724; --h1: #9f1239; --h2: #f97316; }
        .orbit-theme .p5 { --ink: #fef08a; --h1: #fef08a; --h2: #fde047; --paper1: #1e1b4b; --paper2: #0f172a; }
        .orbit-theme .p6 { --paper1: #fff1f2; --paper2: #fecdd3; --ink: #4c0519; --h1: #be123c; --h2: #d97706; }
        .orbit-theme .p7 { --paper1: #f8fafc; --paper2: #e2e8f0; --ink: #0f172a; --h1: #334155; --h2: #b45309; }
        .orbit-theme .p8 { --paper1: #fdf4ff; --paper2: #f5d0fe; --ink: #3b0764; --h1: #7e22ce; --h2: #d97706; }

        /* Royal Embossed Inset Filigree Border */
        .orbit-theme .page::before {
          content: ""; position: absolute; inset: 6px; border: 1.5px solid rgba(217, 119, 6, 0.75);
          border-radius: 14px; pointer-events: none; z-index: 4;
        }

        /* Glare Reflection on Active Card */
        .orbit-theme .page::after {
          content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 5; opacity: 0;
          transition: opacity 0.4s;
          background: radial-gradient(circle at var(--sx) var(--sy), rgba(255, 255, 255, 0.35), transparent 50%);
          border-radius: 20px;
        }
        .orbit-theme .page.active::after { opacity: 1; }

        .orbit-theme .arch { position: relative; z-index: 3; width: 100%; margin: auto; text-align: center; }

        .orbit-theme .mandala {
          display: block; width: 50px; height: 50px; margin: 0 auto 4px;
          animation: spin 20s linear infinite; filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.5));
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Shimmering Gold Foil Gradient Calligraphy */
        .orbit-theme h2, .orbit-theme h3, .orbit-theme .names, .orbit-theme .hl, .orbit-theme .pw b {
          background: linear-gradient(100deg, var(--h1) 20%, var(--h2) 50%, var(--h1) 80%);
          background-size: 250% 100%; -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: foil 5s linear infinite; font-family: 'Noto Serif Gujarati', serif;
        }
        @keyframes foil { to { background-position: -250% 0; } }

        .orbit-theme h2 { font-weight: 800; font-size: 1.65rem; line-height: 1.4; }
        .orbit-theme h3 { font-weight: 700; font-size: 1.05rem; margin: 10px 0 2px; }
        .orbit-theme .names { font-weight: 800; font-size: 1.7rem; line-height: 1.35; }
        .orbit-theme .sang { display: block; font-size: 0.95rem; color: var(--ink); -webkit-text-fill-color: var(--ink); font-family: 'Noto Serif Gujarati', serif; }
        .orbit-theme .hl { font-weight: 700; display: inline-block; }
        .orbit-theme .shloka, .orbit-theme .small, .orbit-theme li { font-family: 'Noto Serif Gujarati', serif; }
        .orbit-theme .shloka { font-size: 0.82rem; line-height: 1.75; font-weight: 600; }
        .orbit-theme .small { font-size: 0.82rem; line-height: 1.75; }
        .orbit-theme li { font-size: 0.85rem; }

        .orbit-theme .div-svg { display: block; width: 160px; height: 18px; margin: 4px auto 6px; overflow: visible; }
        .orbit-theme .div-svg path { stroke: #d97706; fill: none; stroke-width: 1.5; stroke-linecap: round; }
        .orbit-theme .div-svg g { fill: #d97706; transform-origin: 90px 10px; animation: spin 8s linear infinite; }

        .orbit-theme .ganesh { display: block; font-size: 1.8rem; color: #d97706; animation: sway 4s ease-in-out infinite; }
        @keyframes sway { 0%,100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }

        .orbit-theme .couple { display: flex; justify-content: center; gap: 6px; margin: 4px 0; }
        .orbit-theme .pw { flex: 1; max-width: 120px; }
        .orbit-theme .pw b { display: block; font-weight: 800; font-size: 0.95rem; margin-top: 5px; }
        .orbit-theme .amp { align-self: center; font-family: 'Noto Serif Gujarati', serif; font-size: 0.88rem; padding-bottom: 20px; }
        .orbit-theme .amp::before { content: "♥"; display: block; color: #e11d48; font-size: 1.25rem; animation: beat 1.5s infinite; }
        @keyframes beat { 50% { transform: scale(1.3); } }

        .orbit-theme .ph {
          position: relative; display: block; width: 100%; aspect-ratio: 3/4; cursor: pointer;
          border-radius: 50px 50px 8px 8px; overflow: hidden; border: 2.5px solid #d97706;
          background: linear-gradient(160deg, #fef3c7, #fde68a);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.7), 0 0 0 4.5px #d97706, 0 8px 18px rgba(60, 40, 10, 0.35);
        }
        .orbit-theme .ph img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; animation: ken 12s ease-in-out infinite alternate; }
        @keyframes ken { to { transform: scale(1.1); } }
        .orbit-theme .add { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 1.5rem; line-height: 1.3; color: var(--h1); }

        .orbit-theme .fx { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 1; border-radius: 18px; }
        .orbit-theme .fx i {
          position: absolute; top: -6%; width: 8px; height: 11px; border-radius: 0 100% 0 100%;
          opacity: 0.6; animation: orbitFall linear infinite;
        }
        @keyframes orbitFall { to { transform: translate(30px, 115vh) rotate(520deg); } }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
        .pulse-glow { animation: pulseGlow 2s ease-in-out infinite; }
      `}</style>

      {/* Orbiting Golden Celestial Rings & Stardust in Background */}
      <div id="bg">
        <div className="ring" style={{ '--a': 'o1', '--s': '92vmin', '--t': '36s' }} />
        <div className="ring" style={{ '--a': 'o2', '--s': '75vmin', '--t': '50s' }} />
        <div className="ring" style={{ '--a': 'o3', '--s': '110vmin', '--t': '68s' }} />
        <div className="ring" style={{ '--a': 'o1', '--s': '58vmin', '--t': '24s' }} />
        {dustList.map((d) => (
          <i
            key={d.id}
            className="dust"
            style={{
              left: d.left,
              top: d.top,
              width: d.s,
              height: d.s,
              opacity: d.op,
              '--t': d.dur,
            }}
          />
        ))}
      </div>

      {/* Top Header Bar with AJ Branding, Progress Bar, Audio Toggle & Close */}
      <header className="fixed top-0 inset-x-0 z-50 flex flex-col bg-gradient-to-b from-[#070918]/90 via-[#070918]/60 to-transparent pb-3 pt-3 px-4 backdrop-blur-sm">
        {/* Progress Bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 transition-all duration-150 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
          {/* Back button */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-[#0f172a]/80 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-amber-200 shadow-md backdrop-blur hover:bg-amber-500/20 active:scale-95 transition"
          >
            <span>←</span>
            <span>પાછા જાઓ</span>
          </button>

          {/* Center Title & Page Indicator */}
          <div className="flex items-center gap-2">
            <img src="/aj-logo.png" alt="AJ" className="h-6 w-auto object-contain drop-shadow" />
            <div className="flex flex-col items-center">
              <span className="font-['Cinzel'] text-xs font-bold tracking-wider text-amber-300">
                3D ORBIT COVERFLOW
              </span>
              <span className="text-[11px] font-semibold text-amber-100/80">
                કાર્ડ {cur + 1} / {pagesCount}
              </span>
            </div>
          </div>

          {/* Right Action: Music Toggle */}
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs sm:text-sm font-bold shadow-md backdrop-blur active:scale-95 transition ${
              isAudioPlaying
                ? 'border-emerald-400/60 bg-emerald-950/80 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'border-amber-500/40 bg-[#0f172a]/80 text-amber-200 hover:bg-amber-500/20'
            }`}
          >
            <span>{isAudioPlaying ? '🔊' : '🎵'}</span>
            <span className="hidden sm:inline">{isAudioPlaying ? 'સંગીત ચાલુ' : 'સંગીત વગાડો'}</span>
          </button>
        </div>
      </header>

      {/* Floating Scroll Indicator Toast */}
      {scrollHint && (
        <div className="fixed top-16 inset-x-0 z-40 flex justify-center pointer-events-none">
          <div className="pulse-glow inline-flex items-center gap-2 rounded-full border border-amber-400/60 bg-black/75 px-4 py-1.5 text-xs font-bold text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.4)] backdrop-blur">
            <span>🖱️</span>
            <span>માઉસ વ્હીલ અથવા સ્ક્રોલ કરીને પાનાં ફેરવો (Scroll to Explore)</span>
            <span>↓</span>
          </div>
        </div>
      )}

      {/* 3D Coverflow Stage with Continuous Scroll-Driven Deck */}
      <main id="stage">
        <div
          id="deck"
          style={{
            transform: `rotateY(${tilt.mx * 4}deg) rotateX(${tilt.my * -2.5}deg)`,
          }}
        >
          {Array.from({ length: pagesCount }, (_, idx) => {
            const d = idx - curFloat
            const ad = Math.abs(d)
            const isHide = ad > 3.2
            const isActive = Math.abs(d) < 0.4

            return (
              <section
                key={idx}
                onClick={() => goToPage(idx)}
                className={`page p${idx + 1} ${isActive ? 'active' : ''} ${isHide ? 'hide' : ''}`}
                style={{
                  '--d': d,
                  '--ad': ad,
                  '--tx': tilt.tx,
                  '--ty': tilt.ty,
                  '--sx': tilt.sx,
                  '--sy': tilt.sy,
                }}
              >
                {/* Floating Flower Petals FX */}
                <div className="fx">
                  {petals.map((p) => (
                    <i
                      key={p.id}
                      style={{
                        left: p.left,
                        background: p.col,
                        animationDuration: p.dur,
                        animationDelay: p.del,
                      }}
                    />
                  ))}
                </div>

                <div className="arch">
                  {MandalaSVG}

                  {/* Card 1: Grand Wedding Cover */}
                  {idx === 0 && (
                    <>
                      <span className="ganesh">ॐ</span>
                      <p className="shloka">
                        વક્રતુંડ મહાકાય, સૂર્યકોટિ સમપ્રભ ।<br />
                        નિર્વિઘ્નં કુરુ મે દેવ, સર્વકાર્યેષુ સર્વદા ॥
                      </p>
                      <h2 className="mt-1">શુભ વિવાહ</h2>

                      {/* Couple Photo Frames with Upload Option */}
                      <div className="couple">
                        <div className="pw">
                          <label className="ph" title="વરરાજાનો ફોટો બદલો">
                            {groomPhoto ? (
                              <img alt="Groom" src={groomPhoto} />
                            ) : (
                              <span className="add">
                                📷<small className="text-[0.65rem] font-bold">ફોટો ઉમેરો</small>
                              </span>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handlePhotoUpload(e, 'groom')}
                            />
                          </label>
                          <b>{groomName}</b>
                        </div>
                        <div className="amp">સંગ</div>
                        <div className="pw">
                          <label className="ph" title="કન્યાનો ફોટો બદલો">
                            {bridePhoto ? (
                              <img alt="Bride" src={bridePhoto} />
                            ) : (
                              <span className="add">
                                📷<small className="text-[0.65rem] font-bold">ફોટો ઉમેરો</small>
                              </span>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handlePhotoUpload(e, 'bride')}
                            />
                          </label>
                          <b>{brideName}</b>
                        </div>
                      </div>

                      <p className="hl mt-1 text-xs sm:text-sm">{dateLine}</p>

                      <div className="mt-2 rounded-xl bg-amber-500/10 border border-amber-500/20 p-2 text-center">
                        <h3 className="mt-0 text-xs font-bold text-amber-800">નિમંત્રક</h3>
                        <p className="small text-[0.76rem] leading-tight">
                          {inv.inviters?.map((line, lidx) => (
                            <span key={lidx}>{line}<br /></span>
                          )) || (
                            <>
                              શ્રી ………………………… પરિવાર<br />
                              સરનામું: ……………………………, સુરત<br />
                              મો. ૯૬૮૭૩ ૩૬૪૨૬
                            </>
                          )}
                        </p>
                      </div>

                      <div className="mt-2 text-[11px] font-bold text-amber-700 animate-pulse">
                        📜 નીચે સ્ક્રોલ કરો (Scroll Down) ↓
                      </div>
                    </>
                  )}

                  {/* Card 2: Vivah Sanskar Announcement */}
                  {idx === 1 && (
                    <>
                      {KalashSVG}
                      <span className="text-xs font-bold text-emerald-700">॥ શ્રી ગણેશાય નમઃ ॥</span>
                      <h2 className="mt-1">વિવાહ સંસ્કાર</h2>
                      {DividerSVG}
                      <p className="shloka text-emerald-800 text-[0.8rem] my-1">
                        માંગલ્યં ભગવાન વિષ્ણુ, માંગલ્યં ગરુડધ્વજઃ ।<br />
                        માંગલ્યં પુંડરીકાક્ષો, મંગલાય તનો હરિઃ ॥
                      </p>
                      <p className="small mt-2 text-[0.8rem]">
                        સ્નેહીશ્રી, આપ સર્વેને જણાવતાં અત્યંત હર્ષ થાય છે કે અમારા પરિવારના ચિરંજીવી
                      </p>
                      <div className="names my-2 text-[1.65rem]">
                        {groomName}<span className="sang">સંગ</span>{brideName}
                      </div>
                      <p className="small text-[0.8rem]">
                        ના શુભ વિવાહ પ્રસંગે આપ સપરિવાર પધારી નવદંપતીને આશીર્વાદ આપી અમારા આનંદમાં વધારો કરશો એવી નમ્ર વિનંતી.
                      </p>
                    </>
                  )}

                  {/* Card 3: Haldi & Pithi Ceremony */}
                  {idx === 2 && (
                    <>
                      <div className="text-2xl filter drop-shadow">🟡</div>
                      <h2 className="mt-0">હલ્દી રસમ</h2>
                      {DividerSVG}
                      <p className="shloka text-amber-900 text-[0.78rem]">
                        હળદરનો રંગ ચડે સોનેરી, રૂડી પ્રીતની રીત અનેરી...
                      </p>

                      <div className="my-2 rounded-xl bg-amber-400/20 border border-amber-500/30 p-2.5">
                        <h3 className="mt-0 text-amber-900 font-bold">પીઠી ચોળવાનો સમય</h3>
                        <p className="text-xs font-bold text-amber-800">
                          બુધવાર, તા. ૧૨-૦૨-૨૦૨૫ ના રોજ
                        </p>
                        <h3 className="mt-2 text-amber-900 font-bold">સ્વરુચી ભોજન</h3>
                        <p className="text-xs font-bold text-amber-900">
                          બપોરે ૧૨:૦૦ કલાકે
                        </p>
                      </div>

                      <h3>શુભ સ્થળ</h3>
                      <p className="small mt-1 text-[0.8rem]">
                        {venueName},<br />
                        {venueLines.join(', ')}
                      </p>
                    </>
                  )}

                  {/* Card 4: Mandap Muhurat */}
                  {idx === 3 && (
                    <>
                      <div className="text-2xl filter drop-shadow">🪔</div>
                      <h2 className="mt-0">મંડપ મુહૂર્ત</h2>
                      {DividerSVG}
                      <p className="small text-[0.78rem]">
                        બે હૃદયનું મિલન, બે પરિવારનો સંગમ…<br />
                        આપની હાજરી અમારા આનંદનો ઉત્સવ બનાવશે.
                      </p>

                      <div className="my-2 rounded-xl bg-rose-500/10 border border-rose-500/25 p-2.5 text-rose-950">
                        <h3 className="mt-0 text-rose-900 font-bold">ગણેશ સ્થાપન & મંડપ</h3>
                        <p className="text-xs font-semibold">
                          બુધવાર, તા. ૧૨-૦૨-૨૦૨૫<br />
                          સવારે <span className="hl">૯:૧૫ કલાકે</span>
                        </p>

                        <h3 className="mt-2 text-rose-900 font-bold">મામેરું આગમન</h3>
                        <p className="text-xs font-semibold">
                          બુધવાર, બપોરે <span className="hl">૩:૩૦ કલાકે</span>
                        </p>
                      </div>

                      <p className="small hl text-[0.8rem]">
                        સ્થળ : {venueName}
                      </p>
                    </>
                  )}

                  {/* Card 5: Prem Raas & Sangeet Sandhya */}
                  {idx === 4 && (
                    <>
                      {DandiyaSVG}
                      <h2 className="mt-0">પ્રેમ રાસ</h2>
                      {DividerSVG}
                      <p className="shloka text-yellow-200 text-[0.78rem]">
                        ઢોલના ધબકારે અને શરણાઈના સુરે, રમીશું રાસ મન મૂકીને...
                      </p>

                      <div className="my-2 rounded-xl bg-purple-900/40 border border-amber-400/30 p-2.5 text-amber-100">
                        <h3 className="mt-0 font-bold text-amber-300">રાસ-ગરબા & સંગીત સંધ્યા</h3>
                        <p className="text-xs">
                          બુધવાર, તા. ૧૨-૦૨-૨૦૨૫<br />
                          <span className="hl text-yellow-300">રાત્રે ૮:૩૦ કલાકે</span>
                        </p>

                        <h3 className="mt-2 font-bold text-amber-300">સ્વરુચી ભોજન</h3>
                        <p className="text-xs">
                          સાંજે <span className="hl text-yellow-300">૭:૦૦ કલાકે</span>
                        </p>
                      </div>

                      <h3>શુભ સ્થળ</h3>
                      <p className="small text-amber-200/90 text-[0.8rem]">
                        {venueName},<br />
                        {venueLines.join(', ')}
                      </p>
                    </>
                  )}

                  {/* Card 6: Jaan Prasthan & Hast Melap */}
                  {idx === 5 && (
                    <>
                      <div className="text-2xl filter drop-shadow">🔥</div>
                      <h2 className="mt-0">હસ્ત મેળાપ</h2>
                      {DividerSVG}

                      <div className="my-2 rounded-xl bg-rose-400/15 border border-rose-500/25 p-2.5 text-rose-950">
                        <h3 className="mt-0 font-bold text-rose-900">જાન પ્રસ્થાન</h3>
                        <p className="text-xs font-semibold">
                          ગુરુવાર, તા. ૧૩-૦૨-૨૦૨૫<br />
                          બપોરે <span className="hl">૨:૩૦ કલાકે</span>
                        </p>

                        <h3 className="mt-2 font-bold text-rose-900">હસ્ત મેળાપ (લગ્ન લગ્નવિધિ)</h3>
                        <p className="text-xs font-semibold">
                          ગુરુવાર, સાંજે <span className="hl">૫:૧૫ કલાકે</span><br />
                          <span className="text-[11px]">(શુભ ચોઘડિયે)</span>
                        </p>
                      </div>

                      <h3>મધુર કલરવ</h3>
                      <p className="small text-[0.78rem] leading-tight text-rose-900">
                        લગ્નના શુભ પ્રસંગે પ્રેમ અને સ્નેહની લાગણીઓ સાથે આપ સૌની હાજરી અમારા માટે આશીર્વાદ સમાન છે.
                      </p>
                      <p className="small hl mt-1 text-[0.78rem]">– સાદર, સમસ્ત પરિવાર</p>
                    </>
                  )}

                  {/* Card 7: Family Members (Likhitam) */}
                  {idx === 6 && (
                    <>
                      <h2 className="text-[1.35rem]">લિ. સ્નેહાધીન</h2>
                      <div className="my-2 rounded-xl bg-slate-200/50 border border-slate-300/80 p-2 text-slate-800">
                        <ul className="list-none space-y-0.5 text-xs">
                          {inv.family?.sneh?.map((m, sidx) => (
                            <li key={sidx}>{m}</li>
                          )) || (
                            <>
                              <li>શ્રી ………………………… પરિવાર</li>
                              <li>શ્રી ………………………… પરિવાર</li>
                              <li>શ્રી ………………………… પરિવાર</li>
                              <li>શ્રી ………………………… પરિવાર</li>
                            </>
                          )}
                        </ul>
                      </div>

                      <h2 className="text-[1.35rem] mt-2">લિ. દર્શનાભિલાષી</h2>
                      <div className="my-2 rounded-xl bg-slate-200/50 border border-slate-300/80 p-2 text-slate-800">
                        <ul className="list-none space-y-0.5 text-xs">
                          {inv.family?.darshan?.map((m, sidx) => (
                            <li key={sidx}>{m}</li>
                          )) || (
                            <>
                              <li>શ્રી ………………………… પરિવાર</li>
                              <li>શ્રી ………………………… પરિવાર</li>
                              <li>શ્રી ………………………… પરિવાર</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </>
                  )}

                  {/* Card 8: Venue & Digital RSVP Finale */}
                  {idx === 7 && (
                    <>
                      <div className="text-2xl filter drop-shadow">🏰</div>
                      <h2 className="mt-0">શુભ સ્થળ & સંપર્ક</h2>
                      {DividerSVG}

                      <div className="my-2 rounded-xl bg-purple-500/15 border border-purple-500/30 p-2.5 text-purple-950">
                        <h3 className="mt-0 text-purple-900 font-bold">શુભ સ્થળ</h3>
                        <p className="text-xs font-bold">{venueName}</p>
                        <p className="text-xs text-purple-900 mt-0.5">{venueLines.join(', ')}</p>

                        {/* Interactive Google Map Link Button */}
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(venueName + ', ' + venueLines.join(', '))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2.5 inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 px-3.5 py-1.5 text-xs font-bold text-black shadow transition active:scale-95"
                        >
                          <span>📍</span>
                          <span>ગૂગલ મેપ પર લોકેશન જુઓ</span>
                        </a>
                      </div>

                      <div className="space-y-1.5 text-[0.76rem] text-purple-900">
                        <p><b>મોસાળ પક્ષ:</b> {inv.family?.mosal?.join(', ') || 'શ્રી સમસ્ત પરિવાર'}</p>
                        <p><b>બાણેજ પક્ષ:</b> {inv.family?.banej?.join(', ') || 'પરમ, જાનવી, પ્રિયંક, વિધ્યા'}</p>
                      </div>

                      {/* Direct WhatsApp RSVP / Wish Button */}
                      <div className="mt-3 flex flex-col gap-1.5">
                        <a
                          href={`https://wa.me/919687336426?text=${encodeURIComponent(`નમસ્તે AJ Invitation, ${groomName} સંગ ${brideName} ના લગ્ન પ્રસંગે હાર્દિક શુભકામનાઓ!`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 py-2 px-3 text-xs font-bold text-white shadow-md transition active:scale-95"
                        >
                          <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.203c.043.071.043.418-.101.823z" />
                          </svg>
                          <span>💬 વોટ્સએપ પર શુભેચ્છા મોકલો</span>
                        </a>

                        <a
                          href="tel:+919687336426"
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-purple-400/40 bg-purple-900/10 py-1.5 px-3 text-[11px] font-bold text-purple-900 hover:bg-purple-900/20 transition"
                        >
                          <span>📞</span>
                          <span>સંપર્ક: ૯૬૮૭૩ ૩૬૪૨૬</span>
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </section>
            )
          })}
        </div>
      </main>

      {/* Floating Bottom Navigation Controls */}
      <footer className="fixed inset-x-0 bottom-4 z-40 flex flex-col items-center gap-2">
        <div className="flex items-center justify-center gap-3 bg-[#0a1030]/80 border border-amber-500/30 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.6)] backdrop-blur-md">
          {/* Previous Page Button */}
          <button
            onClick={() => goToPage(cur - 1)}
            disabled={cur === 0}
            aria-label="previous page"
            className="h-8 w-8 rounded-full border border-amber-400/40 bg-amber-500/20 text-lg font-bold text-amber-200 shadow transition disabled:opacity-30 hover:scale-105 active:scale-95 flex items-center justify-center"
          >
            ‹
          </button>

          {/* Page Indicators Dots */}
          <div className="flex items-center gap-1.5 px-1">
            {Array.from({ length: pagesCount }, (_, i) => {
              const isSelected = i === cur
              return (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  aria-label={`Go to page ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    isSelected
                      ? 'w-6 bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_10px_rgba(245,158,11,0.8)]'
                      : 'w-2 bg-white/25 hover:bg-white/40'
                  }`}
                />
              )
            })}
          </div>

          {/* Next Page Button */}
          <button
            onClick={() => goToPage(cur + 1)}
            disabled={cur === pagesCount - 1}
            aria-label="next page"
            className="h-8 w-8 rounded-full border border-amber-400/40 bg-amber-500/20 text-lg font-bold text-amber-200 shadow transition disabled:opacity-30 hover:scale-105 active:scale-95 flex items-center justify-center"
          >
            ›
          </button>
        </div>

        {/* Scroll Helper Hint */}
        <div className="text-[11px] text-amber-200/70 font-medium drop-shadow hidden sm:block">
          ✨ માઉસ સ્ક્રોલ અથવા કીબોર્ડ એરો (← / →) વડે પાનાં ફેરવો ✨
        </div>
      </footer>
    </div>
  )
}
