import { useState, useEffect, useRef } from 'react'

export default function OrbitCoverflowInvitation({ inv, onClose }) {
  const [cur, setCur] = useState(0)
  const [tilt, setTilt] = useState({ mx: 0, my: 0, tx: 0, ty: 0, sx: '50%', sy: '40%' })
  const [groomPhoto, setGroomPhoto] = useState(inv.photos?.groom || null)
  const [bridePhoto, setBridePhoto] = useState(inv.photos?.bride || null)

  const pagesCount = 8
  const groomName = inv.groom || 'ચિ. દર્શન'
  const brideName = inv.bride || 'ચિ. ઈશિતા'
  const dateLine = inv.dateLine || 'તા. ૧૩-૦૨-૨૦૨૫, ગુરુવાર'
  const venueName = inv.venue?.name || 'નીલકંઠ ફાર્મ પાર્ટી પ્લોટ'
  const venueLines = inv.venue?.lines || ['જૂનાગઢ બાયપાસ રોડ', 'કાંકરડા ચોકડી, જૂનાગઢ.']

  // Load photos
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

  // Pointer / Mouse 3D tilt
  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setTilt({
        mx: x,
        my: y,
        tx: x * 9,
        ty: -y * 7,
        sx: `${50 + x * 45}%`,
        sy: `${40 + y * 40}%`,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const go = (n) => {
    setCur(Math.max(0, Math.min(pagesCount - 1, n)))
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        go(cur + 1)
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        go(cur - 1)
      }
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [cur])

  // Scroll-based animation (Mouse Wheel / Trackpad)
  const lastWheelTime = useRef(0)
  useEffect(() => {
    const handleWheel = (e) => {
      const now = Date.now()
      if (now - lastWheelTime.current < 400) return
      if (Math.abs(e.deltaY) > 20 || Math.abs(e.deltaX) > 20) {
        const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
        if (delta > 0) {
          go(cur + 1)
          lastWheelTime.current = now
        } else if (delta < 0) {
          go(cur - 1)
          lastWheelTime.current = now
        }
      }
    }
    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [cur, pagesCount])

  // Mobile Touch Swipe navigation
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) return
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }
    const handleTouchEnd = (e) => {
      if (e.changedTouches.length !== 1) return
      const diffY = touchStartY.current - e.changedTouches[0].clientY
      const diffX = touchStartX.current - e.changedTouches[0].clientX
      const diff = Math.abs(diffY) > Math.abs(diffX) ? diffY : diffX
      if (Math.abs(diff) > 35) {
        if (diff > 0) {
          go(cur + 1)
        } else {
          go(cur - 1)
        }
      }
    }
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [cur, pagesCount])

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
          fill={i % 2 ? '#7a5614' : '#c9a24a'}
        />
      ))}
      <circle cx="30" cy="30" r="6" fill="#f3dc9a" stroke="#7a5614" />
    </svg>
  )

  const DividerSVG = (
    <svg className="div-svg" viewBox="0 0 170 18">
      <path d="M3 9C30 2 58 16 78 9" />
      <path d="M167 9C140 2 112 16 92 9" />
      <g>
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse
            key={i}
            cx="85"
            cy="3.5"
            rx="2"
            ry="4.5"
            transform={`rotate(${i * 45} 85 9)`}
          />
        ))}
      </g>
    </svg>
  )

  const dustList = Array.from({ length: 32 }, (_, i) => ({
    id: i,
    left: `${(i * 13 + 4) % 100}%`,
    top: `${(i * 19 + 7) % 100}%`,
    s: `${2 + (i % 4)}px`,
    dur: `${4 + (i % 5)}s`,
    op: 0.3 + (i % 6) * 0.1,
  }))

  const fallingColors = ['#c9a24a', '#7a5614', '#e0b650']
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${(i * 15 + 6) % 100}%`,
    dur: `${8 + (i % 5) * 2}s`,
    del: `-${(i * 1.5) % 12}s`,
    col: fallingColors[i % 3],
  }))

  return (
    <div className="orbit-theme fixed inset-0 z-50 overflow-hidden font-['Hind_Vadodara',sans-serif] text-[#1b2340] select-none">
      <style>{`
        .orbit-theme {
          --w: min(82vw, 360px);
          --h: min(74vh, 74svh, 620px);
          --gold: #c9a24a;
          --g2: #f3dc9a;
          background: radial-gradient(ellipse at 50% 35%, #16224a, #070b1c 70%);
        }
        .orbit-theme #bg {
          position: fixed; inset: 0; perspective: 1100px; overflow: hidden; pointer-events: none;
        }
        .orbit-theme .ring {
          position: absolute; left: 50%; top: 50%; width: var(--s); height: var(--s);
          margin: calc(var(--s)/-2) 0 0 calc(var(--s)/-2); border-radius: 50%;
          border: 1px solid rgba(243,220,154,.35);
          box-shadow: 0 0 30px rgba(201,162,74,.25), inset 0 0 30px rgba(201,162,74,.12);
          animation: var(--a) var(--t) linear infinite;
        }
        .orbit-theme .ring::after {
          content: ""; position: absolute; left: 50%; top: -5px; width: 10px; height: 10px;
          margin-left: -5px; border-radius: 50%; background: var(--g2);
          box-shadow: 0 0 16px 5px rgba(243,220,154,.9);
        }
        @keyframes o1 { from { transform: rotateX(72deg) rotateZ(0); } to { transform: rotateX(72deg) rotateZ(360deg); } }
        @keyframes o2 { from { transform: rotateY(72deg) rotateZ(0); } to { transform: rotateY(72deg) rotateZ(-360deg); } }
        @keyframes o3 { from { transform: rotateX(55deg) rotateY(40deg) rotateZ(0); } to { transform: rotateX(55deg) rotateY(40deg) rotateZ(360deg); } }

        .orbit-theme .dust {
          position: absolute; border-radius: 50%; background: var(--g2);
          animation: dfloat var(--t) ease-in-out infinite alternate;
        }
        @keyframes dfloat { to { transform: translateY(-40px); } }

        /* 3D coverflow deck */
        .orbit-theme #stage {
          position: fixed; inset: 0; perspective: 1500px; transform-style: preserve-3d;
        }
        .orbit-theme #deck {
          position: absolute; inset: 0; transform-style: preserve-3d;
          transition: transform .4s ease-out;
        }
        .orbit-theme .page {
          --ink: #1b2340; --h1: #7a5614; --h2: #e0b650; --paper1: #fffaf0; --paper2: #f1e4c4;
          position: absolute; left: 50%; top: 50%; width: var(--w); height: var(--h);
          margin: calc(var(--h)/-2) 0 0 calc(var(--w)/-2);
          overflow-y: auto; scrollbar-width: none; display: flex; padding: 34px 14px;
          color: var(--ink); border-radius: 14px; cursor: pointer;
          background: linear-gradient(160deg, var(--paper1), var(--paper2));
          border: 2px solid var(--gold);
          box-shadow: 0 0 0 5px rgba(7,11,28,.8), 0 0 0 6px var(--gold), 0 30px 60px rgba(0,0,0,.6);
          transform: translateX(calc(var(--d) * 62%)) translateZ(calc(var(--ad) * -260px)) rotateY(calc(var(--d) * -40deg)) scale(calc(1 - var(--ad) * .05));
          opacity: calc(1 - var(--ad) * .3); visibility: visible;
          transition: transform 1s cubic-bezier(.3,.8,.2,1), opacity 1s, filter 1s;
          filter: brightness(calc(1 - var(--ad) * .28));
        }
        .orbit-theme .page::-webkit-scrollbar { display: none; }
        .orbit-theme .page.hide { visibility: hidden; opacity: 0; pointer-events: none; }
        .orbit-theme .page.active {
          cursor: auto;
          transform: rotateY(calc(var(--tx) * 1deg)) rotateX(calc(var(--ty) * 1deg)) translateZ(50px);
          box-shadow: 0 0 0 5px rgba(7,11,28,.8), 0 0 0 6px var(--gold), 0 0 70px rgba(243,220,154,.45), 0 40px 70px rgba(0,0,0,.65);
          filter: brightness(1); opacity: 1;
        }

        .orbit-theme .p2 { --paper1: #f4faf0; --paper2: #d3e8cf; }
        .orbit-theme .p3 { --paper1: #fff6dc; --paper2: #f3d98f; }
        .orbit-theme .p4 { --paper1: #eef7fb; --paper2: #c7e0ea; }
        .orbit-theme .p5 { --ink: #f6edd4; --h1: #f3dc9a; --h2: #fff6cf; --paper1: #1c2c5e; --paper2: #0a1030; }
        .orbit-theme .p6 { --paper1: #f6f8e8; --paper2: #d9e5b4; }
        .orbit-theme .p7 { --paper1: #fff1e8; --paper2: #f0c9b0; }
        .orbit-theme .p8 { --paper1: #fdeef2; --paper2: #ecc0cf; }

        .orbit-theme .page::before {
          content: ""; position: absolute; inset: 8px; border: 1px solid rgba(201,162,74,.8); border-radius: 8px; pointer-events: none; z-index: 4;
        }
        .orbit-theme .page::after {
          content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 5; opacity: 0; transition: opacity .6s;
          background: radial-gradient(circle at var(--sx) var(--sy), rgba(255,255,255,.28), transparent 45%);
        }
        .orbit-theme .page.active::after { opacity: 1; }

        .orbit-theme .arch { position: relative; z-index: 3; width: 100%; margin: auto; text-align: center; padding: 12px 2px; }
        .orbit-theme .mandala { display: block; width: 56px; height: 56px; margin: 0 auto 6px; animation: spin 22s linear infinite; filter: drop-shadow(0 0 6px rgba(201,162,74,.6)); }
        @keyframes spin { to { transform: rotate(360deg); } }

        .orbit-theme h2, .orbit-theme h3, .orbit-theme .names, .orbit-theme .hl, .orbit-theme .pw b {
          background: linear-gradient(100deg, var(--h1) 20%, var(--h2) 50%, var(--h1) 80%);
          background-size: 250% 100%; -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: foil 6s linear infinite; font-family: 'Noto Serif Gujarati', serif;
        }
        @keyframes foil { to { background-position: -250% 0; } }
        .orbit-theme h2 { font-weight: 800; font-size: 1.75rem; line-height: 1.5; }
        .orbit-theme h3 { font-weight: 600; font-size: 1.12rem; margin: 12px 0 0; }
        .orbit-theme .names { font-weight: 800; font-size: 1.8rem; line-height: 1.35; }
        .orbit-theme .sang { display: block; font-size: 1rem; color: var(--ink); -webkit-text-fill-color: var(--ink); font-family: 'Noto Serif Gujarati', serif; }
        .orbit-theme .hl { font-weight: 700; display: inline-block; }
        .orbit-theme .shloka, .orbit-theme .small, .orbit-theme li { font-family: 'Noto Serif Gujarati', serif; }
        .orbit-theme .shloka { font-size: .88rem; line-height: 1.8; }
        .orbit-theme .small { font-size: .88rem; line-height: 1.8; }
        .orbit-theme li { font-size: .9rem; }

        .orbit-theme .div-svg { display: block; width: 170px; height: 18px; margin: 4px auto 8px; overflow: visible; }
        .orbit-theme .div-svg path { stroke: var(--gold); fill: none; stroke-width: 1.5; stroke-linecap: round; }
        .orbit-theme .div-svg g { fill: var(--gold); transform-origin: 85px 9px; animation: spin 9s linear infinite; }

        .orbit-theme .ganesh { display: block; font-size: 2rem; color: var(--gold); animation: sway 4s ease-in-out infinite; }
        @keyframes sway { 0%,100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }

        .orbit-theme .couple { display: flex; justify-content: center; gap: 4px; margin: 4px 0; }
        .orbit-theme .pw { flex: 1; max-width: 122px; }
        .orbit-theme .pw b { display: block; font-weight: 800; font-size: 1rem; margin-top: 6px; }
        .orbit-theme .amp { align-self: center; font-family: 'Noto Serif Gujarati', serif; font-size: .9rem; padding-bottom: 22px; }
        .orbit-theme .amp::before { content: "♥"; display: block; color: #c8374f; font-size: 1.2rem; animation: beat 1.6s infinite; }
        @keyframes beat { 50% { transform: scale(1.25); } }

        .orbit-theme .ph {
          position: relative; display: block; width: 100%; aspect-ratio: 3/4; cursor: pointer;
          border-radius: 60px 60px 6px 6px; overflow: hidden; border: 2px solid var(--gold);
          background: linear-gradient(160deg, #eadfba, #cdbb82);
          box-shadow: 0 0 0 3px var(--paper1), 0 0 0 4px var(--gold), 0 8px 18px rgba(60,40,10,.35);
        }
        .orbit-theme .ph img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; animation: ken 14s ease-in-out infinite alternate; }
        @keyframes ken { to { transform: scale(1.12); } }
        .orbit-theme .add { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 1.6rem; line-height: 1.4; color: var(--h1); }

        .orbit-theme .fx { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 1; border-radius: 12px; }
        .orbit-theme .fx i {
          position: absolute; top: -6%; width: 9px; height: 12px; border-radius: 0 100% 0 100%;
          opacity: .55; animation: orbitFall linear infinite;
        }
        @keyframes orbitFall { to { transform: translate(30px, 115vh) rotate(500deg); } }
      `}</style>

      {/* Orbiting Golden Rings in Background */}
      <div id="bg">
        <div className="ring" style={{ '--a': 'o1', '--s': '90vmin', '--t': '38s' }}></div>
        <div className="ring" style={{ '--a': 'o2', '--s': '74vmin', '--t': '52s' }}></div>
        <div className="ring" style={{ '--a': 'o3', '--s': '108vmin', '--t': '70s' }}></div>
        <div className="ring" style={{ '--a': 'o1', '--s': '56vmin', '--t': '26s' }}></div>
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

      {/* Back button */}
      <div className="fixed top-4 left-4 z-40 flex items-center gap-3">
        <button
          onClick={onClose}
          className="flex items-center gap-2 rounded-full border border-[var(--gold)] bg-[#070b1c]/80 px-4 py-1.5 text-sm font-bold text-[#f3dc9a] shadow-lg backdrop-blur hover:scale-105 active:scale-95"
        >
          ← પાછા જાઓ
        </button>
      </div>

      {/* 3D Coverflow Stage */}
      <div id="stage">
        <div
          id="deck"
          style={{
            transform: `rotateY(${tilt.mx * 5}deg) rotateX(${tilt.my * -3}deg)`,
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
            const d = idx - cur
            const ad = Math.abs(d)
            const isHide = ad > 3
            const isActive = d === 0

            return (
              <section
                key={idx}
                onClick={() => go(idx)}
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
                <div className="fx">
                  {petals.map((p) => (
                    <i key={p.id} style={{ left: p.left, background: p.col, animationDuration: p.dur, animationDelay: p.del }} />
                  ))}
                </div>

                <div className="arch">
                  {MandalaSVG}

                  {idx === 0 && (
                    <>
                      <span className="ganesh">ॐ</span>
                      <p className="shloka">વક્રતુંડ મહાકાય, સૂર્યકોટિ સમપ્રભ ।<br />નિર્વિઘ્નં કુરુ મે દેવ, સર્વકાર્યેષુ સર્વદા ॥</p>
                      <h2 className="mt-2">શુભ વિવાહ</h2>
                      <div className="couple">
                        <div className="pw">
                          <label className="ph">
                            {groomPhoto ? <img alt="Groom" src={groomPhoto} /> : (
                              <span className="add">📷<small className="text-[0.68rem]">ફોટો ઉમેરો</small></span>
                            )}
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, 'groom')} />
                          </label>
                          <b>{groomName}</b>
                        </div>
                        <div className="amp">સંગ</div>
                        <div className="pw">
                          <label className="ph">
                            {bridePhoto ? <img alt="Bride" src={bridePhoto} /> : (
                              <span className="add">📷<small className="text-[0.68rem]">ફોટો ઉમેરો</small></span>
                            )}
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, 'bride')} />
                          </label>
                          <b>{brideName}</b>
                        </div>
                      </div>
                      <p className="hl mt-2">{dateLine}</p>
                      <h3>નિમંત્રક</h3>
                      <p className="small">
                        {inv.inviters?.map((line, lidx) => <span key={lidx}>{line}<br /></span>) || (
                          <>
                            શ્રી ………………………… પરિવાર<br />
                            શ્રી ………………………… પરિવાર<br />
                            સરનામું: ……………………………, સુરત<br />
                            મો. ……………………… , ………………………
                          </>
                        )}
                      </p>
                      <p className="mt-3 text-[11px] font-bold text-[var(--gold)] animate-pulse">
                        📜 નીચે સ્ક્રોલ કરીને પાનાં ફેરવો (Scroll to Explore) ↓
                      </p>
                    </>
                  )}

                  {idx === 1 && (
                    <>
                      <span className="text-xs font-bold text-[var(--gold)]">॥ શ્રી ગણેશાય નમઃ ॥</span>
                      <h2 className="mt-2">વિવાહ સંસ્કાર</h2>
                      {DividerSVG}
                      <p className="small mt-2">સ્નેહીશ્રી, આપ સર્વેને જણાવતાં અત્યંત હર્ષ થાય છે કે અમારા પરિવારના ચિરંજીવી</p>
                      <div className="names my-3 text-[1.7rem]">
                        {groomName}<span className="sang">સંગ</span>{brideName}
                      </div>
                      <p className="small">ના શુભ વિવાહ પ્રસંગે આપ સપરિવાર પધારી નવદંપતીને આશીર્વાદ આપી અમારા આનંદમાં વધારો કરશો એવી નમ્ર વિનંતી.</p>
                    </>
                  )}

                  {idx === 2 && (
                    <>
                      <h2>હલ્દી રસમ</h2>
                      {DividerSVG}
                      <h3>સ્વરુચી ભોજન</h3>
                      <p className="mt-1">બુધવાર, તા. ૧૨-૦૨-૨૦૨૫ ના રોજ<br />આપની પધારવા વિનંતી.<br /><span className="hl">(ભોજન : બપોરે ૧૨:૦૦ કલાકે)</span></p>
                      <h3>શુભ સ્થળ</h3>
                      <p className="mt-1">{venueName},<br />{venueLines.join(', ')}</p>
                    </>
                  )}

                  {idx === 3 && (
                    <>
                      <h2>લગ્નોત્સવ</h2>
                      {DividerSVG}
                      <p className="small">બે હૃદયનું મિલન, બે પરિવારનો સંગમ…<br />આપની હાજરી અમારા આનંદનો ઉત્સવ બનાવશે.</p>
                      <h3>મંડપ મુહૂર્ત</h3>
                      <p>બુધવાર, તા. ૧૨-૦૨-૨૦૨૫<br /><span className="hl">……… કલાકે</span><br />(સ્થળ : {venueName})</p>
                      <h3>ભોજન સમારંભ</h3>
                      <p>ગુરુવાર, તા. ૧૩-૦૨-૨૦૨૫<br /><span className="hl">……… કલાકે</span><br />(સ્થળ : {venueName})</p>
                    </>
                  )}

                  {idx === 4 && (
                    <>
                      <h2>પ્રેમ રાસ</h2>
                      {DividerSVG}
                      <h3>સ્વરુચી ભોજન</h3>
                      <p className="mt-1">બુધવાર, તા. ૧૨-૦૨-૨૦૨૫ ના રોજ<br />આપની પધારવા વિનંતી.<br /><span className="hl">(ભોજન : સાંજે ૯:૦૦ કલાકે)</span></p>
                      <h3>શુભ સ્થળ</h3>
                      <p className="mt-1">{venueName},<br />{venueLines.join(', ')}</p>
                    </>
                  )}

                  {idx === 5 && (
                    <>
                      <h3 className="mt-0">જાન પ્રસ્થાન</h3>
                      <p>ગુરુવાર, તા. ૧૩-૦૨-૨૦૨૫<br />બપોરે <span className="hl">૨:૩૦ કલાકે</span><br />(સ્થળ : ………………………………)</p>
                      <h3>હસ્ત મેળાપ</h3>
                      <p>ગુરુવાર, તા. ૧૩-૦૨-૨૦૨૫<br />શુભ ચોઘડિયે</p>
                      <h3>મધુર કલરવ</h3>
                      <p className="small">લગ્નના શુભ પ્રસંગે પ્રેમ અને સ્નેહની લાગણીઓ સાથે આપ સૌની હાજરી અમારા માટે આશીર્વાદ સમાન છે. પધારશો જ, એવી અપેક્ષા સહ.</p>
                      <p className="small hl mt-2">– સાદર, સૌ સ્નેહીજનો</p>
                    </>
                  )}

                  {idx === 6 && (
                    <>
                      <h2 className="text-[1.35rem]">લિ. સ્નેહાધીન</h2>
                      <ul className="list-none space-y-1 my-2">
                        {inv.family?.sneh?.map((m, sidx) => <li key={sidx}>{m}</li>) || (
                          <>
                            <li>શ્રી ………………………… પરિવાર</li>
                            <li>શ્રી ………………………… પરિવાર</li>
                            <li>શ્રી ………………………… પરિવાર</li>
                            <li>શ્રી ………………………… પરિવાર</li>
                          </>
                        )}
                      </ul>
                      <h2 className="text-[1.35rem] mt-3">લિ. દર્શનાભિલાષી</h2>
                      <ul className="list-none space-y-1 my-2">
                        {inv.family?.darshan?.map((m, sidx) => <li key={sidx}>{m}</li>) || (
                          <>
                            <li>શ્રી ………………………… પરિવાર</li>
                            <li>શ્રી ………………………… પરિવાર</li>
                            <li>શ્રી ………………………… પરિવાર</li>
                          </>
                        )}
                      </ul>
                    </>
                  )}

                  {idx === 7 && (
                    <>
                      <h3 className="mt-0">મોસાળ પક્ષ</h3>
                      <p className="small">{inv.family?.mosal?.join(', ') || 'શ્રી ………………………… પરિવાર'}</p>
                      <h3>બાણેજ પક્ષ</h3>
                      <p className="small">{inv.family?.banej?.join(', ') || 'પરમ, જાનવી, પ્રિયંક, વિધ્યા'}</p>
                      <h3>ફર્મ</h3>
                      <p className="small">{inv.family?.firm?.join(', ') || '………………………… ઈન્ડસ્ટ્રીઝ'}</p>
                      <h3>આમંત્રણ</h3>
                      <p className="small">શ્રી {groomName.replace('ચિ. ', '')}ના શુભ લગ્ન પ્રસંગે ખુશીથી ઉજવણી સહ સમસ્ત પરિવાર આપ સર્વેને ડિજિટલ કાર્ડ દ્વારા આમંત્રણ પાઠવીએ છીએ. આપની હાજરી અમારા માટે અમૂલ્ય છે.</p>
                      <p className="hl mt-2">સ્થળ : {venueName}, જૂનાગઢ</p>

                      {/* Interactive Venue Route & WhatsApp RSVP */}
                      <div className="mt-3 flex flex-col gap-2">
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(venueName + ', ' + venueLines.join(', '))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--gold)] bg-[rgba(201,162,74,.18)] px-4 py-1.5 text-xs font-bold text-[#1b2340] hover:bg-[var(--gold)] hover:text-white transition shadow-sm"
                        >
                          <span>📍</span>
                          <span>ગૂગલ મેપ પર લોકેશન જુઓ</span>
                        </a>
                        <a
                          href={`https://wa.me/919687336426?text=${encodeURIComponent(`નમસ્તે AJ Invitation, ${groomName} સંગ ${brideName} ના લગ્ન પ્રસંગે હાર્દિક શુભકામનાઓ!`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 px-4 py-1.5 text-xs font-bold text-white shadow transition"
                        >
                          <span>💬</span>
                          <span>વોટ્સએપ પર શુભેચ્છા પાઠવો (RSVP)</span>
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </section>
            )
          })}
        </div>
      </div>

      {/* Floating Bottom Navigation */}
      <div className="fixed inset-x-0 bottom-5 z-40 flex items-center justify-center gap-3">
        <button
          onClick={() => go(cur - 1)}
          disabled={cur === 0}
          aria-label="previous"
          className="h-10 w-10 rounded-full border border-[var(--gold)] bg-[#0a1030]/80 text-xl font-bold text-[#f3dc9a] shadow backdrop-blur transition disabled:opacity-30 hover:scale-105 active:scale-95"
        >
          ‹
        </button>
        <div className="flex items-center gap-2 bg-[#0a1030]/60 px-3 py-1.5 rounded-full border border-[rgba(201,162,74,.3)] backdrop-blur">
          {Array.from({ length: pagesCount }, (_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all duration-400 ${i === cur ? 'w-5 bg-[var(--g2)]' : 'w-2 bg-[rgba(243,220,154,.35)]'}`}
            />
          ))}
          <span className="text-[11px] font-bold text-[#f3dc9a] ml-1">
            {cur + 1}/{pagesCount}
          </span>
        </div>
        <button
          onClick={() => go(cur + 1)}
          disabled={cur === pagesCount - 1}
          aria-label="next"
          className="h-10 w-10 rounded-full border border-[var(--gold)] bg-[#0a1030]/80 text-xl font-bold text-[#f3dc9a] shadow backdrop-blur transition disabled:opacity-30 hover:scale-105 active:scale-95"
        >
          ›
        </button>
      </div>
    </div>
  )
}
