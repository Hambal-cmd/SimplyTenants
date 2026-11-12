import { useEffect, useRef, useState } from 'react'
import ListingCard from './ListingCard'

// One Airbnb-style section: a heading, optional arrows, and a sideways-scrolling row of cards.
export default function ListingRow({ title, subtitle, listings }) {
  const rowRef = useRef(null)
  const [canScroll, setCanScroll] = useState(false)

  // Show the arrows only when the cards do not fit on screen
  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const check = () => setCanScroll(el.scrollWidth > el.clientWidth)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [listings.length])

  function scroll(direction) {
    rowRef.current?.scrollBy({ left: direction * 480, behavior: 'smooth' })
  }

  return (
    <section className="mt-10 first:mt-0">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-ink">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        </div>

        {canScroll && (
          <div className="flex gap-2">
            <ArrowButton direction="left" onClick={() => scroll(-1)} />
            <ArrowButton direction="right" onClick={() => scroll(1)} />
          </div>
        )}
      </div>

      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  )
}

function ArrowButton({ direction, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Scroll left' : 'Scroll right'}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-brand/50 focus-visible:outline-2 focus-visible:outline-brand"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  )
}
