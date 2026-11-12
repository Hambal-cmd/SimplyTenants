import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Every page inside this route gets the Navbar from Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* Add the other pages here as you build them, e.g.
              <Route path="/listings" element={<Listings />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}