import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { listings } from '../data/listings'

// This one page serves every listing. The :id in the URL (/listings/1, /listings/2, ...)
// decides which listing is shown. Later, replace the .find() below with a fetch to your
// backend, for example GET /api/properties/:id.
export default function ListingDetail() {
  const { id } = useParams()
  const listing = listings.find((l) => String(l.id) === id)

  // Start at the top of the page when opening a listing from a scrolled list
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!listing) return <NotFound />

  // key makes React reset the page's own state (saved, phone shown) for each listing
  return <Detail key={listing.id} listing={listing} />
}

function Detail({ listing }) {
  const [saved, setSaved] = useState(false)
  const [showPhone, setShowPhone] = useState(false)

  const rent = listing.rent.toLocaleString('en-IN')

  // Only show facts that exist for this listing
  const facts = [
    { label: 'Property type', value: listing.type },
    { label: 'Suitable for', value: listing.suitableFor },
    {
      label: 'Security deposit',
      value: listing.deposit ? `₹${listing.deposit.toLocaleString('en-IN')}` : 'Ask the owner',
    },
    { label: 'Area', value: `${listing.locality}, ${listing.city}` },
  ].filter((fact) => fact.value)

  const phone = listing.phone ? `${listing.phone.slice(0, 5)} ${listing.phone.slice(5)}` : null

  return (
    <article className="mx-auto max-w-6xl px-6 py-8 md:py-12">
      <Link
        to={`/listings?city=${encodeURIComponent(listing.city)}`}
        className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-brand"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" />
        </svg>
        Back to {listing.city} listings
      </Link>

      {/* Title row */}
      <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">{listing.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            <span>
              {listing.type} in {listing.locality}, {listing.city}
            </span>
            <span className="flex items-center gap-1 font-medium text-ink">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent" fill="currentColor" aria-hidden="true">
                <path d="M12 2l2.9 6.3 6.9.7-5.1 4.7 1.5 6.8L12 17l-6.2 3.5 1.5-6.8L2.2 9l6.9-.7z" />
              </svg>
              {listing.rating}
            </span>
            {listing.verified && (
              <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-brand">Verified owner</span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          className="flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand/50 focus-visible:outline-2 focus-visible:outline-brand"
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
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>

      <div className="mt-6">
        <Gallery images={listing.images} title={listing.title} />
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
        {/* Left column: the details */}
        <div className="space-y-10">
          {listing.description && (
            <Section title="About this place">
              <p className="text-sm leading-relaxed text-muted">{listing.description}</p>
            </Section>
          )}

          <Section title="Details">
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs text-muted">{fact.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Section>

          {listing.amenities?.length > 0 && (
            <Section title="Amenities">
              <ul className="grid gap-3 sm:grid-cols-2">
                {listing.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-3 text-sm text-ink">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {amenity}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section title="Location">
            <p className="text-sm text-muted">
              {listing.locality}, {listing.city}. The exact address is shared when you contact the owner.
            </p>
          </Section>

          {listing.ownerName && (
            <Section title="Listed by">
              <div className="flex items-center gap-4">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-mist text-lg font-bold text-brand"
                  aria-hidden="true"
                >
                  {listing.ownerName.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{listing.ownerName}</p>
                  <p className="text-xs text-muted">
                    {listing.verified ? 'Verified owner' : 'Owner not verified yet'}
                  </p>
                </div>
              </div>
            </Section>
          )}
        </div>

        {/* Right column: price and contact */}
        <aside className="self-start lg:sticky lg:top-8">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
            <p className="text-2xl font-extrabold text-ink">
              ₹{rent}
              <span className="text-sm font-medium text-muted"> / month</span>
            </p>
            {listing.deposit && (
              <p className="mt-1 text-sm text-muted">
                Deposit ₹{listing.deposit.toLocaleString('en-IN')}
              </p>
            )}

            {showPhone && phone ? (
              <div className="mt-6" role="status">
                <p className="text-xs text-muted">Call {listing.ownerName}</p>
                <a
                  href={`tel:+91${listing.phone}`}
                  className="mt-1 block text-lg font-bold text-brand hover:text-brand-dark"
                >
                  +91 {phone}
                </a>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowPhone(true)}
                disabled={!phone}
                className="mt-6 w-full rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
              >
                {phone ? 'Contact owner' : 'Contact details unavailable'}
              </button>
            )}

            <p className="mt-5 text-xs leading-relaxed text-muted">
              Do not pay any deposit before you have seen the place and agreed the terms in writing.
            </p>
          </div>

          <Link
            to="/legal-help"
            className="mt-4 block rounded-2xl bg-mist p-5 text-sm transition-colors hover:bg-mist/70"
          >
            <span className="block font-semibold text-ink">Need a rental agreement?</span>
            <span className="mt-1 block text-muted">Get legal help with drafting and checking your tenancy terms.</span>
          </Link>
        </aside>
      </div>
    </article>
  )
}

function Gallery({ images, title }) {
  const photos = images ?? []
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-mist">
        <HouseIcon className="absolute inset-0 m-auto h-20 w-20 text-brand/30" />
        {photos.length > 0 && (
          <img
            key={photos[active]}
            src={photos[active]}
            alt={`${title}, photo ${active + 1} of ${photos.length}`}
            className="relative h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        )}
      </div>

      {photos.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {photos.map((src, index) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show photo ${index + 1}`}
                aria-current={index === active}
                className={`relative block aspect-[4/3] w-full overflow-hidden rounded-lg border-2 bg-mist transition-colors focus-visible:outline-2 focus-visible:outline-brand ${
                  index === active ? 'border-brand' : 'border-transparent hover:border-brand/40'
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="border-t border-line pt-8 first:border-t-0 first:pt-0">
      <h2 className="mb-4 text-lg font-bold text-ink">{title}</h2>
      {children}
    </section>
  )
}

function HouseIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  )
}

function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="text-2xl font-extrabold tracking-tight text-ink">We could not find that listing</h1>
      <p className="mt-3 text-sm text-muted">It may have been removed, or the link is wrong.</p>
      <Link
        to="/listings"
        className="mt-8 inline-block rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        Browse all listings
      </Link>
    </section>
  )
}
