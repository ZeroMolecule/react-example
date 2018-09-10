import React, { PureComponent } from 'react';
import { Trans, translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Pokemon from 'models/Pokemon';
import { PUBLIC_POKEMON_IMAGES_URL } from 'constants';

class PokemonDetails extends PureComponent {
  static propTypes = {
    pokemon: PropTypes.instanceOf(Pokemon).isRequired,
  };

  static defaultProps = {};

  static showProperties = [
    ['pokemon.number', 'formattedId'],
    ['pokemon.name', 'name'],
    ['pokemon.height', 'height'],
    ['pokemon.weight', 'weight'],
    ['pokemon.type', 'type'],
    ['pokemon.weaknesses', 'weaknesses'],
  ];

  render () {
    const {pokemon} = this.props;

    return (
      <div className="pokemon-details">
        <img
          className="pokemon-details__image"
          src={`${PUBLIC_POKEMON_IMAGES_URL}/${pokemon.id}.png`}
          alt={pokemon.name}/>
        <div className="pokemon-details__information">
          <table>
            <tbody>
            {PokemonDetails.showProperties.map(([label, key]) => (
              <tr className="pokemon-details__information-group" key={key}>
                <td className="pokemon-details__label"><Trans i18nKey={label}/>:</td>
                <td className="pokemon-details__value">{pokemon[key]}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default translate()(PokemonDetails);
