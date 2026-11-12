import { useState } from 'react'
import SearchBar from '../components/home/SearchBar'
import CityPicker from '../components/home/CityPicker'

export default function Home() {
  // The selected city is shared: CityPicker changes it, SearchBar reads it
  const [city, setCity] = useState('Bengaluru')

  return (
    <div>
      {/* Hero: text and search on the left, image on the right */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
            Find a place to live, without the broker runaround.
          </h1>

          <p className="mt-5 inline-block rounded-lg bg-accent-soft px-4 py-2 text-sm text-ink">
            PGs and flats from verified owners, with legal help built in.
          </p>

          <div className="mt-8">
            <SearchBar city={city} />
          </div>
        </div>

        {/* Put your own photo at public/hero.jpg. If it is missing, the tinted box still shows. */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-mist">
          <img
            src="/hero.jpg"
            alt="Two roommates relaxing in a bright living room"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      </section>

      {/* City picker */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <h2 className="mb-6 text-center text-lg font-bold text-ink">Pick your city</h2>
        <CityPicker selected={city} onSelect={setCity} />
      </section>
    </div>
  )
}