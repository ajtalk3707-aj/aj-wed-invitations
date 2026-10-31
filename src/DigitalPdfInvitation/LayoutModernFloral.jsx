import React from 'react'

// Layout 3 Assets
import ganeshRedImg from './assets/ganesh_red.png'
import bohoFrameImg from './assets/boho_frame.png'
import floralArchImg from './assets/floral_arch.png'
import flowersCornerImg from './assets/flowers_corner.png'
import coupleCuteImg from './assets/couple_cute.png'
import vivahSealImg from './assets/vivah0.png'
import flowerImg from './assets/flower.png'

export default function LayoutModernFloral({ data, onShareWhatsApp, onMapClick }) {
  // Page 1: Boho Pampas Floral Wreath & Monogram Cover
  const renderPage1 = () => (
    <div className="pdf-card-page boho-card relative mx-auto w-full max-w-[540px] min-h-[820px] p-6 sm:p-9 flex flex-col justify-between text-center overflow-hidden rounded-[36px] shadow-2xl bg-gradient-to-b from-[#fffcf9] via-[#fff5f5] to-[#fdf2f4] text-[#4c0519]">
      {/* Corner Watercolor Flowers */}
      <div className="absolute -top-3 -left-3 w-28 h-28 pointer-events-none opacity-85">
        <img src={flowersCornerImg} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute -bottom-3 -right-3 w-28 h-28 pointer-events-none opacity-85 rotate-180">
        <img src={flowersCornerImg} alt="" className="w-full h-full object-contain" />
      </div>

      {/* Top Auspicious Ganesha Line */}
      <div className="pt-2 flex flex-col items-center z-10">
        <span className="text-[11px] font-bold tracking-widest uppercase px-4 py-1 rounded-full border border-rose-300 bg-rose-50/80 text-rose-800 shadow-sm">
          {data.shloka.ganesh}
        </span>

        {/* Minimalist Line-Art Red Ganesha */}
        <div className="my-2 h-20 sm:h-24 flex items-center justify-center">
          <img
            src={ganeshRedImg}
            alt="Lord Ganesha"
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_10px_rgba(225,29,72,0.25)]"
          />
        </div>

        <p className="text-xs leading-relaxed text-rose-900/80 max-w-xs whitespace-pre-line font-serif italic">
          {data.shloka.shloka1}
        </p>
      </div>

      {/* Central Boho Pampas Wreath & Couple Monogram */}
      <div className="relative my-2 flex items-center justify-center z-10">
        <div className="relative h-60 w-60 sm:h-68 sm:w-68 flex items-center justify-center">
          {/* Rotating Boho Wreath Frame */}
          <img
            src={bohoFrameImg}
            alt="Boho Floral Wreath"
            className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(244,63,94,0.18)]"
          />

          {/* Central Names Inside Wreath */}
          <div className="text-center px-4 z-10">
            <span className="text-[11px] font-bold tracking-widest uppercase text-rose-700">
              શુભ વિવાહ
            </span>
            <div className="my-0.5">
              <span className="text-xs opacity-75">{data.couple.groom.title}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold foil-rose gujarati-heading leading-tight">
                {data.couple.groom.name}
              </h2>
            </div>
            <div className="flex items-center justify-center gap-1.5 my-0.5">
              <span className="h-px w-6 bg-rose-300" />
              <span className="text-xs font-bold text-rose-600">❦ સંગ ❦</span>
              <span className="h-px w-6 bg-rose-300" />
            </div>
            <div>
              <span className="text-xs opacity-75">{data.couple.bride.title}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold foil-rose gujarati-heading leading-tight">
                {data.couple.bride.name}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Date Ribbon */}
      <div className="pt-2 z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs sm:text-sm shadow-md">
          <span>🌸</span> {data.couple.weddingDateLine}
        </div>
        <p className="text-xs text-rose-900/80 mt-2 font-medium">
          {data.family.inviters[0]} તથા {data.family.inviters[2]}
        </p>
        <div className="text-[10px] text-rose-500/70 mt-1">
          મોડર્ન રોઝ-ગોલ્ડ ફ્લોરલ થીમ • પાનું ૧ / ૪
        </div>
      </div>
    </div>
  )

  // Page 2: Floral Arch & Cute Modern Couple
  const renderPage2 = () => (
    <div className="pdf-card-page boho-card relative mx-auto w-full max-w-[540px] min-h-[820px] p-6 sm:p-9 flex flex-col justify-between text-center overflow-hidden rounded-[36px] shadow-2xl bg-gradient-to-b from-[#fffcf9] via-[#fff5f5] to-[#fdf2f4] text-[#4c0519]">
      <div className="absolute -top-3 -right-3 w-28 h-28 pointer-events-none opacity-85 scale-x-[-1]">
        <img src={flowersCornerImg} alt="" className="w-full h-full object-contain" />
      </div>

      <div className="pt-2 flex flex-col items-center z-10">
        <span className="text-[11px] font-semibold px-4 py-0.5 rounded-full border border-rose-300 bg-rose-50 text-rose-700">
          ॥ બે હૃદયનું મિલન, બે પરિવારનો સંગમ ॥
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold foil-rose gujarati-heading mt-1">
          પ્રેમસભર વિવાહ આમંત્રણ
        </h3>
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent my-1" />
      </div>

      {/* Romantic Cute Couple Sticker */}
      <div className="my-2 h-44 sm:h-52 flex items-center justify-center z-10">
        <img
          src={coupleCuteImg}
          alt="Cute Wedding Couple"
          className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_20px_rgba(190,24,93,0.22)]"
        />
      </div>

      {/* Welcome Gujarati Proclamation */}
      <div className="px-4 py-3 rounded-2xl bg-white/80 border border-rose-200 text-xs sm:text-[13px] leading-relaxed text-justify text-rose-950 shadow-sm z-10">
        {data.welcomeMessage}
      </div>

      {/* Groom & Bride Info Modern Rounded Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 text-left text-xs z-10">
        <div className="p-3.5 rounded-2xl border border-rose-200 bg-white/85 shadow-sm">
          <div className="font-bold text-rose-700 text-sm mb-1 flex items-center gap-1.5">
            <span>🤵</span> વરપક્ષ (ચિ. દર્શન)
          </div>
          <p className="text-rose-950 font-medium">{data.couple.groom.parents}</p>
          <p className="text-rose-800/80 mt-1">સ્થળ: {data.couple.groom.residence}</p>
          <span className="inline-block text-[10px] mt-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-semibold">
            {data.couple.groom.qualification}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl border border-rose-200 bg-white/85 shadow-sm">
          <div className="font-bold text-rose-700 text-sm mb-1 flex items-center gap-1.5">
            <span>👰</span> કન્યાપક્ષ (ચિ. ઈશિતા)
          </div>
          <p className="text-rose-950 font-medium">{data.couple.bride.parents}</p>
          <p className="text-rose-800/80 mt-1">સ્થળ: {data.couple.bride.residence}</p>
          <span className="inline-block text-[10px] mt-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-semibold">
            {data.couple.bride.qualification}
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-rose-200 z-10">
        <p className="text-[11px] text-rose-800 italic font-serif">
          {data.shloka.shloka2}
        </p>
        <div className="text-[10px] text-rose-500/70 mt-1">
          મોડર્ન રોઝ-ગોલ્ડ ફ્લોરલ થીમ • પાનું ૨ / ૪
        </div>
      </div>
    </div>
  )

  // Page 3: Pastel Modern Events Timeline
  const renderPage3 = () => (
    <div className="pdf-card-page boho-card relative mx-auto w-full max-w-[540px] min-h-[820px] p-6 sm:p-9 flex flex-col justify-between text-center overflow-hidden rounded-[36px] shadow-2xl bg-gradient-to-b from-[#fffcf9] via-[#fff5f5] to-[#fdf2f4] text-[#4c0519]">
      <div className="absolute -top-3 -left-3 w-28 h-28 pointer-events-none opacity-85">
        <img src={flowersCornerImg} alt="" className="w-full h-full object-contain" />
      </div>

      <div className="pt-2 flex flex-col items-center z-10">
        <div className="h-16 w-16 mb-1">
          <img src={flowerImg} alt="Flower" className="h-full w-full object-contain filter drop-shadow-[0_4px_10px_rgba(244,63,94,0.25)]" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold foil-rose gujarati-heading">
          માંગલિક લગ્નોત્સવ રૂપરેખા
        </h3>
        <p className="text-xs text-rose-700 font-semibold">
          પ્રીત અને સ્નેહની મંગલ રસમ
        </p>
      </div>

      {/* Events Modern Cards */}
      <div className="space-y-3 my-2 text-left z-10">
        {data.events.map((eventDay) => (
          <div
            key={eventDay.id}
            className="p-3.5 rounded-2xl border border-rose-200 bg-white/90 shadow-sm relative"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-rose-100">
              <span className="font-bold text-xs sm:text-sm text-rose-700 flex items-center gap-1.5">
                <span>🌺</span> {eventDay.date}
              </span>
              <span className="text-[10px] text-rose-600/80 font-medium">{eventDay.samvat}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {eventDay.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 p-1.5 rounded-xl bg-rose-50/70 border border-rose-100">
                  <span className="text-base">{item.icon}</span>
                  <div>
                    <div className="font-bold text-[12px] text-rose-950">{item.title}</div>
                    <div className="text-[11px] font-bold text-rose-600">{item.time}</div>
                    <div className="text-[10px] text-rose-800/80 leading-tight mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tahuko */}
      <div className="pt-2 border-t border-rose-200 z-10">
        <p className="text-xs text-rose-900/90 italic whitespace-pre-line font-serif">
          {data.shloka.tahuko}
        </p>
        <div className="text-[10px] text-rose-500/70 mt-1">
          મોડર્ન રોઝ-ગોલ્ડ ફ્લોરલ થીમ • પાનું ૩ / ૪
        </div>
      </div>
    </div>
  )

  // Page 4: Vivah Monogram Seal, Venue & RSVP
  const renderPage4 = () => (
    <div className="pdf-card-page boho-card relative mx-auto w-full max-w-[540px] min-h-[820px] p-6 sm:p-9 flex flex-col justify-between text-center overflow-hidden rounded-[36px] shadow-2xl bg-gradient-to-b from-[#fffcf9] via-[#fff5f5] to-[#fdf2f4] text-[#4c0519]">
      <div className="absolute -bottom-3 -right-3 w-28 h-28 pointer-events-none opacity-85 rotate-180">
        <img src={flowersCornerImg} alt="" className="w-full h-full object-contain" />
      </div>

      <div className="pt-2 flex flex-col items-center z-10">
        <div className="h-16 w-16 mb-1">
          <img src={vivahSealImg} alt="Vivah Seal" className="h-full w-full object-contain filter drop-shadow-[0_4px_10px_rgba(244,63,94,0.3)]" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold foil-rose gujarati-heading">
          શુભ સ્થળ & સ્નેહાધીન
        </h3>
        <p className="text-xs text-rose-700 font-semibold">આપનું સ્નેહભર્યું સ્વાગત છે</p>
      </div>

      {/* Venue Box */}
      <div className="p-4 rounded-2xl border-2 border-rose-300 bg-white/95 text-center my-2 z-10 shadow-md">
        <div className="text-xs uppercase tracking-wider font-bold text-rose-600 mb-0.5 flex items-center justify-center gap-1.5">
          <span>📍</span> મંગલ વિવાહ સ્થળ
        </div>
        <h4 className="text-lg sm:text-xl font-extrabold text-rose-950">
          {data.venue.name}
        </h4>
        <p className="text-xs text-rose-900 mt-1">{data.venue.addressLine1}</p>
        <p className="text-xs text-rose-800/80">{data.venue.addressLine2}</p>

        <div className="mt-3 flex items-center justify-center gap-2 no-print">
          <a
            href={data.venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md transition"
          >
            <span>🗺️</span> ગૂગલ મેપ્સ
          </a>
          <button
            onClick={onShareWhatsApp}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition"
          >
            <span>💬</span> વોટ્સએપ
          </button>
        </div>
      </div>

      {/* Family Info */}
      <div className="grid grid-cols-2 gap-2 text-left text-[11px] my-2 z-10">
        <div className="p-2.5 rounded-xl border border-rose-200 bg-white/90 shadow-sm">
          <div className="font-bold text-xs text-rose-700 mb-1">લિ. નિમંત્રક</div>
          {data.family.inviters.map((inv, i) => (
            <p key={i} className="text-rose-900 leading-tight">{inv}</p>
          ))}
        </div>

        <div className="p-2.5 rounded-xl border border-rose-200 bg-white/90 shadow-sm">
          <div className="font-bold text-xs text-rose-700 mb-1">લિ. સ્નેહાધીન</div>
          {data.family.snehadhin.map((sneh, i) => (
            <p key={i} className="text-rose-900 leading-tight">{sneh}</p>
          ))}
        </div>

        <div className="p-2.5 rounded-xl border border-rose-200 bg-white/90 shadow-sm">
          <div className="font-bold text-xs text-rose-700 mb-0.5">લિ. દર્શનાભિલાષી</div>
          <p className="text-rose-900 leading-tight">
            {data.family.darshanabhilashi.join(', ')}
          </p>
        </div>

        <div className="p-2.5 rounded-xl border border-rose-200 bg-white/90 shadow-sm">
          <div className="font-bold text-xs text-rose-700 mb-0.5">મોસાળ & બાણેજ પક્ષ</div>
          <p className="text-rose-900 leading-tight">{data.family.mosal}</p>
          <p className="text-rose-800/80 leading-tight mt-0.5">{data.family.banej}</p>
        </div>
      </div>

      <div className="pt-2 border-t border-rose-200 z-10">
        <p className="text-xs font-bold text-rose-700">
          સંપર્ક: {data.family.contactPhones.join(' • ')}
        </p>
        <p className="text-[10px] text-rose-800/80 mt-0.5">
          આપની સ્નેહભરી ઉપસ્થિતિ અમારા પરિવાર માટે આશીર્વાદ સમાન છે.
        </p>
        <div className="text-[10px] text-rose-500/70 mt-1">
          મોડર્ન રોઝ-ગોલ્ડ ફ્લોરલ થીમ • પાનું ૪ / ૪
        </div>
      </div>
    </div>
  )

  return [renderPage1, renderPage2, renderPage3, renderPage4]
}

