import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Listings from './pages/Listing'
import ListingDetail from './pages/ListingDetail'
import AddProperty from './pages/AddProperty'
import RoommateFinder from './pages/RoomateFinder'
import Auth from './pages/Auth'
import LegalHelp from './pages/LegalHelp'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Every page inside this route gets the Navbar from Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/roommates" element={<RoommateFinder />} />
          <Route path="/legal-help" element={<LegalHelp />} />
          <Route path="/login" element={<Auth mode="signin" />} />
          <Route path="/signup" element={<Auth mode="signup" />} />
          <Route path='/listings' element={<Listings />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path='/add-property' element={<AddProperty />} />


          {/* Add the other pages here as you build them, e.g.
              <Route path="/listings" element={<Listings />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}