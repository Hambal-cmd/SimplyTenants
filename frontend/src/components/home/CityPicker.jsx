import { Link } from 'react-router-dom'
import { cities } from '../../data/cities'

// Each card is a link. Clicking it opens the listings page for that city,
// for example /listings?city=Chennai
export default function CityPicker() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {cities.map((city) => (
        <Link
          key={city.name}
          to={`/listings?city=${encodeURIComponent(city.name)}`}
          className="group w-36 rounded-xl border border-line bg-white px-4 py-4 text-center transition-colors hover:border-brand hover:bg-mist focus-visible:outline-2 focus-visible:outline-brand"
        >
          {city.image && (
            <img
              src={city.image}
              alt=""
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
              className="mx-auto mb-3 h-14 w-auto opacity-60 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
            />
          )}
          <span className="block text-sm font-semibold text-ink transition-colors group-hover:text-brand">
            {city.name}
          </span>
          <span className="mt-1 block text-xs text-muted">{city.landmark}</span>
        </Link>
      ))}
    </div>
  )
}
