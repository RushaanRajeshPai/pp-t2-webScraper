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

function SearchResults({ results }) {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Search Results</h2>
            <ul>
                {results.map((result, index) => (
                    <li key={index} className="border p-2 mt-2">{result}</li>
                ))}
            </ul>
        </div>
    );
}

export default SearchResults;