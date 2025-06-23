# Helionix — Solar Energy & Savings Calculator

This is a tool that helps you **predict your solar panel energy generation** and **calculate money saved** — based on **real weather forecast data**.

![image](https://github.com/user-attachments/assets/5dc35e1b-923b-4731-814c-b8eea0249a67)

---

## Features

- **Smart Panel Setup**  
Enter your solar panel configuration — **panel size**, **tilt angle**, and **direction**.

- **Real-Time Weather**  
Helionix uses **live weather forecasts** (cloud cover, sunlight intensity, etc.) to calculate how much sunlight your panels will actually receive today.

- **Multiple Factors**
  - Solar irradiance
  - Panel efficiency
  - Heat derating
  - Snow
  - Dust

---

## Configurations Explained

1. **Location**:  
   Search for your city and select it. I didn't implement a way to provide precise coordinates.

2. **Energy & Price**:  
   Energy is calculated in kilowatt-hour (kWh) and prices are in USD.

3. **Panel Efficiency**:  
   It is the rate (in %) at which the panels convert sunlight into electricity. Most panels have an average efficiency of 20%.

4. **Azimuth Angle**:  
   It refers to its horizontal orientation, or the direction it faces, measured clockwise from north. It's a crucial factor in determining how much sunlight a solar panel receives and its energy output. You have     to enter angle in range -180° to +180°.

5. **Environmental Factors**:  
   - **Heat Derating**  
     It refers to the reduction in a solar panel's power output as its temperature increases. Ideal operating temperature of a solar panel is generally 25°C.
   - **Snow Coverage**  
     If it snows in your city, it calculates the energy loss using linear interpolation method.
   - **Dust**  
     Its quite tricky to find out how much dust could accumulate on the panel and the loss so it just assumes a 5% loss.
---

## Tech Stack
- React + Vite
- Open-Meteo API (for geocoding & weather forecasts)
- TailwindCSS (UI styling)

---

## How was AI used in the project?
AI was used to design some of the UI components of the website. (Ex: The hero section on the landing page, especially the solar panel, sun & battery illustration.)
