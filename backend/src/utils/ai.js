import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export const convertPromptToRules = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an assistant that converts marketing prompts into structured rule logic for targeting customer segments.'
        },
        {
          role: 'user',
          content: `Convert this into logical targeting rules: "${prompt}"`
        }
      ]
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('AI rule conversion error:', error);
    return 'Unable to process the prompt at this time.';
  }
};
