const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 2990;

const { Configuration, OpenAIApi } = require("openai");
dotenv.config();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => {
  const { chats, model } = req.body;
  console.log(model);
  const response = await openai.createCompletion({
    model: `${model}`,
    prompt: `${chats}`,
    max_tokens: 1000,
    temperature: 1,
  });
  res.json({ chat: response.data.choices[0].text });
});

app.get("/", async (req, res) => {
  const response = await openai.listModels();
  res.status(200).send({ model: response.data.data });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
