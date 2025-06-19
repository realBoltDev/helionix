import { Sun } from 'lucide-react'

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Helionix</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500 mt-2">© 2025 <a href='/' className='hover:text-green-600'>Helionix</a>. Powered by sunshine and green energy.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}