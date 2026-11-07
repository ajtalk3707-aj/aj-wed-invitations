// A swaying marigold garland (toran) hanging across the top of the hero.
export default function Toran() {
  return (
    <div className="toran" aria-hidden="true">
      {Array.from({ length: 22 }, (_, i) => (
        <span key={i} className="strand" style={{ animationDelay: `${(i % 7) * 0.25}s`, '--h': `${34 + Math.abs(Math.sin(i * 0.9)) * 38}px` }}>
          <b /><i /><i /><u />
        </span>
      ))}
    </div>
  )
}
