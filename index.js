import axios from "axios";
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());

//function

app.get("/", async (req, res) => {
  const query = req.query.id;
  async function apiCalling() {
    const api = await axios(
      `https://pokeapi.co/api/v2/pokemon?limit=${query}&offset=0`
    );
    return await api.data.results.map((item) => {
      return item.url;
    });
  }
  const pokemonUrls = [];
  const data = await apiCalling();
  const promises = data.map(async (item) => {
    const api = await axios(item);
    return api.data;
  });
  const pokemonsss = await Promise.all(promises);
  const final_data = [];
  pokemonsss.map((item) => {
    final_data.push({
      image: item.sprites.other.dream_world.front_default,
      name: item.species.name,
    });
  });
  res.json(final_data);
});

app.listen(4001, () => {
  console.log("server is running on 4001");
});
