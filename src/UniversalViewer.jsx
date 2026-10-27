import OrbitCoverflowInvitation from './templates/OrbitCoverflowInvitation'

export default function UniversalViewer({ inv, t, onClose }) {
  // Considers 3D Orbit Coverflow Theme with scroll-based animations & luxury design
  return <OrbitCoverflowInvitation inv={inv} onClose={onClose} />
}
