import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
const VisCharts = ({ forecastData }) => {
  console.log(forecastData);
  const [chartData, setChartData] = useState([]);

  const prepareForecastData = () => {
    const groupedData = {};
    forecastData?.list?.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!groupedData[date]) {
        groupedData[date] = {
          temps: [],
          humidities: [],
        };
      }
      groupedData[date].temps.push(item.main.temp);
      groupedData[date].humidities.push(item.main.humidity);
    });

    const summarizedData = Object.keys(groupedData).map((date) => {
      const temps = groupedData[date].temps;
      const humidities = groupedData[date].humidities;

      return {
        date,
        avgTemp: (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(2), // Average temp
        maxTemp: Math.max(...temps).toFixed(2), // Maximum temp
        minTemp: Math.min(...temps).toFixed(2), // Minimum temp
        avgHumidity: (
          humidities.reduce((a, b) => a + b, 0) / humidities.length
        ).toFixed(2), // Average humidity
      };
    });
    console.log("--------------", summarizedData);
    setChartData(summarizedData);
    // const formattedData = forecastData?.list?.map(item => ({
    //     date: new Date(item.dt*1000).toLocaleString(),
    //     temp: item.main.temp,
    //     maxTemp: item.main.temp_max,
    //     minTemp: item.main.temp_min,
    //     humidity: item.main.humidity,
    //   }));
    //   setChartData(formattedData);
    //   console.log("====",formattedData);
  };
  useEffect(() => {
    prepareForecastData();
  }, [forecastData]);
  return (
    <div className="my-4">
      {chartData?.length > 0 && (
        <>
          <h2 className="text-center text-xl">5-Day Forecast</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <Line type="monotone" dataKey="avgTemp" stroke="#ff7300" />
              <Line
                type="monotone"
                dataKey="maxTemp"
                stroke="#ff0000"
                name="Max Temp"
              />
              <Line
                type="monotone"
                dataKey="minTemp"
                stroke="#0000ff"
                name="Min Temp"
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default VisCharts;
