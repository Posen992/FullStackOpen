import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [countries, setCountries] = useState(null)
  const [searchWord,setSearchWord] = useState('')
  const [matchedCountries, setMatchedCountries] = useState([])
  const [weather, setWeather] = useState(null)

  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(()=>{
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    axios.get(baseUrl)
    .then(response =>
      setCountries(response.data)
    )
  },[])

  if(!countries) return;

  const getWeatherInfo = (country) =>{
    const api_key = import.meta.env.VITE_SOME_KEY
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}&units=metric`
    
    axios.get(url).then(response => {
      setWeather(response.data)
    })
  }
  
  const handleSearchWordChange = (event) =>{
    setSearchWord(event.target.value)
    searchCountries(event.target.value)
  }

  const searchCountries = (name) => {
    const searchResults = countries.filter(item => item.name.common.toLowerCase().includes(name.toLowerCase()))
    setMatchedCountries(searchResults)
   
    if (searchResults.length === 1)
    {
      getWeatherInfo(searchResults[0])
    }
    else
    {
      setWeather(null)
    }
  }

  const onShowCountryInfo = (country) => {
    setMatchedCountries([].concat(country))
  }

  return (
    <div>
      <form >
      find countries <input value={searchWord} onChange={handleSearchWordChange}></input> 
      </form>
      <Countries matchedCountries={matchedCountries} onShowCountryInfo={onShowCountryInfo}/>   
      <Weather matchedCountries={matchedCountries} weather={weather} />
    </div>
  )
}

const Weather = ({matchedCountries, weather}) => {
  if(!weather||!matchedCountries){
    return null
  }else if(matchedCountries.length===1){
    const iconUrl = `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`
    return (
      <>
        <h1>Weather in {matchedCountries[0].capital}</h1>
        <p>temperature {weather.current.temp} Celcius</p>
        <img src={iconUrl}></img>
        <p>wind  {weather.current.wind_speed} m/s</p>
      </>
    )
  }
}

const Countries = ({matchedCountries, onShowCountryInfo}) => {
  if (matchedCountries.length > 10 )
  {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (matchedCountries.length === 1){
    return (
      <CountryInfo country={matchedCountries[0]}/>
    )
  }
  else{
    return (
      <>
        {matchedCountries.map(country => 
          <Part key={country.ccn3} name={country.name.common} onShowCountryInfo={()=>onShowCountryInfo(country)}/>
        )}
      </>
    )
  }
}

const CountryInfo = ({country}) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <Languages languages={country.languages}/>
      <img src={country.flags.png}></img>

      
    </>
  )
}

const Languages = ({languages}) => {

  return (
    <>
      <h4>languages:</h4>
      <ul>
        {Object.entries(languages).map(language => 
          <li key={language[0]}>{language[1]}</li>
        )}
      </ul>
    </>
  )
}

const Part = ({name,onShowCountryInfo}) => {
  return (
    <>
      <p>{name}<button onClick={onShowCountryInfo}>show</button></p>
    </>
  )
}
 
export default App
