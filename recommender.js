const axios = require("axios");
require("dotenv").config();
const apiKey = process.env.KEY;
const client = axios.create({
    headers: {
        Authorization: "Bearer " + apiKey,
    },
});

const button = document.getElementById('submit')
button.onclick = function () {
    const params = {
        prompt: document.getElementById('input').innerHTML,
        model: "text-davinci-003",
        max_tokens: 1000,
        temperature: 0.5,
    };

    client.post("https://api.openai.com/v1/completions", params)
        .then((result) => {
            document.getElementById('output').value = result.data[0].choices
            console.log(result.data[0].choices)
        })
        .catch((err) => {
            console.log(err);
        });
}