import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [dis, setDis] = useState(false);
  const [ans, setAns] = useState({ country: "", state: "", city: "" });
  const [disabledState, setDisabledState] = useState(true);
  const [disabledCity, setDisabledCity] = useState(true);

  useEffect(() => {
    try {
      let run = async () => {
        let response = await axios.get(
          "https://crio-location-selector.onrender.com/countries"
        );
        setCountries(response.data);
      };
      run();
    } catch (e) {
      alert(e);
    }
  }, []);

  useEffect(() => {
    try {
      let run = async () => {
        let response = await axios.get(
          `https://crio-location-selector.onrender.com/country=${ans.country}/states`
        );
        setStates(response.data);
        if (ans.country.length) run();
      };
    } catch (e) {
      alert(e);
    }
  }, [ans.country]);

  useEffect(() => {
    try {
      let run = async () => {
        let response = await axios.get(
          ` https://crio-location-selector.onrender.com/country=${ans.country}/state=${ans.state}/cities`
        );
        setCities(response.data);
        if (ans.state.length) run();
      };
    } catch (e) {
      alert(e);
    }
  }, [ans.state]);

  useEffect(() => {
    if (ans.city.length) display(true);
  }, [ans.city]);

  let display = (val) => setDis(val);

  let handleChange = (e) => {
    setAns((prevans) => ({ ...prevans, [e.target.name]: e.target.value }));
    if (e.target.name === "country") {
      setDisabledState(false);
      setDisabledCity(true);
      display(false);
    }
    if (e.target.name === "state") {
      setDisabledCity(false);
      display(false);
    }
  };

  return (
    <>
      <h1>Select Location</h1>
      <form>
        <select onChange={handleChange} name="country">
          <option value="" selected disabled>
            Select Country
          </option>
          {countries.map((val) => {
            return <option value={val}>{val}</option>;
          })}
        </select>
        <select onChange={handleChange} name="state" disabled={disabledState}>
          <option value="" selected disabled>
            Select State
          </option>
          {states.map((val) => {
            return <option value={val}>{val}</option>;
          })}
        </select>
        <select onChange={handleChange} name="city" disabled={disabledCity}>
          <option value="" selected disabled>
            Select City
          </option>
          {cities.map((val) => {
            return <option value={val}>{val}</option>;
          })}
        </select>
      </form>
      {dis && (
        <h1>
          You selected {ans.city}, {ans.state}, {ans.country}
        </h1>
      )}
    </>
  );
}

export default App;