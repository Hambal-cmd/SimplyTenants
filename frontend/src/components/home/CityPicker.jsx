import { cities } from '../../data/cities'

export default function CityPicker({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {cities.map((city) => {
        const isSelected = city.name === selected
        return (
          <button
            key={city.name}
            type="button"
            onClick={() => onSelect(city.name)}
            aria-pressed={isSelected}
            className={`w-36 rounded-xl border px-4 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-brand ${
              isSelected
                ? 'border-brand bg-mist'
                : 'border-line bg-white hover:border-brand/50'
            }`}
          >
            <span className={`block text-sm font-semibold ${isSelected ? 'text-brand' : 'text-ink'}`}>
              {city.name}
            </span>
            <span className="mt-1 block text-xs text-muted">{city.landmark}</span>
          </button>
        )
      })}
    </div>
  )
}