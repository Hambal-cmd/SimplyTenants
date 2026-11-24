import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FormField from '../components/ui/FormField'
import ListingCard from '../components/listing/ListingCard'
import { cities } from '../data/cities'

const propertyTypes = ['PG', 'Flat', 'Room', 'Independent house']
const audiences = ['Anyone', 'Men only', 'Women only']
const amenityOptions = [
  'Wi-Fi',
  'Meals included',
  'Laundry',
  'Parking',
  'Power backup',
  'Furnished',
  'Air conditioning',
  'Gym access',
  'Balcony',
  'Security',
]

const MAX_PHOTOS = 5
const MAX_PHOTO_MB = 5

const initialValues = {
  title: '',
  type: 'PG',
  suitableFor: 'Anyone',
  city: 'Bengaluru',
  locality: '',
  address: '',
  rent: '',
  deposit: '',
  description: '',
  ownerName: '',
  phone: '',
}

// The order the fields appear on the page. Used to focus the first error.
const fieldOrder = ['title', 'locality', 'rent', 'deposit', 'photos', 'ownerName', 'phone']

// Returns an object like { rent: 'Enter the monthly rent.' }. Empty object means all good.
function validate(values, photos) {
  const errors = {}

  if (values.title.trim().length < 8) {
    errors.title = 'Add a short title, at least 8 characters.'
  }
  if (!values.locality.trim()) {
    errors.locality = 'Enter the area or neighbourhood.'
  }

  const rent = Number(values.rent)
  if (!(rent > 0)) {
    errors.rent = 'Enter the monthly rent.'
  } else if (rent > 1000000) {
    errors.rent = 'That looks too high. Check the amount.'
  }

  if (values.deposit !== '' && !(Number(values.deposit) >= 0)) {
    errors.deposit = 'Enter a valid deposit amount.'
  }

  if (photos.length === 0) {
    errors.photos = 'Add at least one photo.'
  }

  if (!values.ownerName.trim()) {
    errors.ownerName = 'Enter your name.'
  }
  if (!/^[6-9]\d{9}$/.test(values.phone.trim())) {
    errors.phone = 'Enter a 10-digit mobile number.'
  }

  return errors
}

