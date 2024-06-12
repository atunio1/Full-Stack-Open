const Country = (countryObj) => {

    return (
        <div>
        <h3>{countryObj.name}</h3>
        capital {countryObj.capital} <br />
        area {countryObj.area} 
        <h4>languages:</h4>
        <ul>
            {Object.values(countryObj.languages).map((language) => <li key={language}>{language}</li>)}
        </ul>
        <img src={countryObj.flag} alt={countryObj.name} />
        <h2>Weather in {countryObj.name}</h2>
        temperature {countryObj.temp} <br />
        <img src={`https://openweathermap.org/img/wn/${countryObj.icon}@2x.png`} /> <br />
        wind {countryObj.wind}
        </div>
    )
}

const MultiCountries = ({ resultsToShow, handleShow }) => {
    return (
        <div>
            {resultsToShow.map((eachCountry) => <li key={eachCountry}>{eachCountry} <button onClick={() => handleShow(eachCountry)}>show</button></li>)}
        </div>
    )
}

const Countries = ({ resultsToShow, countryObj, handleShow }) => {
    if (resultsToShow.length === 0) {
        return null;
    }

    return (
        <div>
            {resultsToShow.length > 10 ? 
            'Too many results'
            : resultsToShow.length === 1 && countryObj ? 
            <Country {...countryObj} />
            : 
            <MultiCountries
                resultsToShow={resultsToShow}
                handleShow={handleShow} 
            />
            }
        </div>
    )
}

export default Countries