import { createContext, useContext, useEffect, useState } from 'react'
import { COPY } from './copy.js'

const Ctx = createContext(null)
export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => { try { return localStorage.getItem('lang') || 'en' } catch { return 'en' } })
  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('lang', lang) } catch {}
  }, [lang])
  return <Ctx.Provider value={{ lang, setLang, t: COPY[lang] }}>{children}</Ctx.Provider>
}
export const useLang = () => useContext(Ctx)
