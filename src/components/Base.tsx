import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Base() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-yellow-50">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}