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

