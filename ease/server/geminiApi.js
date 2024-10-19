const axios = require("axios"); // Importing axios
const fs = require("fs").promises; // Importing fs with promises
const path = require("path"); //importing path

//Read the instruction file
async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return data; // Return the file content
  } catch (err) {
    console.error("Error reading the file:", err);
    return ""; // Return an empty string on error
  }
}

//Store the response fromm geminiApi into a master json file
async function writeResponseToFile(filePath, response) {
  try {
    // Convert the response object to a JSON string
    const jsonResponse = JSON.stringify(response, null, 2);
    await fs.writeFile(filePath, jsonResponse);
    console.log("File written successfully.");
  } catch (err) {
    console.error("Error writing the file:", err);
  }
}

//gemini api function
async function geminiApi({ emailType, edition, content }) {
  let instruction = await readFile("./master_json/instruction.txt", "utf8");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDebXd-8pcUR-gBWKlAiFAFHMz4bifGVLA`;
  const data = {
    contents: [
      {
        parts: [
          {
            text: `These are the instructions: ${instruction} /nThis is the sender: ${emailType}, This is the edition: ${edition} /nThis is the email: ${content}`,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 26000,
      temperature: 0.3,
      topK: 5,
      topP: 0.85,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ],
  };

  let apiResponse = {};

  // Making post request using axios
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Access the generated content from the response
    const generatedContent = response.data.candidates?.[0]?.content;

    // Extract the JSON part from the response
    if (
      generatedContent &&
      generatedContent.parts &&
      generatedContent.parts.length > 0
    ) {
      const jsonResponseText = generatedContent.parts[0].text;

      // Clean the response text
      const cleanJsonText = jsonResponseText.replace(/```json\n|\n```/g, "");

      // Attempt to parse the cleaned JSON string
      try {
        apiResponse = JSON.parse(cleanJsonText);
      } catch (error) {
        console.error("Error parsing JSON from response:", error);
      }
    } else {
      console.error("No valid generated content found in the response.");
    }
  } catch (error) {
    console.error("Error:", error);
  }

  writeResponseToFile(`./master_json/${emailType}.json`, apiResponse);
}

module.exports = {
  geminiApi,
};
