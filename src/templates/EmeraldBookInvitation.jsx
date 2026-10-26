import { useState, useEffect } from 'react'

export default function EmeraldBookInvitation({ inv, onClose }) {
  const [isOpen, setIsOpen] = useState(false)
  const [cur, setCur] = useState(0)
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
      const g = localStorage.getItem(`wed_emerald_groom_${inv.id}`)
      if (g) setGroomPhoto(g)
      const b = localStorage.getItem(`wed_emerald_bride_${inv.id}`)
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
          try { localStorage.setItem(`wed_emerald_groom_${inv.id}`, dataUrl) } catch (err) {}
        } else {
          setBridePhoto(dataUrl)
          try { localStorage.setItem(`wed_emerald_bride_${inv.id}`, dataUrl) } catch (err) {}
        }
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  const openEnvelope = () => {
    setIsOpen(true)
  }

  const go = (n) => {
    setCur(Math.max(0, Math.min(pagesCount - 1, n)))
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(cur + 1)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(cur - 1)
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, cur])

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
            rx="2.2"
            ry="5"
            transform={`rotate(${i * 45} 95 10)`}
          />
        ))}
      </g>
    </svg>
  )

  const BranchSVG = ({ className }) => (
    <svg className={`bot ${className}`} viewBox="0 0 120 130">
      <path className="st" d="M0 0Q70 10 20 125" />
      {Array.from({ length: 7 }, (_, k) => {
        const t = 0.12 + k * 0.13
        const u = 1 - t
        const x = u * u * 0 + 2 * u * t * 70 + t * t * 20
        const y = u * u * 0 + 2 * u * t * 10 + t * t * 125
        const side = k % 2 ? 1 : -1
        const ang = (k % 2 ? -35 : 35) + t * 40
        return (
          <path
            key={k}
            className={`lf ${k % 3 === 2 ? 'g' : ''}`}
            d="M0 0C6-9 18-9 25 0C18 9 6 9 0 0Z"
            transform={`translate(${x} ${y}) rotate(${ang + (side > 0 ? 0 : -80)}) scale(${1.1 - t * 0.4})`}
          />
        )
      })}
      <circle className="lf g" cx="20" cy="125" r="4" />
    </svg>
  )

  const renderBotanicals = () => (
    <>
      <BranchSVG className="tl" />
      <BranchSVG className="tr" />
      <BranchSVG className="bl" />
      <BranchSVG className="br" />
    </>
  )

  const fallingColors = ['#0f5a46', '#c79a35', '#e08a8f', '#2f8f6f']
  const petals = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${(i * 17 + 8) % 100}%`,
    dur: `${8 + (i % 5) * 2}s`,
    del: `-${(i * 1.5) % 12}s`,
    col: fallingColors[i % fallingColors.length],
  }))

  return (
    <div className="emerald-theme fixed inset-0 z-50 overflow-hidden font-['Hind_Vadodara',sans-serif] select-none">
      <style>{`
        .emerald-theme {
          --gold: #b8892b;
          --ink: #23382d;
          --h1: #0f5a46;
          --h2: #c79a35;
          --paper: #fbf5e6;
          --tint: #f3ecd4;
          background: radial-gradient(circle at 50% 40%, #0f4a3a, #041a14 75%);
        }
        .emerald-theme #stage {
          position: fixed; inset: 0; perspective: 1800px;
        }

        /* Envelope intro */
        .emerald-theme #env {
          position: fixed; inset: 0; z-index: 50; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 34px;
          background: radial-gradient(circle at 50% 40%, #0f4a3a, #041a14 75%);
          transition: opacity 1s ease .2s;
        }
        .emerald-theme #env.gone { opacity: 0; pointer-events: none; }
        .emerald-theme .env {
          position: relative; width: min(86vw, 380px); height: min(58vw, 250px); perspective: 900px;
        }
        .emerald-theme .env > * { position: absolute; left: 0; right: 0; }
        .emerald-theme .back { top: 0; bottom: 0; background: #7a1f33; border-radius: 8px; box-shadow: 0 30px 60px rgba(0,0,0,.6); }
        .emerald-theme .letter {
          left: 6%; right: 6%; top: 6%; height: 88%; background: #fbf5e6; border-radius: 4px;
          display: flex; align-items: flex-start; justify-content: center; padding-top: 16px;
          font-family: 'Noto Serif Gujarati', serif; font-weight: 800; font-size: 1.3rem; color: #7a1f33;
          transition: transform 1.2s cubic-bezier(.5,0,.2,1) 1s; border: 2px solid var(--gold);
        }
        .emerald-theme .front {
          top: 0; bottom: 0; background: linear-gradient(135deg, #8e2840, #6a1829);
          clip-path: polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%); border-radius: 8px;
        }
        .emerald-theme .flap {
          top: 0; height: 58%; background: linear-gradient(#a03550, #7a1f33);
          clip-path: polygon(0 0, 100% 0, 50% 100%); transform-origin: top;
          transition: transform .9s ease, z-index 0s .45s; z-index: 4;
        }
        .emerald-theme .seal {
          position: absolute; left: 50%; top: 44%; width: 62px; height: 62px; margin: -8px 0 0 -31px;
          z-index: 6; border: none; border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #f5d98b, #b8892b 60%, #7d5a14);
          color: #5a0f22; font-size: 1.6rem; cursor: pointer; box-shadow: 0 4px 14px rgba(0,0,0,.5);
          animation: epulse 1.6s ease-in-out infinite; transition: opacity .4s;
        }
        @keyframes epulse { 50% { transform: scale(1.14); box-shadow: 0 0 28px rgba(245,217,139,.9); } }
        .emerald-theme #env.open .seal { opacity: 0; pointer-events: none; }
        .emerald-theme #env.open .flap { transform: rotateX(180deg); z-index: 1; }
        .emerald-theme #env.open .letter { transform: translateY(-62%) scale(1.06); }
        .emerald-theme #env p { font-family: 'Noto Serif Gujarati', serif; color: #f5d98b; font-size: .95rem; }

        /* Book pages */
        .emerald-theme .page {
          --ink: #23382d; --h1: #0f5a46; --h2: #c79a35; --paper: #fbf5e6; --tint: #f3ecd4;
          position: absolute; inset: 0; display: flex; overflow-y: auto; padding: 40px 14px 80px; color: var(--ink);
          background: radial-gradient(circle at 50% 0, var(--tint), transparent 70%), var(--paper);
          transform-origin: left center; backface-visibility: hidden; opacity: 0; pointer-events: none;
          transition: transform 1.1s cubic-bezier(.6,.05,.2,1), opacity .9s ease;
          box-shadow: inset 0 0 90px rgba(120,90,30,.14);
        }
        .emerald-theme .page.before { transform: rotateY(-105deg); }
        .emerald-theme .page.after { transform: translateX(7%) scale(.96); }
        .emerald-theme .page.active { transform: none; opacity: 1; pointer-events: auto; z-index: 2; }

        .emerald-theme .p2 { --paper: #eef6ec; --tint: #d9ecd6; }
        .emerald-theme .p3 { --paper: #fdf1d2; --tint: #f8dd96; }
        .emerald-theme .p4 { --paper: #e8f3f1; --tint: #c4e3de; }
        .emerald-theme .p5 { --ink: #f5ecd2; --h1: #f5d98b; --h2: #fff3c0; --paper: #0b2a24; --tint: #17483c; }
        .emerald-theme .p6 { --paper: #f1f6e4; --tint: #dbe8b4; }
        .emerald-theme .p7 { --paper: #fbece4; --tint: #f2cdb8; }
        .emerald-theme .p8 { --paper: #f9eaee; --tint: #efc3cf; }

        .emerald-theme .page::before {
          content: ""; position: absolute; inset: 14px; border: 1px solid var(--gold); pointer-events: none; z-index: 1;
        }
        .emerald-theme .page::after {
          content: ""; position: absolute; inset: 20px; border: 3px double rgba(184,137,43,.55); pointer-events: none; z-index: 1;
        }
        .emerald-theme .arch {
          position: relative; z-index: 3; width: min(92vw, 420px); margin: auto; padding: 26px 16px; text-align: center;
        }

        .emerald-theme h2, .emerald-theme h3, .emerald-theme .names, .emerald-theme .hl, .emerald-theme .pw b {
          background: linear-gradient(100deg, var(--h1) 25%, var(--h2) 50%, var(--h1) 75%);
          background-size: 250% 100%; -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: foil 6s linear infinite; font-family: 'Noto Serif Gujarati', serif;
        }
        @keyframes foil { to { background-position: -250% 0; } }
        .emerald-theme h2 { font-weight: 800; font-size: 2rem; line-height: 1.45; }
        .emerald-theme h3 { font-weight: 600; font-size: 1.2rem; margin: 14px 0 2px; }
        .emerald-theme .names { font-weight: 800; font-size: 2.1rem; line-height: 1.35; }
        .emerald-theme .sang { display: block; font-size: 1.05rem; color: var(--ink); -webkit-text-fill-color: var(--ink); font-family: 'Noto Serif Gujarati', serif; }
        .emerald-theme .hl { font-weight: 700; display: inline-block; }
        .emerald-theme .shloka, .emerald-theme .small, .emerald-theme li { font-family: 'Noto Serif Gujarati', serif; }
        .emerald-theme .shloka { font-size: .95rem; }
        .emerald-theme .small { font-size: .92rem; }
        .emerald-theme li { font-size: .95rem; }

        .emerald-theme .div-svg { display: block; width: 190px; height: 20px; margin: 6px auto 10px; overflow: visible; }
        .emerald-theme .div-svg path { stroke: var(--gold); fill: none; stroke-width: 1.5; stroke-linecap: round; }
        .emerald-theme .div-svg g { fill: var(--gold); transform-origin: 95px 10px; animation: spin 9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .emerald-theme .ganesh { display: block; font-size: 2.2rem; color: var(--gold); animation: sway 4s ease-in-out infinite; }
        @keyframes sway { 0%,100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }

        .emerald-theme .bot { position: absolute; width: min(34vw, 150px); z-index: 2; pointer-events: none; overflow: visible; }
        .emerald-theme .bot.tl { top: 14px; left: 14px; }
        .emerald-theme .bot.tr { top: 14px; right: 14px; transform: scaleX(-1); }
        .emerald-theme .bot.bl { bottom: 14px; left: 14px; transform: scaleY(-1); }
        .emerald-theme .bot.br { bottom: 14px; right: 14px; transform: scale(-1); }
        .emerald-theme .bot .st { fill: none; stroke: var(--h1); stroke-width: 1.6; stroke-linecap: round; }
        .emerald-theme .bot .lf { fill: var(--h1); opacity: .85; }
        .emerald-theme .bot .lf.g { fill: var(--gold); }

        .emerald-theme .couple { display: flex; justify-content: center; gap: 8px; margin: 6px 0 4px; }
        .emerald-theme .pw { flex: 1; max-width: 130px; }
        .emerald-theme .pw b { display: block; font-weight: 800; font-size: 1.05rem; margin-top: 8px; }
        .emerald-theme .amp { align-self: center; font-family: 'Noto Serif Gujarati', serif; font-size: 1rem; padding-bottom: 24px; }
        .emerald-theme .amp::before { content: "♥"; display: block; color: #c8374f; font-size: 1.3rem; animation: beat 1.6s infinite; }
        @keyframes beat { 50% { transform: scale(1.25); } }

        .emerald-theme .ph {
          position: relative; display: block; width: 100%; aspect-ratio: 3/4; cursor: pointer;
          border-radius: 70px 70px 6px 6px; overflow: hidden; border: 3px solid var(--gold);
          background: linear-gradient(160deg, #e8dcb4, #cdbb82);
          box-shadow: 0 0 0 4px var(--paper), 0 0 0 5px var(--gold), 0 10px 24px rgba(80,60,10,.3);
        }
        .emerald-theme .ph img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; animation: ken 14s ease-in-out infinite alternate; }
        @keyframes ken { to { transform: scale(1.12); } }
        .emerald-theme .add { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 1.7rem; line-height: 1.4; color: var(--h1); }

        .emerald-theme .fx { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
        .emerald-theme .fx i {
          position: absolute; top: -6%; width: 11px; height: 15px; border-radius: 0 100% 0 100%;
          opacity: .7; animation: emeraldFall linear infinite;
        }
        @keyframes emeraldFall { to { transform: translate(50px, 115vh) rotate(500deg); } }
      `}</style>

      {/* Envelope Intro Screen */}
      <div id="env" className={isOpen ? 'open gone' : ''}>
        <div className="env">
          <div className="back"></div>
          <div className="letter">શુભ વિવાહ</div>
          <div className="front"></div>
          <div className="flap"></div>
          <button className="seal" onClick={openEnvelope} aria-label="open">♥</button>
        </div>
        <p>ખોલવા માટે સીલ પર ટેપ કરો</p>
      </div>

      {/* Back button */}
      <div className="fixed top-4 left-4 z-40 flex items-center gap-3">
        <button
          onClick={onClose}
          className="flex items-center gap-2 rounded-full border border-[var(--gold)] bg-[#0b2a24]/80 px-4 py-1.5 text-sm font-bold text-[#f5d98b] shadow-lg backdrop-blur hover:scale-105 active:scale-95"
        >
          ← પાછા જાઓ
        </button>
      </div>

      {/* 3D Book Stage */}
      <div id="stage">
        {/* Page 1 : કવર */}
        <section className={`page p1 ${cur === 0 ? 'active' : cur > 0 ? 'before' : 'after'}`}>
          {renderBotanicals()}
          <div className="fx">
            {petals.map((p) => (
              <i key={p.id} style={{ left: p.left, background: p.col, animationDuration: p.dur, animationDelay: p.del }} />
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
        </section>

        {/* Page 2 : વિવાહ સંસ્કાર */}
        <section className={`page p2 ${cur === 1 ? 'active' : cur > 1 ? 'before' : 'after'}`}>
          {renderBotanicals()}
          <div className="fx">
            {petals.map((p) => (
              <i key={p.id} style={{ left: p.left, background: p.col, animationDuration: p.dur, animationDelay: p.del }} />
            ))}
          </div>
          <div className="arch">
            <span className="text-sm font-bold text-[var(--gold)]">॥ શ્રી ગણેશાય નમઃ ॥</span>
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
        <section className={`page p3 ${cur === 2 ? 'active' : cur > 2 ? 'before' : 'after'}`}>
          {renderBotanicals()}
          <div className="fx">
            {petals.map((p) => (
              <i key={p.id} style={{ left: p.left, background: p.col, animationDuration: p.dur, animationDelay: p.del }} />
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
        <section className={`page p4 ${cur === 3 ? 'active' : cur > 3 ? 'before' : 'after'}`}>
          {renderBotanicals()}
          <div className="fx">
            {petals.map((p) => (
              <i key={p.id} style={{ left: p.left, background: p.col, animationDuration: p.dur, animationDelay: p.del }} />
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
        <section className={`page p5 ${cur === 4 ? 'active' : cur > 4 ? 'before' : 'after'}`}>
          {renderBotanicals()}
          <div className="fx">
            {petals.map((p) => (
              <i key={p.id} style={{ left: p.left, background: p.col, animationDuration: p.dur, animationDelay: p.del }} />
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
        <section className={`page p6 ${cur === 5 ? 'active' : cur > 5 ? 'before' : 'after'}`}>
          {renderBotanicals()}
          <div className="fx">
            {petals.map((p) => (
              <i key={p.id} style={{ left: p.left, background: p.col, animationDuration: p.dur, animationDelay: p.del }} />
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
        <section className={`page p7 ${cur === 6 ? 'active' : cur > 6 ? 'before' : 'after'}`}>
          {renderBotanicals()}
          <div className="fx">
            {petals.map((p) => (
              <i key={p.id} style={{ left: p.left, background: p.col, animationDuration: p.dur, animationDelay: p.del }} />
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
        <section className={`page p8 ${cur === 7 ? 'active' : cur > 7 ? 'before' : 'after'}`}>
          {renderBotanicals()}
          <div className="fx">
            {petals.map((p) => (
              <i key={p.id} style={{ left: p.left, background: p.col, animationDuration: p.dur, animationDelay: p.del }} />
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

      {/* Floating Bottom Nav Dots & Buttons */}
      <div className={`fixed inset-x-0 bottom-6 z-40 flex items-center justify-center gap-4 transition-opacity duration-700 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <button
          onClick={() => go(cur - 1)}
          disabled={cur === 0}
          aria-label="previous"
          className="h-10 w-10 rounded-full border border-[var(--gold)] bg-[#fbf5e6]/90 text-xl font-bold text-[#0f5a46] shadow transition disabled:opacity-35 hover:scale-105 active:scale-95"
        >
          ‹
        </button>
        <div className="flex gap-2">
          {Array.from({ length: pagesCount }, (_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === cur ? 'w-6 bg-[var(--gold)]' : 'w-2 bg-[var(--gold)]/40'}`}
            />
          ))}
        </div>
        <button
          onClick={() => go(cur + 1)}
          disabled={cur === pagesCount - 1}
          aria-label="next"
          className="h-10 w-10 rounded-full border border-[var(--gold)] bg-[#fbf5e6]/90 text-xl font-bold text-[#0f5a46] shadow transition disabled:opacity-35 hover:scale-105 active:scale-95"
        >
          ›
        </button>
      </div>
    </div>
  )
}
