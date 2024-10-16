const express = require("express"); //importing express
const cors = require("cors"); //importing cors
const fs = require("fs").promises; //importing fs with promises
const { geminiApi } = require("./geminiApi");
const path = require("path");
const { createItem, readItems, deleteItems } = require("./crud"); //importing the functions from crud

/**
 * Writes the response object to a file as a JSON string. The file path and
 * response object are required arguments.
 *
 * @param {string} filePath - The path to write the file to
 * @param {object} response - The response object to convert to a JSON string
 * @throws {Error} - If there is an error writing the file
 */
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

const app = express();
const port = 3001; //port number

// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json()); //for parsing application/json
app.use(express.text()); //for parsing text/plain

//create a post request to send a lassonde email
app.post("/:emailType/:edition", (req, res) => {
  const emailType = req.params.emailType;
  const edition = req.params.edition;
  const content = req.body;

  const validEmailTypes = ["lassonde", "bethune", "york"];
  if (!validEmailTypes.includes(emailType.toLowerCase())) {
    return res.status(400).send(`Invalid email type: ${emailType}`);
  }

  createItem(
    emailType.charAt(0).toUpperCase() + emailType.slice(1),
    content,
    edition,
    (err) => {
      if (err) {
        return res.status(500).send(err.message);
      } else {
        console.log("Item created successfully");
      }
    }
  );

  geminiApi()
    .then((response) => {
      // Define file path based on emailType
      const response_filePath = path.join(
        __dirname,
        "master_json",
        `${emailType}.json`
      );

      // Write response to file
      return writeResponseToFile(response_filePath, response);
    })
    .catch((error) => {
      console.error("Error calling geminiApi:", error);
    });

  //delete the item from database
  deleteItems((err) => {
    if (err) {
      res.status(500).send(err.message);
    }
  });

  return res.status(200).send("Json was written successfully");
});

//FOR TEST PURPOSES ONLY
app.get("/test", (req, res) => {
  readItems((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

//starting the server
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
