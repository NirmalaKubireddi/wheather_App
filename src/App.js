import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container } from "@mui/material";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(
    "https://th.bing.com/th/id/OIP.zr96pCfshT2zMNl6nh7jZwHaEo?w=258&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
  );

  const API_KEY = "5a0fe3857b5e42d8b7e150219232110";
  const API_URL = `https://api.weatherapi.com/v1/current.json`;

  const getWeatherData = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          key: API_KEY,
          q: city,
        },
      });
      setWeatherData(response.data);

      const temp_c = response.data.current.temp_c;
      if (temp_c > 30) {
        setBackgroundImage("https://cdn.pixabay.com/photo/2017/06/23/17/46/desert-2435404_1280.jpg");
      } else if (temp_c < 0) {
        setBackgroundImage("https://cdn.pixabay.com/photo/2016/04/20/19/47/wolves-1341881_640.jpg");
      } else if (temp_c < 20) {
        setBackgroundImage("https://cdn.pixabay.com/photo/2016/05/05/02/35/sky-1373167_640.jpg");
      } else {
        setBackgroundImage("https://media.istockphoto.com/id/162428248/photo/cloudscape.webp?b=1&s=612x612&w=0&k=20&c=-3Do2vIEXPme-kRK_qe3GmnlyPtCE1y6d2zNunKpSiY=");
      }
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Container maxWidth="sm" style={{ textAlign: "center" }}>
        <Typography variant="h2" gutterBottom>
          Weather App
        </Typography>
        <TextField
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleInputChange}
          style={{backgroundColor:"white"}}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button variant="contained" onClick={getWeatherData}>
          Get Weather
        </Button>

        {weatherData && (
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h3" gutterBottom>
              Weather in {weatherData.location.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Temperature: {weatherData.current.temp_c} °C
            </Typography>
            <Typography variant="body1" gutterBottom>
              Condition: {weatherData.current.condition.text}
            </Typography>
          </div>
        )}
      </Container>
    </div>
  );
};

export default App;