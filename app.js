const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

// -- Define your route listeners here! --
app.use(express.json());
app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));

app.get("/pokemon", (req, res) => {
  return res.json(allPokemon);
});

app.get("/pokemon/:id", (req, res) => {
  const id = req.params.id;
  const foundPokemon = allPokemon.find((pokemon) => {
    return pokemon.id == id;
  });
  if (foundPokemon) {
    return res.json(foundPokemon);
  } else {
    return res.json({ msg: "Pokemon not found." });
  }
});

app.get("/pokemon/search", (req, res) => {
  const queryParams = req.query;
  

  for (let key in queryParams) {
    const foundPokemon2 = allPokemon.find((pokemon) => {
      

      return pokemon[key] === queryParams[key];
    });

    if (foundPokemon2) {
      return res.json(foundPokemon2);
    } else {
       
      return res.json({ msg: "Contact not found." });
    }
  }

  res.json(queryParams);
});
