import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './SearchExplorer.css';

const MethodResultItem = props => {
  const { method: aMethod } = props;
  const history = useHistory();
  return (
    <li key={`${aMethod.className}-${aMethod.side}-${aMethod.methodName}`} className="searchList">
      <button
        className="searchButton"
        type="button"
        onClick={() =>
          history.push(
            `/doku/classes/${aMethod.className}/methods/${aMethod.side}/${aMethod.methodName}`
          )
        }
      >{`${aMethod.className} ${aMethod.methodName}`}</button>
    </li>
  );
};

MethodResultItem.propTypes = {
  method: PropTypes.shape({
    className: PropTypes.string.isRequired,
    side: PropTypes.string.isRequired,
    methodName: PropTypes.string.isRequired
  }).isRequired
};

export default MethodResultItem;
