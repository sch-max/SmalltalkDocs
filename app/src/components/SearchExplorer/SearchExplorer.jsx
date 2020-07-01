import React, { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import ClassResultItem from './ClassResultItem';
import MethodResultItem from './MethodResultItem';
import { searchForClasses, searchForMethods } from '../../utils/apiHandler';
import './SearchExplorer.css';

const SearchExplorer = () => {
  const [currentSearchText, setCurrentSearchText] = useState('');
  const [shouldSearchClasses, setShouldSearchClass] = useState(true);
  const [shouldSearchMethods, setShouldSearchMethod] = useState(true);

  const [loadingSearchResults, setLoadingSearchResults] = useState(false);
  const [fetchedClasses, setFetchedClasses] = useState([]);
  const [fetchedMethods, setFetchedMethods] = useState([]);
  const [searchErrorMsg, setSearchErrorMsg] = useState('');

  const fetchResults = async event => {
    event.preventDefault();
    setFetchedClasses([]);
    setFetchedMethods([]);
    if (currentSearchText.length <= 0) {
      setSearchErrorMsg('Nothing found due to empty search string!');
      return;
    }
    setSearchErrorMsg('');

    setLoadingSearchResults(true);
    setFetchedClasses((await searchForClasses(currentSearchText)).sort());
    setFetchedMethods((await searchForMethods(currentSearchText)).sort());
    setLoadingSearchResults(false);
  };

  return (
    <div className="explorer">
      <form onSubmit={event => fetchResults(event)}>
        <input
          className="searchBox"
          type="text"
          id="searchInput"
          onChange={event => setCurrentSearchText(event.target.value)}
          placeholder="Search term with % as wildcard"
          size="30"
          value={currentSearchText}
        />
        <label htmlFor="classSearchCheck" className="check">
          <input
            id="classSearchCheck"
            name="classSearch"
            type="checkbox"
            checked={shouldSearchClasses}
            onChange={() => setShouldSearchClass(!shouldSearchClasses)}
          />
          Search for classes
        </label>
        <label htmlFor="methodSearchCheck" className="check">
          <input
            id="methodSearchCheck"
            name="methodSearch"
            type="checkbox"
            checked={shouldSearchMethods}
            onChange={() => setShouldSearchMethod(!shouldSearchMethods)}
          />
          Search for methods
        </label>
        <input className="submitbutton" id="searchSubmit" type="submit" value="Search" />
      </form>
      <div className="results">
        {loadingSearchResults ? <CircularProgress /> : null}
        <ul>
          {searchErrorMsg.length > 0 ? <li>{searchErrorMsg}</li> : null}
          {fetchedClasses.map(aClass => (
            <ClassResultItem aClass={aClass} />
          ))}
          {fetchedMethods.map(aMethod => (
            <MethodResultItem aMethod={aMethod} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchExplorer;
