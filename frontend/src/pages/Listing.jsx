import { Link, useSearchParams } from 'react-router-dom'
import SearchBar from '../components/home/SearchBar'
import ListingRow from '../components/listing/ListingRow'
import { listings } from '../data/listings'

export default function Listings() {
  // The landing page sends users here as /listings?city=Bengaluru&q=jayanagar
  const [searchParams] = useSearchParams()
  const city = searchParams.get('city') || 'Bengaluru'
  const query = (searchParams.get('q') || '').trim().toLowerCase()

  // 1) keep only listings in the chosen city
  const inCity = listings.filter((l) => l.city.toLowerCase() === city.toLowerCase())

  // 2) if the user typed something, keep listings that match it
  const results = query
    ? inCity.filter((l) => `${l.title} ${l.locality} ${l.type}`.toLowerCase().includes(query))
    : inCity

  // 3) split into rows
  const topRated = results.filter((l) => l.rating >= 4.7)

  return (
    <div>
      {/* Search strip, like the one under Airbnb's navbar */}
      <section className="border-b border-line bg-mist/50">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <SearchBar city={city} />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {results.length === 0 ? (
          <div className="py-16 text-center">
            <h1 className="text-xl font-bold text-ink">No stays found in {city}</h1>
            <p className="mt-2 text-sm text-muted">
              {query
                ? 'Try a different area or college name.'
                : 'We do not have listings in this city yet. Try another one.'}
            </p>
            <Link
              to="/"
              className="mt-6 inline-block rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Pick another city
            </Link>
          </div>
        ) : (
          <>
            {topRated.length > 0 && (
              <ListingRow
                title={`Top-rated stays in ${city}`}
                subtitle="Tenants rate these places highly."
                listings={topRated}
              />
            )}
            <ListingRow
              title={`All stays in ${city}`}
              subtitle={`${results.length} ${results.length === 1 ? 'place' : 'places'} available`}
              listings={results}
            />
          </>
        )}
      </div>
    </div>
  )
}
