/*
--- Units ---
Irradiance: W/m²
Temperature: °C
Energy: kWh
Snow Depth: m
Area: m²
-------------
*/

import axios from "axios"
import type { Location } from "../types"

function calculateSnowLoss(depth: number) {
  const depthCm = depth * 100; // convert meters to centimeters

  if (depthCm >= 6) return 0.99; // 99% loss
  if (depthCm >= 5) return 0.93; // 93% loss

  if (depthCm >= 1) {
    const lossAt1cm = 0.93;
    const lossAt5cm = 0.39;
    const slope = (lossAt5cm - lossAt1cm) / (5 - 1);
    return lossAt1cm + slope * (depthCm - 1);
  }

  return 0; // no snow loss for <1 cm
}

function calculateHourlyEnergy(
  irradiance: number,
  temperature: number,
  snowDepth: number,
  area: number,
  efficiency: number,
  factorHeatDerating: boolean,
  factorSnow: boolean,
  factorDust: boolean
) {
  let energy = (irradiance * area * efficiency) / 1000; // Convert to kWh

  if (factorHeatDerating) {
    const tempLoss = Math.max(0, (temperature - 25) * 0.004);
    energy *= (1 - tempLoss);
  }

  if (factorSnow) {
    const snowLoss = calculateSnowLoss(snowDepth);
    energy *= (1 - snowLoss);
  }

  if (factorDust) {
    const dustLoss = 0.05; // Assuming 5% loss
    energy *= (1 - dustLoss);
  }

  return energy;
}

export async function getSolarOutput(
  selectedLocation: Location | null,
  selectedDate: string,
  energyPrice: number,
  numberOfPanels: number,
  panelWidth: number,
  panelHeight: number,
  efficiency: number,
  azimuth: number,
  tiltAngle: number,
  factorHeatDerating: boolean,
  factorSnow: boolean,
  factorDust: boolean
) {
  if (!selectedLocation) {
    throw new Error("Location is required");
  }

  // Send API request to Open-Meteo
  const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      hourly: "global_tilted_irradiance,temperature_2m,snow_depth",
      solar: 1,
      tilt: tiltAngle,
      azimuth: azimuth,
      timezone: "auto",
      start_date: selectedDate,
      end_date: selectedDate
    }
  })

  const data = response.data

  const panelArea = (panelWidth * panelHeight) / 1000000; // Convert mm² to m²
  const totalArea = panelArea * numberOfPanels;

  let totalEnergy = 0;
  const totalHours = data.hourly.time.length;

  for (let hour = 0; hour < totalHours; hour++) {
    totalEnergy += calculateHourlyEnergy(
      data.hourly.global_tilted_irradiance[hour],
      data.hourly.temperature_2m[hour],
      data.hourly.snow_depth[hour],
      totalArea,
      efficiency / 100,
      factorHeatDerating,
      factorSnow,
      factorDust
    )
  }

  const totalCost = totalEnergy * energyPrice;

  const output = {
    energyGenerated: Math.round(totalEnergy * 100) / 100,
    moneySaved: Math.round(totalCost * 100) / 100,
  }

  return output
}