import { Routes, Route } from "react-router-dom"
import Base from './components/Base'
import Home from './pages/Home'
import Calculator from './pages/Calculator'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Base />}>
        <Route index element={<Home />} />
        <Route path="calculator" element={<Calculator />} />
      </Route>
    </Routes>
  )
}