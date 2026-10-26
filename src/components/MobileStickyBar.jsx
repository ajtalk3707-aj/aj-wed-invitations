import { contactConfig } from '../translations'

export default function MobileStickyBar({ lang }) {
  return (
    <>
      {/* Mobile Fixed Bottom Conversion Bar (Screens < sm) */}
      <div className="fixed bottom-0 inset-x-0 z-50 sm:hidden border-t border-amber-500/30 bg-[#090715]/95 backdrop-blur-lg px-3 py-2.5 flex items-center gap-2 shadow-[0_-5px_25px_rgba(0,0,0,0.7)]">
        {/* Direct Call Button */}
        <a
          href={contactConfig.getPhoneLink()}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-amber-400/40 bg-[#1b1035] py-2.5 text-xs font-bold text-amber-200 active:scale-95 transition"
        >
          <span>📞</span>
          <span>{lang === 'gu' ? 'કૉલ કરો' : 'Call Now'}</span>
        </a>

        {/* Direct WhatsApp Button */}
        <a
          href={contactConfig.getWhatsAppLink('નમસ્તે AJ Invitation, મને તમારા ડિજિટલ કંકોતરી વિશે જણાવો.')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.4] flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 py-2.5 text-xs font-extrabold text-white shadow-[0_0_15px_rgba(34,197,94,0.5)] active:scale-95 transition whatsapp-pulse"
        >
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.203c.043.071.043.418-.101.823z" />
          </svg>
          <span>{lang === 'gu' ? 'વોટ્સએપ ચેટ' : 'WhatsApp Us'}</span>
        </a>
      </div>

      {/* Desktop Floating WhatsApp Button (Hidden on Mobile since sticky bar is present) */}
      <a
        href={contactConfig.getWhatsAppLink('નમસ્તે AJ Invitation, મને વધુ માહિતી આપો.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="hidden sm:flex fixed bottom-6 right-6 z-50 h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 to-green-400 text-white shadow-[0_0_25px_rgba(34,197,94,0.6)] hover:scale-110 transition-transform whatsapp-pulse cursor-pointer group"
      >
        <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.203c.043.071.043.418-.101.823z" />
        </svg>

        {/* Hover Tooltip on Desktop */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-black/90 px-3 py-1.5 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md border border-amber-500/30">
          {lang === 'gu' ? '૯૬૮૭૩૩૬૪૨૬ પર ચેટ કરો' : 'Chat on 9687336426'}
        </span>
      </a>
    </>
  )
}
