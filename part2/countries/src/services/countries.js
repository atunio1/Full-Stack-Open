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

export default { getOne, getAll }