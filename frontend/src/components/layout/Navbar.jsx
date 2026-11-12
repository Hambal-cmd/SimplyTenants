import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/listings', label: 'Find a place' },
  { to: '/add-property', label: 'List your property' },
  { to: '/roommates', label: 'Find a roommate' },
  { to: '/legal-help', label: 'Legal help' },
]

export default function Navbar() {
  return (
    <header className="border-b border-line bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-extrabold tracking-tight text-brand">
          Simply Tenants
        </Link>

        {/* hidden on phones, visible from the md breakpoint up */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-brand ${
                    isActive ? 'text-brand' : 'text-muted'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link
          to="/login"
          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Sign in
        </Link>
      </nav>
    </header>
  )
}