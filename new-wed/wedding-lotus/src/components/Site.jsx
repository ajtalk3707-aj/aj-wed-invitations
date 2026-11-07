import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Countdown from './Countdown.jsx'
import Lotus from './Lotus.jsx'
import Petals from './Petals.jsx'
import Toran from './Toran.jsx'
import { useLang } from '../lang.jsx'
import { CFG } from '../copy.js'
import couplePhoto from '../assests/couple.jpeg'

const rv = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } },
}
const Reveal = ({ children, className, as = 'div', amount = 0.25, ...p }) => {
  const C = motion[as]
  return <C className={className} variants={rv} initial="hidden" whileInView="show" viewport={{ once: true, amount }} {...p}>{children}</C>
}
const Chapter = ({ no, children }) => (
  <Reveal className="chap">
    <span className="chno">{no}</span>
    <h2>{children}</h2>
    <span className="orn"><i /><b>✿</b><i /></span>
  </Reveal>
)
const word = {
  hidden: { opacity: 0, y: 28, filter: 'blur(12px)' },
  show: (i) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { delay: 0.4 + i * 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] } }),
}

function addToCalendar(title) {
  const s = new Date(CFG.weddingISO), e = new Date(s.getTime() + 4 * 36e5)
  const f = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', `DTSTART:${f(s)}`, `DTEND:${f(e)}`, `SUMMARY:${title}`,
    'LOCATION:Neelkanth Farm Party Plot\\, Junagadh', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
  a.download = 'wedding-invitation.ics'
  a.click()
}

