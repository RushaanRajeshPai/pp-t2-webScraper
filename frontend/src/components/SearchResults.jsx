import ReactMarkdown from "react-markdown";

function SearchResults({ results, isLinkup = false }) {
  console.log(results);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Search Results</h2>

      {/* Perplexity API results (contain content & sources) */}
      {!isLinkup && results.content && <ReactMarkdown>{results.content}</ReactMarkdown>}

      <ul>
        {results?.sources?.map((source, index) => (
          <li key={index} className="border p-2 mt-2">
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {source.title}
            </a>
          </li>
        ))}

        {/* LinkUp API results (contain title, url, and snippet) */}
        {isLinkup &&
          results.map((item, index) => (
            <li key={index} className="border p-2 mt-2">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {item.title}
              </a>
              <p>{item.snippet}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SearchResults;
