import { useState, useEffect, useRef } from 'react'

export default function BlushFloralInvitation({ inv, onClose }) {
  const containerRef = useRef(null)
  const groomName = inv.groom || 'ચિ. દર્શન'
  const brideName = inv.bride || 'ચિ. ઈશિતા'
  const dateLine = inv.dateLine || 'તા. ૧૩-૦૨-૨૦૨૫, ગુરુવાર'
  const venueName = inv.venue?.name || 'નીલકંઠ ફાર્મ પાર્ટી પ્લોટ'
  const venueLines = inv.venue?.lines || ['જૂનાગઢ બાયપાસ રોડ', 'કાંકરડા ચોકડી, જૂનાગઢ.']

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in')
        })
      },
      { threshold: 0.3 }
    )
    const pages = containerRef.current?.querySelectorAll('.page')
    pages?.forEach((p) => io.observe(p))
    return () => io.disconnect()
  }, [])

  const BloomSVG = (
    <div className="bloom">
      <svg viewBox="0 0 88 88">
        {Array.from({ length: 10 }, (_, i) => (
          <ellipse
            key={i}
            cx="44"
            cy="20"
            rx="9"
            ry="18"
            transform={`rotate(${i * 36} 44 44)`}
            fill={i % 2 ? '#f08aa0' : '#f7b3c2'}
            stroke="#fff"
            strokeWidth="1"
          />
        ))}
        <circle cx="44" cy="44" r="11" fill="#ffd27a" stroke="#fff" strokeWidth="2" />
        <circle cx="44" cy="44" r="4" fill="#b76e79" />
      </svg>
    </div>
  )

  const DividerSVG = (
    <svg className="div-svg" viewBox="0 0 180 20">
      <path d="M4 10C30 2 56 18 78 10" />
      <path d="M176 10C150 2 124 18 102 10" />
      <g className="f">
        {Array.from({ length: 6 }, (_, i) => (
          <ellipse
            key={i}
            cx="90"
            cy="4.5"
            rx="2.6"
            ry="5"
            transform={`rotate(${i * 60} 90 10)`}
          />
        ))}
      </g>
    </svg>
  )

  const vineCols = ['#f4a3b5', '#e8738f', '#fbd0d8', '#ffd27a', '#f7b59a', '#c9e4b8']

  const renderVines = () => (
    <>
      <div className="vine l">
        {Array.from({ length: 8 }, (_, k) => (
          <i
            key={k}
            style={{
              width: `${20 + (k % 4) * 4}px`,
              height: `${20 + (k % 4) * 4}px`,
              top: `${k * 24 + 4}px`,
              left: `${Math.max(4, 12 + Math.sin(k * 0.9) * 16 + k * 2)}px`,
              background: vineCols[k % vineCols.length],
            }}
          />
        ))}
      </div>
      <div className="vine r2">
        {Array.from({ length: 8 }, (_, k) => (
          <i
            key={k}
            style={{
              width: `${20 + (k % 4) * 4}px`,
              height: `${20 + (k % 4) * 4}px`,
              top: `${k * 24 + 4}px`,
              right: `${Math.max(4, 12 - Math.sin(k * 0.9) * 16 + k * 2)}px`,
              background: vineCols[k % vineCols.length],
            }}
          />
        ))}
      </div>
    </>
  )

  const petalList = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${(i * 19 + 7) % 100}%`,
    dur: `${9 + (i % 5) * 2}s`,
    del: `-${(i * 1.5) % 12}s`,
    col: vineCols[i % vineCols.length],
  }))

  return (
    <div ref={containerRef} className="floral-theme fixed inset-0 z-50 overflow-y-auto overflow-x-hidden font-['Hind_Vadodara',sans-serif] text-[#4a2433] select-none scroll-smooth">
      <style>{`
        .floral-theme {
          --ink: #4a2433;
          --rose: #b76e79;
          --plum: #6b2d45;
          background: #f7e9e4;
        }
        .floral-theme .page {
          min-height: 100vh; min-height: 100svh;
          scroll-snap-align: start; display: flex; align-items: center; justify-content: center;
          padding: 70px 16px 50px; position: relative; overflow: hidden;
        }
        .floral-theme .page::before, .floral-theme .page::after {
          content: ""; position: absolute; width: 70vmax; height: 70vmax; border-radius: 50%;
          filter: blur(60px); opacity: .55; animation: drift 18s ease-in-out infinite alternate;
        }
        .floral-theme .page::before { left: -30vmax; top: -30vmax; background: var(--a); }
        .floral-theme .page::after { right: -30vmax; bottom: -30vmax; background: var(--b); animation-delay: -9s; }
        @keyframes drift { to { transform: translate(8vmax, 6vmax) scale(1.15); } }

        .floral-theme .p1 { --a: #f4b6c2; --b: #fbe3a8; background: #fff1ee; }
        .floral-theme .p2 { --a: #b9d8b0; --b: #f6cfd2; background: #f1f6ea; }
        .floral-theme .p3 { --a: #fbd77a; --b: #f7b7a3; background: #fff4d9; }
        .floral-theme .p4 { --a: #c9bdf0; --b: #a9d9e6; background: #f2effc; }
        .floral-theme .p5 { --a: #6b3a8a; --b: #e08ab0; background: #2a1636; }
        .floral-theme .p6 { --a: #a8d6b5; --b: #fbe29a; background: #eef7ec; }
        .floral-theme .p7 { --a: #f6b49a; --b: #f2c6dc; background: #fff0e8; }
        .floral-theme .p8 { --a: #e8899c; --b: #f9d29a; background: #ffeceb; }
        .floral-theme .p5 .arch { background: #fff7f0; }

        .floral-theme .arch {
          position: relative; width: min(92vw, 410px); padding: 72px 28px 56px; text-align: center;
          background: linear-gradient(#fffdf8, #fff6ec); border-radius: 14px;
          border: 1px solid var(--rose);
          box-shadow: 0 0 0 6px #fffdf8, 0 0 0 7px var(--rose), 0 24px 50px rgba(107,45,69,.28);
          clip-path: inset(0 50% 0 50%); transition: clip-path 1.4s cubic-bezier(.7,0,.2,1);
        }
        .floral-theme .page.in .arch { clip-path: inset(-60px); }
        .floral-theme .arch::before {
          content: ""; position: absolute; inset: 10px; border: 3px double rgba(183,110,121,.55); border-radius: 8px; pointer-events: none;
        }

        .floral-theme .bloom {
          position: absolute; top: -44px; left: 50%; margin-left: -44px; width: 88px; height: 88px; z-index: 3;
          filter: drop-shadow(0 4px 6px rgba(107,45,69,.35));
        }
        .floral-theme .bloom svg {
          width: 100%; height: 100%; transform: scale(0) rotate(-90deg);
          transition: transform 1.4s cubic-bezier(.2,1.4,.4,1) 1.2s;
        }
        .floral-theme .page.in .bloom svg { transform: none; animation: spin 40s linear 3s infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .floral-theme .cn {
          position: absolute; font-size: 1.3rem; color: var(--rose); animation: pulse 3s ease-in-out infinite;
        }
        .floral-theme .cn.a { top: 16px; left: 18px; }
        .floral-theme .cn.b { top: 16px; right: 18px; }
        .floral-theme .cn.c { bottom: 16px; left: 18px; }
        .floral-theme .cn.d { bottom: 16px; right: 18px; }
        @keyframes pulse { 50% { opacity: .35; transform: scale(.85); } }

        .floral-theme h2, .floral-theme h3, .floral-theme .names, .floral-theme .hl {
          background: linear-gradient(100deg, #8e3b55 15%, #e08a8f 40%, #b0566b 55%, #8e3b55 85%);
          background-size: 250% 100%; -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: foil 6s linear infinite; font-family: 'Baloo Bhai 2', 'Noto Serif Gujarati', sans-serif;
        }
        @keyframes foil { to { background-position: -250% 0; } }
        .floral-theme h2 { font-weight: 800; font-size: 2.1rem; line-height: 1.4; }
        .floral-theme h3 { font-weight: 700; font-size: 1.3rem; margin: 14px 0 0; }
        .floral-theme .names { font-weight: 800; font-size: 2.3rem; line-height: 1.25; margin: 6px 0; }
        .floral-theme .sang { display: block; font-family: 'Noto Serif Gujarati', serif; font-size: 1.1rem; color: var(--plum); -webkit-text-fill-color: var(--plum); }
        .floral-theme .hl { font-weight: 700; display: inline-block; }
        .floral-theme .shloka, .floral-theme .small, .floral-theme li { font-family: 'Noto Serif Gujarati', serif; }
        .floral-theme .shloka { font-size: .95rem; color: var(--plum); }
        .floral-theme .small { font-size: .93rem; }
        .floral-theme li { font-size: .95rem; }

        .floral-theme .div-svg { display: block; width: 180px; height: 20px; margin: 6px auto 12px; }
        .floral-theme .div-svg path { stroke: var(--rose); fill: none; stroke-width: 1.6; stroke-linecap: round; }
        .floral-theme .div-svg .f { fill: #e08a8f; transform-origin: 90px 10px; animation: spin 12s linear infinite; }

        .floral-theme .ganesh { display: block; font-size: 2.3rem; color: var(--rose); animation: sway 4s ease-in-out infinite; }
        @keyframes sway { 50% { transform: rotate(6deg) scale(1.1); } }

        .floral-theme .vine {
          position: absolute; top: -6px; width: min(34vw, 170px); height: 230px; z-index: 2;
          pointer-events: none; transform-origin: top; animation: vswing 5s ease-in-out infinite;
        }
        .floral-theme .vine.l { left: 0; }
        .floral-theme .vine.r2 { right: 0; animation-delay: -2.5s; }
        .floral-theme .vine i { position: absolute; border-radius: 50%; box-shadow: inset -3px -3px 6px rgba(0,0,0,.12); }
        @keyframes vswing { 0%,100% { transform: rotate(2deg); } 50% { transform: rotate(-2deg); } }

        .floral-theme .fx { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 1; }
        .floral-theme .fx i {
          position: absolute; top: -6%; width: 14px; height: 14px; border-radius: 150% 0 150% 0;
          opacity: .85; animation: petalFall linear infinite;
        }
        @keyframes petalFall { to { transform: translateY(115vh) rotate(540deg) translateX(60px); } }

        .floral-theme .cover-hint {
          position: absolute; bottom: 20px; left: 0; right: 0; text-align: center;
          font-size: .85rem; color: var(--plum); animation: bob 1.8s infinite; z-index: 3;
        }
        @keyframes bob { 50% { transform: translateY(6px); } }
      `}</style>

      {/* Back button */}
      <div className="fixed top-4 left-4 z-40 flex items-center gap-3">
        <button
          onClick={onClose}
          className="flex items-center gap-2 rounded-full border border-[var(--rose)] bg-[#fffdf8]/90 px-4 py-1.5 text-sm font-bold text-[#8e3b55] shadow-lg backdrop-blur hover:scale-105 active:scale-95"
        >
          ← પાછા જાઓ
        </button>
      </div>

      {/* Page 1 : કવર */}
      <section className="page p1 in">
        {renderVines()}
        <div className="fx">
          {petalList.map((p) => (
            <i key={p.id} style={{ left: p.left, background: p.col, animationDuration: p.dur, animationDelay: p.del }} />
          ))}
        </div>
        <div className="arch">
          {BloomSVG}
          <span className="cn a">❀</span><span className="cn b">❀</span><span className="cn c">❀</span><span className="cn d">❀</span>
          <span className="ganesh">ॐ</span>
          <p className="shloka">વક્રતુંડ મહાકાય, સૂર્યકોટિ સમપ્રભ ।<br />નિર્વિઘ્નં કુરુ મે દેવ, સર્વકાર્યેષુ સર્વદા ॥</p>
          <h2 className="mt-3">શુભ વિવાહ</h2>
          <div className="names my-3">
            {groomName}<span className="sang">સંગ</span>{brideName}
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
        {renderVines()}
        <div className="fx">
          {petalList.map((p) => (
            <i key={p.id} style={{ left: p.left, background: p.col, animationDuration: p.dur, animationDelay: p.del }} />
          ))}
        </div>
        <div className="arch">
          {BloomSVG}
          <span className="cn a">❀</span><span className="cn b">❀</span><span className="cn c">❀</span><span className="cn d">❀</span>
          <span className="text-sm font-bold text-[var(--rose)]">॥ શ્રી ગણેશાય નમઃ ॥</span>
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
        {renderVines()}
        <div className="fx">
          {petalList.map((p) => (
            <i key={p.id} style={{ left: p.left, background: p.col, animationDuration: p.dur, animationDelay: p.del }} />
          ))}
        </div>
        <div className="arch">
          {BloomSVG}
          <span className="cn a">❀</span><span className="cn b">❀</span><span className="cn c">❀</span><span className="cn d">❀</span>
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
        {renderVines()}
        <div className="fx">
          {petalList.map((p) => (
            <i key={p.id} style={{ left: p.left, background: p.col, animationDuration: p.dur, animationDelay: p.del }} />
          ))}
        </div>
        <div className="arch">
          {BloomSVG}
          <span className="cn a">❀</span><span className="cn b">❀</span><span className="cn c">❀</span><span className="cn d">❀</span>
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
        {renderVines()}
        <div className="fx">
          {petalList.map((p) => (
            <i key={p.id} style={{ left: p.left, background: p.col, animationDuration: p.dur, animationDelay: p.del }} />
          ))}
        </div>
        <div className="arch">
          {BloomSVG}
          <span className="cn a">❀</span><span className="cn b">❀</span><span className="cn c">❀</span><span className="cn d">❀</span>
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
        {renderVines()}
        <div className="fx">
          {petalList.map((p) => (
            <i key={p.id} style={{ left: p.left, background: p.col, animationDuration: p.dur, animationDelay: p.del }} />
          ))}
        </div>
        <div className="arch">
          {BloomSVG}
          <span className="cn a">❀</span><span className="cn b">❀</span><span className="cn c">❀</span><span className="cn d">❀</span>
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
        {renderVines()}
        <div className="fx">
          {petalList.map((p) => (
            <i key={p.id} style={{ left: p.left, background: p.col, animationDuration: p.dur, animationDelay: p.del }} />
          ))}
        </div>
        <div className="arch">
          {BloomSVG}
          <span className="cn a">❀</span><span className="cn b">❀</span><span className="cn c">❀</span><span className="cn d">❀</span>
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
        {renderVines()}
        <div className="fx">
          {petalList.map((p) => (
            <i key={p.id} style={{ left: p.left, background: p.col, animationDuration: p.dur, animationDelay: p.del }} />
          ))}
        </div>
        <div className="arch">
          {BloomSVG}
          <span className="cn a">❀</span><span className="cn b">❀</span><span className="cn c">❀</span><span className="cn d">❀</span>
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