function Family({ t }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="acc">
      {t.family.cards.map((c, i) => (
        <Reveal key={c.t} className={`acc-item ${open === i ? 'open' : ''}`} amount={0.1}>
          <button className="acc-head" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span>{c.t}</span>
            <motion.b animate={{ rotate: open === i ? 45 : 0 }}>+</motion.b>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div className="acc-body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                <div>{c.list.map((n) => <p key={n}>{n}</p>)}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      ))}
    </div>
  )
}

function RsvpForm({ t }) {
  const f = t.form
  const [name, setName] = useState('')
  const [guests, setGuests] = useState(2)
  const [att, setAtt] = useState(0)
  const [note, setNote] = useState('')
  const [err, setErr] = useState(false)
  const send = (e) => {
    e.preventDefault()
    if (!name.trim()) return setErr(true)
    const msg = f.compose(name.trim(), guests, f.attend[att], note.trim())
    window.open(`https://wa.me/91${CFG.phone}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }
  return (
    <form className="rform" onSubmit={send} noValidate>
      <label>{f.name}
        <input value={name} onChange={(e) => { setName(e.target.value); setErr(false) }} aria-invalid={err} autoComplete="name" />
      </label>
      {err && <small className="err">{f.need}</small>}
      <div className="row">
        <span>{f.guests}</span>
        <div className="step">
          <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} aria-label="−">−</button>
          <motion.b key={guests} initial={{ scale: 1.4 }} animate={{ scale: 1 }}>{guests}</motion.b>
          <button type="button" onClick={() => setGuests(Math.min(20, guests + 1))} aria-label="+">+</button>
        </div>
      </div>
      <div className="chips" role="radiogroup">
        {f.attend.map((a, i) => (
          <button type="button" key={a} role="radio" aria-checked={att === i} className={att === i ? 'on' : ''} onClick={() => setAtt(i)}>{a}</button>
        ))}
      </div>
      <label>{f.note}<textarea rows="3" value={note} onChange={(e) => setNote(e.target.value)} /></label>
      <motion.button className="btn solid" type="submit" whileTap={{ scale: 0.96 }}>{f.send}</motion.button>
    </form>
  )
}

export default function Site() {
  const { t } = useLang()
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CFG.mapQuery)}`
  const events = t.schedule.days.flatMap((d) => d.items.map((it) => ({ ...it, day: d.label, date: d.date })))

  return (
    <main className="site">
      {/* ───── HERO ───── */}
      <section id="home" className="hero">
        <Toran /><Petals />
        <motion.div className="emblem" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.6 }}>
          <Lotus open delay={0.2} />
        </motion.div>
        <motion.p className="eyebrow" custom={0} variants={word} initial="hidden" animate="show">{t.hero.eyebrow}</motion.p>
        <motion.img className="couple-photo" src={couplePhoto} alt="The couple together"
          custom={0.5} variants={word} initial="hidden" animate="show" />
        <h1>
          <motion.span className="nm" custom={1} variants={word} initial="hidden" animate="show">{t.hero.g}</motion.span>
          <motion.span className="amp" custom={2} variants={word} initial="hidden" animate="show">{t.hero.and}</motion.span>
          <motion.span className="nm" custom={3} variants={word} initial="hidden" animate="show">{t.hero.b}</motion.span>
        </h1>
        <motion.p className="hdate" custom={4.2} variants={word} initial="hidden" animate="show">{t.hero.date} · {t.hero.place}</motion.p>
        <motion.div custom={5} variants={word} initial="hidden" animate="show" style={{ width: '100%' }}><Countdown /></motion.div>
        <motion.div custom={6} variants={word} initial="hidden" animate="show" className="hero-btns">
          <motion.button className="btn solid" onClick={() => addToCalendar(t.cal.title)} whileTap={{ scale: 0.96 }}>🗓 {t.cal.btn}</motion.button>
        </motion.div>
        <motion.div className="cue" animate={{ y: [0, 9, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.4, repeat: Infinity }}><span>{t.hero.scroll}</span><i>⌄</i></motion.div>
      </section>

      {/* ───── I · INVITATION ───── */}
      <section id="invite" className="sec center">
        <Chapter no={t.ch[0]}>{t.invite.title}</Chapter>
        <Reveal className="sh">{t.invite.ganesh}</Reveal>
        <Reveal className="sh soft">{t.invite.sh1}</Reveal>
        <Reveal as="p" className="lead">{t.invite.intro}</Reveal>
        <Reveal className="namecard"><span>{t.hero.g}</span><em>{t.hero.and}</em><span>{t.hero.b}</span></Reveal>
        <Reveal as="p" className="lead">{t.invite.blessing}</Reveal>
        <Reveal className="sh soft">{t.invite.sh2}</Reveal>
        <Reveal as="blockquote" className="pull">“{t.invite.quote}”</Reveal>
      </section>

      {/* ───── II · EVENTS (swipe rail) ───── */}
      <section id="events" className="sec wide">
        <Chapter no={t.ch[1]}>{t.schedule.title}</Chapter>
        <div className="rail" tabIndex={0}>
          {events.map((e, i) => (
            <motion.article key={e.title + e.time} className="evc" variants={rv} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -6 }}>
              <span className="evn">{String(i + 1).padStart(2, '0')}</span>
              <span className="evday">{e.day}</span>
              <motion.span className="evi" animate={{ rotate: [-6, 6, -6] }} transition={{ duration: 5, repeat: Infinity, delay: i * 0.3 }}>{e.icon}</motion.span>
              <h3>{e.title}</h3>
              <time>{e.time}</time>
              {e.desc && <p>{e.desc}</p>}
              <small>{e.date}</small>
            </motion.article>
          ))}
        </div>
        <Reveal className="swipe">‹ ⟷ ›</Reveal>
        <Reveal as="p" className="lead center-t">{t.kalrav.msg}</Reveal>
        <Reveal as="p" className="soft center-t">{t.kalrav.sender}</Reveal>
      </section>

      {/* ───── III · VENUE ───── */}
      <section id="venue" className="panel">
        <div className="panel-in">
          <Chapter no={t.ch[2]}>{t.venue.title}</Chapter>
          <Reveal className="venue">
            <div className="pin">
              <motion.i animate={{ scale: [1, 2.8], opacity: [0.6, 0] }} transition={{ duration: 2.2, repeat: Infinity }} />
              <motion.i animate={{ scale: [1, 2.8], opacity: [0.6, 0] }} transition={{ duration: 2.2, repeat: Infinity, delay: 1.1 }} />
              <motion.span animate={{ y: [0, -9, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>📍</motion.span>
            </div>
            <h3>{t.venue.name}</h3>
            {t.venue.lines.map((l) => <p key={l}>{l}</p>)}
            <motion.a className="btn gold" href={mapUrl} target="_blank" rel="noopener noreferrer" whileTap={{ scale: 0.96 }}>{t.venue.btnMap}</motion.a>
          </Reveal>
        </div>
      </section>

      {/* ───── IV · FAMILY ───── */}
      <section className="sec">
        <Chapter no={t.ch[3]}>{t.family.title}</Chapter>
        <Family t={t} />
      </section>

      {/* ───── V · RSVP ───── */}
      <section id="rsvp" className="sec center rsvp">
        <Chapter no={t.ch[4]}>{t.rsvp.title}</Chapter>
        <Reveal as="p" className="lead">{t.rsvp.sub}</Reveal>
        <Reveal><RsvpForm t={t} /></Reveal>
        <Reveal><motion.a className="btn ghost" href={`tel:+91${CFG.phone}`} whileTap={{ scale: 0.96 }}>{t.rsvp.call}: +91 {CFG.phone}</motion.a></Reveal>
        <Reveal as="p" className="foot">{t.footer}<br /><b>{t.hero.initials}</b></Reveal>
      </section>
    </main>
  )
}
