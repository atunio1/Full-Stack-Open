import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Search from './components/Search'
import Countries from './components/Countries'


const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [countryObj, setCountryObj] = useState(null) // single country object
  const [countryObjUpdated, setUpdatedCountryObj] = useState(null) // single country object with weather data
  const [resultsToShow, setResultsToShow] = useState([])

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const handleShow = (countryName) => {
    setResultsToShow([countryName])
  }

  /* Updating all countries list (only done once) */
  useEffect(() => {
    countryService.getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
  }, [])

  /* Updating results to show from search */
  useEffect(() => {
    setResultsToShow(
      countries.filter(
        (eachCountry) =>
          eachCountry.toLowerCase().slice(0, newSearch.length) === newSearch.toLowerCase()
      )
    )
  }, [newSearch])

  /* Updating the country object to show if only 1 country matches the search or a country's show button is clicked */
  useEffect(() => {
    setCountryObj(null)
    if (resultsToShow.length === 1) {
      countryService.getOne(resultsToShow[0]).then(countryData => {
        const newCountryObj = {
          name: countryData.name.common,
          capital: countryData.capital,
          area: countryData.area,
          flag: countryData.flags.png,
          languages: countryData.languages,
          latlng: countryData.latlng,
        }
        setCountryObj(newCountryObj)
      })
    }
  }, [resultsToShow.length])

  /* Getting country weather data */
  useEffect(() => {
    if (countryObj) {
      countryService.getWeather(countryObj.latlng).then(weatherData => {
        const updatedCountryObj = {...countryObj,
          temp: weatherData.main.temp,
          icon: weatherData.weather[0].icon,
          wind: weatherData.wind.speed,
        }
        setUpdatedCountryObj(updatedCountryObj)
      })
    }
  }, [countryObj])

  return (
    <div>
      <Search newSearch={newSearch} handleSearch={handleSearch} />
      <Countries resultsToShow={resultsToShow} countryObj={countryObjUpdated} handleShow={handleShow} /> 
    </div>
    
  )
}

export default App