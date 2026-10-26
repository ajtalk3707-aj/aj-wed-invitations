import { useState, useEffect, useRef } from 'react'

export default function RoyalPalaceInvitation({ inv, onClose }) {
  const [groomPhoto, setGroomPhoto] = useState(inv.photos?.groom || null)
  const [bridePhoto, setBridePhoto] = useState(inv.photos?.bride || null)
  const containerRef = useRef(null)

  const groomName = inv.groom || 'ચિ. દર્શન'
  const brideName = inv.bride || 'ચિ. ઈશિતા'
  const dateLine = inv.dateLine || 'તા. ૧૩-૦૨-૨૦૨૫, ગુરુવાર'
  const venueName = inv.venue?.name || 'નીલકંઠ ફાર્મ પાર્ટી પ્લોટ'
  const venueLines = inv.venue?.lines || ['જૂનાગઢ બાયપાસ રોડ', 'કાંકરડા ચોકડી, જૂનાગઢ.']

  // Load photos
  useEffect(() => {
    try {
      const g = localStorage.getItem(`wed_royal_groom_${inv.id}`)
      if (g) setGroomPhoto(g)
      const b = localStorage.getItem(`wed_royal_bride_${inv.id}`)
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
          try { localStorage.setItem(`wed_royal_groom_${inv.id}`, dataUrl) } catch (err) {}
        } else {
          setBridePhoto(dataUrl)
          try { localStorage.setItem(`wed_royal_bride_${inv.id}`, dataUrl) } catch (err) {}
        }
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  // Intersection observer for animating cards as user scrolls
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in')
        })
      },
      { threshold: 0.25 }
    )
    const pages = containerRef.current?.querySelectorAll('.page')
    pages?.forEach((p) => io.observe(p))
    return () => io.disconnect()
  }, [])

  // Floating gold dust
  const dustList = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: `${(i * 13 + 5) % 100}%`,
    dur: `${7 + (i % 6) * 1.5}s`,
    del: `-${(i * 1.8) % 12}s`,
  }))

  const CrestSVG = (
    <div className="crest">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#5a0f22" stroke="#e6bd5c" strokeWidth="3" />
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse
            key={i}
            cx="50"
            cy="26"
            rx="8"
            ry="22"
            transform={`rotate(${i * 45} 50 50)`}
            fill="#e6bd5c"
          />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse
            key={i}
            cx="50"
            cy="30"
            rx="5"
            ry="13"
            transform={`rotate(${i * 45 + 22.5} 50 50)`}
            fill="#fff0b8"
          />
        ))}
        <circle cx="50" cy="50" r="9" fill="#fff0b8" />
      </svg>
    </div>
  )

  const RangoliSVG = (
    <svg className="rangoli" viewBox="0 0 100 100" fill="none" stroke="#fff0b8" strokeWidth="0.3">
      {Array.from({ length: 16 }, (_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="22"
          rx="6"
          ry="30"
          transform={`rotate(${(i * 360) / 16} 50 50)`}
          stroke="#fff0b8"
          strokeWidth="0.3"
        />
      ))}
      {Array.from({ length: 24 }, (_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="10"
          rx="3"
          ry="12"
          transform={`rotate(${(i * 360) / 24} 50 50)`}
          stroke="#fff0b8"
          strokeWidth="0.3"
        />
      ))}
      <circle cx="50" cy="50" r="48" />
      <circle cx="50" cy="50" r="30" />
    </svg>
  )

  const DividerSVG = (
    <svg className="div-svg" viewBox="0 0 180 18">
      <path d="M2 9H72" />
      <path d="M178 9H108" />
      <g>
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse
            key={i}
            cx="90"
            cy="3.5"
            rx="2"
            ry="4.5"
            transform={`rotate(${i * 45} 90 9)`}
          />
        ))}
      </g>
    </svg>
  )

  const renderLanternsAndDiyas = () => (
    <>
      <div className="lantern" style={{ left: '6%', '--h': '20px', animationDelay: '0s' }}><i></i></div>
      <div className="lantern" style={{ left: '18%', '--h': '52px', animationDelay: '-1s' }}><i></i></div>
      <div className="lantern" style={{ left: '82%', '--h': '40px', animationDelay: '-2s' }}><i></i></div>
      <div className="lantern" style={{ left: '94%', '--h': '16px', animationDelay: '-3s' }}><i></i></div>
      <div className="diyas">
        <span className="diya" /><span className="diya" /><span className="diya" /><span className="diya" />
      </div>
    </>
  )

  return (
    <div ref={containerRef} className="royal-theme fixed inset-0 z-50 overflow-y-auto overflow-x-hidden font-['Hind_Vadodara',sans-serif] text-[#fff6e2] select-none scroll-smooth">
      <style>{`
        .royal-theme {
          --gold: #e6bd5c;
          --g2: #fff0b8;
          --ivory: #fff6e2;
          background: #1c0509;
        }
        .royal-theme .page {
          min-height: 100vh; min-height: 100svh;
          scroll-snap-align: start; display: flex; align-items: center; justify-content: center;
          padding: 80px 14px 90px; position: relative; overflow: hidden;
        }
        .royal-theme .p1 { background: radial-gradient(circle at 50% 35%, #7a1a2c, #2a0710 70%); }
        .royal-theme .p2 { background: radial-gradient(circle at 50% 35%, #0f6b52, #04251c 70%); }
        .royal-theme .p3 { background: radial-gradient(circle at 50% 35%, #c4651a, #4a1f08 70%); }
        .royal-theme .p4 { background: radial-gradient(circle at 50% 35%, #1f4fa0, #08183a 70%); }
        .royal-theme .p5 { background: radial-gradient(circle at 50% 35%, #4b2a86, #140a2e 70%); }
        .royal-theme .p6 { background: radial-gradient(circle at 50% 35%, #0f6b52, #04251c 70%); }
        .royal-theme .p7 { background: radial-gradient(circle at 50% 35%, #7a1a2c, #2a0710 70%); }
        .royal-theme .p8 { background: radial-gradient(circle at 50% 35%, #8c1f4a, #2e0a1c 70%); }

        .royal-theme .rangoli {
          position: absolute; left: 50%; top: 50%; width: 150vmin; height: 150vmin;
          margin: -75vmin 0 0 -75vmin; opacity: .14; animation: spin 90s linear infinite; pointer-events: none;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .royal-theme .arch {
          position: relative; z-index: 2; width: min(94vw, 430px); padding: 70px 24px 50px; text-align: center;
          border-radius: 220px 220px 10px 10px / 150px 150px 10px 10px;
          background: linear-gradient(rgba(60,10,22,.78), rgba(25,5,12,.88)), radial-gradient(circle, rgba(230,189,92,.2) 1.5px, transparent 2px) 0 0/16px 16px;
          border: 3px solid var(--gold);
          box-shadow: 0 0 0 5px rgba(20,5,10,.7), 0 0 0 8px var(--gold), 0 0 50px rgba(230,189,92,.4), 0 30px 60px rgba(0,0,0,.6);
          opacity: 0; transform: translateY(60px) scale(.9);
          transition: all 1.2s cubic-bezier(.2,.8,.2,1);
        }
        .royal-theme .page.in .arch { opacity: 1; transform: none; }
        .royal-theme .arch::before {
          content: ""; position: absolute; inset: 9px; border: 1px solid rgba(255,240,184,.55); border-radius: inherit; pointer-events: none;
        }
        .royal-theme .arch::after {
          content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
          background: linear-gradient(115deg, transparent 40%, rgba(255,240,184,.22) 50%, transparent 60%);
          background-size: 300% 100%; animation: sheen 5s ease-in-out infinite;
        }
        @keyframes sheen { from { background-position: 120% 0; } to { background-position: -120% 0; } }

        .royal-theme .crest {
          position: absolute; top: -34px; left: 50%; margin-left: -34px; width: 68px; height: 68px; z-index: 3;
          filter: drop-shadow(0 0 12px rgba(255,220,120,.9));
        }
        .royal-theme .crest svg { width: 100%; height: 100%; animation: spin 20s linear infinite; }

        .royal-theme h2, .royal-theme h3, .royal-theme .names, .royal-theme .hl, .royal-theme .pw b {
          background: linear-gradient(100deg, #c79a2e 10%, #fff3c0 35%, #e6bd5c 50%, #fff3c0 65%, #c79a2e 90%);
          background-size: 250% 100%; -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: foil 5s linear infinite; font-family: 'Noto Serif Gujarati', serif;
        }
        @keyframes foil { to { background-position: -250% 0; } }
        .royal-theme h2 { font-weight: 800; font-size: 1.85rem; letter-spacing: .05em; line-height: 1.5; }
        .royal-theme h3 { font-weight: 600; font-size: 1.2rem; margin: 16px 0 2px; }
        .royal-theme .names { font-weight: 800; font-size: 2.1rem; line-height: 1.4; }
        .royal-theme .sang { display: block; font-size: 1.1rem; color: var(--ivory); -webkit-text-fill-color: var(--ivory); font-family: 'Noto Serif Gujarati', serif; }
        .royal-theme .hl { font-weight: 600; display: inline-block; }
        .royal-theme .shloka, .royal-theme .small, .royal-theme li { font-family: 'Noto Serif Gujarati', serif; }
        .royal-theme .shloka { font-size: .95rem; line-height: 1.9; }
        .royal-theme .small { font-size: .92rem; line-height: 1.8; }
        .royal-theme li { font-size: .95rem; }

        .royal-theme .div-svg { display: block; width: 180px; height: 18px; margin: 6px auto 12px; overflow: visible; }
        .royal-theme .div-svg path { stroke: var(--gold); fill: none; stroke-width: 1.5; }
        .royal-theme .div-svg g { transform-origin: 90px 9px; animation: spin 8s linear infinite; fill: var(--g2); }

        .royal-theme .ganesh { display: block; font-size: 2.3rem; color: var(--g2); text-shadow: 0 0 16px var(--gold); animation: sway 4s ease-in-out infinite; }
        @keyframes sway { 50% { transform: rotate(6deg) scale(1.08); } }

        .royal-theme .couple { display: flex; align-items: flex-start; justify-content: center; gap: 8px; margin: 6px 0 4px; }
        .royal-theme .pw { flex: 1; max-width: 140px; }
        .royal-theme .pw b { display: block; font-weight: 800; font-size: 1.1rem; margin-top: 8px; }
        .royal-theme .amp { align-self: center; font-size: 1rem; padding-bottom: 26px; animation: beat 1.6s ease-in-out infinite; }
        .royal-theme .amp::before { content: "♥"; display: block; color: #ff6b86; font-size: 1.3rem; text-shadow: 0 0 12px #ff6b86; }
        @keyframes beat { 50% { transform: scale(1.18); } }

        .royal-theme .ph {
          position: relative; display: block; width: 100%; aspect-ratio: 3/4; cursor: pointer;
          border-radius: 70px 70px 8px 8px; overflow: hidden; border: 3px solid var(--gold);
          background: linear-gradient(160deg, #4a1020, #1a0510);
          box-shadow: 0 0 0 4px rgba(20,5,10,.7), 0 0 0 6px var(--gold), 0 0 24px rgba(230,189,92,.55);
        }
        .royal-theme .ph img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; animation: ken 14s ease-in-out infinite alternate; }
        @keyframes ken { to { transform: scale(1.12); } }
        .royal-theme .add { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 1.7rem; color: var(--g2); line-height: 1.4; }

        .royal-theme .lantern {
          position: absolute; top: 0; z-index: 3; transform-origin: top center; animation: swing 4s ease-in-out infinite; pointer-events: none;
        }
        .royal-theme .lantern::before { content: ""; display: block; width: 2px; margin: 0 auto; background: var(--gold); height: var(--h); }
        .royal-theme .lantern i {
          display: block; width: 34px; height: 46px; margin-left: -16px; border-radius: 12px 12px 18px 18px;
          background: radial-gradient(circle at 50% 55%, #fff3b0, #ffb21e 55%, #c4560f);
          border: 2px solid var(--gold); box-shadow: 0 0 28px 8px rgba(255,170,40,.65); animation: glow 2.4s ease-in-out infinite;
        }
        @keyframes swing { 0%,100% { transform: rotate(7deg); } 50% { transform: rotate(-7deg); } }
        @keyframes glow { 50% { box-shadow: 0 0 38px 14px rgba(255,170,40,.85); } }

        .royal-theme .diyas {
          position: absolute; bottom: 18px; left: 0; right: 0; display: flex; justify-content: center;
          gap: clamp(18px, 8vw, 46px); z-index: 3; pointer-events: none;
        }
        .royal-theme .diya { position: relative; width: 34px; height: 15px; border-radius: 0 0 34px 34px; background: linear-gradient(#f3cf6d, #b07a1c); }
        .royal-theme .diya::before {
          content: ""; position: absolute; left: 10px; top: -24px; width: 14px; height: 26px;
          border-radius: 50% 50% 50% 50% / 70% 70% 30% 30%;
          background: radial-gradient(#fff6c8 20%, #ffb21e 60%, #e0521a);
          box-shadow: 0 0 20px 8px rgba(255,170,40,.7); transform-origin: bottom; animation: flick .5s ease-in-out infinite alternate;
        }
        @keyframes flick { from { transform: scale(1, .9) rotate(-4deg); } to { transform: scale(.9, 1.12) rotate(4deg); } }

        .royal-theme .fx { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 1; }
        .royal-theme .fx i {
          position: absolute; bottom: -4%; width: 5px; height: 5px; border-radius: 50%; background: var(--g2);
          box-shadow: 0 0 8px 2px rgba(255,220,120,.9); animation: rise linear infinite;
        }
        @keyframes rise { to { transform: translate(30px, -110vh); opacity: 0; } }

        .royal-theme .cover-hint {
          position: absolute; bottom: 50px; left: 0; right: 0; text-align: center;
          font-size: .85rem; color: var(--g2); animation: bob 1.8s infinite; z-index: 3;
        }
        @keyframes bob { 50% { transform: translateY(6px); } }
      `}</style>

      {/* Back button */}
      <div className="fixed top-4 left-4 z-40 flex items-center gap-3">
        <button
          onClick={onClose}
          className="flex items-center gap-2 rounded-full border border-[var(--gold)] bg-[#2a0710]/80 px-4 py-1.5 text-sm font-bold text-[#fff3c0] shadow-lg backdrop-blur hover:scale-105 active:scale-95"
        >
          ← પાછા જાઓ
        </button>
      </div>

      {/* Page 1 : કવર */}
      <section className="page p1 in">
        {RangoliSVG}
        {renderLanternsAndDiyas()}
        <div className="fx">
          {dustList.map((d) => (
            <i key={d.id} style={{ left: d.left, animationDuration: d.dur, animationDelay: d.del }} />
          ))}
        </div>
        <div className="arch">
          {CrestSVG}
          <span className="ganesh">ॐ</span>
          <p className="shloka">વક્રતુંડ મહાકાય, સૂર્યકોટિ સમપ્રભ ।<br />નિર્વિઘ્નં કુરુ મે દેવ, સર્વકાર્યેષુ સર્વદા ॥</p>
          <h2 className="mt-3">શુભ વિવાહ</h2>
          <div className="couple">
            <div className="pw">
              <label className="ph">
                {groomPhoto ? <img alt="Groom" src={groomPhoto} /> : (
                  <span className="add">📷<small className="text-[0.72rem]">ફોટો ઉમેરો</small></span>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, 'groom')} />
              </label>
              <b>{groomName}</b>
            </div>
            <div className="amp">સંગ</div>
            <div className="pw">
              <label className="ph">
                {bridePhoto ? <img alt="Bride" src={bridePhoto} /> : (
                  <span className="add">📷<small className="text-[0.72rem]">ફોટો ઉમેરો</small></span>
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
        <div className="cover-hint">નીચે સ્ક્રોલ કરો ⌄</div>
      </section>

      {/* Page 2 : વિવાહ સંસ્કાર */}
      <section className="page p2">
        {RangoliSVG}
        {renderLanternsAndDiyas()}
        <div className="fx">
          {dustList.map((d) => (
            <i key={d.id} style={{ left: d.left, animationDuration: d.dur, animationDelay: d.del }} />
          ))}
        </div>
        <div className="arch">
          {CrestSVG}
          <span className="text-sm font-bold text-[var(--g2)]">॥ શ્રી ગણેશાય નમઃ ॥</span>
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
      <section className="page p3">
        {RangoliSVG}
        {renderLanternsAndDiyas()}
        <div className="fx">
          {dustList.map((d) => (
            <i key={d.id} style={{ left: d.left, animationDuration: d.dur, animationDelay: d.del }} />
          ))}
        </div>
        <div className="arch">
          {CrestSVG}
          <h2>હલ્દી રસમ</h2>
          {DividerSVG}
          <h3>સ્વરુચી ભોજન</h3>
          <p className="mt-1">બુધવાર, તા. ૧૨-૦૨-૨૦૨૫ ના રોજ<br />આપની પધારવા વિનંતી.<br /><span className="hl">(ભોજન : બપોરે ૧૨:૦૦ કલાકે)</span></p>
          <h3>શુભ સ્થળ</h3>
          <p className="mt-1">{venueName},<br />{venueLines.join(', ')}</p>
        </div>
      </section>

      {/* Page 4 : લગ્નોત્સવ */}
      <section className="page p4">
        {RangoliSVG}
        {renderLanternsAndDiyas()}
        <div className="fx">
          {dustList.map((d) => (
            <i key={d.id} style={{ left: d.left, animationDuration: d.dur, animationDelay: d.del }} />
          ))}
        </div>
        <div className="arch">
          {CrestSVG}
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
      <section className="page p5">
        {RangoliSVG}
        {renderLanternsAndDiyas()}
        <div className="fx">
          {dustList.map((d) => (
            <i key={d.id} style={{ left: d.left, animationDuration: d.dur, animationDelay: d.del }} />
          ))}
        </div>
        <div className="arch">
          {CrestSVG}
          <h2>પ્રેમ રાસ</h2>
          {DividerSVG}
          <h3>સ્વરુચી ભોજન</h3>
          <p className="mt-1">બુધવાર, તા. ૧૨-૦૨-૨૦૨૫ ના રોજ<br />આપની પધારવા વિનંતી.<br /><span className="hl">(ભોજન : સાંજે ૯:૦૦ કલાકે)</span></p>
          <h3>શુભ સ્થળ</h3>
          <p className="mt-1">{venueName},<br />{venueLines.join(', ')}</p>
        </div>
      </section>

      {/* Page 6 : જાન પ્રસ્થાન */}
      <section className="page p6">
        {RangoliSVG}
        {renderLanternsAndDiyas()}
        <div className="fx">
          {dustList.map((d) => (
            <i key={d.id} style={{ left: d.left, animationDuration: d.dur, animationDelay: d.del }} />
          ))}
        </div>
        <div className="arch">
          {CrestSVG}
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
      <section className="page p7">
        {RangoliSVG}
        {renderLanternsAndDiyas()}
        <div className="fx">
          {dustList.map((d) => (
            <i key={d.id} style={{ left: d.left, animationDuration: d.dur, animationDelay: d.del }} />
          ))}
        </div>
        <div className="arch">
          {CrestSVG}
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
      <section className="page p8">
        {RangoliSVG}
        {renderLanternsAndDiyas()}
        <div className="fx">
          {dustList.map((d) => (
            <i key={d.id} style={{ left: d.left, animationDuration: d.dur, animationDelay: d.del }} />
          ))}
        </div>
        <div className="arch">
          {CrestSVG}
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
  )
}
