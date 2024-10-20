const express = require("express"); //importing express
const cors = require("cors"); //importing cors
const { geminiApi } = require("./geminiApi"); //importing geminiApi
const path = require("path");

const port = 3001; //port number
const app = express(); //creating an instance of express

// Middleware to parse JSON request bodies
app.use(cors()); //helps to handle req and res from frontend
app.use(express.text()); //body.req provides plain/text content-type
app.use(express.static(path.join(__dirname, "master_json"))); //serving static json files to frontend

//request for email, provide the email to the geminiApi function and store the response in a master json file
app.post("/:emailType/:edition", (req, res) => {
  const validEmailTypes = ["lassonde", "bethune", "york"];
  const emailType = req.params.emailType;
  if (!validEmailTypes.includes(emailType.toLowerCase())) {
    return res.status(400).send("Invalid email type");
  }
  const edition = req.params.edition;
  const content = req.body;

  let resonseObj = {
    emailType: emailType,
    edition: edition,
    content: content,
  };
  // Call geminiApi function
  geminiApi(resonseObj).catch((error) => {
    console.error("Error calling geminiApi:", error);
  });

  return res.status(200).send("Json was written successfully"); //Success response
});

//starting the server at 3001
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
