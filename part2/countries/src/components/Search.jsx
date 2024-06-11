const Search = ({ newSearch, handleSearch }) => {
    return (
        <div>
        find countries: <input name={'search'}
          value={newSearch}
          onChange={handleSearch}
          />
      </div>
    )
}

export default Search

