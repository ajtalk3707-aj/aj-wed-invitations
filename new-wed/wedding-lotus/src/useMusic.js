import { useCallback, useEffect, useRef, useState } from 'react'
import { createAmbient, createFilePlayer } from './ambient.js'
import { CFG } from './copy.js'

export function useMusic() {
  const [playing, setPlaying] = useState(false)
  const eng = useRef(null)
  const wanted = useRef(false)
  const get = () => eng.current || (eng.current = CFG.musicUrl ? createFilePlayer(CFG.musicUrl) : createAmbient())

  const start = useCallback(() => { wanted.current = true; get().start(); setPlaying(true) }, [])
  const stop = useCallback(() => { wanted.current = false; get().stop(); setPlaying(false) }, [])
  const toggle = useCallback(() => (wanted.current ? stop() : start()), [start, stop])

  // pause when the tab is hidden, resume when it comes back
  useEffect(() => {
    const vis = () => {
      if (!eng.current || !wanted.current) return
      document.hidden ? eng.current.stop() : eng.current.start()
    }
    document.addEventListener('visibilitychange', vis)
    return () => document.removeEventListener('visibilitychange', vis)
  }, [])

  return { playing, start, stop, toggle }
}
