export const parseGeminiResponse = (text) => {
  try {
    // Remove markdown wrappers
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Parse failed:", err);
    return null;
  }
};