// ---------- mock data (replace with API later) ----------
export const L = {
  om: 'ॐ', shloka: 'વક્રતુંડ મહાકાય, સૂર્યકોટિ સમપ્રભ ।\nનિર્વિઘ્નં કુરુ મે દેવ, સર્વકાર્યેષુ સર્વદા ॥',
  ganesh: '॥ શ્રી ગણેશાય નમઃ ॥', title: 'શુભ વિવાહ', with: 'સંગ', inviters: 'નિમંત્રક',
  sanskar: 'વિવાહ સંસ્કાર', utsav: 'લગ્નોત્સવ', utsavText: 'બે હૃદયનું મિલન, બે પરિવારનો સંગમ…\nઆપની હાજરી અમારા આનંદનો ઉત્સવ બનાવશે.',
  text: (g, b) => `સ્નેહીશ્રી, આપ સર્વેને જણાવતાં અત્યંત હર્ષ થાય છે કે અમારા પરિવારના ચિરંજીવી ${g} સંગ ${b} ના શુભ વિવાહ પ્રસંગે આપ સપરિવાર પધારી નવદંપતીને આશીર્વાદ આપી અમારા આનંદમાં વધારો કરશો એવી નમ્ર વિનંતી.`,
  venue: 'શુભ સ્થળ', madhur: 'મધુર કલરવ',
  madhurText: 'લગ્નના શુભ પ્રસંગે પ્રેમ અને સ્નેહની લાગણીઓ સાથે આપ સૌની હાજરી અમારા માટે આશીર્વાદ સમાન છે. પધારશો જ, એવી અપેક્ષા સહ.',
  sneh: 'લિ. સ્નેહાધીન', darshan: 'લિ. દર્શનાભિલાષી', mosal: 'મોસાળ પક્ષ', banej: 'બાણેજ પક્ષ', firm: 'ફર્મ', aamantran: 'આમંત્રણ',
  aamText: 'શ્રી દર્શનના શુભ લગ્ન પ્રસંગે ખુશીથી ઉજવણી સહ સમસ્ત પરિવાર આપ સર્વેને ડિજિટલ કાર્ડ દ્વારા આમંત્રણ પાઠવીએ છીએ. આપની હાજરી અમારા માટે અમૂલ્ય છે.',
}
const f = (n) => Array(n).fill('શ્રી ………………………… પરિવાર')
const venue = { name: 'નીલકંઠ ફાર્મ પાર્ટી પ્લોટ', lines: ['જૂનાગઢ બાયપાસ રોડ', 'કાંકરડા ચોકડી, જૂનાગઢ'] }
const sched = (d1, d2) => [
  {
    day: `બુધવાર, તા. ${d1}`, items: [
      { title: 'હલ્દી રસમ', lines: ['સ્વરુચી ભોજન', 'બપોરે ૧૨:૦૦ કલાકે'] },
      { title: 'મંડપ મુહૂર્ત', lines: ['……… કલાકે', `સ્થળ : ${venue.name}`] },
      { title: 'પ્રેમ રાસ', lines: ['સ્વરુચી ભોજન', 'સાંજે ૯:૦૦ કલાકે'] }]
  },
  {
    day: `ગુરુવાર, તા. ${d2}`, items: [
      { title: 'ભોજન સમારંભ', lines: ['……… કલાકે', `સ્થળ : ${venue.name}`] },
      { title: 'જાન પ્રસ્થાન', lines: ['બપોરે ૨:૩૦ કલાકે', 'સ્થળ : ………………………'] },
      { title: 'હસ્ત મેળાપ', lines: ['શુભ ચોઘડિયે'] }]
  },
]
const mk = (id, theme, template, title, groom, bride, d1, d2, badge, url = null) => ({
  id, theme, template, title, groom, bride, photos: { groom: null, bride: null },
  dateLine: `તા. ${d2}, ગુરુવાર`, events: sched(d1, d2), venue, badge, url,
  inviters: [...f(2), 'સરનામું: ……………………, સુરત', 'મો. ………………………'],
  family: { sneh: f(4), darshan: f(3), mosal: f(1), banej: ['પરમ, જાનવી, પ્રિયંક, વિધ્યા'], firm: ['………………………… ઈન્ડસ્ટ્રીઝ'] },
})

