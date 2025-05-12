const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());

const OMDB_API_KEY = '94118d39';

// ✅ Keywords to detect if query is movie-related
function isMovieRelated(text) {
  const movieKeywords = [
    'movie', 'film', 'actor', 'actress', 'director', 'cinema',
    'tv', 'series', 'OTT', 'IMDB', 'box office', 'hollywood', 'bollywood'
  ];
  return movieKeywords.some((kw) => text.toLowerCase().includes(kw));
}

// ✅ Cleans and extracts movie title from user input
function extractMovieTitle(text) {
  const cleaned = text
    .toLowerCase()
    .replace(/(tell me about|tell about|what do you know about|movie|film|the movie|about|show me|give me details of)/gi, '')
    .replace(/[^\w\s]/g, '') // remove punctuation
    .trim();

  return cleaned || text;
}

// ✅ Query OMDb API for movie info
async function fetchOMDbData(title) {
  const url = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`;
  const response = await axios.get(url);
  return response.data;
}

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  const lowerMessage = userMessage.toLowerCase();

  // ✅ Handle greetings and thanks
  if (lowerMessage.includes("thank you") || lowerMessage.includes("thanks")) {
    return res.json({ reply: "You're welcome! 🎬 Feel free to ask about any movie." });
  }

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return res.json({ reply: "Hello! 👋 I'm here to chat about movies. Ask me anything!" });
  }

  // ✅ Skip non-movie queries
  if (!isMovieRelated(lowerMessage)) {
    return res.json({ reply: "Sorry, I only respond to movie-related questions!" });
  }

  try {
    const cleanedTitle = extractMovieTitle(userMessage);

    const movieData = await fetchOMDbData(cleanedTitle);

    if (movieData.Response === 'False') {
      return res.json({ reply: `I couldn't find any movie titled "${cleanedTitle}" on IMDb. Try another title!` });
    }

    // ✅ Rotten Tomatoes rating if available
    let rottenRating = "N/A";
    if (movieData.Ratings) {
      const rtRating = movieData.Ratings.find(r => r.Source === "Rotten Tomatoes");
      if (rtRating) {
        rottenRating = rtRating.Value;
      }
    }

    const prompt = `
You're a smart and friendly chatbot that talks about movies. A user asked about "${userMessage}".
Here's some information from the movie database:

🎬 Title: ${movieData.Title}
📅 Year: ${movieData.Year}
🎭 Genre: ${movieData.Genre}
🎬 Director: ${movieData.Director}
⭐ Actors: ${movieData.Actors}
📝 Plot: ${movieData.Plot}
⭐ IMDb Rating: ${movieData.imdbRating}
🍅 Rotten Tomatoes: ${rottenRating}

Now give the user a helpful and enthusiastic reply using this info.
`;

    const mistralResponse = await axios.post('http://localhost:11434/api/generate', {
      model: 'mistral',
      prompt: prompt,
      stream: false
    });

    const reply = mistralResponse.data.response;
    res.json({ reply });

  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ reply: "Oops! Something went wrong while processing your movie request." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
