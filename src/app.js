require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('v.1.0.3')
})

app.post("/api/chat", async (req, res) => {
  const { mensaje, contexto } = req.body;

  try {
    const respuesta = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        "model": "gpt-3.5-turbo",
        "messages": [
          {"role": "system", "content": "Eres un asistente que ayuda a gestionar proyectos."},
          {"role": "user", "content": mensaje}
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({respuesta: respuesta.data.choices[0].message});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al conectar con OpenAI" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("🚀 Servidor corriendo en http://localhost:5000"));
