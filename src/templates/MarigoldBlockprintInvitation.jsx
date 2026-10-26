import { useState, useEffect, useRef } from 'react'

export default function MarigoldBlockprintInvitation({ inv, onClose }) {
  const [cur, setCur] = useState(0)
  const [groomPhoto, setGroomPhoto] = useState(inv.photos?.groom || null)
  const [bridePhoto, setBridePhoto] = useState(inv.photos?.bride || null)
  const trackRef = useRef(null)

  const pagesCount = 8
  const gu = (n) => n.toLocaleString('gu-IN')

  const groomName = inv.groom || 'ચિ. દર્શન'
  const brideName = inv.bride || 'ચિ. ઈશિતા'
  const dateLine = inv.dateLine || 'તા. ૧૩-૦૨-૨૦૨૫, ગુરુવાર'
  const venueName = inv.venue?.name || 'નીલકંઠ ફાર્મ પાર્ટી પ્લોટ'
  const venueLines = inv.venue?.lines || ['જૂનાગઢ બાયપાસ રોડ', 'કાંકરડા ચોકડી, જૂનાગઢ.']

  // Load photos from storage or invitation
  useEffect(() => {
    try {
      const g = localStorage.getItem(`wed_marigold_groom_${inv.id}`)
      if (g) setGroomPhoto(g)
      const b = localStorage.getItem(`wed_marigold_bride_${inv.id}`)
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
          try { localStorage.setItem(`wed_marigold_groom_${inv.id}`, dataUrl) } catch (err) {}
        } else {
          setBridePhoto(dataUrl)
          try { localStorage.setItem(`wed_marigold_bride_${inv.id}`, dataUrl) } catch (err) {}
        }
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  const scrollToPage = (idx) => {
    if (!trackRef.current) return
    const target = Math.max(0, Math.min(pagesCount - 1, idx))
    trackRef.current.scrollTo({
      left: target * trackRef.current.clientWidth,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const handleScroll = () => {
      const w = track.clientWidth
      if (!w) return
      const pageIndex = Math.round(track.scrollLeft / w)
      setCur(pageIndex)
    }

    track.addEventListener('scroll', handleScroll, { passive: true })
    return () => track.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') scrollToPage(cur + 1)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') scrollToPage(cur - 1)
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [cur])

  // Sun and Flower SVGs
  const ray = Array.from({ length: 24 }, (_, i) => (
    <path key={i} d="M100 100L94 8H106Z" transform={`rotate(${i * 15} 100 100)`} fill="#fff4d6" />
  ))
  const SunSVG = (
    <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_80s_linear_infinite]">
      {ray}
      <circle cx="100" cy="100" r="46" fill="none" stroke="#fff4d6" strokeWidth="3" />
      <circle cx="100" cy="100" r="30" fill="#fff4d6" />
    </svg>
  )

  const FlowerSVG = (
    <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_50s_linear_infinite]">
      {[0, 1, 2].map((l) =>
        Array.from({ length: 18 - l * 4 }, (_, i) => {
          const n = 18 - l * 4
          return (
            <ellipse
              key={`${l}-${i}`}
              cx="100"
              cy={34 + l * 18}
              rx={11 - l * 2}
              ry={30 - l * 7}
              transform={`rotate(${(i * 360) / n + l * 9} 100 100)`}
              fill={['#e8590c', '#f5a623', '#ffd54a'][l]}
              stroke="#b5400a"
              strokeWidth="0.6"
            />
          )
        })
      )}
      <circle cx="100" cy="100" r="10" fill="#7a3a0a" />
    </svg>
  )

  const FlowerSVGB = (
    <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_50s_linear_infinite] [animation-direction:reverse]">
      {[0, 1, 2].map((l) =>
        Array.from({ length: 18 - l * 4 }, (_, i) => {
          const n = 18 - l * 4
          return (
            <ellipse
              key={`${l}-${i}`}
              cx="100"
              cy={34 + l * 18}
              rx={11 - l * 2}
              ry={30 - l * 7}
              transform={`rotate(${(i * 360) / n + l * 9} 100 100)`}
              fill={['#e8590c', '#f5a623', '#ffd54a'][l]}
              stroke="#b5400a"
              strokeWidth="0.6"
            />
          )
        })
      )}
      <circle cx="100" cy="100" r="10" fill="#7a3a0a" />
    </svg>
  )

  const DividerSVG = (
    <svg className="div-svg" viewBox="0 0 190 20">
      <path d="M4 10C32 2 62 18 84 10" />
      <path d="M186 10C158 2 128 18 106 10" />
      <g>
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse
            key={i}
            cx="95"
            cy="4"
            rx="2.4"
            ry="5"
            transform={`rotate(${i * 45} 95 10)`}
            fill={i % 2 ? '#f5a623' : '#e8590c'}
          />
        ))}
      </g>
    </svg>
  )

  const flagColors = ['#c2185b', '#f5a623', '#2e5d2a', '#e8590c', '#fff4d6']

  const renderBackgroundElements = () => (
    <>
      <div className="sun">{SunSVG}</div>
      <div className="bigf a">{FlowerSVG}</div>
      <div className="bigf b">{FlowerSVGB}</div>
      <div className="flags">
        {Array.from({ length: 10 }, (_, i) => (
          <i
            key={i}
            style={{
              '--c': flagColors[i % 5],
              animationDelay: `${-i * 0.37}s`,
            }}
          />
        ))}
      </div>
    </>
  )

  // Floating petals
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${(i * 9 + 4) % 100}%`,
    dur: `${8 + (i % 5) * 2}s`,
    del: `-${(i * 1.5) % 12}s`,
    col: ['#f5a623', '#e8590c', '#ffd54a'][i % 3]
  }))

  const fireflies = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${(i * 17) % 96}%`,
    top: `${(i * 23) % 92}%`,
    del: `-${(i * 0.7) % 4}s`
  }))

  return (
    <div className="marigold-theme fixed inset-0 z-50 overflow-hidden font-['Noto_Serif_Gujarati',serif] text-[#4a1d2b] select-none">
      <style>{`
        .marigold-theme {
          --cream: #fff4d6;
          --mar: #f5a623;
          --sf: #e8590c;
          --mg: #c2185b;
          --gr: #2e5d2a;
          --ink: #4a1d2b;
          background: #7a1f33;
        }
        .marigold-theme #track {
          position: fixed; inset: 0; display: flex; overflow-x: auto; overflow-y: hidden;
          scroll-snap-type: x mandatory; scroll-behavior: smooth; scrollbar-width: none;
        }
        .marigold-theme #track::-webkit-scrollbar { display: none; }
        
        .marigold-theme .page {
          --c1: #f5a623; --c2: #e8590c;
          flex: 0 0 100vw; height: 100%; scroll-snap-align: center;
          position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center;
          padding: 80px 18px 100px;
          background:
            radial-gradient(circle at 25% 25%, rgba(255,255,255,.2) 0 7px, transparent 8px) 0 0/56px 56px,
            radial-gradient(circle at 75% 75%, rgba(0,0,0,.12) 0 5px, transparent 6px) 0 0/56px 56px,
            conic-gradient(from 45deg at 50% 50%, rgba(255,255,255,.07) 0 25%, transparent 0 50%, rgba(255,255,255,.07) 0 75%, transparent 0) 0 0/56px 56px,
            linear-gradient(160deg, var(--c1), var(--c2));
        }
        .marigold-theme .p2, .marigold-theme .p7 { --c1: #d81b73; --c2: #7a0e3d; }
        .marigold-theme .p3, .marigold-theme .p6 { --c1: #ffc43a; --c2: #f08a12; }
        .marigold-theme .p4, .marigold-theme .p8 { --c1: #3f8a3a; --c2: #163a1c; }
        .marigold-theme .p5 { --c1: #2a2a6e; --c2: #0c0c33; }

        .marigold-theme .arch {
          position: relative; z-index: 4; width: min(90vw, 400px); max-height: calc(100svh - 170px);
          overflow-y: auto; scrollbar-width: none; text-align: center; padding: 26px 18px;
          background: var(--cream);
          border: 12px solid;
          border-image: repeating-linear-gradient(45deg, #c2185b 0 8px, #f5a623 8px 16px, #2e5d2a 16px 24px) 12;
          box-shadow: 0 22px 50px rgba(0,0,0,.45), inset 0 0 40px rgba(232,89,12,.14);
          clip-path: circle(150% at 50% 50%);
        }
        .marigold-theme .arch::-webkit-scrollbar { display: none; }
        .marigold-theme .p5 .arch { background: #fff2dc; }

        .marigold-theme .sun {
          position: absolute; left: 50%; top: 50%; width: 150vmin; height: 150vmin;
          margin: -75vmin 0 0 -75vmin; z-index: 1; pointer-events: none; opacity: .28;
        }
        .marigold-theme .bigf {
          position: absolute; z-index: 2; width: min(60vw, 300px); pointer-events: none;
        }
        .marigold-theme .bigf.a { left: -14vw; bottom: -10vh; }
        .marigold-theme .bigf.b { right: -16vw; top: -6vh; width: min(50vw, 250px); }

        .marigold-theme .flags {
          position: absolute; top: 0; left: 0; right: 0; height: 80px; z-index: 5;
          display: flex; justify-content: space-around; pointer-events: none;
        }
        .marigold-theme .flags::before {
          content: ""; position: absolute; top: 6px; left: 0; right: 0; height: 3px;
          background: var(--cream); box-shadow: 0 2px 4px rgba(0,0,0,.3);
        }
        .marigold-theme .flags i {
          margin-top: 8px; border-left: 17px solid transparent; border-right: 17px solid transparent;
          border-top: 42px solid var(--c); transform-origin: top;
          animation: wave 2.6s ease-in-out infinite; filter: drop-shadow(0 3px 2px rgba(0,0,0,.3));
        }
        @keyframes wave { 0%,100% { transform: rotate(-9deg); } 50% { transform: rotate(9deg); } }

        .marigold-theme h2, .marigold-theme h3, .marigold-theme .names, .marigold-theme .pw b {
          font-family: 'Baloo Bhai 2', 'Noto Serif Gujarati', sans-serif;
          color: var(--mg); text-shadow: 2px 2px 0 var(--mar);
        }
        .marigold-theme h2 { font-weight: 800; font-size: 2rem; line-height: 1.35; }
        .marigold-theme h3 { font-weight: 700; font-size: 1.25rem; margin: 10px 0 0; }
        .marigold-theme .names { font-weight: 800; font-size: 2.1rem; line-height: 1.25; }
        .marigold-theme .sang { display: block; font-family: 'Noto Serif Gujarati', serif; font-size: 1.05rem; color: var(--gr); text-shadow: none; }
        .marigold-theme .hl { font-family: 'Baloo Bhai 2', sans-serif; font-weight: 700; color: var(--sf); font-size: 1.05em; }
        .marigold-theme .shloka { font-size: .9rem; color: var(--gr); }
        .marigold-theme .small, .marigold-theme .arch p { font-size: .92rem; line-height: 1.8; }
        .marigold-theme li { font-size: .92rem; }

        .marigold-theme .div-svg { display: block; width: 190px; height: 20px; margin: 4px auto 8px; overflow: visible; }
        .marigold-theme .div-svg path { stroke: var(--mg); fill: none; stroke-width: 2; stroke-linecap: round; }
        .marigold-theme .div-svg g { transform-origin: 95px 10px; animation: spin 8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .marigold-theme .ganesh { display: block; font-size: 2.2rem; color: var(--sf); animation: wob 3s ease-in-out infinite; }
        @keyframes wob { 50% { transform: rotate(7deg) scale(1.1); } }

        .marigold-theme .couple { display: flex; justify-content: center; gap: 10px; margin: 6px 0; }
        .marigold-theme .pw { flex: 1; max-width: 120px; }
        .marigold-theme .pw b { display: block; font-size: 1rem; margin-top: 8px; }
        .marigold-theme .amp { align-self: center; font-family: 'Noto Serif Gujarati', serif; font-size: .95rem; padding-bottom: 22px; color: var(--gr); }
        .marigold-theme .amp::before { content: "♥"; display: block; color: var(--mg); font-size: 1.3rem; animation: beat 1.4s infinite; }
        @keyframes beat { 50% { transform: scale(1.3); } }

        .marigold-theme .ph {
          position: relative; display: block; width: 100%; aspect-ratio: 1; cursor: pointer;
          border-radius: 50%; overflow: hidden; background: #f7dca0;
          box-shadow: 0 0 0 3px var(--cream), 0 0 0 6px var(--mg), 0 0 0 9px var(--mar), 0 8px 18px rgba(0,0,0,.35);
          animation: bob 4s ease-in-out infinite;
        }
        @keyframes bob { 50% { transform: translateY(-5px); } }
        .marigold-theme .ph img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .marigold-theme .add { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 1.5rem; line-height: 1.3; color: var(--mg); }

        .marigold-theme .fx { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 3; }
        .marigold-theme .fx i { position: absolute; top: -6%; width: 12px; height: 12px; border-radius: 50%; animation: fall linear infinite; opacity: .88; }
        @keyframes fall { to { transform: translate(50px, 115vh) rotate(400deg); } }
        .marigold-theme .fly { position: absolute; width: 6px; height: 6px; border-radius: 50%; background: #ffe9a0; box-shadow: 0 0 12px 4px rgba(255,220,140,.9); animation: tw 4s ease-in-out infinite; }
        @keyframes tw { 0%,100% { opacity: .1; transform: scale(.5); } 50% { opacity: 1; transform: scale(1.4); } }
      `}</style>

      {/* Top Header / Back Button */}
      <div className="fixed top-4 left-4 z-40 flex items-center gap-3">
        <button
          onClick={onClose}
          className="flex items-center gap-2 rounded-full border-2 border-[#fff4d6] bg-[#c2185b] px-4 py-1.5 text-sm font-bold text-[#fff4d6] shadow-lg transition hover:scale-105 active:scale-95"
        >
          ← પાછા જાઓ
        </button>
      </div>

      <div id="track" ref={trackRef}>
        {/* Page 1 : કવર */}
        <section className="page p1 in">
          {renderBackgroundElements()}
          <div className="fx">
            {petals.map((p) => (
              <i key={p.id} style={{ left: p.left, background: `radial-gradient(#ffe27a 25%, ${p.col} 70%)`, animationDuration: p.dur, animationDelay: p.del }} />
            ))}
          </div>
          <div className="arch">
            <span className="ganesh">ॐ</span>
            <p className="shloka">વક્રતુંડ મહાકાય, સૂર્યકોટિ સમપ્રભ ।<br />નિર્વિઘ્નં કુરુ મે દેવ, સર્વકાર્યેષુ સર્વદા ॥</p>
            <h2 className="mt-3">શુભ વિવાહ</h2>
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
              {inv.inviters?.map((line, idx) => <span key={idx}>{line}<br /></span>) || (
                <>
                  શ્રી ………………………… પરિવાર<br />
                  શ્રી ………………………… પરિવાર<br />
                  સરનામું: ……………………………, સુરત<br />
                  મો. ……………………… , ………………………
                </>
              )}
            </p>
          </div>
        </section>

        {/* Page 2 : વિવાહ સંસ્કાર */}
        <section className="page p2 in">
          {renderBackgroundElements()}
          <div className="fx">
            {petals.map((p) => (
              <i key={p.id} style={{ left: p.left, background: `radial-gradient(#ffe27a 25%, ${p.col} 70%)`, animationDuration: p.dur, animationDelay: p.del }} />
            ))}
          </div>
          <div className="arch">
            <span className="text-sm font-bold text-[#c2185b]">॥ શ્રી ગણેશાય નમઃ ॥</span>
            <h2 className="mt-2">વિવાહ સંસ્કાર</h2>
            {DividerSVG}
            <p className="small mt-2">સ્નેહીશ્રી, આપ સર્વેને જણાવતાં અત્યંત હર્ષ થાય છે કે અમારા પરિવારના ચિરંજીવી</p>
            <div className="names my-3 text-[1.8rem]">
              {groomName}<span className="sang">સંગ</span>{brideName}
            </div>
            <p className="small">ના શુભ વિવાહ પ્રસંગે આપ સપરિવાર પધારી નવદંપતીને આશીર્વાદ આપી અમારા આનંદમાં વધારો કરશો એવી નમ્ર વિનંતી.</p>
          </div>
        </section>

        {/* Page 3 : હલ્દી રસમ */}
        <section className="page p3 in">
          {renderBackgroundElements()}
          <div className="fx">
            {petals.map((p) => (
              <i key={p.id} style={{ left: p.left, background: `radial-gradient(#ffe27a 25%, ${p.col} 70%)`, animationDuration: p.dur, animationDelay: p.del }} />
            ))}
          </div>
          <div className="arch">
            <h2>હલ્દી રસમ</h2>
            {DividerSVG}
            <h3>સ્વરુચી ભોજન</h3>
            <p className="mt-1">બુધવાર, તા. ૧૨-૦૨-૨૦૨૫ ના રોજ<br />આપની પધારવા વિનંતી.<br /><span className="hl">(ભોજન : બપોરે ૧૨:૦૦ કલાકે)</span></p>
            <h3>શુભ સ્થળ</h3>
            <p className="mt-1">{venueName},<br />{venueLines.join(', ')}</p>
          </div>
        </section>

        {/* Page 4 : લગ્નોત્સવ */}
        <section className="page p4 in">
          {renderBackgroundElements()}
          <div className="fx">
            {fireflies.map((f) => (
              <span key={f.id} className="fly" style={{ left: f.left, top: f.top, animationDelay: f.del }} />
            ))}
          </div>
          <div className="arch">
            <h2>લગ્નોત્સવ</h2>
            {DividerSVG}
            <p className="small">બે હૃદયનું મિલન, બે પરિવારનો સંગમ…<br />આપની હાજરી અમારા આનંદનો ઉત્સવ બનાવશે.</p>
            <h3>મંડપ મુહૂર્ત</h3>
            <p>બુધવાર, તા. ૧૨-૦૨-૨૦૨૫<br /><span className="hl">……… કલાકે</span><br />(સ્થળ : {venueName})</p>
            <h3>ભોજન સમારંભ</h3>
            <p>ગુરુવાર, તા. ૧૩-૦૨-૨૦૨૫<br /><span className="hl">……… કલાકે</span><br />(સ્થળ : {venueName})</p>
          </div>
        </section>

        {/* Page 5 : પ્રેમ રાસ */}
        <section className="page p5 in">
          {renderBackgroundElements()}
          <div className="fx">
            {fireflies.map((f) => (
              <span key={f.id} className="fly" style={{ left: f.left, top: f.top, animationDelay: f.del }} />
            ))}
          </div>
          <div className="arch">
            <h2>પ્રેમ રાસ</h2>
            {DividerSVG}
            <h3>સ્વરુચી ભોજન</h3>
            <p className="mt-1">બુધવાર, તા. ૧૨-૦૨-૨૦૨૫ ના રોજ<br />આપની પધારવા વિનંતી.<br /><span className="hl">(ભોજન : સાંજે ૯:૦૦ કલાકે)</span></p>
            <h3>શુભ સ્થળ</h3>
            <p className="mt-1">{venueName},<br />{venueLines.join(', ')}</p>
          </div>
        </section>

        {/* Page 6 : જાન પ્રસ્થાન */}
        <section className="page p6 in">
          {renderBackgroundElements()}
          <div className="fx">
            {petals.map((p) => (
              <i key={p.id} style={{ left: p.left, background: `radial-gradient(#ffe27a 25%, ${p.col} 70%)`, animationDuration: p.dur, animationDelay: p.del }} />
            ))}
          </div>
          <div className="arch">
            <h3 className="mt-0">જાન પ્રસ્થાન</h3>
            <p>ગુરુવાર, તા. ૧૩-૦૨-૨૦૨૫<br />બપોરે <span className="hl">૨:૩૦ કલાકે</span><br />(સ્થળ : ………………………………)</p>
            <h3>હસ્ત મેળાપ</h3>
            <p>ગુરુવાર, તા. ૧૩-૦૨-૨૦૨૫<br />શુભ ચોઘડિયે</p>
            <h3>મધુર કલરવ</h3>
            <p className="small">લગ્નના શુભ પ્રસંગે પ્રેમ અને સ્નેહની લાગણીઓ સાથે આપ સૌની હાજરી અમારા માટે આશીર્વાદ સમાન છે. પધારશો જ, એવી અપેક્ષા સહ.</p>
            <p className="small hl mt-2">– સાદર, સૌ સ્નેહીજનો</p>
          </div>
        </section>

        {/* Page 7 : સ્નેહાધીન */}
        <section className="page p7 in">
          {renderBackgroundElements()}
          <div className="fx">
            {petals.map((p) => (
              <i key={p.id} style={{ left: p.left, background: `radial-gradient(#ffe27a 25%, ${p.col} 70%)`, animationDuration: p.dur, animationDelay: p.del }} />
            ))}
          </div>
          <div className="arch">
            <h2 className="text-[1.4rem]">લિ. સ્નેહાધીન</h2>
            <ul className="list-none space-y-1 my-2">
              {inv.family?.sneh?.map((m, idx) => <li key={idx}>{m}</li>) || (
                <>
                  <li>શ્રી ………………………… પરિવાર</li>
                  <li>શ્રી ………………………… પરિવાર</li>
                  <li>શ્રી ………………………… પરિવાર</li>
                  <li>શ્રી ………………………… પરિવાર</li>
                </>
              )}
            </ul>
            <h2 className="text-[1.4rem] mt-4">લિ. દર્શનાભિલાષી</h2>
            <ul className="list-none space-y-1 my-2">
              {inv.family?.darshan?.map((m, idx) => <li key={idx}>{m}</li>) || (
                <>
                  <li>શ્રી ………………………… પરિવાર</li>
                  <li>શ્રી ………………………… પરિવાર</li>
                  <li>શ્રી ………………………… પરિવાર</li>
                </>
              )}
            </ul>
          </div>
        </section>

        {/* Page 8 : મોસાળ / આમંત્રણ */}
        <section className="page p8 in">
          {renderBackgroundElements()}
          <div className="fx">
            {petals.map((p) => (
              <i key={p.id} style={{ left: p.left, background: `radial-gradient(#ffe27a 25%, ${p.col} 70%)`, animationDuration: p.dur, animationDelay: p.del }} />
            ))}
          </div>
          <div className="arch">
            <h3 className="mt-0">મોસાળ પક્ષ</h3>
            <p className="small">{inv.family?.mosal?.join(', ') || 'શ્રી ………………………… પરિવાર'}</p>
            <h3>બાણેજ પક્ષ</h3>
            <p className="small">{inv.family?.banej?.join(', ') || 'પરમ, જાનવી, પ્રિયંક, વિધ્યા'}</p>
            <h3>ફર્મ</h3>
            <p className="small">{inv.family?.firm?.join(', ') || '………………………… ઈન્ડસ્ટ્રીઝ'}</p>
            <h3>આમંત્રણ</h3>
            <p className="small">શ્રી {groomName.replace('ચિ. ', '')}ના શુભ લગ્ન પ્રસંગે ખુશીથી ઉજવણી સહ સમસ્ત પરિવાર આપ સર્વેને ડિજિટલ કાર્ડ દ્વારા આમંત્રણ પાઠવીએ છીએ. આપની હાજરી અમારા માટે અમૂલ્ય છે.</p>
            <p className="hl mt-2">સ્થળ : {venueName}, જૂનાગઢ</p>
          </div>
        </section>
      </div>

      {/* Floating Bottom Navigation HUD */}
      <div className="fixed inset-x-0 bottom-5 z-40 flex items-center justify-center gap-4">
        <button
          onClick={() => scrollToPage(cur - 1)}
          disabled={cur === 0}
          aria-label="previous"
          className="h-11 w-11 rounded-full border-3 border-[#fff4d6] bg-[#f5a623] text-2xl font-bold text-[#c2185b] shadow-lg transition disabled:opacity-40 hover:scale-110 active:scale-95"
        >
          ‹
        </button>
        <span className="min-w-[70px] text-center font-['Baloo_Bhai_2'] text-lg font-bold text-[#fff4d6] drop-shadow-[1px_1px_0_#c2185b]">
          {gu(cur + 1)} / {gu(pagesCount)}
        </span>
        <button
          onClick={() => scrollToPage(cur + 1)}
          disabled={cur === pagesCount - 1}
          aria-label="next"
          className="h-11 w-11 rounded-full border-3 border-[#fff4d6] bg-[#f5a623] text-2xl font-bold text-[#c2185b] shadow-lg transition disabled:opacity-40 hover:scale-110 active:scale-95"
        >
          ›
        </button>
      </div>

      {/* Progress Bottom Bar */}
      <div
        className="fixed bottom-0 left-0 h-1.5 z-40 transition-all duration-500"
        style={{
          width: `${((cur + 1) / pagesCount) * 100}%`,
          background: 'repeating-linear-gradient(45deg, #c2185b 0 8px, #f5a623 8px 16px, #2e5d2a 16px 24px)',
        }}
      />
    </div>
  )
}
