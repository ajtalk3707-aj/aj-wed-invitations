import { motion } from 'framer-motion'
import { L } from './data'
const box = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }
const item = { hidden: { opacity: 0, y: 22, filter: 'blur(5px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9 } } }
const M = ({ className = '', children, as = 'div' }) => { const T = motion[as]; return <T variants={item} className={className}>{children}</T> }
const H = ({ children, size = 'text-2xl', as }) => <M as={as} className={`foil font-display font-extrabold ${size} mt-3`}>{children}</M>
const P = ({ children }) => <M className="font-display text-[.92rem] leading-8 whitespace-pre-line">{children}</M>
const Div = ({ t }) => <M className="my-3 flex items-center justify-center gap-2" ><span className="h-px w-16" style={{ background: t.accent }} /><span style={{ color: t.accent }}>❖</span><span className="h-px w-16" style={{ background: t.accent }} /></M>

function Frame({ t, arch, children }) {
  return (
    <motion.div variants={box} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
      className={`relative mx-auto w-full max-w-md px-6 pb-10 pt-14 text-center ${arch ? 'rounded-t-[12rem] rounded-b-3xl' : 'rounded-3xl'}`}
      style={{ background: t.card, color: t.ink, '--f1': t.f1, '--f2': t.f2, border: `1px solid ${t.accent}`, boxShadow: `0 0 0 6px rgba(0,0,0,.25),0 0 0 7px ${t.accent},0 30px 70px rgba(0,0,0,.5)` }}>
      <div className="pointer-events-none absolute inset-2.5 rounded-[inherit] border" style={{ borderColor: t.accent + '66' }} />
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
        className="absolute -top-7 left-1/2 -ml-7 grid h-14 w-14 place-items-center rounded-full text-2xl" style={{ background: t.accent, color: '#3a1020', boxShadow: `0 0 24px ${t.accent}` }}>✿</motion.div>
      {children}
    </motion.div>
  )
}
const Photo = ({ t, src, emoji }) => (
  <div className="mx-auto h-36 w-28 overflow-hidden rounded-t-[4rem] rounded-b-lg grid place-items-center text-4xl" style={{ border: `2px solid ${t.accent}`, background: 'rgba(255,255,255,.12)', boxShadow: `0 0 20px ${t.accent}66` }}>
    {src ? <img src={src} alt="" className="h-full w-full object-cover" /> : emoji}
  </div>
)
function Cover({ inv, t }) {
  return (
    <Frame t={t} arch>
      <M className="text-4xl" as="span"><span style={{ color: t.accent }}>{L.om}</span></M>
      <P>{L.shloka}</P>
      <H size="text-4xl" as="h1">{L.title}</H>
      <M className="mt-3 flex items-start justify-center gap-3">
        <div><Photo t={t} src={inv.photos.groom} emoji="🤵" /><div className="foil mt-2 font-display text-lg font-extrabold">{inv.groom}</div></div>
        <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ repeat: Infinity, duration: 1.6 }} className="self-center text-xl text-rose-400">♥</motion.div>
        <div><Photo t={t} src={inv.photos.bride} emoji="👰" /><div className="foil mt-2 font-display text-lg font-extrabold">{inv.bride}</div></div>
      </M>
      <H size="text-lg">{inv.dateLine}</H>
      <Div t={t} /><H size="text-lg">{L.inviters}</H>
      <P>{inv.inviters.join('\n')}</P>
    </Frame>
  )
}
const Invite = ({ inv, t }) => (
  <Frame t={t}>
    <P>{L.ganesh}</P><H size="text-3xl">{L.sanskar}</H><Div t={t} />
    <P>{L.text(inv.groom, inv.bride)}</P>
    <H size="text-3xl">{L.utsav}</H><P>{L.utsavText}</P>
  </Frame>
)
const Events = ({ inv, t }) => (
  <Frame t={t}>
    {inv.events.map((d) => (
      <div key={d.day}>
        <M className="my-2 inline-block rounded-full border px-5 text-sm" ><span style={{ borderColor: t.accent }}>{d.day}</span></M>
        <div className="relative mx-auto max-w-xs border-l pl-6 text-left" style={{ borderColor: t.accent }}>
          {d.items.map((e) => (
            <M key={e.title} className="relative pb-3">
              <span className="absolute -left-[31px] top-3 h-2.5 w-2.5 rotate-45" style={{ background: t.accent, boxShadow: `0 0 10px ${t.accent}` }} />
              <div className="foil font-display text-lg font-extrabold">{e.title}</div>
              <div className="font-display text-sm leading-7 whitespace-pre-line">{e.lines.join('\n')}</div>
            </M>
          ))}
        </div>
      </div>
    ))}
    <M className="mt-3 rounded-2xl border border-dashed p-3 text-sm"><span style={{ borderColor: t.accent }} />
      <div className="foil font-display font-extrabold">{L.venue}</div>{inv.venue.name}<br />{inv.venue.lines.join(', ')}
    </M>
  </Frame>
)
const Family = ({ inv, t }) => {
  const g = (title, rows) => <><H size="text-lg">{title}</H><P>{rows.join('\n')}</P></>
  return (
    <Frame t={t}>
      <H size="text-2xl">{L.madhur}</H><P>{L.madhurText}</P><Div t={t} />
      {g(L.sneh, inv.family.sneh)}{g(L.darshan, inv.family.darshan)}<Div t={t} />
      {g(L.mosal, inv.family.mosal)}{g(L.banej, inv.family.banej)}{g(L.firm, inv.family.firm)}
      <H size="text-2xl">{L.aamantran}</H><P>{L.aamText}</P>
      <H size="text-base">{L.venue} : {inv.venue.name}</H>
    </Frame>
  )
}
export const PAGE_MAP = { cover: Cover, invite: Invite, events: Events, family: Family }
