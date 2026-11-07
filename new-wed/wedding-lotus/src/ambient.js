// Built-in generative music: a warm tanpura-style drone + soft sitar-like plucks
// in the Yaman scale (soft bell tones). No audio file needed. Browsers only allow audio after a tap,
// so it starts when the guest taps the envelope.

export function createAmbient() {
  let ctx, master, bus, timer, running = false, idx = 2
  const SCALE = [261.63, 293.66, 329.63, 369.99, 392.0, 440.0, 493.88, 523.25, 587.33]

  const build = () => {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
    master = ctx.createGain(); master.gain.value = 0
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1500
    master.connect(lp); lp.connect(ctx.destination)

    const drone = ctx.createGain(); drone.gain.value = 0.15; drone.connect(master)
    ;[[65.41, 'sine'], [130.81, 'sine'], [196.0, 'triangle'], [261.63, 'sine']].forEach(([f, type], i) => {
      const o = ctx.createOscillator(); o.type = type; o.frequency.value = f; o.detune.value = i * 4
      o.connect(drone); o.start()
    })
    const lfo = ctx.createOscillator(), lg = ctx.createGain()
    lfo.frequency.value = 0.11; lg.gain.value = 0.05; lfo.connect(lg); lg.connect(drone.gain); lfo.start()

    bus = ctx.createGain()
    const dl = ctx.createDelay(1); dl.delayTime.value = 0.43
    const fb = ctx.createGain(); fb.gain.value = 0.4
    bus.connect(master); bus.connect(dl); dl.connect(fb); fb.connect(dl); dl.connect(master)
  }

  const pluck = (f) => {
    const t = ctx.currentTime
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.22, t + 0.012)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 3.4)
    g.connect(bus)
    ;[[f, 'sine', 1], [f * 2.76, 'sine', 0.22], [f * 5.4, 'sine', 0.07], [f * 0.5, 'triangle', 0.25]].forEach(([fr, type, amp]) => {
      const o = ctx.createOscillator(), og = ctx.createGain()
      o.type = type; o.frequency.value = fr; og.gain.value = amp
      o.connect(og); og.connect(g); o.start(t); o.stop(t + 3.5)
    })
  }

  const loop = () => {
    if (!running) return
    pluck(SCALE[idx])
    const step = [-2, -1, -1, 1, 1, 2][Math.floor(Math.random() * 6)]
    idx = Math.min(SCALE.length - 1, Math.max(0, idx + step))
    timer = setTimeout(loop, (Math.random() < 0.25 ? 2200 : 650) + Math.random() * 1400)
  }

  return {
    start() {
      if (!ctx) build()
      ctx.resume()
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 3)
      if (!running) { running = true; loop() }
    },
    stop() {
      running = false; clearTimeout(timer)
      if (!ctx) return
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2)
      setTimeout(() => ctx && ctx.suspend(), 1300)
    },
  }
}

// Optional: play your own mp3 instead.
export function createFilePlayer(url) {
  const a = new Audio(url); a.loop = true; a.volume = 0
  let iv
  const fade = (to, done) => {
    clearInterval(iv)
    iv = setInterval(() => {
      a.volume = Math.max(0, Math.min(1, a.volume + (to > a.volume ? 0.04 : -0.04)))
      if (Math.abs(a.volume - to) < 0.05) { a.volume = to; clearInterval(iv); done && done() }
    }, 100)
  }
  return {
    start() { a.play().catch(() => {}); fade(0.7) },
    stop() { fade(0, () => a.pause()) },
  }
}
