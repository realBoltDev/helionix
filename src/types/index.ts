export interface Location {
  id: number
  name: string
  country_code: string
  country: string
  timezone: string
  admin1: string
  latitude: number
  longitude: number
}

export interface CalculationResults {
  energyGenerated: number // kWh
  moneySaved: number // USD
}