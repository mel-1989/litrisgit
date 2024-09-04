import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  });

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'Hello, how can you assist me today?' }],
    });

    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error);
  }
})();