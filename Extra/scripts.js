import { config } from "dotenv";
config();
import readline from "readline";
import OpenAI from "openai";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// const userInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// userInterface.prompt();
// userInterface.on("line", async (input) => {
//   const chatCompletion = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: input }],
//   });
//   console.log(chatCompletion.choices[0].message.content);

//   userInterface.prompt();
// });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
  });
  res.send(chatCompletion.choices[0].message.content);


});


const port = 8082;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});