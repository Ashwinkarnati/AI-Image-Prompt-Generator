export default {
  DESIGN_IDEA_PROMPT:
    'Based on an image style of type "{logoType}", generate a creative text prompt to produce an image for the brand name "{logoTitle}" with the description: "{logoDesc}" and using the reference: "{logoPrompt}". Provide exactly 5 creative prompt ideas (each 4–5 words), formatted as a numbered list.',
    
  LOGO_PROMPT:
    'Generate a detailed image prompt for "{logoTitle}", described as "{logoDesc}", using the color palette "{logoColor}". Incorporate the concept "{logoIdea}" and use "{logoDesign}" as design inspiration. Also include "{logoPrompt}" as additional creative context. Return only a JSON object with a `prompt` field.'
};
