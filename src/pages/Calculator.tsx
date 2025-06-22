"use client"

import { MapPin, Search, X, Calendar, DollarSign, Zap, Calculator, TrendingUp, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

import { searchLocation } from "../lib/location"
import { getSolarOutput } from "../lib/output"
import { directionToAzimuth } from "../utils/constants"
import type { Location, CalculationResults } from "../types"

export default function CalculatorPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locations, setLocations] = useState<Location[]>([])
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split("T")[0] // Store date in YYYY-MM-DD format
  })
  const [energyPrice, setEnergyPrice] = useState<number>(0.12)
  const [numberOfPanels, setNumberOfPanels] = useState<number>(1)
  const [panelWidth, setPanelWidth] = useState<number>(2000)
  const [panelHeight, setPanelHeight] = useState<number>(1000)
  const [efficiency, setEfficiency] = useState<number>(20)
  const [azimuth, setAzimuth] = useState<string>("0")
  const [selectedDirection, setSelectedDirection] = useState<string>("south")
  const [tiltAngle, setTiltAngle] = useState<number>(30)
  const [factorHeatDerating, setFactorHeatDerating] = useState<boolean>(false)
  const [factorSnow, setFactorSnow] = useState<boolean>(false)
  const [factorDust, setFactorDust] = useState<boolean>(false)

  // Calculation states
  const [isCalculating, setIsCalculating] = useState(false)
  const [results, setResults] = useState<CalculationResults | null>(null)

  // Handle search input change. Send API request after 500ms when user stops typing.
  useEffect(() => {
    const debounce = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true)

        const locations = await searchLocation(searchQuery)

        setLocations(locations)
        setIsSearching(false)
      } else {
        setLocations([])
      }
    }, 500)

    return () => clearTimeout(debounce)
  }, [searchQuery])

  // Select location and clear search
  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location)
    setSearchQuery("")
    setLocations([])
  }

  // Clear search only
  const clearSearchInput = () => {
    setSearchQuery("")
    setLocations([])
  }

  // Set azimuth value on direction select
  const handleDirectionChange = (direction: string) => {
    setSelectedDirection(direction)
    setAzimuth((directionToAzimuth[direction as keyof typeof directionToAzimuth]).toString()) // Get azimuth value of direction
  }

  const calculateSolarOutput = async () => {
    setIsCalculating(true)
    setResults(null)

    const output = await getSolarOutput(selectedLocation, selectedDate, energyPrice, numberOfPanels, panelWidth, panelHeight, efficiency, parseInt(azimuth), tiltAngle, factorHeatDerating, factorSnow, factorDust)

    setResults(output)
    setIsCalculating(false)
  }

  // Check whether the data entered is valid
  const isDataValid = () => {
    return (
      selectedDate &&
      energyPrice > 0 &&
      numberOfPanels >= 1 &&
      efficiency > 0 &&
      panelWidth > 0 &&
      panelHeight > 0 &&
      (parseInt(azimuth) >= -180 && parseInt(azimuth) <= 180)
    );
  };


  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Solar Calculator ⚡
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Calculate your solar energy & money saving potential based on your location and weather data
            </p>
          </div>

          {/* Location selection */}
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

              {isSearching && (
                <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
                </div>
              )}

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
                                {location.admin1}, {location.country} ({Math.abs(location.latitude)}°
                                {location.latitude >= 0 ? "N" : "S"} {Math.abs(location.longitude)}°
                                {location.longitude >= 0 ? "E" : "W"})
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
                    <p className="text-green-700">
                      <span className="font-medium">Timezone:</span> {selectedLocation.timezone}
                    </p>
                  </div>
                  <div>
                    <p className="text-green-700">
                      <span className="font-medium">Latitude:</span> {Math.abs(selectedLocation.latitude)}°
                      {selectedLocation.latitude >= 0 ? "N" : "S"}
                    </p>
                    <p className="text-green-700">
                      <span className="font-medium">Longitude:</span> {Math.abs(selectedLocation.longitude)}°
                      {selectedLocation.longitude >= 0 ? "E" : "W"}
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

          {/* Solar panel configuration */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Zap className="w-6 h-6 text-blue-600 mr-2" />
              Solar Panel Configuration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]} // 1 month ago
                  max={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]} // 14 days ahead
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                />

              </div>

              {/* Energy price in USD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                  Energy Price ($/kWh)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={energyPrice}
                  onChange={(e) => setEnergyPrice(Number.parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Enter energy price"
                />
              </div>

              {/* Number of panels */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Panels</label>
                <input
                  type="number"
                  min="1"
                  value={numberOfPanels}
                  onChange={(e) => setNumberOfPanels(Number.parseInt(e.target.value))}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Enter number of panels"
                />
              </div>

              {/* Panel efficiency. Default value 20% */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Panel Efficiency (%)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  step="0.1"
                  value={efficiency}
                  onChange={(e) => setEfficiency(Number.parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Enter panel efficiency"
                />
              </div>

              {/* Panel width */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Panel Width (mm)</label>
                <input
                  type="number"
                  min="100"
                  value={panelWidth}
                  onChange={(e) => setPanelWidth(Number.parseInt(e.target.value))}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Enter panel width"
                />
              </div>

              {/* Panel height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Panel Height (mm)</label>
                <input
                  type="number"
                  min="100"
                  value={panelHeight}
                  onChange={(e) => setPanelHeight(Number.parseInt(e.target.value))}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Enter panel height"
                />
              </div>

              {/* Direction selector */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Panel Direction</label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {Object.entries(directionToAzimuth).map(([direction, _]) => (
                    <button
                      key={direction}
                      onClick={() => handleDirectionChange(direction)}
                      className={`px-3 py-2 rounded-lg border-2 transition-all capitalize ${selectedDirection === direction
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      {direction}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Azimuth Angle (-180° to +180°)</label>
                  <input
                    type="number"
                    min="-180"
                    max="180"
                    value={azimuth}
                    onChange={(e) => {
                      const value = e.target.value;
                      setAzimuth(value);

                      const parsed = parseInt(value);
                      if (!isNaN(parsed)) {
                        const match = Object.entries(directionToAzimuth).find(
                          ([_, az]) => az === parsed
                        );
                        setSelectedDirection(match ? match[0] : "");
                      } else {
                        setSelectedDirection("");
                      }
                    }}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Enter azimuth angle"
                  />


                </div>
              </div>

              {/* Panel tilt angle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tilt Angle (0-90°)</label>
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={tiltAngle}
                  onChange={(e) => setTiltAngle(Number.parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center mt-1 text-sm text-gray-600">{tiltAngle}°</div>
              </div>

              {/* Checkboxes for environmental factors */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Environmental Factors</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={factorHeatDerating}
                      onChange={(e) => setFactorHeatDerating(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Heat Derating</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={factorSnow}
                      onChange={(e) => setFactorSnow(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Snow Coverage</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={factorDust}
                      onChange={(e) => setFactorDust(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Dust Accumulation</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={calculateSolarOutput}
                disabled={!isDataValid() || !selectedLocation || isCalculating}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center mx-auto disabled:cursor-not-allowed"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate
                  </>
                )}
              </button>
              {!selectedLocation && <p className="mt-2 text-sm text-gray-500">Please select a location first</p>}
              {!isDataValid() && <p className="mt-2 text-sm text-gray-500">Please enter valid data in all inputs</p>}
            </div>
          </div>

          {/* Display calculation result */}
          {results && (
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-green-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
                Your Solar Results
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Daily Energy Generated</h3>
                    <Zap className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">{results.energyGenerated} kWh</div>
                  <p className="text-sm text-gray-600">
                    Based on your {numberOfPanels} panel(s) configuration
                  </p>
                  <div className="mt-4 bg-green-100 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      <span className="font-medium">Monthly:</span> ~{(results.energyGenerated * 30).toFixed(1)} kWh
                    </p>
                    <p className="text-sm text-green-800">
                      <span className="font-medium">Yearly:</span> ~{(results.energyGenerated * 365).toFixed(1)} kWh
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Daily Money Saved</h3>
                    <DollarSign className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">${results.moneySaved}</div>
                  <p className="text-sm text-gray-600">At ${energyPrice}/kWh energy rate</p>
                  <div className="mt-4 bg-blue-100 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Monthly:</span> ~${(results.moneySaved * 30).toFixed(2)}
                    </p>
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Yearly:</span> ~${(results.moneySaved * 365).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Show some additional info */}
              <div className="mt-6 bg-white rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">Calculation Details</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Total Panel Area:</span>
                    <div className="font-medium">
                      {((panelWidth * panelHeight * numberOfPanels) / 1000000).toFixed(2)} m²
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Efficiency:</span>
                    <div className="font-medium">{efficiency}%</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Tilt/Azimuth:</span>
                    <div className="font-medium">
                      {tiltAngle}° / {azimuth}°
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <div className="font-medium">{selectedLocation?.name}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
