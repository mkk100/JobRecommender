const openai = require('openai');

const OPENAI_API_KEY = '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';

openai.api_key = OPENAI_API_KEY;

function get_job_des(job_pos) {
  const prompt = `a paragraph consisting job description of ${job_pos}. Show in form of Desciption: `;
  const model = 'text-davinci-003';
  const temp = 0.2;
  const max = 200;
  return openai.Completion.create({
    model,
    prompt,
    max_tokens: max,
    n: 1,
    stop: null,
    temperature: temp
  })
  .then(response => response.choices[0].text);
}

function get_job_skills(job_pos, job_skills) {
  const prompt = `List other top 10 ${job_pos} specific skills that are required other than ${job_skills}.`;
  const model = 'text-davinci-003';
  const temp = 0.2;
  const max = 200;
  return openai.Completion.create({
    model,
    prompt,
    max_tokens: max,
    n: 1,
    stop: null,
    temperature: temp
  })
  .then(response => response.choices[0].text);
}

function get_job_pos(skills, interests) {
  const prompt = `A list of job positions that match the following skills and interests:\nSkills: ${skills}\nInterests: ${interests}`;
  const model = 'text-davinci-003';
  const temp = 0.2;
  const max = 500;
  return openai.Completion.create({
    model,
    prompt,
    max_tokens: max,
    n: 1,
    stop: null,
    temperature: temp
  })
  .then(response => {
    const job_pos = response.choices[0].text.trim();
    if (!job_pos) {
      throw new Error('Could not find any job positions that match the given skills and interests.');
    }
    console.log(`Matching job positions: \n${job_pos}`);
    const positions = job_pos.split('\n');
    const promises = positions.map(pos => {
      const job_pos = pos.trim();
      console.log(`\n${job_pos}:`);
      return get_job_des(job_pos)
      .then(description => {
        if (!description) {
          console.log('Could not find a job description for this position.');
        } else {
          console.log(description);
        }
        return get_job_skills(job_pos, skills);
      })
      .then(skills => {
        if (!skills) {
          console.log('Could not find any additional skills required for this position.');
        } else {
          console.log(skills);
        }
      });
    });
    return Promise.all(promises);
  });
}

function main() {
  let skills, interests;
  while (true) {
    try {
      let skills = prompt("Enter your top 3 skills, separated by commas:");
      if (!skills) {
        throw new Error("Skills cannot be empty.");
      }
      skills = skills.split(",").map(s => s.trim()).filter(Boolean);
      if (skills.length < 3) {
        throw new Error("Please provide at least 3 skills.");
      }
      let interests = prompt("Enter your top 3 interests, separated by commas:");
      if (!interests) {
        throw new Error("Interests cannot be empty.");
      }
      interests = interests.split(",").map(i => i.trim()).filter(Boolean);
      if (interests.length < 3) {
        throw new Error("Please provide at least 3 interests.");
      }
      get_job_pos(skills, interests);
      break;
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }}
