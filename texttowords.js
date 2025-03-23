import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getMoodWords() {
  const journalEntry = `
    Today was a very nice day, I met up with friends and the sky was very sunny and I was feeling very happy.
  `;

  const prompt = `
  Below is a journal entry. Your job is to read it and return **only the top 3 mood or emotional words** that best match the tone and content of the entry.
  
  Please choose from this exact list of words only:
  joyful, happy, cheerful, chipper, amused, upbeat, delighted, thrilled, excited, bubbly, content, satisfied, optimistic, grateful, playful, lively, blissful, exuberant, giddy, jubilant, merry, zestful, sunny, vivacious, laughing, grinning, chuffed, relaxed, calm, peaceful, serene, composed, zen, unruffled, chill, easygoing, comfortable, meditative, mellow, carefree, contented, unperturbed, safe, settled, angry, annoyed, irritated, infuriated, frustrated, enraged, outraged, agitated, hostile, resentful, cross, grumpy, touchy, temperamental, impatient, snappy, sad, melancholy, gloomy, depressed, blue, mournful, heartbroken, morose, sorrowful, wistful, crying, glum, unhappy, hopeless, lonely, low, dejected, anxious, nervous, afraid, scared, fearful, insecure, uneasy, petrified, alarmed, jumpy, tense, jittery, worried, distressed, threatened, panicked, curious, interested, engaged, enthusiastic, inspired, thoughtful, introspective, contemplative, philosophical, fascinated, absorbed, studious, reflective
  
  Only reply with the 3 best-fitting words from this list, separated by commas.
  
  Journal Entry:
  ${journalEntry}
  `;
  
  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro-latest" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    console.log("Top 3 Moods:", text);
  } catch (err) {
    console.error("Gemini API Error:", err.message);
  }
}

getMoodWords();
