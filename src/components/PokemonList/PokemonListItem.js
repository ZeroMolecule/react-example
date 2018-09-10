import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Pokemon from 'models/Pokemon';
import { PUBLIC_POKEMON_IMAGES_URL } from 'constants';
import { paths } from 'routes';

export default class PokemonListItem extends PureComponent {
  static propTypes = {
    pokemon: PropTypes.instanceOf(Pokemon).isRequired,
  };

  static defaultProps = {};

  render () {
    const {pokemon} = this.props;

    return (
      <div className="pokemon-list-item">
        <Link to={paths.pokemonDetails(pokemon.id)} className="pokemon-list-item__link">
          <div className="pokemon-list-item__container">
            <img
              className="pokemon-list-item__image"
              src={`${PUBLIC_POKEMON_IMAGES_URL}/${pokemon.id}.png`}
              alt={pokemon.name}
            />
            <span className="pokemon-list-item__name">{pokemon.name}</span>
          </div>
        </Link>
      </div>
    );
  }
}