export const invitations = [
  // 3D Orbit Coverflow Editions (Only 3D Orbit Coverflow Theme as requested)
  mk(
    'jasmat-aarti-gold-orbit',
    'royalGold',
    'orbit',
    'Jasmat & Aarti – Royal Gold 3D Orbit',
    'ચિ. જસમત',
    'ચિ. આરતી',
    '૧૨-૦૨-૨૦૨૫',
    '૧૩-૦૨-૨૦૨૫',
    '3D Orbit Coverflow'
  ),
  mk(
    'darshan-ishita-twilight-orbit',
    'twilight',
    'orbit',
    'Darshan & Ishita – Twilight Sapphire 3D Orbit',
    'ચિ. દર્શન',
    'ચિ. ઈશિતા',
    '૧૨-૦૨-૨૦૨૫',
    '૧૩-૦૨-૨૦૨૫',
    'Scroll 3D Orbit'
  ),
  mk(
    'jasmat-aarti-ruby-orbit',
    'roseRuby',
    'orbit',
    'Jasmat & Aarti – Royal Ruby 3D Orbit',
    'ચિ. જસમત',
    'ચિ. આરતી',
    '૧૨-૦૨-૨૦૨૫',
    '૧૩-૦૨-૨૦૨૫',
    '3D Orbit Coverflow'
  ),
  mk(
    'darshan-ishita-emerald-orbit',
    'emerald',
    'orbit',
    'Darshan & Ishita – Emerald Palace 3D Orbit',
    'ચિ. દર્શન',
    'ચિ. ઈશિતા',
    '૧૨-૦૨-૨૦૨૫',
    '૧૩-૦૨-૨૦૨૫',
    'Scroll 3D Orbit'
  ),
  mk(
    'darshan-ishita-swarna-orbit',
    'swarna3d',
    'orbit',
    'Swarna Elegance – Imperial 3D Orbit',
    'ચિ. દર્શન',
    'ચિ. ઈશિતા',
    '૧૨-૦૨-૨૦૨૫',
    '૧૩-૦૨-૨૦૨૫',
    'Royal 3D Orbit'
  ),
  mk(
    'darshan-ishita-marigold-orbit',
    'marigold',
    'orbit',
    'Marigold Festive – 3D Orbit Edition',
    'ચિ. દર્શન',
    'ચિ. ઈશિતા',
    '૧૨-૦૨-૨૦૨૫',
    '૧૩-૦૨-૨૦૨૫',
    'Scroll 3D Orbit'
  ),
]

export const themes = {
  royalGold: {
    name: 'Aarti & Jasmat Royal Gold',
    glyph: '👑',
    bg: 'radial-gradient(ellipse at 50% 30%, #543d0e, #1a1202 75%)',
    card: 'linear-gradient(160deg, #3d2b07, #1f1502)',
    ink: '#fff6d6',
    accent: '#f3cf6d',
    f1: '#dfab31',
    f2: '#fff2b8',
  },
  roseRuby: {
    name: 'Jasmat & Aarti Special',
    glyph: '💖',
    bg: 'radial-gradient(ellipse at 50% 30%, #57122a, #1a040b 75%)',
    card: 'linear-gradient(160deg, #420d20, #20040c)',
    ink: '#ffeef4',
    accent: '#ff85a1',
    f1: '#f72585',
    f2: '#ffb3c6',
  },
  sapphireModern: {
    name: 'Jasmat & Aarti Classic',
    glyph: '✨',
    bg: 'radial-gradient(ellipse at 50% 30%, #0d2c54, #041021 75%)',
    card: 'linear-gradient(160deg, #09203f, #030e1d)',
    ink: '#e6f4f1',
    accent: '#48cae4',
    f1: '#0077b6',
    f2: '#90e0ef',
  },
  marigold: { name: 'Marigold Block-print', glyph: '🌼', bg: 'linear-gradient(160deg,#f5a623,#e8590c)', card: '#fff4d6', ink: '#4a1d2b', accent: '#c2185b', f1: '#c2185b', f2: '#e8590c' },
  royal: { name: 'Royal Palace Jharokha', glyph: '🪔', bg: 'radial-gradient(circle at 50% 30%,#7a1a2c,#2a0710 75%)', card: 'linear-gradient(rgba(60,10,22,.85),rgba(25,5,12,.92))', ink: '#fff6e2', accent: '#e6bd5c', f1: '#c79a2e', f2: '#fff3c0' },
  floral: { name: 'Blush Floral & Petals', glyph: '🌸', bg: 'linear-gradient(#fff1ee,#f4b6c2)', card: 'linear-gradient(#fffdf8,#fff6ec)', ink: '#4a2433', accent: '#b76e79', f1: '#8e3b55', f2: '#e08a8f' },
  twilight: { name: '3D Orbit Coverflow', glyph: '✦', bg: 'radial-gradient(ellipse at 50% 35%,#16224a,#070b1c 70%)', card: 'linear-gradient(160deg,#fffaf0,#f1e4c4)', ink: '#1b2340', accent: '#c9a24a', f1: '#7a5614', f2: '#e0b650' },
  emerald: { name: 'Emerald Wax-Seal Book', glyph: '🍃', bg: 'linear-gradient(#0f4a3a,#041a14)', card: 'linear-gradient(#fffaf0,#f1e4c4)', ink: '#23382d', accent: '#c9a24a', f1: '#0f5a46', f2: '#c79a35' },
  swarna3d: {
    name: 'Swarna Elegance & Animated Royal Palace',
    glyph: '⚜️',
    bg: 'radial-gradient(ellipse at 50% 30%, #46091e, #100208 75%)',
    card: 'linear-gradient(160deg, #fffcf3, #f7e8c3)',
    ink: '#2b0f19',
    accent: '#d4af37',
    f1: '#c4972e',
    f2: '#fff2b0',
  },
}

export const pagesOf = () => ['cover', 'invite', 'events', 'family']
