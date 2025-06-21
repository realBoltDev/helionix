"use client"

import { MapPin, Search, X } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"

interface Location {
  id: number
  name: string
  country_code: string
  country: string
  admin1: string
  latitude: number
  longitude: number
}

export default function CalculatorPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locations, setLocations] = useState<Location[]>([])
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const searchLocation = async (query: string) => {
    setIsSearching(true)

    try {
      const response = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
        params: {
          name: query,
          count: 5,
          language: "en",
          format: "json",
        },
      })

      setLocations(response.data.results || [])
    } catch (error) {
      setLocations([])
    }

    setIsSearching(false)
  }

  // Handle search input change. Send API request after 500ms when user stops typing.
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchQuery.length >= 2) {
        searchLocation(searchQuery)
      } else {
        setLocations([])
      }
    }, 500)

    return () => clearTimeout(debounce)
  }, [searchQuery])


  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location)
    setSearchQuery("")
    setLocations([])
  }

  // Clear search input only
  const clearSearchInput = () => {
    setSearchQuery("")
    setLocations([])
  }

  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Solar Calculator ⚡
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Calculate your solar energy potential based on your location and weather data
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-green-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <MapPin className="w-6 h-6 text-green-600 mr-2" />
              Select Your Location
            </h2>

            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for your city or country..."
                  className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none text-gray-700 text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearchInput}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Show loading indicator while sending API request*/}
              {isSearching && (
                <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
                </div>
              )}

              {/* Location search suggestions list */}
              {locations.length > 0 && searchQuery.length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  <ul className="py-2">
                    {locations.map((location) => (
                      <li key={location.id}>
                        <button
                          onClick={() => handleLocationSelect(location)}
                          className="w-full text-left px-4 py-3 hover:bg-green-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-center">
                            <img
                              src={`https://flagcdn.com/w40/${location.country_code.toLowerCase()}.png`}
                              alt={`${location.country} flag`}
                              className="w-5 h-4 mr-3 flex-shrink-0 rounded-sm object-cover"
                            />
                            <div>
                              <div className="font-medium text-gray-800">{location.name}</div>
                              <div className="text-sm text-gray-500">
                                {location.admin1}, {location.country} ({Math.abs(location.latitude)}°{location.latitude >= 0 ? 'N' : 'S'} {Math.abs(location.longitude)}°{location.longitude >= 0 ? 'E' : 'W'})
                              </div>
                            </div>
                          </div>

                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Display data of selected location */}
            {selectedLocation && (
              <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Selected Location
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-green-700">
                      <span className="font-medium">Location:</span> {selectedLocation.name}
                    </p>
                    <p className="text-green-700">
                      <span className="font-medium">Country:</span> {selectedLocation.country}
                    </p>
                  </div>
                  <div>
                    <p className="text-green-700">
                      <span className="font-medium">Latitude:</span> {Math.abs(selectedLocation.latitude)}°{selectedLocation.latitude >= 0 ? 'N' : 'S'}
                    </p>
                    <p className="text-green-700">
                      <span className="font-medium">Longitude:</span> {Math.abs(selectedLocation.longitude)}°{selectedLocation.longitude >= 0 ? 'E' : 'W'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            
            {searchQuery.length > 0 && searchQuery.length < 2 && (
              <p className="mt-2 text-sm text-gray-500">Type at least 2 characters to search for locations</p>
            )}

            {searchQuery.length >= 2 && locations.length === 0 && !isSearching && !selectedLocation && (
              <p className="mt-2 text-sm text-gray-500">No locations found. Try a different search term.</p>
            )}
          </div>

          
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Solar Panel Configuration</h2>
            <p className="text-gray-600">More calculator features will be added here...</p>
          </div>
        </div>
      </section>
    </>
  )
}
