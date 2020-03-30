const express = require("express");
const app = express();
// const port = process.env.PORT || 3001;
const cors = require("cors");
const unirest = require("unirest");
const giphy = require("giphy-api")("UzH43GWKAIhgjK0qyZ4SXDlP82hvUprd");
const serverless = require("serverless-http");

app.use(cors());

const words = [
	"baboon",
	"cheetah",
	"chimpanzee",
	"eland",
	"elephant",
	"giraffe",
	"gazelle",
	"zebra",
	"hippopotamus",
	"hyena",
	"crocodile",
	"leopard",
	"lion",
	"gorilla",
	"rhinoceros"
];

app.get("/definition/:word", async (req, res) => {
	const word = req.params.word;

	const def = unirest(
		"GET",
		`https://wordsapiv1.p.rapidapi.com/words/${word}/definition`
	);

	def.headers({
		"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
		"x-rapidapi-key": "f3eaf87e7bmsh27b6ab2b9afaef8p17f034jsne7aef592f6d7"
	});

	def.end(function(response) {
		if (response.error) throw new Error(response.error);
		res.send({ definition: response.body.definition });
	});
});

app.get("/word", (req, res) =>
	res.send({
		word: words[Math.floor(Math.random() * words.length)]
	})
);

app.get("/gif/:word", (req, res) => {
	const word = req.params.word;
	giphy.search(word, function(err, response) {
		res.send({ gif: response.data[0].images.downsized_large.url });
	});
});

// app.listen(port, () => console.log(`Listening on port ${port}!`));
module.exports.handler = serverless(app);
