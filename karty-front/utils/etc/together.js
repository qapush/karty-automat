import Together from 'together-ai';
const together = new Together();

const completion = await together.chat.completions.create({
  model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
  messages: [{ role: 'user', content: 'Mówisz po polsku?' }],
});

console.log(completion.choices[0].message.content);