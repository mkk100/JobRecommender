const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/completions';

const promptInput = document.getElementById('prompt');
const submitBtn = document.getElementById('submit-btn');
const outputDiv = document.getElementById('output');

submitBtn.addEventListener('click', async () => {
    const response = axios.create({
        headers: {
            Authorization: "Bearer " + apiKey,
        },
        });
    const prompt = promptInput.value
    if (!prompt) {
        outputDiv.textContent = 'Please enter a prompt.';
        return;
    }

    try {
        const result = await response.post(apiUrl, {
            prompt: prompt,
            model: "text-davinci-003",
            max_tokens: 300,
            temperature: 0.5,
        });

        const outputText = result.data.choices[0].text;
        outputDiv.textContent = outputText;
    } catch (error) {
        outputDiv.textContent = `Error: ${error.message}`;
    }
});
