import { Leaf, Calculator, ArrowRight, Battery, CloudSun, Computer, Settings } from "lucide-react"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 text-left">
              <div className="inline-flex items-center bg-green-100 text-green-800 border border-green-200 rounded-full px-4 py-2 mb-6">
                <Leaf className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Clean Energy Made Simple</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-yellow-500 bg-clip-text text-transparent leading-tight">
                Track Your Solar
                <br />
                <span className="text-3xl md:text-5xl">Energy & Savings! ☀️</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Enter your solar panel setup, and we'll calculate exactly how much clean energy you'll generate based on
                real weather forecasts! 🌱💚
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="/calculator" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Try Calculator
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-green-200 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-50 rounded-3xl overflow-hidden">
                  <div className="absolute top-4 right-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                      <div className="absolute w-16 h-16">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-4 bg-yellow-300"
                            style={{
                              left: "50%",
                              top: "50%",
                              transformOrigin: "0 0",
                              transform: `rotate(${i * 45}deg) translateY(-12px)`,
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-6 left-8 w-16 h-6 bg-white rounded-full opacity-80"></div>
                  <div className="absolute top-8 left-12 w-10 h-6 bg-white rounded-full opacity-80"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-200 to-green-100 rounded-b-3xl"></div>

                <div className="relative pt-12 pb-8 flex justify-center">
                  <div className="relative">
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-32 bg-gray-700 rounded-md"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-28 w-16 h-4 bg-gray-800 rounded-md rotate-45"></div>
                    <div className="w-64 h-40 bg-gray-800 rounded-md transform -rotate-12 border-4 border-gray-700 relative z-10">
                      <div className="absolute inset-1 grid grid-cols-4 grid-rows-3 gap-1">
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className="bg-blue-900 rounded-sm relative overflow-hidden">
                            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-px">
                              {[...Array(9)].map((_, j) => (
                                <div key={j} className="bg-blue-800"></div>
                              ))}
                            </div>
                            <div className="absolute top-0 left-0 w-2 h-2 bg-white opacity-20 rounded-sm"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-12 right-12 flex flex-col items-center">
                    <div className="w-20 h-32 bg-gray-200 rounded-md border-2 border-gray-300 relative mb-2">
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-gray-500 rounded-t-sm"></div>

                      <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-green-500 to-green-400 rounded-b-sm">
                        <div className="absolute inset-x-0 top-1/4 h-px bg-white opacity-30"></div>
                        <div className="absolute inset-x-0 top-2/4 h-px bg-white opacity-30"></div>
                        <div className="absolute inset-x-0 top-3/4 h-px bg-white opacity-30"></div>
                      </div>

                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-gray-600">
                        <Battery className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Helionix Section */}
      <section id="why-helionix" className="container mx-auto px-8 py-16">
        <div className="text-center mb-12 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent leading-snug">
            Why Helionix? 🌱
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make solar calculations with accuracy & take many factors into account.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="border-2 border-green-200 hover:border-green-300 transition-all hover:shadow-lg rounded-2xl overflow-hidden bg-white">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Computer className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-center text-xl font-bold text-gray-800">Smart Panel Setup</h3>
            </div>
            <div className="p-6 pt-6">
              <p className="text-center text-gray-600 text-base leading-relaxed">
                Just tell us about your solar panels - size, angle, direction. We do the rest! 📐
              </p>
            </div>
          </div>

          <div className="border-2 border-blue-200 hover:border-blue-300 transition-all hover:shadow-lg rounded-2xl overflow-hidden bg-white">
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-6 pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <CloudSun className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-center text-xl font-bold text-gray-800">Real Weather Data</h3>
            </div>
            <div className="p-6 pt-6">
              <p className="text-center text-gray-600 text-base leading-relaxed">
                We use live weather forecasts to predict exactly how much sun your panels will catch today. ⛅
              </p>
            </div>
          </div>

          <div className="border-2 border-emerald-200 hover:border-emerald-300 transition-all hover:shadow-lg rounded-2xl overflow-hidden bg-white">
            <div className="bg-gradient-to-br from-emerald-100 to-green-100 p-6 pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-center text-xl font-bold text-gray-800">Multiple Factors</h3>
            </div>
            <div className="p-6 pt-6">
              <p className="text-center text-gray-600 text-base leading-relaxed">
                Solar irradiance, heat derating, panel direction, tilt angle etc. We've got it all covered! ⚙️
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-white py-16">
        <div className="container mx-auto px-8">
          <div className="text-center mb-12 max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              How Helionix Works ⚡
            </h2>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Configure Your Setup</h3>
                <p className="text-gray-600 leading-relaxed">
                  Tell us about your solar panels - how many, what size, tilt angle, which way they face. 🔧
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">We Check the Weather</h3>
                <p className="text-gray-600 leading-relaxed">
                  We grab the latest weather forecast for your location. Sun, clouds, rain, snow - we factor it all
                  in! 🌦️
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">See Your Green Impact</h3>
                <p className="text-gray-600 leading-relaxed">
                  Boom! Instant calculations showing your clean energy generation and money savings! ⚡🌱
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-green-500 via-emerald-600 to-green-600 py-16">
        <div className="container mx-auto px-8 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Go Green with Solar? 🌱</h2>
            <p className="text-xl mb-8 opacity-90">
              Use Helionix to track your clean energy generation!
            </p>
            <button 
              onClick={() => window.location.href = '/calculator'} 
              className="bg-white text-green-600 hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center mx-auto">
              <Calculator className="w-5 h-5 mr-2" />
              Start Calculating Now
              <Leaf className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}