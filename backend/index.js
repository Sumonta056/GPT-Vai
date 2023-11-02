const OpenAI = require("openai");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const openai = new OpenAI({
  apiKey: "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",
});
// node .\index.js
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {

  const message = req.body.content + "please reply in bengali language";
  console.log(message);

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
  });
  console.log(chatCompletion.choices[0].message.content);
  res.send(chatCompletion.choices[0].message.content);

  // res.send("Life is a quality that distinguishes matter that has biological processes, such as signaling and self-sustaining processes, from matter that does not, and is defined descriptively by the capacity for homeostasis, organisation, metabolism, growth, adaptation, response to stimuli, and reproduction. Many philosophical definitions of living systems have been proposed, such as self-organizing systems. Viruses in particular make definition difficult as they replicate only in host cells. Life exists all over the Earth in air, water, and soil, with many ecosystems forming the biosphere. Some of these are harsh environments occupied only by extremophiles. Life has been studied since ancient times, with theories such as Empedocles's materialism asserting that it was composed of four eternal elements, and Aristotle's hylomorphism asserting that living things have souls and embody both form and matter. Life originated at least 3.5 billion years ago, resulting in a universal common ancestor. This evolved into all the species that exist now, by way of many extinct species, some of which have left traces as fossils. Attempts to classify living things, too, began with Aristotle. Modern classification began with Carl Linnaeus's system of binomial nomenclature in the 1740s.");

});

const port = 8082;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
