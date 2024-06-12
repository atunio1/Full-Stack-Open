import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getOne = country => {
    const request = axios.get(`${baseUrl}/name/${country}`)
    return request.then(response => response.data)

}

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data.map(country => country.name.common))
}

const getWeather = (latlng) => {
    const api_key = import.meta.env.VITE_SOME_KEY

    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}`)
    return request.then(response => response.data)
}

export default { getOne, getAll, getWeather }