export default function AddProperty() {
  const [values, setValues] = useState(initialValues)
  const [amenities, setAmenities] = useState([])
  const [photos, setPhotos] = useState([]) // each: { id, file, url }
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // Free the browser memory used by photo previews when the page is closed
  const photosRef = useRef(photos)
  useEffect(() => {
    photosRef.current = photos
  }, [photos])
  useEffect(() => {
    return () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url))
  }, [])

  function handleChange(e) {
    const { name } = e.target
    let { value } = e.target
    // Phone: keep digits only, max 10
    if (name === 'phone') value = value.replace(/\D/g, '').slice(0, 10)
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function toggleAmenity(name) {
    setAmenities((list) =>
      list.includes(name) ? list.filter((a) => a !== name) : [...list, name]
    )
  }

  function handlePhotoChange(e) {
    const files = Array.from(e.target.files)
    e.target.value = '' // lets the user pick the same file again later

    const problems = []
    const accepted = []
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        problems.push(`${file.name} is not an image.`)
      } else if (file.size > MAX_PHOTO_MB * 1024 * 1024) {
        problems.push(`${file.name} is larger than ${MAX_PHOTO_MB} MB.`)
      } else {
        accepted.push(file)
      }
    }

    const room = Math.max(MAX_PHOTOS - photos.length, 0)
    if (accepted.length > room) problems.push(`You can add up to ${MAX_PHOTOS} photos.`)

    const added = accepted.slice(0, room).map((file) => ({
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
    }))

    setPhotos((list) => [...list, ...added])
    setErrors((prev) => ({ ...prev, photos: problems[0] }))
  }

  function removePhoto(id) {
    setPhotos((list) => {
      const target = list.find((p) => p.id === id)
      if (target) URL.revokeObjectURL(target.url)
      return list.filter((p) => p.id !== id)
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const found = validate(values, photos)
    setErrors(found)

    const firstError = fieldOrder.find((key) => found[key])
    if (firstError) {
      document.getElementById(firstError)?.focus()
      return
    }

    // TODO: send this to your backend. Photos need FormData, not JSON, for example:
    // const body = new FormData()
    // Object.entries(values).forEach(([key, val]) => body.append(key, val))
    // amenities.forEach((a) => body.append('amenities', a))
    // photos.forEach((p) => body.append('photos', p.file))
    // fetch(`${import.meta.env.VITE_API_URL}/api/properties`, { method: 'POST', body })
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function resetForm() {
    photos.forEach((p) => URL.revokeObjectURL(p.url))
    setValues(initialValues)
    setAmenities([])
    setPhotos([])
    setErrors({})
    setSubmitted(false)
  }

  // The card shown in the preview and on the success screen
  const previewListing = {
    id: 'preview',
    title: values.title || 'Your listing',
    type: values.type,
    rent: Number(values.rent) || 0,
    locality: values.locality.trim() || 'your area',
    city: values.city,
    images: [photos[0]?.url],
    rating: 'New',
    verified: false,
  }

  if (submitted) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div role="status" className="grid items-center gap-10 sm:grid-cols-[auto_1fr]">
          <div inert aria-hidden="true">
            <ListingCard listing={previewListing} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink">Your listing is ready</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {values.title} in {values.locality.trim()}, {values.city}. Tenants will be able to
              find it in search and contact you on {values.phone}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/listings"
                className="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                View all listings
              </Link>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand/50"
              >
                List another property
              </button>
            </div>
            <p className="mt-6 text-xs text-muted">
              Demo mode: listings are not saved until the backend is connected.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <h1 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">List your property</h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Add the details tenants look for first. It takes about five minutes, and you can add more
        later.
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <form onSubmit={handleSubmit} noValidate className="space-y-10">
          {/* 1. Basics */}
          <FormSection title="The basics">
            <FormField
              id="title"
              name="title"
              label="Listing title"
              placeholder="Sunny single room near BMS College"
              value={values.title}
              onChange={handleChange}
              error={errors.title}
              maxLength={80}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField id="type" name="type" label="Property type" as="select" value={values.type} onChange={handleChange}>
                {propertyTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </FormField>
              <FormField id="suitableFor" name="suitableFor" label="Suitable for" as="select" value={values.suitableFor} onChange={handleChange}>
                {audiences.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </FormField>
            </div>
            <FormField
              id="description"
              name="description"
              label="Description (optional)"
              as="textarea"
              rows={4}
              maxLength={500}
              placeholder="Nearby landmarks, house rules, who you would like to rent to"
              value={values.description}
              onChange={handleChange}
              hint={`${values.description.length}/500`}
            />
          </FormSection>

          {/* 2. Location */}
          <FormSection title="Location">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField id="city" name="city" label="City" as="select" value={values.city} onChange={handleChange}>
                {cities.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </FormField>
              <FormField
                id="locality"
                name="locality"
                label="Area or neighbourhood"
                placeholder="Basavanagudi"
                value={values.locality}
                onChange={handleChange}
                error={errors.locality}
              />
            </div>
            <FormField
              id="address"
              name="address"
              label="Street address (optional)"
              placeholder="Shown to tenants only after they contact you"
              value={values.address}
              onChange={handleChange}
            />
          </FormSection>

          {/* 3. Pricing */}
          <FormSection title="Pricing">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                id="rent"
                name="rent"
                label="Monthly rent (₹)"
                type="number"
                inputMode="numeric"
                min="0"
                placeholder="8500"
                value={values.rent}
                onChange={handleChange}
                error={errors.rent}
              />
              <FormField
                id="deposit"
                name="deposit"
                label="Security deposit (₹, optional)"
                type="number"
                inputMode="numeric"
                min="0"
                placeholder="25000"
                value={values.deposit}
                onChange={handleChange}
                error={errors.deposit}
              />
            </div>
          </FormSection>

          {/* 4. Amenities */}
          <FormSection title="Amenities" hint="Select everything that is included.">
            <div role="group" aria-label="Amenities" className="flex flex-wrap gap-2">
              {amenityOptions.map((name) => {
                const on = amenities.includes(name)
                return (
                  <label
                    key={name}
                    className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors has-focus-visible:outline-2 has-focus-visible:outline-brand ${
                      on
                        ? 'border-brand bg-mist font-semibold text-brand'
                        : 'border-line bg-white text-ink hover:border-brand/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => toggleAmenity(name)}
                      className="sr-only"
                    />
                    {name}
                  </label>
                )
              })}
            </div>
          </FormSection>

          {/* 5. Photos */}
          <FormSection title="Photos" hint={`Add up to ${MAX_PHOTOS} photos, ${MAX_PHOTO_MB} MB each. The first one is the cover.`}>
            <div>
              <label
                htmlFor="photos"
                className={`flex cursor-pointer flex-col items-center rounded-xl border border-dashed bg-mist/40 px-6 py-8 text-center transition-colors hover:border-brand/60 has-focus-visible:outline-2 has-focus-visible:outline-brand ${
                  errors.photos ? 'border-red-500' : 'border-line'
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-8 w-8 text-brand/60" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <circle cx="9" cy="10" r="1.8" />
                  <path d="M21 16l-5-5-8 9" />
                </svg>
                <span className="mt-3 text-sm font-semibold text-ink">Choose photos</span>
                <span className="mt-1 text-xs text-muted">
                  {photos.length} of {MAX_PHOTOS} added
                </span>
                <input
                  id="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoChange}
                  aria-invalid={errors.photos ? 'true' : undefined}
                  aria-describedby={errors.photos ? 'photos-error' : undefined}
                  className="sr-only"
                />
              </label>
              {errors.photos && (
                <p id="photos-error" className="mt-1.5 text-xs text-red-600">
                  {errors.photos}
                </p>
              )}
            </div>

            {photos.length > 0 && (
              <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                {photos.map((photo, index) => (
                  <li key={photo.id} className="relative aspect-square overflow-hidden rounded-xl bg-mist">
                    <img src={photo.url} alt={`Photo ${index + 1}`} className="h-full w-full object-cover" />
                    {index === 0 && (
                      <span className="absolute bottom-2 left-2 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-ink shadow-sm">
                        Cover
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      aria-label={`Remove photo ${index + 1}`}
                      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm hover:bg-white focus-visible:outline-2 focus-visible:outline-brand"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </FormSection>

          {/* 6. Contact */}
          <FormSection title="Your contact details" hint="Tenants who are interested will reach you on this number.">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                id="ownerName"
                name="ownerName"
                label="Your name"
                autoComplete="name"
                value={values.ownerName}
                onChange={handleChange}
                error={errors.ownerName}
              />
              <FormField
                id="phone"
                name="phone"
                label="Mobile number"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="9876543210"
                value={values.phone}
                onChange={handleChange}
                error={errors.phone}
              />
            </div>
          </FormSection>

          <button
            type="submit"
            className="w-full rounded-lg bg-brand px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark sm:w-auto"
          >
            Publish listing
          </button>
        </form>

        {/* Live preview */}
        <aside className="self-start lg:sticky lg:top-8">
          <h2 className="text-sm font-bold text-ink">Preview</h2>
          <p className="mt-1 text-xs text-muted">This is how your listing will look in search.</p>
          <div className="mt-4" inert aria-hidden="true">
            <ListingCard listing={previewListing} />
          </div>
        </aside>
      </div>
    </section>
  )
}

function FormSection({ title, hint, children }) {
  return (
    <section className="border-t border-line pt-8 first:border-t-0 first:pt-0">
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  )
}
