// const axios = require("axios");
// const { GEMINI_API_KEY } = require("../config/env");

// async function getGeminiAnswer(content) {
//   try {
//     const response = await axios.post(
//       "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
//       {
//         contents: [
//           {
//             role: "user",
//             parts: [{ text: content }]
//           }
//         ]
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${GEMINI_API_KEY}`,
//         },
//       }
//     );

//     if (response.data && response.data.candidates && response.data.candidates.length > 0) {
//       return response.data.candidates[0].content.parts[0].text; //returning the 1st response from gemini model
//     } else {
//       console.error("Unexpected response from Gemini API:", response.data);
//       return "No response generated from Gemini";
//     }
//   } catch (error) {
//     console.error("Error fetching response from Gemini API:", error.message);
//     return "Error generating response";
//   }
// }

// module.exports = { getGeminiAnswer };

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_API_KEY } = require("../config/env");

async function getGeminiAnswer(content) {
  console.log("Generating answer using Gemini: ", content);

  // Return default message if no API key is available
  if (!GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY is missing.");
    return "No response generated from Gemini";
  }

  try {
    
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(content);
    const response = await result.response; 
    const text = response.text(); 
    
    console.log("Gemini API Response: ", text); //backend purpose

    return text && text.trim() ? text.trim() : "No response generated from Gemini.";
  } catch (error) {
    console.error("Error fetching response from Gemini API:", error);
    return "Error generating response";
  }
}

module.exports = { getGeminiAnswer };