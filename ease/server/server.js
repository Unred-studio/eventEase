const express = require("express"); //importing express

const {
  createItem,
  readItems,
  readItemById,
  updateItem,
  deleteItems,
} = require("./crud"); //importing the functions from crud

//importing main from gemini
const { main, readFile } = require("./gemini");

const cors = require("cors");

const app = express();
const port = 3001; //port number

// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());

//create a post request to send a email
app.post("/send/emails", (req, res) => {
  const { content } = req.body;
  const contentStringify = content.replace(/\r\n/g, "\n");
  createItem(
    req.body.sender,
    contentStringify,
    req.body.edition,
    (err, data) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send("Email created successfully");
      }
    }
  );
});

/**
 * Asynchronously checks the content of the email file and calls the main function if the file is not empty.
 * If the file is empty, logs a message indicating that the email file is empty.
 * Handles any errors that occur during file check and main function execution.
 */
async function checkAndRunMain() {
  try {
    const fileContent = await readFile(__dirname + "/data/email.txt"); // Read the file content asynchronously
    if (fileContent.length > 0) {
      await main(); // Call main function if the file is not empty
      console.log("Main function executed successfully.");
    } else {
      console.log("Email file is empty.");
    }
  } catch (error) {
    console.error(
      "Error during file check and main function execution:",
      error
    );
  }
}

// Call the function to check and execute
checkAndRunMain();

//starting the server
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
