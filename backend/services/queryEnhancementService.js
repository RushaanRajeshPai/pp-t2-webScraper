const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_API_KEY } = require("../config/env");

async function enhanceQuery(query) {
  console.log("Original query:", query);

  // Return original query if no API key is available
  if (!GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY is missing.");
    return query;
  }

  try {
    // Initialize the Google Generative AI with your API key
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    // Get the model (gemini-1.5-flash)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content with the model
    const result = await model.generateContent(
      `Analyze this search query: "${query}"
        If the query is vague, ambiguous, or lacks specificity, enhance it to be more precise and informative for web search purposes. The enhanced query should:
        1. Include relevant keywords
        2. Be specific enough to return focused results
        3. Maintain the original intent
        4. Be concise (under 15 words)

        If the query is already specific and well-formed, return it unchanged.

        Respond ONLY with the enhanced query or original query with no additional text or explanation.`
    );
    const response = await result.response;  //extracts the response object from the result
    const text = response.text();    //extracts the plain text content from the response

    console.log("Gemini API Response:", text);

    // Return enhanced query or original if enhancement failed
    return text && text.trim() ? text.trim() : query;
  } catch (error) {
    console.error("Error enhancing query using Gemini:", error);
    // Return original query instead of throwing the error
    return query;
  }
}

module.exports = { enhanceQuery };
