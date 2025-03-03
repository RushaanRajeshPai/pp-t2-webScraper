// import ReactMarkdown from "react-markdown";

// function SearchResults({ results, isLinkup = false }) {
//   console.log("Search Results recv:", results);

//   // Handle Perplexity API results
//   const sources = Array.isArray(results?.sources) ? results.sources : [];
  
//   // Handle LinkUp API results (must be an array)
//   const linkupResults = Array.isArray(results) ? results : [];

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold">Search Results</h2>

//       {/* Perplexity API results (content & sources) */}
//       {!isLinkup && results?.content && <ReactMarkdown>{results.content}</ReactMarkdown>}

//       <ul>
//         {/* Render Perplexity API sources */}
//         {sources.length > 0 ? (
//           sources.map((source, index) => (
//             <li key={index} className="border p-2 mt-2">
//               <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                 {source.title}
//               </a>
//             </li>
//           ))
//         ) : (
//           !isLinkup && <p className="text-red-500">No sources found.</p>
//         )}

//         {/* Render LinkUp API results */}
//         {isLinkup &&
//           linkupResults.map((item, index) => (
//             <li key={index} className="border p-2 mt-2">
//               <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                 {item.title}
//               </a>
//               <p>{item.snippet}</p>
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// }

// export default SearchResults;


import ReactMarkdown from "react-markdown";

function SearchResults({ results }) {
  console.log("Search Results recv:", results);

  // Extract content & sources
  const content = results?.content || "No content available.";
  const sources = Array.isArray(results?.sources) ? results.sources : [];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Search Results</h2>

      {/* Display content */}
      <ReactMarkdown>{content}</ReactMarkdown>

      {/* Display sources */}
      <ul>
        {sources.length > 0 ? (
          sources.map((source, index) => (
            <li key={index} className="border p-2 mt-2">
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {source.title}
              </a>
            </li>
          ))
        ) : (
          <p className="text-red-500">No sources found.</p>
        )}
      </ul>
    </div>
  );
}

export default SearchResults;

