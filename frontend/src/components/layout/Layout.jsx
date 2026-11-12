import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Outlet renders whichever page matches the current URL */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}
