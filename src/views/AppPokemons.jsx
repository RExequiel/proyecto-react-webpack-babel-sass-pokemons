import React, { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import Pokemon from "../components/Pokemon";
import "../sass/AppPokemons.scss";

const AppPokemons = () => {
  let url = "https://pokeapi.co/api/v2/pokemon/?limit=784";
  //console.log(useFetch());

  let { data, isPending, error } = useFetch(url);

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      let res = await fetch(url);
      data = await res.json();
      // console.log(data);

      data.results.forEach(async (el) => {
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

    getPokemons();
  }, [url]);
  return (
    <>
      <h1 className="title">Pokemons name</h1>

      <div style={{ border: "1px solid #48e" }}>
        <h2 className="loading">Estado de la petición Ajax</h2>
        <h3>Pendiente: {JSON.stringify(isPending)}</h3>
        <br />
        <h3>
          <mark>Error: {JSON.stringify(error)}</mark>
        </h3>
        <br />
        <pre style={{ whiteSpace: "pre-wrap" }}>
          <h3>Datos:</h3>
          <br />
          <code style={{ wordBreak: "break-word" }}>
            {JSON.stringify(data)}
          </code>
        </pre>
        <br />
      </div>

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
