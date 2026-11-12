import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ListingCard({ listing }) {
  // "saved" only lives in this card for now. Later it can be stored per user.
  const [saved, setSaved] = useState(false)

  return (
    <article className="relative w-56 shrink-0">
      <Link to={`/listings/${listing.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-mist">
          {/* Placeholder icon. It stays visible if the photo is missing. */}
          <svg
            viewBox="0 0 24 24"
            className="absolute inset-0 m-auto h-12 w-12 text-brand/30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 11l9-8 9 8" />
            <path d="M5 10v10h14V10" />
            <path d="M10 20v-6h4v6" />
          </svg>

          <img
            src={listing.images[0]}
            alt={listing.title}
            loading="lazy"
            className="relative h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />

          {listing.verified && (
            <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink shadow-sm">
              Verified owner
            </span>
          )}
        </div>

        <div className="mt-3">
          <h3 className="truncate text-sm font-semibold text-ink">
            {listing.type} in {listing.locality}
          </h3>
          <div className="mt-0.5 flex items-center justify-between text-sm text-muted">
            <span>₹{listing.rent.toLocaleString('en-IN')} / month</span>
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-accent" fill="currentColor" aria-hidden="true">
                <path d="M12 2l2.9 6.3 6.9.7-5.1 4.7 1.5 6.8L12 17l-6.2 3.5 1.5-6.8L2.2 9l6.9-.7z" />
              </svg>
              {listing.rating}
            </span>
          </div>
        </div>
      </Link>

      {/* The heart sits on top of the link, so clicking it saves instead of opening the listing */}
      <button
        type="button"
        onClick={() => setSaved((s) => !s)}
        aria-pressed={saved}
        aria-label={saved ? 'Remove from saved' : 'Save listing'}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-brand"
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-4 w-4 ${saved ? 'text-brand' : ''}`}
          fill={saved ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 21s-7-4.6-9.3-9A5.3 5.3 0 0 1 12 6.6 5.3 5.3 0 0 1 21.3 12C19 16.4 12 21 12 21z" />
        </svg>
      </button>
    </article>
  )
}
