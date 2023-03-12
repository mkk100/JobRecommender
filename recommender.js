const apiKey = '';
const apiUrl = 'https://api.openai.com/v1/completions';
const submitBtn = document.getElementById('btn');
const outputDiv = document.getElementById('output');

submitBtn.addEventListener('click', async () => {
    const response = axios.create({
        headers: {
            Authorization: "Bearer " + apiKey,
        },
    });
    const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    prompt = "Find me the job where I can use my ";
    // Loop through the selected checkboxes
    for (let i = 1; i < checkboxes.length; i++) {
        // Do something with the selected checkbox, for example, log its value
        prompt += checkboxes[i].value;
        prompt += ", "
    }

    try {
        const result = await response.post(apiUrl, {
            prompt: prompt,
            model: "text-davinci-003",
            max_tokens: 500,
            temperature: 0.2,
        });
        const outputText = result.data.choices[0].text;
        console.log(outputText)
        localStorage.setItem('value', outputText);
        window.location.href = 'recommender.html';

    } catch (error) {
        outputDiv.textContent = `Error: ${error.message}`;
    }
});
