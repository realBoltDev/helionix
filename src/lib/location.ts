import axios from "axios"

export async function searchLocation(query: string) {
  try {
    const response = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
      params: {
        name: query,
        count: 5,
        language: "en",
        format: "json",
      },
    })

    return response.data.results || []
  } catch (error) {
    return []
  }
}