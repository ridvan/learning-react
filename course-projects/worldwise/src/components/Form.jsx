import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const GEO_BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [mapLatitude, mapLongitude] = useUrlPosition();
  const { addCity, isLoading } = useCities();

  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const [isLoadingGeo, setIsLoadingGeo] = useState(false);

  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  useEffect(
    function () {
      if (!mapLatitude && !mapLongitude) return;
      async function getCityData() {
        try {
          setIsLoadingGeo(true);
          setGeocodingError("");
          const request = await fetch(
            `${GEO_BASE_URL}?latitude=${mapLatitude}&longitude=${mapLongitude}`
          );
          const cityData = await request.json();
          console.log(cityData);

          if (!cityData.countryCode) {
            throw new Error(
              "Cannot find the country data for that location 😔"
            );
          }

          setCityName(cityData.city || cityData.locality || "");
          setCountry(cityData.countryName);
          setEmoji(convertToEmoji(cityData.countryCode));
        } catch (error) {
          setGeocodingError(error.message);
        } finally {
          setIsLoadingGeo(false);
        }
      }
      getCityData();
    },
    [mapLatitude, mapLongitude]
  );

  async function handleFormSubmit(event) {
    event.preventDefault();

    if (!date || !cityName) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat: mapLatitude,
        lng: mapLongitude,
      },
    };
    await addCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeo) {
    return <Spinner />;
  }

  if (!mapLatitude && !mapLongitude) {
    return <Message message="Please select a location on the map first" />;
  }

  if (geocodingError) {
    return <Message message={geocodingError} />;
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleFormSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
