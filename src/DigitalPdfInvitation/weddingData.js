/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║          WEDDING INVITATION - DATA FILE                 ║
 * ║   Edit this file to update all 3 layouts at once!       ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 *  Just change the values below — all 3 invitation layouts
 *  will automatically show your updated data.
 *  No need to touch any HTML or CSS.
 */

const weddingData = {

  // ── GROOM DETAILS ────────────────────────────────────────
  groom: {
    prefix: 'ચિ.',                              // Title prefix (ચિ. / શ્રી etc.)
    name: 'દર્શન',                              // Groom's first name
    city: 'અમદાવાદ',                            // Groom's city
    education: 'B.Tech Software',              // Education / profession
    fatherName: 'શ્રી રમેશભાઈ મગનભાઈ પટેલ', // Father's full name
  },

  // ── BRIDE DETAILS ────────────────────────────────────────
  bride: {
    prefix: 'ચિ.',                              // Title prefix
    name: 'ઈશિતા',                             // Bride's first name
    city: 'રાજકોટ',                            // Bride's city
    education: 'M.Sc Design',                 // Education / profession
    fatherName: 'શ્રી હસમુખભાઈ રામભાઈ સાવલિયા', // Father's full name
  },

  // ── WEDDING DATE & TITHI ────────────────────────────────
  date: {
    vikramSamvat: 'વિક્રમ સંવત ૨૦૮૧',        // Vikram Samvat year
    tithi: 'મહા સુદ પૂનમ',                     // Hindu tithi (purnima etc.)
    day: 'ગુરુવાર',                             // Day of week (Gujarati)
    date: '૧૩ ફેબ્રુઆરી ૨૦૨૫',               // Date (Gujarati numerals)
    // Day 1 (Pre-wedding events day)
    day1: {
      dayName: 'બુધવાર',                       // Weekday name
      date: '૧૨ ફેબ્રુઆરી ૨૦૨૫',             // Date
      tithi: 'મહા સુદ ચૌદશ',                  // Tithi for day 1
      label: 'શુભ મુહૂર્ત પ્રસંગો',           // Short label for day 1
    },
    // Day 2 (Main wedding day)
    day2: {
      dayName: 'ગુરુવાર',                      // Weekday name
      date: '૧૩ ફેબ્રુઆરી ૨૦૨૫',             // Date
      tithi: 'મહા સુદ પૂનમ',                  // Tithi for day 2
      label: 'લગ્ન મહોત્સવ',                  // Short label for day 2
    },
  },

  // ── EVENTS SCHEDULE ──────────────────────────────────────
  // Day 1 Events (Pre-wedding)
  day1Events: [
    {
      emoji: '🪔',
      title: 'મંડપ મુહૂર્ત',
      time: 'સવારે ૦૮:૧૫ કલાકે',
      image: './assets/logo_kalash.png',        // Change image path if needed
    },
    {
      emoji: '🌼',
      title: 'હલ્દી રસમ (પીઠી)',
      time: 'બપોરે ૧૧:૩૦ કલાકે',
      image: './assets/haldi02.png',
    },
    {
      emoji: '🌿',
      title: 'મહેંદી મહોત્સવ',
      time: 'બપોરે ૦૩:૩૦ કલાકે',
      image: './assets/sticker_d11.png',
    },
    {
      emoji: '🪕',
      title: 'રાસ-ગરબા & સંગીત',
      time: 'રાત્રે ૦૮:૩૦ કલાકે',
      image: './assets/dadiya.png',
    },
  ],

  // Day 2 Events (Main wedding)
  day2Events: [
    {
      emoji: '🥁',
      title: 'જાન પ્રસ્થાન',
      time: 'બપોરે ૦૨:૩૦ કલાકે',
      image: './assets/shehnai_dhol.png',
    },
    {
      emoji: '🌸',
      title: 'સામૈયું સ્વાગત',
      time: 'સાંજે ૦૫:૧૫ કલાકે',
      image: './assets/marriage_mandap.png',
    },
    {
      emoji: '💍',
      title: 'હસ્ત મેળાપ & ફેરા',
      time: 'સાંજે ૦૬:૩૦ કલાકે',
      image: './assets/wedding_couple.png',
    },
    {
      emoji: '🍽️',
      title: 'પ્રીતિભોજન',
      time: 'સાંજે ૦૭:૩૦ કલાકે',
      image: './assets/bhojan.png',
    },
  ],

  // ── VENUE ────────────────────────────────────────────────
  venue: {
    name: 'ક્રીમી સ્પૂન ગાર્ડન & પાર્ટી પ્લોટ', // Venue name
    address1: 'અમદાવાદ', // Address line 1
    address2: 'અમદાવાદ - ૩૮૭૪૨૦, ગુજરાત',     // Address line 2 (city/pincode)
    mapsUrl: 'https://maps.google.com/?q=Nilkanth+Farm+Junagadh', // Google Maps URL
  },

  // ── FAMILY & CONTACTS ────────────────────────────────────
  family: {
    nimantrak: [                               // Inviting family (head of family)
      'રમેશભાઈ મગનભાઈ પટેલ',
      'ગીતાબેન રમેશભાઈ પટેલ',
    ],
    snehadhin: [                               // Close relatives (uncles etc.)
      'કાંતિભાઈ ગોવિંદભાઈ પટેલ',
      'મુકેશભાઈ ગોવિંદભાઈ પટેલ',
    ],
    darshanabhilashi: [                        // Friends / cousins of groom
      'પરમ, જાનવી, પ્રિયંક, વિધ્યા',
    ],
    mosaL: [                                   // Maternal side
      'શાંતિલાલ મેર (સુરત)',
      'દિનેશભાઈ રાજપરા (અમદાવાદ)',
    ],
    mosal: [                                   // Maternal side (alias)
      'શાંતિલાલ મેર (સુરત)',
      'દિનેશભાઈ રાજપરા (અમદાવાદ)',
    ],
  },

  // ── CONTACTS ─────────────────────────────────────────────
  contacts: [
    '+91 96873 36426',
    '+91 98250 12345',
  ],

  // ── FAMILY HEADER LINE ───────────────────────────────────
  // Shown on cover page below the date
  familyLine: 'શ્રી રમેશભાઈ મગનભાઈ પટેલ તથા સમસ્ત પટેલ પરિવાર',

  // ── FUN FOOTER MESSAGE ───────────────────────────────────
  // Shown on events page (page 3) footer
  funFooter: '"કાકા ના લગનમાં જમવા વહેલા આવજો હોં!" - પરમ & જાનવી',

};

