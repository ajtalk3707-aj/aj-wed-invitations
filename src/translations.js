// Bilingual Translations and Content for AJ Invitation
export const contactConfig = {
  brandName: 'AJ Invitation',
  brandNameGu: 'AJ ઇન્વિટેશન',
  phone: '9687336426',
  displayPhone: '+91 96873 36426',
  whatsapp: '9687336426',
  email: 'ajtalk3707@gmail.com',
  location: 'Gujarat, India',
  locationGu: 'ગુજરાત, ભારત',
  getWhatsAppLink: (msg = '') => {
    const text = encodeURIComponent(msg || 'નમસ્તે AJ Invitation, મને તમારા ડિજિટલ કંકોતરી અને વિડીયો ઇન્વિટેશન વિશે વિગતવાર માહિતી આપો.')
    return `https://wa.me/919687336426?text=${text}`
  },
  getPhoneLink: () => 'tel:+919687336426',
  getEmailLink: (subject = 'Inquiry for Digital Invitation - AJ Invitation') => {
    return `mailto:ajtalk3707@gmail.com?subject=${encodeURIComponent(subject)}`
  }
}

export const translations = {
  en: {
    langLabel: 'ગુજરાતી',
    nav: {
      designs: 'Designs',
      features: 'Features',
      occasions: 'Occasions',
      howItWorks: 'How It Works',
      pricing: 'Packages',
      reviews: 'Reviews',
      contact: 'Contact Us',
      orderNow: 'Order Now',
      preview: 'Live Preview',
    },
    hero: {
      badge: '✨ Gujarat’s #1 Royal Digital Invitation Studio ✨',
      title1: 'Make Your Auspicious Wedding',
      titleHighlight: 'Royal & Unforgettable',
      description: 'Stunning animated 3D wedding invitations, festive Gujarati shehnai music, RSVP forms & instant Google Maps navigation — crafted with royal perfection and delivered directly to your WhatsApp in 24 hours.',
      ctaDesigns: 'Choose Your Design',
      ctaWhatsApp: 'Chat on WhatsApp',
      ctaCall: 'Call 96873 36426',
      subNotice: '⚡ 24-Hour Express Delivery • 📱 100% Mobile Friendly • 🎵 With Auspicious Music'
    },
    stats: [
      { num: '500+', label: 'Happy Couples & Families', sub: 'Across Gujarat & Global' },
      { num: '24 Hrs', label: 'Express Delivery', sub: 'Ready to share on WhatsApp' },
      { num: '100%', label: 'Customized & Bilingual', sub: 'Gujarati & English text' },
      { num: '4.9/5', label: 'Customer Rating', sub: 'Loved by guests & hosts' }
    ],
    showcase: {
      badge: 'Interactive Portfolio',
      title: 'Choose Your Perfect Invitation',
      subtitle: 'Click any card to experience the interactive 3D pages, rituals, and animations — or order directly on WhatsApp.',
      allTab: 'All Designs',
      royalTab: '👑 Royal Palace & Mandap',
      liveTab: '🌐 Live Demos',
      floralTab: '🌸 Floral & Classic',
      orbitTab: '✨ 3D Books & Orbit',
      orderBtn: 'Order on WhatsApp',
      previewBtn: 'Open Preview',
      customOrderBanner: {
        title: 'Need a fully bespoke theme or custom royal video?',
        desc: 'We personalize typography, photos, background shlokas, and colors to match your style.',
        btn: 'Talk to AJ Invitation'
      }
    },
    features: {
      badge: 'Why Choose AJ Invitation',
      title: 'Designed to Delight Your Guests',
      subtitle: 'Experience why modern Gujarati families choose our digital invitations over traditional paper cards.',
      items: [
        {
          icon: '🎵',
          title: 'Auspicious Wedding Music',
          desc: 'Soulful Shehnai, Ganesh Vandana, and romantic instrumental tunes play automatically when guests open the card.'
        },
        {
          icon: '📍',
          title: 'Google Maps Venue Route',
          desc: 'One tap opens Google Maps navigation directly to your party plot or mandap, preventing guest confusion.'
        },
        {
          icon: '⚡',
          title: '24-Hour Express Delivery',
          desc: 'Share your event details and get your live invitation link and WhatsApp forward message within 24 hours.'
        },
        {
          icon: '📱',
          title: 'Seamless Mobile Friendly',
          desc: 'Engineered for smooth, high-speed loading on iPhone, Android, WhatsApp, and social media browsers.'
        },
        {
          icon: '✍️',
          title: 'Flawless Gujarati & English',
          desc: 'Culturally authentic Gujarati calligraphy (વક્રતુંડ મહાકાય, સ્નેહાધીન, મોસાળ પક્ષ) paired with modern typography.'
        },
        {
          icon: '🌱',
          title: 'Eco-Friendly & Budget-Smart',
          desc: 'Save thousands on expensive printing and courier charges while helping nature with zero paper waste.'
        }
      ]
    },
    occasions: {
      badge: 'Celebrations We Create',
      title: 'Invitations for Every Precious Moment',
      items: [
        { icon: '💍', title: 'Royal Wedding (શુભ વિવાહ)', desc: 'Multi-day Gujarati ceremonies: Haldi, Mandap Muhurat, Sangeet, Jaan & Hast Melap.' },
        { icon: '✨', title: 'Engagement (સગાઈ સંસ્કાર)', desc: 'Ring ceremony invitations with romantic countdowns and family blessing cards.' },
        { icon: '🪔', title: 'Housewarming (વાસ્તુ પૂજા / ગૃહ પ્રવેશ)', desc: 'Sacred blessings and venue location for your new sweet home celebration.' },
        { icon: '👶', title: 'Baby Shower (શ્રીમંત / ખોળો ભરવો)', desc: 'Warm, joyful invitations welcoming the arrival of the little prince or princess.' },
        { icon: '🎂', title: 'Birthday & Anniversary (જન્મદિવસ)', desc: 'Vibrant digital flyers and animated cards for milestone celebrations.' },
        { icon: '🎬', title: 'Save The Date & Reels (વિડીયો કંકોતરી)', desc: '1080p full HD cinematic portrait video invites perfect for WhatsApp status & Instagram.' }
      ]
    },
    howItWorks: {
      badge: 'Simple 3-Step Process',
      title: 'How to Get Your Digital Invitation',
      subtitle: 'Ordering your dream digital invitation is quick, simple, and hassle-free.',
      steps: [
        {
          step: '01',
          title: 'Pick Your Favorite Design',
          desc: 'Browse our portfolio above and select your favorite royal theme, 3D style, or live demo.'
        },
        {
          step: '02',
          title: 'Send Details on WhatsApp',
          desc: 'Send bride & groom names, event dates, venue location, photos, and family list to 9687336426.'
        },
        {
          step: '03',
          title: 'Receive & Share with Guests',
          desc: 'Review your personalized live link and attractive WhatsApp message, then forward to everyone with one click!'
        }
      ]
    },
    pricing: {
      badge: 'Pocket-Friendly Packages',
      title: 'Simple, Transparent Pricing',
      subtitle: 'Get royal luxury at a fraction of traditional printing costs.',
      popularTag: 'Most Popular',
      plans: [
        {
          name: 'Silver Digital Card',
          tag: 'Classic Digital',
          price: '₹499',
          features: [
            'Single page / multi-page elegant design',
            'All wedding functions & schedule',
            'Family members list & venue details',
            'Delivered in 24 hours',
            'Lifetime active online link',
            'WhatsApp forwarding format'
          ],
          cta: 'Choose Silver Plan'
        },
        {
          name: 'Royal Gold 3D Interactive',
          tag: 'Most Loved by Couples',
          price: '₹999',
          featured: true,
          features: [
            'Animated 3D cover & interactive page turning',
            'Traditional shehnai / romantic background music',
            '1-Click Google Maps venue navigation',
            'Bride & Groom photo gallery',
            'Full Gujarati & English calligraphy',
            'VIP WhatsApp sharing preview card',
            'Free text revisions & edits'
          ],
          cta: 'Order Royal Gold'
        },
        {
          name: 'Platinum 3D Mandap & Video',
          tag: 'Complete VIP Suite',
          price: '₹1,499',
          features: [
            'Custom 3D Swarna Mandap / Royal Palace theme',
            'Full HD 1080p Video Invitation for WhatsApp Status',
            'Custom music selection & personal audio',
            'Interactive countdown timer to wedding date',
            'QR Code for easy guest scanning',
            'Priority 12-hour express delivery',
            'Direct VIP support on WhatsApp'
          ],
          cta: 'Get Platinum VIP'
        }
      ]
    },
    testimonials: {
      badge: 'Client Love',
      title: 'What Families Say About AJ Invitation',
      items: [
        {
          quote: 'AJ Invitation made our wedding card look like a royal movie! All our relatives in the US and Mumbai loved the Shehnai music and Google Maps link.',
          author: 'Jasmat & Aarti',
          city: 'Surat, Gujarat',
          rating: 5
        },
        {
          quote: 'The Gujarati typing and rituals were completely accurate. Delivered within 20 hours on WhatsApp. Highly recommended to everyone!',
          author: 'Bhavik & Krupa Patel',
          city: 'Ahmedabad, Gujarat',
          rating: 5
        },
        {
          quote: 'Excellent service by AJ Invitation! Extremely polite communication on 9687336426, immediate revisions, and very budget-friendly.',
          author: 'Hardik & Riddhi Shah',
          city: 'Rajkot, Gujarat',
          rating: 5
        }
      ]
    },
    faq: {
      badge: 'Got Questions?',
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'How long does it take to deliver the invitation?',
          a: 'Typically, we deliver your live customized invitation within 12 to 24 hours of receiving your event details on WhatsApp (9687336426).'
        },
        {
          q: 'Can we add our own photos and favorite wedding song?',
          a: 'Yes, absolutely! You can send us bride & groom photos, family pictures, and any devotional or romantic song of your choice.'
        },
        {
          q: 'How do we share the invitation with our guests on WhatsApp?',
          a: 'We provide you with a beautifully crafted WhatsApp message including bride-groom names, auspicious shloka, and your unique clickable link with a rich thumbnail preview.'
        },
        {
          q: 'Can we request changes after the invitation is created?',
          a: 'Yes, we provide free corrections and updates (such as timing adjustments or family name spelling) before finalizing.'
        }
      ]
    },
    contact: {
      badge: 'Get in Touch',
      title: 'Let’s Create Your Royal Invitation',
      subtitle: 'Reach out to AJ Invitation today. We are always happy to assist you on WhatsApp, Call, or Email.',
      phoneTitle: 'Call Directly',
      whatsappTitle: 'WhatsApp Us',
      emailTitle: 'Email Us',
      hoursTitle: 'Support Hours',
      hoursDesc: 'Monday – Sunday: 9:00 AM – 10:00 PM',
      formTitle: 'Quick Booking & Inquiry',
      namePlaceholder: 'Your Full Name',
      phonePlaceholder: 'WhatsApp Mobile Number',
      eventTypeLabel: 'Select Event Type',
      eventOptions: ['Wedding (લગ્ન)', 'Engagement (સગાઈ)', 'Housewarming (વાસ્તુ પૂજા)', 'Baby Shower (શ્રીમંત)', 'Other Function'],
      datePlaceholder: 'Event Date (e.g. 15-Dec-2025)',
      messagePlaceholder: 'Any specific requirement, design name, or question...',
      sendWhatsAppBtn: 'Send Inquiry via WhatsApp',
      sendEmailBtn: 'Send via Email',
      directActionNote: 'Or tap below to message instantly on 9687336426'
    },
    footer: {
      desc: 'AJ Invitation is Gujarat’s premier digital and video invitation design studio. Creating unforgettable memories for auspicious ceremonies with royal elegance.',
      quickLinks: 'Quick Links',
      contactInfo: 'Contact Information',
      copyright: '© 2026 AJ Invitation. All Rights Reserved. Crafted with royal elegance for your auspicious ceremonies.'
    }
  },
  gu: {
    langLabel: 'English',
    nav: {
      designs: 'કંકોતરી ડિઝાઇન્સ',
      features: 'વિશેષતાઓ',
      occasions: 'શુભ પ્રસંગો',
      howItWorks: 'ઓર્ડર કરવાની રીત',
      pricing: 'પેકેજ',
      reviews: 'ગ્રાહક પ્રતિસાદ',
      contact: 'સંપર્ક કરો',
      orderNow: 'ઓર્ડર કરો',
      preview: 'કાર્ડ જુઓ',
    },
    hero: {
      badge: '✨ ગુજરાતનું નં. ૧ રોયલ ડિજિટલ કંકોતરી સ્ટુડિયો ✨',
      title1: 'તમારા શુભ લગ્ન પ્રસંગને બનાવો',
      titleHighlight: 'શાહી અને અવિસ્મરણીય',
      description: 'રોયલ 3D એનિમેશન, મંગલ શરણાઈ સંગીત, જીવંત ગુગલ મેપ લોકેશન અને ફોટો સાથેની આકર્ષક ડિજિટલ કંકોતરી — માત્ર ૨૪ કલાકમાં તમારા વોટ્સએપ પર મેળવો અને સગા-સંબંધીઓ સાથે સરળતાથી શેર કરો.',
      ctaDesigns: 'મનપસંદ ડિઝાઇન પસંદ કરો',
      ctaWhatsApp: 'વોટ્સએપ પર વાત કરો',
      ctaCall: 'કૉલ કરો: ૯૬૮૭૩૩૬૪૨૬',
      subNotice: '⚡ ૨૪ કલાકમાં સુપરફાસ્ટ ડિલિવરી • 📱 ૧૦૦% મોબાઈલ ફ્રેન્ડલી • 🎵 મધુર શરણાઈ સંગીત સાથે'
    },
    stats: [
      { num: '૫૦૦+', label: 'સંતુષ્ટ પરિવારો', sub: 'સમગ્ર ગુજરાત અને દેશ-વિદેશમાં' },
      { num: '૨૪ કલાક', label: 'એક્સપ્રેસ ડિલિવરી', sub: 'વોટ્સએપ પર સીધી ડિલિવરી' },
      { num: '૧૦૦%', label: 'શુદ્ધ ગુજરાતી લખાણ', sub: 'પરંપરાગત રીત-રિવાજ મુજબ' },
      { num: '૪.૯/૫', label: 'શ્રેષ્ઠ રેટિંગ', sub: 'મહેમાનો અને યજમાનો દ્વારા પ્રશંસનીય' }
    ],
    showcase: {
      badge: 'ડિઝાઇન કલેક્શન',
      title: 'તમારી મનપસંદ કંકોતરી પસંદ કરો',
      subtitle: 'કોઈપણ કાર્ડ પર ક્લિક કરી લાઈવ 3D પાના અને મ્યુઝિક સાથે જુઓ — અથવા સીધા વોટ્સએપ પર ઓર્ડર કરો.',
      allTab: 'તમામ ડિઝાઇન્સ',
      royalTab: '👑 રોયલ મહેલ & મંડપ',
      liveTab: '🌐 લાઈવ ડેમો સાઇટ્સ',
      floralTab: '🌸 ફ્લોરલ & ટ્રેડિશનલ',
      orbitTab: '✨ 3D બુક & ઓર્બિટ',
      orderBtn: 'વોટ્સએપ પર ઓર્ડર કરો',
      previewBtn: 'લાઈવ કાર્ડ જુઓ',
      customOrderBanner: {
        title: 'શું તમારે સ્પેશિયલ કસ્ટમ ડિઝાઇન કે વિડીયો કંકોતરી બનાવડાવવી છે?',
        desc: 'અમે તમારા મનપસંદ ફોટો, ગીત, કલર થીમ અને પરિવારના નામો સાથે સંપૂર્ણ કસ્ટમાઇઝ કરી આપીશું.',
        btn: 'AJ Invitation સાથે વાત કરો'
      }
    },
    features: {
      badge: 'કેમ AJ ઇન્વિટેશન પસંદ કરવું?',
      title: 'તમારા મહેમાનોને ખુશ કરતી ખાસિયતો',
      subtitle: 'જાણો શા માટે ગુજરાતભરના પરિવારો પરંપરાગત કાગળ કંકોતરી કરતાં અમારી ડિજિટલ કંકોતરી વધારે પસંદ કરે છે.',
      items: [
        {
          icon: '🎵',
          title: 'મંગલ શરણાઈ & મધુર સંગીત',
          desc: 'કાર્ડ ખુલતાની સાથે જ મધુર શરણાઈ અને ગણેશ વંદના ગૂંજી ઊઠે છે જે પ્રસંગમાં ભવ્યતા ઉમેરે છે.'
        },
        {
          icon: '📍',
          title: 'ગુગલ મેપ્સ લાઈવ લોકેશન',
          desc: 'એક ક્લિકમાં પાર્ટી પ્લોટ કે વાડીનો સીધો ગુગલ મેપ રસ્તો ખુલે છે, જેથી મહેમાનો સરળતાથી પહોંચી શકે.'
        },
        {
          icon: '⚡',
          title: 'માત્ર ૨૪ કલાકમાં ડિલિવરી',
          desc: 'તમારા લગ્નની વિગતો મોકલો અને ૨૪ કલાકમાં રેડી લિંક અને વોટ્સએપ મેસેજ તમારા મોબાઈલમાં મેળવો.'
        },
        {
          icon: '📱',
          title: '૧૦૦% મોબાઈલ ફ્રેન્ડલી',
          desc: 'દરેક પ્રકારના મોબાઈલમાં ખૂબ જ ઝડપથી અને સુંદર રીતે ખુલે છે, સગા-સંબંધીઓને મોકલવું એકદમ સરળ.'
        },
        {
          icon: '✍️',
          title: 'શુદ્ધ ગુજરાતી અને અંગ્રેજી ટાઈપીંગ',
          desc: 'વક્રતુંડ મહાકાય, સ્નેહાધીન, મોસાળ પક્ષ, દર્શનાભિલાષી જેવા તમામ પરંપરાગત રિવાજો સાથેનું લખાણ.'
        },
        {
          icon: '🌱',
          title: 'ઓછા ખર્ચે પર્યાવરણને અનુકૂળ',
          desc: 'મોંઘી છપામણી અને કુરિયરના હજારો રૂપિયાની બચત કરો અને કાગળનો બગાડ અટકાવો.'
        }
      ]
    },
    occasions: {
      badge: 'આપણે બનાવીએ છીએ',
      title: 'દરેક શુભ પ્રસંગ માટે ભવ્ય આમંત્રણ',
      items: [
        { icon: '💍', title: 'શુભ વિવાહ (લગ્ન કંકોતરી)', desc: 'મંડપ મુહૂર્ત, હલ્દી, રાસ-ગરબા, જાન પ્રસ્થાન અને હસ્ત મેળાપના તમામ કાર્યક્રમો સાથે.' },
        { icon: '✨', title: 'સગાઈ સંસ્કાર (રીંગ સેરેમની)', desc: 'પ્રેમ અને સ્નેહના બંધન માટે સુંદર કાઉન્ટડાઉન અને આશીર્વાદ કાર્ડ.' },
        { icon: '🪔', title: 'વાસ્તુ પૂજા / ગૃહ પ્રવેશ', desc: 'નવા ઘરના શુભ પ્રવેશ માટે મંગલ આશીર્વાદ અને પાર્ટી પ્લોટ લોકેશન સાથે.' },
        { icon: '👶', title: 'શ્રીમંત સંસ્કાર (ખોળો ભરવો)', desc: 'આવનાર નવા બાળકના વધામણાં માટે મનોહર અને ક્યુટ બેબી શાવર આમંત્રણ.' },
        { icon: '🎂', title: 'જન્મદિવસ & એનિવર્સરી', desc: 'ખાસ પ્રસંગો અને મોટી ઉજવણીઓ માટે રંગબેરંગી ડિજિટલ ફ્લાયર્સ.' },
        { icon: '🎬', title: 'સેવ ધ ડેટ & વિડીયો કંકોતરી', desc: 'વોટ્સએપ સ્ટેટસ અને ઈન્સ્ટાગ્રામ રીલ્સ માટે ફૂલ એચડી પોટ્રેટ વિડીયો.' }
      ]
    },
    howItWorks: {
      badge: 'માત્ર ૩ સરળ સ્ટેપ્સ',
      title: 'ઓર્ડર કરવાની સરળ પ્રક્રિયા',
      subtitle: 'તમારી મનપસંદ કંકોતરી બનાવડાવવી હવે એકદમ સરળ અને ઝડપી બની ગઈ છે.',
      steps: [
        {
          step: '૦૧',
          title: 'ડિઝાઇન પસંદ કરો',
          desc: 'અમારી ગેલેરીમાંથી તમને ગમતી રોયલ, ફ્લોરલ કે 3D કંકોતરી પસંદ કરો.'
        },
        {
          step: '૦૨',
          title: 'વોટ્સએપ પર વિગતો મોકલો',
          desc: '૯૬૮૭૩૩૬૪૨૬ પર વર-કન્યાના નામ, તારીખ, શુભ સ્થળ અને પરિવારની વિગતો મોકલો.'
        },
        {
          step: '૦૩',
          title: 'કાર્ડ મેળવી મહેમાનોને મોકલો',
          desc: '૨૪ કલાકમાં તમારું લાઈવ કાર્ડ ચકાસીને એક જ ક્લિકમાં તમામ સગા-સંબંધીઓને વોટ્સએપ પર શેર કરો!'
        }
      ]
    },
    pricing: {
      badge: 'વાજબી અને બજેટ-ફ્રેન્ડલી પેકેજ',
      title: 'ઓછા ખર્ચે શાહી વૈભવ',
      subtitle: 'પરંપરાગત કાગળ કંકોતરી કરતાં ખૂબ જ ઓછી કિંમતે પ્રીમિયમ ડિજિટલ અનુભવ મેળવો.',
      popularTag: 'સૌથી વધુ પસંદ કરાયેલ',
      plans: [
        {
          name: 'સિલ્વર ડિજિટલ કાર્ડ',
          tag: 'બેઝિક ડિજિટલ કંકોતરી',
          price: '₹૪૯૯',
          features: [
            'આકર્ષક મલ્ટી-પેજ રોયલ ડિઝાઇન',
            'તમામ કાર્યક્રમો અને તારીખોનું શેડ્યુલ',
            'પરિવારજનોના નામ અને સ્થળની વિગત',
            '૨૪ કલાકમાં ડિલિવરી',
            'લાઈફટાઈમ એક્ટિવ લિંક',
            'વોટ્સએપ ફોરવર્ડ મેસેજ સાથે'
          ],
          cta: 'સિલ્વર પ્લાન પસંદ કરો'
        },
        {
          name: 'રોયલ ગોલ્ડ 3D ઇન્ટરેક્ટિવ',
          tag: 'કપલ્સની પહેલી પસંદ',
          price: '₹૯૯૯',
          featured: true,
          features: [
            'એનિમેટેડ 3D કવર અને રિયલ બુક પેજ ટર્નિંગ',
            'મંગલ શરણાઈ અને મધુર બેકગ્રાઉન્ડ સંગીત',
            '૧-ક્લિક ગુગલ મેપ લોકેશન નેવિગેશન',
            'વર-કન્યાની પ્રી-વેડિંગ ફોટો ગેલેરી',
            'સંપૂર્ણ ગુજરાતી અને અંગ્રેજી કેલિગ્રાફી',
            'વીઆઈપી વોટ્સએપ શેરિંગ પ્રિવ્યૂ કાર્ડ',
            'મફત સુધારા-વધારા (Free Revisions)'
          ],
          cta: 'રોયલ ગોલ્ડ ઓર્ડર કરો'
        },
        {
          name: 'પ્લેટિનમ 3D મંડપ & વિડીયો',
          tag: 'સંપૂર્ણ VIP લગ્ન પેકેજ',
          price: '₹૧,૪૯૯',
          features: [
            'સ્પેશિયલ 3D સ્વર્ણ મંડપ / રોયલ પેલેસ થીમ',
            'વોટ્સએપ સ્ટેટસ માટે 1080p ફૂલ એચડી વિડીયો કંકોતરી',
            'તમારું મનપસંદ ગીત અથવા પર્સનલ ઓડિયો',
            'લગ્ન દિવસ માટે લાઈવ કાઉન્ટડાઉન ટાઈમર',
            'મહેમાનો માટે સ્કેન કરી શકાય તેવો ક્યુઆર કોડ',
            'પ્રાયોરિટી ૧૨ કલાકમાં સુપરફાસ્ટ ડિલિવરી',
            'વોટ્સએપ પર સીધો VIP સપોર્ટ'
          ],
          cta: 'પ્લેટિનમ VIP મેળવો'
        }
      ]
    },
    testimonials: {
      badge: 'ગ્રાહકોનો સંતોષ',
      title: 'પરિવારોનો AJ Invitation માટે પ્રેમ',
      items: [
        {
          quote: 'AJ Invitation એ અમારી કંકોતરી એટલી રોયલ બનાવી કે મુંબઈ અને વિદેશથી સગાઓના ફોન આવ્યા! શરણાઈ સંગીત અને મેપ ખૂબ જ ઉપયોગી રહ્યા.',
          author: 'જસમત અને આરતી',
          city: 'સુરત, ગુજરાત',
          rating: 5
        },
        {
          quote: 'ગુજરાતી જોડણી અને રીત-રિવાજોનું લખાણ એકદમ પરફેક્ટ હતું. માત્ર ૨૦ કલાકમાં વોટ્સએપ પર કાર્ડ મળી ગયું. ખૂબ ખૂબ આભાર!',
          author: 'ભાવિક અને કૃપા પટેલ',
          city: 'અમદાવાદ, ગુજરાત',
          rating: 5
        },
        {
          quote: '૯૬૮૭૩૩૬૪૨૬ પર ટીમ સાથે વાત કરીને ખુશી થઈ. ખૂબ જ નમ્રતાપૂર્વક ઝડપી સર્વિસ આપી અને બજેટમાં કામ થઈ ગયું.',
          author: 'હાર્દિક અને રિદ્ધિ શાહ',
          city: 'રાજકોટ, ગુજરાત',
          rating: 5
        }
      ]
    },
    faq: {
      badge: 'મૂંઝવણ છે?',
      title: 'વારંવાર પૂછાતા પ્રશ્નો (FAQ)',
      items: [
        {
          q: 'કંકોતરી બનાવવામાં કેટલો સમય લાગે છે?',
          a: 'સામાન્ય રીતે તમે ૯૬૮૭૩૩૬૪૨૬ પર વિગતો મોકલો ત્યારથી ૧૨ થી ૨૪ કલાકમાં તમારી લાઈવ કસ્ટમાઇઝ્ડ કંકોતરી તૈયાર થઈ જાય છે.'
        },
        {
          q: 'શું અમે અમારો ફોટો અને મનગમતું ગીત રાખી શકીએ?',
          a: 'હા, ચોક્કસ! તમે વર-કન્યાના ફોટો, પ્રી-વેડિંગ શૂટના ફોટો અને તમને ગમતું કોઈપણ મંગલ ગીત કે શરણાઈ ટ્યુન રખાવી શકો છો.'
        },
        {
          q: 'મહેમાનોને વોટ્સએપ પર કેવી રીતે મોકલવી?',
          a: 'અમે તમને એક સુંદર તૈયાર વોટ્સએપ મેસેજ આપીશું, જેમાં વર-કન્યાના નામ, શુભ શ્લોક અને તમારી ખાસ લિંક હશે, જે તમે એક ક્લિકમાં ફોરવર્ડ કરી શકશો.'
        },
        {
          q: 'શું કંકોતરી બન્યા પછી સુધારા થઈ શકે?',
          a: 'હા, જો તારીખ, સમય કે પરિવારના નામમાં કોઈ ફેરફાર કરવો હોય તો અમે કોઈપણ વધારાના ચાર્જ વિના સુધારી આપીએ છીએ.'
        }
      ]
    },
    contact: {
      badge: 'અમારો સંપર્ક કરો',
      title: 'ચાલો તમારી શાહી કંકોતરી બનાવીએ',
      subtitle: 'આજે જ AJ Invitation નો સંપર્ક કરો. અમે વોટ્સએપ, કૉલ કે ઈમેઇલ પર આપની સેવામાં હાજર છીએ.',
      phoneTitle: 'સીધો કૉલ કરો',
      whatsappTitle: 'વોટ્સએપ ચેટ',
      emailTitle: 'ઈમેઇલ કરો',
      hoursTitle: 'સેવા સમય',
      hoursDesc: 'સોમવાર – રવિવાર: સવારે ૯:૦૦ થી રાત્રે ૧૦:૦૦',
      formTitle: 'ઝડપી ઇન્ક્વાયરી & બુકિંગ',
      namePlaceholder: 'તમારું પૂરું નામ',
      phonePlaceholder: 'વોટ્સએપ મોબાઈલ નંબર',
      eventTypeLabel: 'પ્રસંગ પસંદ કરો',
      eventOptions: ['શુભ વિવાહ (લગ્ન)', 'સગાઈ સંસ્કાર', 'વાસ્તુ પૂજા / ગૃહ પ્રવેશ', 'શ્રીમંત (ખોળો ભરવો)', 'અન્ય પ્રસંગ'],
      datePlaceholder: 'પ્રસંગની તારીખ (દા.ત. ૧૫-૧૨-૨૦૨૫)',
      messagePlaceholder: 'તમારી કોઈ ખાસ જરૂરિયાત કે પસંદ કરેલ ડિઝાઇનનું નામ લખો...',
      sendWhatsAppBtn: 'વોટ્સએપ દ્વારા ઇન્ક્વાયરી મોકલો',
      sendEmailBtn: 'ઈમેઇલ દ્વારા મોકલો',
      directActionNote: 'અથવા સીધો વોટ્સએપ પર મેસેજ કરવા ૯૬૮૭૩૩૬૪૨૬ પર ક્લિક કરો'
    },
    footer: {
      desc: 'AJ Invitation એ ગુજરાતનું અગ્રણી ડિજિટલ કંકોતરી અને વિડીયો ઇન્વિટેશન સ્ટુડિયો છે. તમારા માંગલિક પ્રસંગોને શાહી અંદાજમાં સજાવવા માટે હંમેશા તત્પર.',
      quickLinks: 'ઝડપી લિંક્સ',
      contactInfo: 'સંપર્ક માહિતી',
      copyright: '© ૨૦૨૬ AJ Invitation. સર્વાધિકાર સુરક્ષિત. આપના શુભ પ્રસંગો માટે શાહી અંદાજ સાથે સમર્પિત.'
    }
  }
}
