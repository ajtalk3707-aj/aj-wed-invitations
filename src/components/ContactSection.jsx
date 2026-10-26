import { useState } from 'react'
import { motion } from 'framer-motion'
import { contactConfig } from '../translations'

export default function ContactSection({ lang, t }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    eventType: t.contact.eventOptions[0],
    date: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const generateWhatsAppMessage = () => {
    const lines = [
      `*AJ INVITATION - NEW INQUIRY*`,
      `---------------------------------`,
      `*Name:* ${form.name || 'Not specified'}`,
      `*Phone:* ${form.phone || 'Not specified'}`,
      `*Event Type:* ${form.eventType}`,
      `*Event Date:* ${form.date || 'To be decided'}`,
      form.message ? `*Message:* ${form.message}` : '',
      `---------------------------------`,
      `Sent from AJ Invitation Landing Page`
    ].filter(Boolean).join('\n')

    return contactConfig.getWhatsAppLink(lines)
  }

  const generateEmailSubject = () => {
    return `Inquiry: ${form.eventType} - ${form.name || 'Customer'}`
  }

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    const url = generateWhatsAppMessage()
    window.open(url, '_blank')
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    const subject = generateEmailSubject()
    const body = `Name: ${form.name}\nPhone: ${form.phone}\nEvent Type: ${form.eventType}\nDate: ${form.date}\n\nRequirements:\n${form.message}`
    window.location.href = `mailto:${contactConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-amber-200 uppercase backdrop-blur-md mb-3">
          ✨ {t.contact.badge} ✨
        </div>
        <h2 className="font-['Cinzel'] text-3xl font-extrabold tracking-wide text-white sm:text-4xl lg:text-5xl">
          {t.contact.title}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-amber-100/80 font-['Hind_Vadodara']">
          {t.contact.subtitle}
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Direct Contact Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-4 lg:col-span-5"
        >
          {/* WhatsApp Card (High Priority) */}
          <a
            href={contactConfig.getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-[#0d2217] to-[#122e20] p-6 shadow-xl hover:border-emerald-400 transition"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.203c.043.071.043.418-.101.823z" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  {t.contact.whatsappTitle}
                </div>
                <div className="font-bold text-lg text-white">
                  +91 {contactConfig.phone}
                </div>
                <div className="text-xs text-emerald-300/80">
                  {lang === 'gu' ? 'ત્વરિત જવાબ મેળવો' : 'Instant 24/7 replies on WhatsApp'}
                </div>
              </div>
            </div>
          </a>

          {/* Phone Call Card */}
          <a
            href={contactConfig.getPhoneLink()}
            className="group block rounded-3xl border border-amber-500/25 bg-[#140b2b]/90 p-6 shadow-xl hover:border-amber-400 transition"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-300 text-2xl border border-amber-400/40 group-hover:scale-105 transition-transform">
                📞
              </div>
              <div>
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  {t.contact.phoneTitle}
                </div>
                <div className="font-bold text-lg text-white">
                  +91 {contactConfig.phone}
                </div>
                <div className="text-xs text-amber-200/70">
                  {lang === 'gu' ? 'સીધો કૉલ કરી વાત કરો' : 'Tap to call directly'}
                </div>
              </div>
            </div>
          </a>

          {/* Email Card */}
          <a
            href={contactConfig.getEmailLink()}
            className="group block rounded-3xl border border-amber-500/25 bg-[#140b2b]/90 p-6 shadow-xl hover:border-amber-400 transition"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-300 text-2xl border border-amber-400/40 group-hover:scale-105 transition-transform">
                ✉️
              </div>
              <div>
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  {t.contact.emailTitle}
                </div>
                <div className="font-bold text-base sm:text-lg text-white break-all">
                  {contactConfig.email}
                </div>
                <div className="text-xs text-amber-200/70">
                  {lang === 'gu' ? 'ઇમેઇલ દ્વારા સંપર્ક કરો' : 'Send detailed inquiries'}
                </div>
              </div>
            </div>
          </a>

          {/* Business Info / Support Hours */}
          <div className="rounded-3xl border border-amber-500/20 bg-black/40 p-5 text-xs text-amber-200/80 space-y-1.5">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <span>🕒</span>
              <span>{t.contact.hoursTitle}</span>
            </div>
            <div>{t.contact.hoursDesc}</div>
            <div className="pt-2 text-amber-400/90 font-medium">
              📍 {lang === 'gu' ? contactConfig.locationGu : contactConfig.location}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive Inquiry Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#180f33] via-[#120a26] to-[#0c071a] p-6 sm:p-8 shadow-2xl lg:col-span-7"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-amber-500/20">
            <div>
              <h3 className="font-['Cinzel'] text-xl sm:text-2xl font-bold text-white">
                {t.contact.formTitle}
              </h3>
              <p className="text-xs text-amber-200/70 mt-1">
                {lang === 'gu'
                  ? 'વિગતો ભરો અને સીધા વોટ્સએપ પર મોકલો (૯૬૮૭૩૩૬૪૨૬)'
                  : 'Fill details to send instant inquiry to 9687336426'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img src="/aj-logo.png" alt="AJ Invitation Logo" className="h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]" />
            </div>
          </div>

          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-amber-200 mb-1.5">
                  {lang === 'gu' ? 'તમારું નામ' : 'Your Name'}
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t.contact.namePlaceholder}
                  className="w-full rounded-xl border border-amber-500/30 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder-amber-200/40 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-200 mb-1.5">
                  {lang === 'gu' ? 'વોટ્સએપ મોબાઈલ નંબર' : 'WhatsApp Number'}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={t.contact.phonePlaceholder}
                  className="w-full rounded-xl border border-amber-500/30 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder-amber-200/40 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-amber-200 mb-1.5">
                  {t.contact.eventTypeLabel}
                </label>
                <select
                  name="eventType"
                  value={form.eventType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-amber-500/30 bg-[#120a24] px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                >
                  {t.contact.eventOptions.map((opt, oidx) => (
                    <option key={oidx} value={opt} className="bg-[#120a24] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-200 mb-1.5">
                  {lang === 'gu' ? 'પ્રસંગની તારીખ' : 'Event Date'}
                </label>
                <input
                  type="text"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  placeholder={t.contact.datePlaceholder}
                  className="w-full rounded-xl border border-amber-500/30 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder-amber-200/40 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-amber-200 mb-1.5">
                {lang === 'gu' ? 'જરૂરિયાત / સંદેશો' : 'Requirements / Message'}
              </label>
              <textarea
                name="message"
                rows="3"
                value={form.message}
                onChange={handleChange}
                placeholder={t.contact.messagePlaceholder}
                className="w-full rounded-xl border border-amber-500/30 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder-amber-200/40 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>

            {/* Submit Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 py-3 px-4 text-xs sm:text-sm font-bold text-white shadow-lg transition cursor-pointer"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.203c.043.071.043.418-.101.823z" />
                </svg>
                <span>{t.contact.sendWhatsAppBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleEmailSubmit}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-amber-400/40 bg-amber-500/15 hover:bg-amber-500/25 py-3 px-4 text-xs sm:text-sm font-bold text-amber-200 transition cursor-pointer"
              >
                <span>✉️</span>
                <span>{t.contact.sendEmailBtn}</span>
              </button>
            </div>

            <p className="text-[11px] text-center text-amber-300/60 pt-2">
              🔒 {lang === 'gu' ? 'તમારી વિગતો સંપૂર્ણ ગોપનીય રહેશે.' : 'Your details are strictly kept private.'}
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
