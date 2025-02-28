import React from "react";
import PropTypes from "prop-types";

const SearchResults = ({ results }) => {
  console.log(results);
  return (
    <div>
      {results.map((result, index) => (
        <div key={index}>
          <h2>{result.name}</h2>
          <p>{result.content}</p>
          <a href={result.link} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </div>
      ))}
    </div>
  );
};

SearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      snippet: PropTypes.string,
      link: PropTypes.string,
    })
  ).isRequired,
};

export default SearchResults;
