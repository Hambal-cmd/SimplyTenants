import { Link } from 'react-router-dom'

// A reusable "coming soon" screen. Each page passes in its own text and,
// optionally, an image. Without an image, a simple placeholder icon is shown.
export default function ComingSoon({ title, description, features = [], image, imageAlt = '' }) {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
      <div>
        <p className="inline-block rounded-lg bg-accent-soft px-4 py-2 text-sm font-medium text-ink">
          We are still building this
        </p>

        <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
          {title}
        </h1>

        <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">{description}</p>

        {features.length > 0 && (
          <ul className="mt-8 space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-ink">
                <svg
                  viewBox="0 0 24 24"
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/listings"
            className="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Browse places to rent
          </Link>
          <Link
            to="/"
            className="rounded-lg border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand/50"
          >
            Back to home
          </Link>
        </div>
      </div>

      {/* Image on the right. If no image is given, show a placeholder icon. */}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-mist">
        {image ? (
          <img
            src={image}
            alt={imageAlt}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-28 w-28 text-brand/40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <path d="M14 3v5h5" />
            <path d="M9 13h6M9 17h4" />
          </svg>
        )}
      </div>
    </section>
  )
}