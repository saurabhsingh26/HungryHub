/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import { useEffect, useState } from "react";

export default function useLocation() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const location = [latitude, longitude];

  useEffect(() => {
    getLocation();
  }, []);

  async function getWeather(latitude, longitude) {
    setLatitude(latitude);
    setLongitude(longitude);
  }

  const success = (position) => {
    getWeather(position.coords.latitude, position.coords.longitude);
  };

  const error = () => {
    getWeather();
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(success, error);
  };

  return location;
}
