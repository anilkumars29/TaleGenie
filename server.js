const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { OpenAI } = require("openai");  // Correct import

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: "", // Replace with your actual OpenAI API key
});

// Endpoint to generate a story
app.post("/generate-story", async (req, res) => {
  const { ageGroup, genre, numPages } = req.body;

  // Construct a prompt based on the input
  const prompt = `Write a ${genre} story for age group ${ageGroup} that is ${numPages} pages long.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100 * numPages, // Approx 100 words per page
      temperature: 0.7,
    });

    res.json({ story: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error generating story:", error.message);
    res.status(500).json({ error: "Failed to generate story. Please try again." });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
