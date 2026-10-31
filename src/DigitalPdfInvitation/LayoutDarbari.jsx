import React from 'react'

// Layout 1 Assets
import ganeshShlokImg from './assets/ganesh_shlok.png'
import shubhVivahImg from './assets/shubh_vivah.png'
import weddingCoupleImg from './assets/wedding_couple.png'
import shehnaiDholImg from './assets/shehnai_dhol.png'
import diyaGoldImg from './assets/diya_gold.png'
import decToranImg from './assets/dec-1.png'
import decJhumkaImg from './assets/dec-2.png'
import logoKalashImg from './assets/logo_kalash.png'

export default function LayoutDarbari({ data, onShareWhatsApp, onMapClick }) {
  // Page 1: Darbari Arch & Royal Kalash Cover
  const renderPage1 = () => (
    <div className="pdf-card-page darbari-card relative mx-auto w-full max-w-[540px] min-h-[820px] p-6 sm:p-9 flex flex-col justify-between text-center overflow-hidden rounded-t-[90px] rounded-b-3xl shadow-2xl">
      {/* Top Hanging Royal Toran Garland */}
      <div className="absolute top-0 inset-x-0 h-16 pointer-events-none opacity-85 overflow-hidden flex justify-center">
        <img src={decToranImg} alt="Royal Toran" className="w-full max-w-[480px] h-auto object-contain -mt-1" />
      </div>

      {/* Side Decorative Hanging Jhumkas */}
      <div className="absolute top-16 left-3 w-8 h-20 pointer-events-none opacity-60 hidden sm:block">
        <img src={decJhumkaImg} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-16 right-3 w-8 h-20 pointer-events-none opacity-60 hidden sm:block scale-x-[-1]">
        <img src={decJhumkaImg} alt="" className="w-full h-full object-contain" />
      </div>

      {/* Top Section: Shlok & Ganesha Calligraphy */}
      <div className="pt-10 flex flex-col items-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-0.5 rounded-full border border-amber-400/40 bg-amber-950/40 text-amber-300 text-xs font-bold tracking-wider mb-2">
          <span>🪔</span> {data.shloka.ganesh} <span>🪔</span>
        </div>

        {/* Vakratunda Mahakaya Calligraphy Ganesha Sticker */}
        <div className="my-1 h-24 sm:h-28 w-full flex items-center justify-center">
          <img
            src={ganeshShlokImg}
            alt="Lord Ganesha Shlok"
            className="max-h-full max-w-[280px] object-contain filter drop-shadow-[0_4px_14px_rgba(255,215,0,0.35)]"
          />
        </div>

        <p className="text-xs leading-relaxed text-amber-100/90 max-w-sm whitespace-pre-line font-serif italic mt-1">
          {data.shloka.shloka1}
        </p>

        <div className="darbari-divider my-2 w-48">
          <span className="line" />
          <span className="text-amber-400 text-base">❖</span>
          <span className="line" />
        </div>
      </div>

      {/* Center Section: Royal Shubh Vivah Kalash & Shehnai Motif */}
      <div className="my-2 flex flex-col items-center z-10">
        <div className="relative h-36 sm:h-44 flex items-center justify-center">
          <img
            src={shubhVivahImg}
            alt="Shubh Vivah Kalash"
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)] pulse-glow"
          />
        </div>
        <div className="mt-1 flex items-center gap-2">
          <img src={diyaGoldImg} alt="Diya" className="h-5 w-5 object-contain" />
          <span className="text-xs font-bold tracking-widest text-amber-300 uppercase px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/30">
            {data.shloka.subTitle}
          </span>
          <img src={diyaGoldImg} alt="Diya" className="h-5 w-5 object-contain scale-x-[-1]" />
        </div>
      </div>

      {/* Royal Names of Groom & Bride */}
      <div className="my-2 z-10">
        <div className="darbari-name-box p-4 rounded-2xl border border-amber-400/40 bg-black/40 backdrop-blur-sm">
          <div className="flex items-center justify-around gap-2">
            <div className="text-center flex-1">
              <span className="text-xs text-amber-200/80 font-semibold">{data.couple.groom.title}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold foil-gold gujarati-heading">
                {data.couple.groom.name}
              </h2>
              <p className="text-[11px] text-amber-100/70 mt-0.5">{data.couple.groom.residence}</p>
            </div>

            <div className="flex flex-col items-center px-2">
              <span className="text-2xl text-amber-400">❦</span>
              <span className="text-xs font-bold text-amber-300 tracking-wider">સંગ</span>
              <span className="text-2xl text-amber-400">❦</span>
            </div>

            <div className="text-center flex-1">
              <span className="text-xs text-amber-200/80 font-semibold">{data.couple.bride.title}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold foil-gold gujarati-heading">
                {data.couple.bride.name}
              </h2>
              <p className="text-[11px] text-amber-100/70 mt-0.5">{data.couple.bride.residence}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Date & Inviters */}
      <div className="pt-3 border-t border-amber-400/30 z-10">
        <p className="text-sm font-bold text-amber-300 tracking-wide">
          {data.couple.weddingDateLine}
        </p>
        <p className="text-xs text-amber-100/80 mt-1">
          {data.family.inviters[0]} તથા {data.family.inviters[2]}
        </p>
        <div className="text-[10px] text-amber-400/60 mt-1">
          દરબારી કંકુ-સોનેરી થીમ • પાનું ૧ / ૪
        </div>
      </div>
    </div>
  )

  // Page 2: Vivah Sanskar & Sacred Havan Kund Couple Ritual
  const renderPage2 = () => (
    <div className="pdf-card-page darbari-card relative mx-auto w-full max-w-[540px] min-h-[820px] p-6 sm:p-9 flex flex-col justify-between text-center overflow-hidden rounded-t-[90px] rounded-b-3xl shadow-2xl">
      <div className="absolute top-0 inset-x-0 h-16 pointer-events-none opacity-85 flex justify-center">
        <img src={decToranImg} alt="" className="w-full max-w-[480px] h-auto object-contain -mt-1" />
      </div>

      <div className="pt-10 flex flex-col items-center z-10">
        <span className="text-xs font-semibold px-4 py-0.5 rounded-full border border-amber-400/30 bg-amber-950/40 text-amber-300">
          ॥ પાવન મંગલ પરિણય સંસ્કાર ॥
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold foil-gold gujarati-heading mt-1">
          ભાવભીનું સ્નેહ નિમંત્રણ
        </h3>
        <div className="darbari-divider w-36 my-1">
          <span className="line" />
          <span className="text-amber-400 text-sm">✿</span>
          <span className="line" />
        </div>
      </div>

      {/* Sacred Vivah Couple Ritual Sticker */}
      <div className="my-2 h-40 sm:h-48 flex items-center justify-center z-10">
        <img
          src={weddingCoupleImg}
          alt="Wedding Couple Ritual"
          className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
        />
      </div>

      {/* Welcome Message in Darbari Scroll */}
      <div className="px-4 py-3 rounded-2xl bg-black/35 border border-amber-400/25 text-xs sm:text-[13px] leading-relaxed text-justify text-amber-100/95 z-10">
        {data.welcomeMessage}
      </div>

      {/* Groom & Bride Family Lineage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 text-left text-xs z-10">
        <div className="p-3 rounded-xl border border-amber-400/30 bg-black/40">
          <div className="font-bold text-amber-300 text-sm flex items-center gap-1.5 mb-1">
            <span>👑</span> વરપક્ષ (ચિ. દર્શન)
          </div>
          <p className="text-amber-100/90">{data.couple.groom.parents}</p>
          <p className="text-amber-200/70 mt-1">સ્થળ : {data.couple.groom.residence}</p>
          <span className="inline-block text-[10px] mt-1.5 px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-500/30">
            {data.couple.groom.qualification}
          </span>
        </div>

        <div className="p-3 rounded-xl border border-amber-400/30 bg-black/40">
          <div className="font-bold text-amber-300 text-sm flex items-center gap-1.5 mb-1">
            <span>🌸</span> કન્યાપક્ષ (ચિ. ઈશિતા)
          </div>
          <p className="text-amber-100/90">{data.couple.bride.parents}</p>
          <p className="text-amber-200/70 mt-1">સ્થળ : {data.couple.bride.residence}</p>
          <span className="inline-block text-[10px] mt-1.5 px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-500/30">
            {data.couple.bride.qualification}
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-amber-400/30 z-10">
        <p className="text-[11px] text-amber-200/80 italic font-serif">
          {data.shloka.shloka2}
        </p>
        <div className="text-[10px] text-amber-400/60 mt-1">
          દરબારી કંકુ-સોનેરી થીમ • પાનું ૨ / ૪
        </div>
      </div>
    </div>
  )

  // Page 3: Auspicious Shehnai & Dhol Day-by-Day Darbar Timeline
  const renderPage3 = () => (
    <div className="pdf-card-page darbari-card relative mx-auto w-full max-w-[540px] min-h-[820px] p-6 sm:p-9 flex flex-col justify-between text-center overflow-hidden rounded-t-[90px] rounded-b-3xl shadow-2xl">
      <div className="absolute top-0 inset-x-0 h-16 pointer-events-none opacity-85 flex justify-center">
        <img src={decToranImg} alt="" className="w-full max-w-[480px] h-auto object-contain -mt-1" />
      </div>

      <div className="pt-10 flex flex-col items-center z-10">
        <div className="h-24 sm:h-28 flex items-center justify-center my-1">
          <img
            src={shehnaiDholImg}
            alt="Shehnai Dhol"
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.5)]"
          />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold foil-gold gujarati-heading">
          માંગલિક લગ્નોત્સવ કાર્યક્રમ
        </h3>
        <p className="text-xs text-amber-300 font-semibold mt-0.5">
          શરણાઈ અને ઢોલના સુરે માંગલિક વિધિ
        </p>
      </div>

      {/* Events Timeline in Royal Gold Boxes */}
      <div className="space-y-3 my-2 text-left z-10">
        {data.events.map((eventDay) => (
          <div
            key={eventDay.id}
            className="p-3.5 rounded-2xl border border-amber-400/40 bg-black/45 relative overflow-hidden"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-400/20">
              <span className="font-bold text-xs sm:text-sm text-amber-300 flex items-center gap-1.5">
                <img src={diyaGoldImg} alt="" className="h-4 w-4" /> {eventDay.date}
              </span>
              <span className="text-[10px] text-amber-200/70">{eventDay.samvat}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {eventDay.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <span className="text-base">{item.icon}</span>
                  <div>
                    <div className="font-bold text-[12px] text-amber-100">{item.title}</div>
                    <div className="text-[11px] font-semibold text-amber-300">{item.time}</div>
                    <div className="text-[10px] text-amber-200/70 leading-tight mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tahuko */}
      <div className="pt-2 border-t border-amber-400/30 z-10">
        <p className="text-xs text-amber-200/90 italic whitespace-pre-line font-serif">
          {data.shloka.tahuko}
        </p>
        <div className="text-[10px] text-amber-400/60 mt-1">
          દરબારી કંકુ-સોનેરી થીમ • પાનું ૩ / ૪
        </div>
      </div>
    </div>
  )

  // Page 4: Venue & Complete Darbar Family Sneh
  const renderPage4 = () => (
    <div className="pdf-card-page darbari-card relative mx-auto w-full max-w-[540px] min-h-[820px] p-6 sm:p-9 flex flex-col justify-between text-center overflow-hidden rounded-t-[90px] rounded-b-3xl shadow-2xl">
      <div className="absolute top-0 inset-x-0 h-16 pointer-events-none opacity-85 flex justify-center">
        <img src={decToranImg} alt="" className="w-full max-w-[480px] h-auto object-contain -mt-1" />
      </div>

      <div className="pt-10 flex flex-col items-center z-10">
        <div className="h-14 w-14 mb-1">
          <img src={logoKalashImg} alt="Kalash" className="h-full w-full object-contain filter drop-shadow-[0_4px_10px_rgba(255,215,0,0.4)]" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold foil-gold gujarati-heading">
          શુભ સ્થળ & સ્નેહાધીન
        </h3>
        <p className="text-xs text-amber-300 font-semibold">આપનું હાર્દિક સ્વાગત છે</p>
      </div>

      {/* Venue Box */}
      <div className="p-4 rounded-2xl border-2 border-amber-400/50 bg-black/50 text-center my-2 z-10">
        <div className="text-xs uppercase tracking-wider font-bold text-amber-400 mb-0.5 flex items-center justify-center gap-1.5">
          <span>📍</span> શુભ લગ્ન સ્થળ
        </div>
        <h4 className="text-lg sm:text-xl font-extrabold text-white">
          {data.venue.name}
        </h4>
        <p className="text-xs text-amber-100/90 mt-1">{data.venue.addressLine1}</p>
        <p className="text-xs text-amber-200/70">{data.venue.addressLine2}</p>

        <div className="mt-3 flex items-center justify-center gap-2 no-print">
          <a
            href={data.venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black shadow-lg transition"
          >
            <span>🗺️</span> ગૂગલ મેપ્સ
          </a>
          <button
            onClick={onShareWhatsApp}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition"
          >
            <span>💬</span> વોટ્સએપ
          </button>
        </div>
      </div>

      {/* Family Sections */}
      <div className="grid grid-cols-2 gap-2 text-left text-[11px] my-2 z-10">
        <div className="p-2.5 rounded-xl border border-amber-400/30 bg-black/35">
          <div className="font-bold text-xs text-amber-300 mb-1">લિ. નિમંત્રક</div>
          {data.family.inviters.map((inv, i) => (
            <p key={i} className="text-amber-100/90 leading-tight">{inv}</p>
          ))}
        </div>

        <div className="p-2.5 rounded-xl border border-amber-400/30 bg-black/35">
          <div className="font-bold text-xs text-amber-300 mb-1">લિ. સ્નેહાધીન</div>
          {data.family.snehadhin.map((sneh, i) => (
            <p key={i} className="text-amber-100/90 leading-tight">{sneh}</p>
          ))}
        </div>

        <div className="p-2.5 rounded-xl border border-amber-400/30 bg-black/35">
          <div className="font-bold text-xs text-amber-300 mb-0.5">લિ. દર્શનાભિલાષી</div>
          <p className="text-amber-100/90 leading-tight">
            {data.family.darshanabhilashi.join(', ')}
          </p>
        </div>

        <div className="p-2.5 rounded-xl border border-amber-400/30 bg-black/35">
          <div className="font-bold text-xs text-amber-300 mb-0.5">મોસાળ & બાણેજ પક્ષ</div>
          <p className="text-amber-100/90 leading-tight">{data.family.mosal}</p>
          <p className="text-amber-200/70 leading-tight mt-0.5">{data.family.banej}</p>
        </div>
      </div>

      <div className="pt-3 border-t border-amber-400/30 z-10">
        <p className="text-xs font-bold text-amber-300">
          સંપર્ક: {data.family.contactPhones.join(' • ')}
        </p>
        <p className="text-[10px] text-amber-100/70 mt-0.5">
          આપની પધરામણી અમારા મંગલ અવસરની શોભા વધારશે.
        </p>
        <div className="text-[10px] text-amber-400/60 mt-1">
          દરબારી કંકુ-સોનેરી થીમ • પાનું ૪ / ૪
        </div>
      </div>
    </div>
  )

  return [renderPage1, renderPage2, renderPage3, renderPage4]
}

