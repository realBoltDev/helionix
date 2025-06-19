"use client"

import { Sun, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Sun className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <a href="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Helionix
            </a>
          </div>

          {/* Navigation on Desktop Devices */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">
              How it Works
            </a>
            <a href="/#why-helionix" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full px-6 py-2 font-medium transition-all shadow-lg hover:shadow-xl cursor-pointer inline-block">
              Why Us?
            </a>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-green-50 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </nav>

        {/* Navigation on Mobile Devices */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-60 z-40 md:hidden"
              onClick={closeMobileMenu}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 40,
              }}
            ></div>

            <div className="fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-green-50 via-emerald-50 to-yellow-50 shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out">
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <Sun className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Helionix
                    </span>
                  </div>
                  <button onClick={closeMobileMenu} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <nav className="space-y-6">
                  <a
                    href="/#how-it-works"
                    onClick={closeMobileMenu}
                    className="block text-lg text-gray-700 hover:text-green-600 transition-colors py-3 px-4 rounded-lg hover:bg-green-100"
                  >
                    How it Works
                  </a>
                  <a
                    href="/#why-helionix"
                    onClick={closeMobileMenu}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full px-6 py-2 font-medium transition-all shadow-lg hover:shadow-xl cursor-pointer inline-block"
                  >
                    Why Us?
                  </a>
                </nav>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  )
}