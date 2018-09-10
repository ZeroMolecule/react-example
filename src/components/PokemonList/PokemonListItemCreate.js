import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { paths } from 'routes';
import icons from 'assets/icons';

export default class PokemonListItemCreate extends PureComponent {
  render () {
    return (
      <div className="pokemon-list-item">
        <Link to={paths.pokemonCreate()} className="pokemon-list-item__link">
          <div className="pokemon-list-item__container pokemon-list-item__container--create">
            <svg className="icon pokemon-list-item__icon">
              <use xlinkHref={icons.plus()}/>
            </svg>
          </div>
        </Link>
      </div>
    );
  }
}
