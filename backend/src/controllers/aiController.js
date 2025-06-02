import { convertPromptToRules } from '../utils/ai.js';

export const generateRulesFromPrompt = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === '') return res.status(400).json({ message: 'Prompt is required' });

  const rules = await convertPromptToRules(prompt);
  res.json({ rules });
};
