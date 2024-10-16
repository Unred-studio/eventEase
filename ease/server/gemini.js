const axios = require("axios"); // Importing axios
const fs = require("fs").promises; // Importing fs with promises
const path = require("path"); // Importing path

const instructions_filePath = path.join(__dirname, "data", "instruction.txt");
const email_filePath = path.join(__dirname, "data", "email.txt");

// Function to read file
async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return data; // Return the file content
  } catch (err) {
    console.error("Error reading the file:", err);
    return ""; // Return an empty string on error
  }
}

// Function to write response to a file
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

// Main function to execute the flow
async function main() {
  let instruction = await readFile(instructions_filePath);
  let email = await readFile(email_filePath);

  // URL for post request to gemini api (contains my API key)
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDebXd-8pcUR-gBWKlAiFAFHMz4bifGVLA`;

  // Data for the API request
  const data = {
    contents: [
      {
        parts: [
          {
            text: `These are the instructions: ${instruction} /nThis is the email: ${email}`,
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

    // Log the full response for debugging
    console.log("Full Response:", JSON.stringify(response.data, null, 2));

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
        apiResponse = { error: "Failed to parse JSON from response." };
      }
    } else {
      console.error("No valid generated content found in the response.");
      apiResponse = { error: "No valid generated content found." };
    }
  } catch (error) {
    apiResponse = error.response ? error.response.data : error.message;
    console.error("Error:", error);
  }

  // Write the response to a file
  const response_filePath = path.join(__dirname, "data", "response.json");
  await writeResponseToFile(response_filePath, apiResponse);
}

// Execute the main function
main();
