import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPokemon } from 'store/pokemon';
import PokemonListComponent from 'components/PokemonList/PokemonList';
import PokemonList from 'models/PokemonList';
import { compose } from 'redux';
import dataFetch, { ACTIONS } from 'components/hoc/dataFetch';
import { SearchContext } from 'components/Header/SearchProvider';
import { paths } from 'routes';

class PokemonListRoute extends PureComponent {
  static propTypes = {
    pokemon: PropTypes.instanceOf(PokemonList).isRequired,
  };
  static defaultProps = {};

  onItemClick = (pokemon) => {
    this.props.history.push(paths.pokemonDetails(pokemon.id));
  };

  render () {
    return (
      <SearchContext.Consumer>
        {({value}) => {
          const pokemon = this.props.pokemon.filterBySearch(value);
          return (
            <div className="base-page pokemon-list-route">
              <PokemonListComponent pokemon={pokemon} onItemClick={this.onItemClick}/>
            </div>
          );
        }}
      </SearchContext.Consumer>
    );
  }
}

const mapStateToProps = state => ({
  pokemon: getPokemon(state)
});

export default compose(
  dataFetch(ACTIONS.FETCH_ALL_POKEMON),
  connect(mapStateToProps),
)(PokemonListRoute);

