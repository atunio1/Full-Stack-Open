const Country = ({ name, capital, area, flag, languages }) => {
    return (
        <div>
        <h3>{name}</h3>
        capital {capital} <br />
        area {area} 
        <h4>languages:</h4>
        <ul>
            {Object.values(languages).map((language) => <li key={language}>{language}</li>)}
        </ul>
        <img src={flag} alt={name} />
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
            <Country
                name={countryObj.name}
                capital={countryObj.capital}
                area={countryObj.area}
                flag={countryObj.flag}
                languages={countryObj.languages}
            />
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