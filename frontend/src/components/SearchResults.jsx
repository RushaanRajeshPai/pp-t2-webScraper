/* eslint-disable react/prop-types */
// import React from 'react';

// const SearchResults = ({ results }) => {
//     return (
//         <div>
//             {results.map((result, index) => (
//                 <div key={index}>
//                     <h2>{result.title}</h2>
//                     <p>{result.snippet}</p>
//                     <a href={result.link} target="_blank" rel="noopener noreferrer">
//                         Read More</a>

//                     {result.fullContent && (
//                         <details>
//                             <summary>View Full Content</summary>
//                             <p>{result.fullContent}</p>
//                         </details>
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default SearchResults;

// eslint-disable-next-line react/prop-types
import ReactMarkdown from "react-markdown";

function SearchResults({ results }) {
  console.log(results);
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Search Results</h2>
      <ReactMarkdown>{results.content}</ReactMarkdown>
      <ul>
        {results?.sources?.map((source, index) => (
          <li key={index} className="border p-2 mt-2">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {source.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
