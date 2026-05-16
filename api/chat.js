import { Groq } from 'groq-sdk';

const SYSTEM_PROMPT = `You are an AI sales assistant for Romantic Love Photography, a luxury wedding photography studio based in Secunderabad, Hyderabad, Telangana, India.
Your goal is to answer queries about our services (Weddings, Pre-wedding, Maternity, Newborn, Cinematic videos), provide basic pricing guidelines (premium pricing starting from ₹1 Lakh), and encourage users to book a session or contact via WhatsApp. Keep responses concise, elegant, and conversational.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
  
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const { message } = req.body;
    
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ reply: "Please configure GROQ API key in Vercel environment variables to enable AI Chatbot." });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 256,
    });

    const reply = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that.";
    res.status(200).json({ reply });
  } catch (error) {
    console.error("GROQ API Error:", error);
    res.status(500).json({ reply: "Sorry, the AI is currently offline. Please try again later." });
  }
}
