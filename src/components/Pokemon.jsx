import React from 'react';
import '../sass/Pokemon.scss';

const Pokemon = ({ avatar, name }) => {
    return (
      <figure className='container'>
        <img className='container__img'ame src={avatar} alt={name} />
        <figcaption className='container__name'>{name}</figcaption>
      </figure>
    );
}

export default Pokemon;