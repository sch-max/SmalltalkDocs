import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './SearchExplorer.css';

const ClassResultItem = props => {
  const { aClass } = props;
  const history = useHistory;
  return (
    <li key={aClass} className="searchList">
      <button
        className="searchButton"
        type="button"
        onClick={() => history.push(`/doku/classes/${aClass}`)}
      >
        {aClass}
      </button>
    </li>
  );
};

ClassResultItem.propTypes = {
  aClass: PropTypes.string.isRequired
};

export default ClassResultItem;
