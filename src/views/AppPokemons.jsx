import React, { useState, useEffect } from "react";
import Pokemon from "../components/Pokemon";
import '../sass/AppPokemons.scss';


const AppPokemons = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemons = async (url) => {
      let res = await fetch(url),
        json = await res.json();
      //console.log(json);

      json.results.forEach(async (el) => {
        let res = await fetch(el.url),
          json = await res.json();

        //console.log(json);
        let pokemon = {
          id: json.id,
          name: json.name,
          avatar: json.sprites.front_default,
        };

        setPokemons((pokemons) => [...pokemons, pokemon]);
      });
    };

    getPokemons("https://pokeapi.co/api/v2/pokemon/");
  }, []);

  return (
    <>
      <h1 className="title">Pokemons name</h1>
      {pokemons.length === 0 ? (
        <h2 className="loading">Cargando...</h2>
      ) : (
        pokemons.map((el) => (
          <Pokemon key={el.id} name={el.name} avatar={el.avatar} />
        ))
      )}
    </>
  );
};

export default AppPokemons;
