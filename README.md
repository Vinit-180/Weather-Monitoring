# Weather Monitoring System

## Objective
Develop a real-time data processing system to monitor weather conditions and provide summarized insights using rollups and aggregates. The system utilizes data from the [OpenWeatherMap API](https://openweathermap.org/).

## Data Source
The system continuously retrieves weather data from the OpenWeatherMap API. Actually You will need to sign up for a free API key to access the data. The API provides various weather parameters, and for this project, I focus on:
- **main**: Main weather condition (e.g., Rain, Snow, Clear)
- **temp**: Current temperature in Centigrade
- **feels_like**: Perceived temperature in Centigrade
- **dt**: Time of the data update (Unix timestamp)

## Processing and Analysis
- The system continuously calls the OpenWeatherMap API at a configurable interval (e.g., every 5 minutes) to retrieve real-time weather data for major metros in India
- For each received weather update:
  - Convert temperature values from Kelvin to Celsius (based on user preference).

## Rollups and Aggregates
1. **Daily Weather Summary**:
   - Roll up the weather data for each day.
   - Calculate daily aggregates for:
     - Average temperature
     - Maximum temperature
     - Minimum temperature
     - Dominant weather condition (based on frequency of occurrence).

2. **Alerting Thresholds**:
   - Define user-configurable thresholds for temperature or specific weather conditions (e.g., alert if temperature exceeds 35 degrees Celsius).
   - Continuously track the latest weather data and compare it with the thresholds.
   - If a threshold is breached, trigger an alert for the current weather conditions. Alerts could be displayed using Toaster.

3. **Implement Visualizations**:
   - Display daily weather summaries, historical trends using **recharts**.


## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd Weather-Monitoring
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the application:
   ```bash
   npm start
   ```


## Deployed Website
`https://weather-monitoring-dashboard.web.app/`