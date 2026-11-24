import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FormField from '../components/ui/FormField'

const roles = [
  { value: 'tenant', label: 'Tenant', hint: 'I am looking for a place' },
  { value: 'owner', label: 'Owner', hint: 'I want to list a property' },
]

const points = [
  'Save listings and come back to them anytime',
  'Owners can list PGs and flats in minutes',
  'Legal help and roommate matching are on the way',
]

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emptyValues = { name: '', email: '', password: '', role: 'tenant' }

// Returns an object like { email: 'Enter a valid email address.' }. Empty object means all good.
function validate(values, mode) {
  const errors = {}
  if (mode === 'signup' && !values.name.trim()) {
    errors.name = 'Enter your name.'
  }
  if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (mode === 'signup') {
    if (values.password.length < 8) errors.password = 'Use at least 8 characters.'
  } else if (!values.password) {
    errors.password = 'Enter your password.'
  }
  return errors
}

// mode is "signin" or "signup". App.jsx passes it based on the URL (/login or /signup).
export default function Auth({ mode }) {
  const isSignup = mode === 'signup'

  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // When the user switches tabs, clear errors and the success message
  useEffect(() => {
    setErrors({})
    setSubmitted(false)
    setShowPassword(false)
  }, [mode])

  function handleChange(e) {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    // Clear that field's error as soon as the user starts fixing it
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const found = validate(values, mode)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    // TODO: replace this with a real call to your backend, for example:
    // fetch(`${import.meta.env.VITE_API_URL}/api/auth/${isSignup ? 'register' : 'login'}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(values),
    // })
    setSubmitted(true)
  }

  const firstName = values.name.trim().split(' ')[0]
  const isOwner = isSignup && values.role === 'owner'

  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-12 md:grid-cols-2 md:py-20">
      {/* Left: the form */}
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 inline-flex rounded-lg border border-line bg-white p-1 text-sm font-semibold">
          <TabLink to="/login" active={!isSignup}>
            Sign in
          </TabLink>
          <TabLink to="/signup" active={isSignup}>
            Sign up
          </TabLink>
        </div>

        {submitted ? (
          <div role="status" className="rounded-2xl border border-line bg-white p-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-ink">
              {isSignup ? `Welcome, ${firstName}` : 'You are signed in'}
            </h1>
            <p className="mt-3 text-sm text-muted">
              {isOwner
                ? 'Your owner account is ready. List your first property whenever you like.'
                : 'Browse places to rent and save the ones you like.'}
            </p>
            <Link
              to={isOwner ? '/add-property' : '/listings'}
              className="mt-6 inline-block rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              {isOwner ? 'List your property' : 'Browse places to rent'}
            </Link>
            <p className="mt-6 text-xs text-muted">
              Demo mode: accounts are not saved until the backend is connected.
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink">
              {isSignup ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="mt-2 text-sm text-muted">
              {isSignup
                ? 'Find a place, list one, or both. It only takes a minute.'
                : 'Sign in to see your saved places and listings.'}
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
              {isSignup && (
                <FormField
                  id="name"
                  name="name"
                  label="Full name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={values.name}
                  onChange={handleChange}
                  error={errors.name}
                />
              )}

              <FormField
                id="email"
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
              />

              <FormField
                id="password"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                autoComplete={isSignup ? 'new-password' : 'current-password'}
                placeholder={isSignup ? 'At least 8 characters' : 'Your password'}
                value={values.password}
                onChange={handleChange}
                error={errors.password}
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="text-xs font-semibold text-brand hover:text-brand-dark"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                }
              />

              {isSignup && (
                <fieldset>
                  <legend className="mb-1.5 text-sm font-medium text-ink">I am a</legend>
                  <div className="grid grid-cols-2 gap-3">
                    {roles.map((role) => {
                      const selected = values.role === role.value
                      return (
                        <label
                          key={role.value}
                          className={`cursor-pointer rounded-lg border px-4 py-3 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-brand ${
                            selected ? 'border-brand bg-mist' : 'border-line bg-white hover:border-brand/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="role"
                            value={role.value}
                            checked={selected}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <span className={`block text-sm font-semibold ${selected ? 'text-brand' : 'text-ink'}`}>
                            {role.label}
                          </span>
                          <span className="mt-0.5 block text-xs text-muted">{role.hint}</span>
                        </label>
                      )
                    })}
                  </div>
                </fieldset>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                {isSignup ? 'Create account' : 'Sign in'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted">
              {isSignup ? 'Already have an account? ' : 'New to Simply Tenants? '}
              <Link
                to={isSignup ? '/login' : '/signup'}
                className="font-semibold text-brand hover:text-brand-dark"
              >
                {isSignup ? 'Sign in' : 'Create an account'}
              </Link>
            </p>
          </>
        )}
      </div>

      {/* Right: a short pitch, hidden on phones */}
      <aside className="hidden flex-col justify-center rounded-3xl bg-mist p-12 md:flex">
        <h2 className="text-2xl font-extrabold leading-snug tracking-tight text-ink">
          One account for finding a place, listing one, and getting help.
        </h2>
        <ul className="mt-8 space-y-4">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm text-ink">
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
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  )
}

function TabLink({ to, active, children }) {
  return (
    <Link
      to={to}
      aria-current={active ? 'page' : undefined}
      className={`rounded-md px-5 py-2 transition-colors ${
        active ? 'bg-brand text-white' : 'text-muted hover:text-ink'
      }`}
    >
      {children}
    </Link>
  )
}
