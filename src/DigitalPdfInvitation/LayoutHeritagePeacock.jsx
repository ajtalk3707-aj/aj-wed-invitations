import React from 'react'

// Layout 2 Assets
import ganeshColorImg from './assets/ganesh_color.png'
import peacockRoyalImg from './assets/peacock_royal.png'
import coupleTraditionalImg from './assets/couple_traditional.png'
import marriageMandapImg from './assets/marriage_mandap.png'
import cardOrnamentImg from './assets/card_ornament.png'
import decKundan1 from './assets/dec-3.png'
import decKundan2 from './assets/dec-4.png'
import diyaGoldImg from './assets/diya_gold.png'

export default function LayoutHeritagePeacock({ data, onShareWhatsApp, onMapClick }) {
  // Page 1: Heritage Peacock & Kundan Medallion Cover
  const renderPage1 = () => (
    <div className="pdf-card-page heritage-card relative mx-auto w-full max-w-[540px] min-h-[820px] p-6 sm:p-9 flex flex-col justify-between text-center overflow-hidden rounded-3xl shadow-2xl">
      {/* Ornate Kundan Corner Pieces */}
      <div className="absolute top-3 left-3 w-12 h-12 pointer-events-none opacity-70">
        <img src={decKundan1} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-3 right-3 w-12 h-12 pointer-events-none opacity-70 scale-x-[-1]">
        <img src={decKundan1} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-3 left-3 w-12 h-12 pointer-events-none opacity-70 scale-y-[-1]">
        <img src={decKundan1} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-3 right-3 w-12 h-12 pointer-events-none opacity-70 scale-[-1]">
        <img src={decKundan1} alt="" className="w-full h-full object-contain" />
      </div>

      {/* Top Auspicious Invocation */}
      <div className="pt-2 flex flex-col items-center z-10">
        <div className="inline-flex items-center gap-2 px-5 py-1 rounded-full border border-emerald-400/40 bg-emerald-950/60 text-yellow-300 text-xs font-bold tracking-widest uppercase">
          <span>🦚</span> {data.shloka.ganesh} <span>🦚</span>
        </div>

        {/* Crowned Color Ganesha */}
        <div className="my-2 h-28 sm:h-32 flex items-center justify-center">
          <img
            src={ganeshColorImg}
            alt="Lord Ganesha"
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.6)]"
          />
        </div>

        <p className="text-xs leading-relaxed text-emerald-100/90 max-w-sm whitespace-pre-line font-serif">
          {data.shloka.shloka1}
        </p>
      </div>

      {/* Peacock Motif with Kundan Medallion */}
      <div className="my-2 flex flex-col items-center z-10">
        <div className="flex items-center justify-center gap-3">
          <img src={peacockRoyalImg} alt="Peacock" className="h-16 sm:h-20 object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" />
          <div className="text-center px-2">
            <span className="text-[11px] font-bold tracking-widest text-yellow-400 uppercase">
              ॥ માંગલિક કંકોતરી ॥
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold foil-emerald gujarati-heading mt-0.5">
              શુભ વિવાહ
            </h1>
          </div>
          <img src={peacockRoyalImg} alt="Peacock" className="h-16 sm:h-20 object-contain scale-x-[-1] filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" />
        </div>
      </div>

      {/* Couple Showcase - Regal Horizontal Crest */}
      <div className="my-2 z-10">
        <div className="heritage-frame p-4 rounded-2xl border-2 border-amber-400/60 bg-emerald-950/70 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            {/* Groom */}
            <div className="text-center flex-1">
              <span className="text-xs text-yellow-300/80 font-bold">{data.couple.groom.title}</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-wide gujarati-heading drop-shadow-md">
                {data.couple.groom.name}
              </h2>
              <div className="mt-1 inline-block px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-800/80 text-emerald-200 border border-emerald-600/40">
                {data.couple.groom.residence}
              </div>
            </div>

            {/* Central Kundan Seal */}
            <div className="flex flex-col items-center px-1">
              <div className="h-10 w-10 rounded-full border-2 border-yellow-400 bg-amber-500/20 flex items-center justify-center text-yellow-300 text-lg shadow-lg">
                ❦
              </div>
              <span className="text-[11px] font-extrabold text-yellow-300 mt-1">સંગ</span>
            </div>

            {/* Bride */}
            <div className="text-center flex-1">
              <span className="text-xs text-yellow-300/80 font-bold">{data.couple.bride.title}</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-wide gujarati-heading drop-shadow-md">
                {data.couple.bride.name}
              </h2>
              <div className="mt-1 inline-block px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-800/80 text-emerald-200 border border-emerald-600/40">
                {data.couple.bride.residence}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date & Lineage Footer */}
      <div className="pt-3 border-t border-emerald-400/30 z-10">
        <div className="flex items-center justify-center gap-2">
          <img src={diyaGoldImg} alt="" className="h-4 w-4" />
          <p className="text-sm font-bold text-yellow-300 tracking-wide">
            {data.couple.weddingDateLine}
          </p>
          <img src={diyaGoldImg} alt="" className="h-4 w-4 scale-x-[-1]" />
        </div>
        <p className="text-xs text-emerald-100/80 mt-1">
          {data.family.inviters[0]} તથા {data.family.inviters[2]}
        </p>
        <div className="text-[10px] text-yellow-400/60 mt-1">
          શાહી પન્ના-મોરપિચ્છ થીમ • પાનું ૧ / ૪
        </div>
      </div>
    </div>
  )

  // Page 2: Royal Mandap Chhatri & Standing Traditional Couple
  const renderPage2 = () => (
    <div className="pdf-card-page heritage-card relative mx-auto w-full max-w-[540px] min-h-[820px] p-6 sm:p-9 flex flex-col justify-between text-center overflow-hidden rounded-3xl shadow-2xl">
      <div className="absolute top-3 left-3 w-12 h-12 pointer-events-none opacity-70">
        <img src={decKundan1} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-3 right-3 w-12 h-12 pointer-events-none opacity-70 scale-x-[-1]">
        <img src={decKundan1} alt="" className="w-full h-full object-contain" />
      </div>

      <div className="pt-2 flex flex-col items-center z-10">
        <span className="text-xs font-semibold px-4 py-0.5 rounded-full border border-emerald-400/40 bg-emerald-950/60 text-yellow-300">
          ॥ પવિત્ર સપ્તપદી & વિવાહ મહોત્સવ ॥
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold foil-emerald gujarati-heading mt-1">
          સ્નેહસભર નિમંત્રણ પત્રિકા
        </h3>
        <div className="heritage-divider w-36 my-1">
          <span className="line" />
          <span className="text-yellow-400 text-sm">🦚</span>
          <span className="line" />
        </div>
      </div>

      {/* Traditional Standing Couple & Mandap Chhatri */}
      <div className="my-2 flex items-center justify-center gap-3 z-10">
        <div className="h-40 sm:h-48 flex items-center justify-center">
          <img
            src={coupleTraditionalImg}
            alt="Royal Couple"
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.6)]"
          />
        </div>
        <div className="hidden sm:flex h-36 w-24 items-center justify-center opacity-85">
          <img src={marriageMandapImg} alt="Mandap" className="max-h-full max-w-full object-contain" />
        </div>
      </div>

      {/* Welcome Gujarati Message */}
      <div className="px-4 py-3 rounded-2xl bg-emerald-950/70 border border-emerald-400/30 text-xs sm:text-[13px] leading-relaxed text-justify text-emerald-100/95 z-10">
        {data.welcomeMessage}
      </div>

      {/* Lineage Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 text-left text-xs z-10">
        <div className="p-3 rounded-xl border border-yellow-400/30 bg-black/40">
          <div className="font-bold text-yellow-300 text-sm mb-1 flex items-center gap-1.5">
            <span>⚜️</span> વરપક્ષ (ચિ. દર્શન)
          </div>
          <p className="text-emerald-100/90">{data.couple.groom.parents}</p>
          <p className="text-emerald-200/70 mt-1">નિવાસ: {data.couple.groom.residence}</p>
          <span className="inline-block text-[10px] mt-1.5 px-2 py-0.5 rounded bg-emerald-800 text-yellow-200 border border-emerald-600/50">
            {data.couple.groom.qualification}
          </span>
        </div>

        <div className="p-3 rounded-xl border border-yellow-400/30 bg-black/40">
          <div className="font-bold text-yellow-300 text-sm mb-1 flex items-center gap-1.5">
            <span>⚜️</span> કન્યાપક્ષ (ચિ. ઈશિતા)
          </div>
          <p className="text-emerald-100/90">{data.couple.bride.parents}</p>
          <p className="text-emerald-200/70 mt-1">નિવાસ: {data.couple.bride.residence}</p>
          <span className="inline-block text-[10px] mt-1.5 px-2 py-0.5 rounded bg-emerald-800 text-yellow-200 border border-emerald-600/50">
            {data.couple.bride.qualification}
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-emerald-400/30 z-10">
        <p className="text-[11px] text-emerald-200/80 italic font-serif">
          {data.shloka.shloka2}
        </p>
        <div className="text-[10px] text-yellow-400/60 mt-1">
          શાહી પન્ના-મોરપિચ્છ થીમ • પાનું ૨ / ૪
        </div>
      </div>
    </div>
  )

  // Page 3: Vertical Heritage Step-Timeline
  const renderPage3 = () => (
    <div className="pdf-card-page heritage-card relative mx-auto w-full max-w-[540px] min-h-[820px] p-6 sm:p-9 flex flex-col justify-between text-center overflow-hidden rounded-3xl shadow-2xl">
      <div className="absolute top-3 left-3 w-12 h-12 pointer-events-none opacity-70">
        <img src={decKundan1} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-3 right-3 w-12 h-12 pointer-events-none opacity-70 scale-x-[-1]">
        <img src={decKundan1} alt="" className="w-full h-full object-contain" />
      </div>

      <div className="pt-2 flex flex-col items-center z-10">
        <div className="h-16 w-16 mb-1">
          <img src={cardOrnamentImg} alt="" className="h-full w-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold foil-emerald gujarati-heading">
          માંગલિક પ્રસંગ રૂપરેખા
        </h3>
        <p className="text-xs text-yellow-300 font-semibold">
          શાહી મહોત્સવ ના શુભ ચોઘડિયે
        </p>
      </div>

      {/* Step Timeline */}
      <div className="space-y-3.5 my-2 text-left z-10">
        {data.events.map((eventDay) => (
          <div
            key={eventDay.id}
            className="p-3.5 rounded-2xl border border-yellow-400/40 bg-emerald-950/80 backdrop-blur-sm relative"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-400/20">
              <span className="font-bold text-xs sm:text-sm text-yellow-300 flex items-center gap-1.5">
                <span>🦚</span> {eventDay.date}
              </span>
              <span className="text-[10px] text-emerald-200/80 font-medium">{eventDay.samvat}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {eventDay.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 p-1.5 rounded-lg bg-emerald-900/50 border border-emerald-500/20">
                  <span className="text-base">{item.icon}</span>
                  <div>
                    <div className="font-bold text-[12px] text-white">{item.title}</div>
                    <div className="text-[11px] font-bold text-yellow-300">{item.time}</div>
                    <div className="text-[10px] text-emerald-200/80 leading-tight mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tahuko */}
      <div className="pt-2 border-t border-emerald-400/30 z-10">
        <p className="text-xs text-yellow-200/90 italic whitespace-pre-line font-serif">
          {data.shloka.tahuko}
        </p>
        <div className="text-[10px] text-yellow-400/60 mt-1">
          શાહી પન્ના-મોરપિચ્છ થીમ • પાનું ૩ / ૪
        </div>
      </div>
    </div>
  )

  // Page 4: Royal Pavilion Venue, Map & Family
  const renderPage4 = () => (
    <div className="pdf-card-page heritage-card relative mx-auto w-full max-w-[540px] min-h-[820px] p-6 sm:p-9 flex flex-col justify-between text-center overflow-hidden rounded-3xl shadow-2xl">
      <div className="absolute top-3 left-3 w-12 h-12 pointer-events-none opacity-70">
        <img src={decKundan1} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-3 right-3 w-12 h-12 pointer-events-none opacity-70 scale-x-[-1]">
        <img src={decKundan1} alt="" className="w-full h-full object-contain" />
      </div>

      <div className="pt-2 flex flex-col items-center z-10">
        <div className="h-14 w-14 mb-1">
          <img src={decKundan2} alt="" className="h-full w-full object-contain" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold foil-emerald gujarati-heading">
          શુભ સ્થળ & સ્નેહાધીન
        </h3>
        <p className="text-xs text-yellow-300 font-semibold">નવયુગલને આશીર્વાદ આપવા પધારો</p>
      </div>

      {/* Venue Box */}
      <div className="p-4 rounded-2xl border-2 border-yellow-400/60 bg-emerald-950/90 text-center my-2 z-10 shadow-lg">
        <div className="text-xs uppercase tracking-wider font-bold text-yellow-300 mb-0.5 flex items-center justify-center gap-1.5">
          <span>🏛️</span> વિવાહ મહોત્સવ સ્થળ
        </div>
        <h4 className="text-lg sm:text-xl font-extrabold text-white">
          {data.venue.name}
        </h4>
        <p className="text-xs text-emerald-100/90 mt-1">{data.venue.addressLine1}</p>
        <p className="text-xs text-emerald-200/80">{data.venue.addressLine2}</p>

        <div className="mt-3 flex items-center justify-center gap-2 no-print">
          <a
            href={data.venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-yellow-400 hover:bg-yellow-300 text-black shadow-lg transition"
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
        <div className="p-2.5 rounded-xl border border-yellow-400/30 bg-black/40">
          <div className="font-bold text-xs text-yellow-300 mb-1">લિ. નિમંત્રક</div>
          {data.family.inviters.map((inv, i) => (
            <p key={i} className="text-emerald-100/90 leading-tight">{inv}</p>
          ))}
        </div>

        <div className="p-2.5 rounded-xl border border-yellow-400/30 bg-black/40">
          <div className="font-bold text-xs text-yellow-300 mb-1">લિ. સ્નેહાધીન</div>
          {data.family.snehadhin.map((sneh, i) => (
            <p key={i} className="text-emerald-100/90 leading-tight">{sneh}</p>
          ))}
        </div>

        <div className="p-2.5 rounded-xl border border-yellow-400/30 bg-black/40">
          <div className="font-bold text-xs text-yellow-300 mb-0.5">લિ. દર્શનાભિલાષી</div>
          <p className="text-emerald-100/90 leading-tight">
            {data.family.darshanabhilashi.join(', ')}
          </p>
        </div>

        <div className="p-2.5 rounded-xl border border-yellow-400/30 bg-black/40">
          <div className="font-bold text-xs text-yellow-300 mb-0.5">મોસાળ & બાણેજ પક્ષ</div>
          <p className="text-emerald-100/90 leading-tight">{data.family.mosal}</p>
          <p className="text-emerald-200/80 leading-tight mt-0.5">{data.family.banej}</p>
        </div>
      </div>

      <div className="pt-3 border-t border-emerald-400/30 z-10">
        <p className="text-xs font-bold text-yellow-300">
          સંપર્ક: {data.family.contactPhones.join(' • ')}
        </p>
        <p className="text-[10px] text-emerald-100/70 mt-0.5">
          આપની પધરામણીથી અમારા આંગણે મંગલ ઉત્સવ દીપી ઊઠશે.
        </p>
        <div className="text-[10px] text-yellow-400/60 mt-1">
          શાહી પન્ના-મોરપિચ્છ થીમ • પાનું ૪ / ૪
        </div>
      </div>
    </div>
  )

  return [renderPage1, renderPage2, renderPage3, renderPage4]
}
