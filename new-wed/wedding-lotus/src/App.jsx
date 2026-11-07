import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Intro from './components/Intro.jsx'
import Site from './components/Site.jsx'
import TopBar from './components/TopBar.jsx'
import Nav from './components/Nav.jsx'
import { useMusic } from './useMusic.js'

export default function App() {
  const music = useMusic()
  const [started, setStarted] = useState(false)
  const [gone, setGone] = useState(false)
  useEffect(() => { document.body.style.overflow = gone ? '' : 'hidden' }, [gone])
  return (
    <>
      {started && (<><Site /><TopBar music={music} /><Nav /></>)}
      <AnimatePresence>
        {!gone && <Intro onOpen={music.start} onZoom={() => setStarted(true)} onDone={() => setGone(true)} />}
      </AnimatePresence>
    </>
  )
}
