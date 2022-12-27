import React from "react";
import { useEffect, useState } from "react";
import { getTemperatureToday } from "../../services/RequestApi";
import styles from "./WeatherWidget.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";

const WeatherWidget = () => {
  const [temperatureNow, setTemperatureNow] = useState(1);

  useEffect(() => {
    getTemperatureToday().then((data) =>
      setTemperatureNow(data.current_weather.temperature)
    );
  }, []);

  return (
    <div>
      <Card className={styles.card}>
        <CardActionArea>
          <CardContent><h1>{`${Math.round(temperatureNow)}`}&#8451;</h1></CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default WeatherWidget;
