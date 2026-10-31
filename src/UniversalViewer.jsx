import { useState, useEffect } from 'react'
import MarigoldBlockprintInvitation from './templates/MarigoldBlockprintInvitation'
import RoyalPalaceInvitation from './templates/RoyalPalaceInvitation'
import BlushFloralInvitation from './templates/BlushFloralInvitation'
import EmeraldBookInvitation from './templates/EmeraldBookInvitation'
import OrbitCoverflowInvitation from './templates/OrbitCoverflowInvitation'
import VercelLiveInvitation from './templates/VercelLiveInvitation'
import SwarnaMandap3DInvitation from './templates/SwarnaMandap3DInvitation'
import DigitalPdfInvitation from './DigitalPdfInvitation/DigitalPdfInvitation'
import { PAGE_MAP } from './Pages'
import { pagesOf } from './data'

export default function UniversalViewer({ inv, t, onClose }) {
  // If the invitation is Digital PDF Gujarati
  // if (inv.template === 'digital-pdf' || inv.template === 'digital-gujarati' || inv.template === 'pdf-kankotri') {
  //   return <DigitalPdfInvitation onClose={onClose} initialTheme={inv.pdfTheme || 'darbari'} />
  // }

  // If the invitation specifies a custom interactive template
  if (inv.template === 'swarna-mandap' || inv.template === '3d-mandap' || inv.template === 'mandap') {
    return <SwarnaMandap3DInvitation inv={inv} onClose={onClose} />
  }
  if (inv.template === 'marigold') {
    return <MarigoldBlockprintInvitation inv={inv} onClose={onClose} />
  }
  if (inv.template === 'royal') {
    return <RoyalPalaceInvitation inv={inv} onClose={onClose} />
  }
  if (inv.template === 'floral') {
    return <BlushFloralInvitation inv={inv} onClose={onClose} />
  }
  if (inv.template === 'emerald' || inv.template === 'envelope') {
    return <EmeraldBookInvitation inv={inv} onClose={onClose} />
  }
  if (inv.template === 'orbit') {
    return <OrbitCoverflowInvitation inv={inv} onClose={onClose} />
  }
  if (inv.template === 'vercel-live') {
    return <VercelLiveInvitation inv={inv} onClose={onClose} />
  }

  // Fallback to classic viewer if any
  return <MarigoldBlockprintInvitation inv={inv} onClose={onClose} />
}
