import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ city }) {
  const [query, setQuery] = useState('')
  const [locating, setLocating] = useState(false)
  const navigate = useNavigate()

  // Runs when the user presses Enter or clicks the search icon
  function handleSubmit(e) {
    e.preventDefault()
    const params = new URLSearchParams({ city, q: query.trim() })
    navigate(`/listings?${params.toString()}`)
  }

  // Asks the browser for the user's location, then opens listings near them
  function handleNearMe() {
    if (!navigator.geolocation) {
      alert('Your browser does not support location. Type an area instead.')
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocating(false)
        navigate(`/listings?lat=${coords.latitude}&lng=${coords.longitude}`)
      },
      () => {
        setLocating(false)
        alert('Could not get your location. Type an area or college instead.')
      }
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm sm:flex-row"
    >
      <div className="flex flex-1 items-center gap-3 px-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search an area or college in ${city}`}
          aria-label="Search by area or college"
          className="w-full bg-transparent py-4 text-sm text-ink placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="shrink-0 text-brand hover:text-brand-dark"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
        </button>
      </div>

      <button
        type="button"
        onClick={handleNearMe}
        disabled={locating}
        className="flex items-center justify-center gap-2 bg-brand px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-70"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="12" r="8" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        </svg>
        {locating ? 'Locating...' : 'Near me'}
      </button>
    </form>
  )
}
