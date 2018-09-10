import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getPokemon } from 'store/pokemon';
import PropTypes from 'prop-types';
import PokemonList from 'models/PokemonList';
import PokemonDetails from 'components/PokemonDetails/PokemonDetails';
import dataFetch, { ACTIONS } from 'components/hoc/dataFetch';

class PokemonDetailsRoute extends PureComponent {
  static propTypes = {
    pokemon: PropTypes.instanceOf(PokemonList).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  static defaultProps = {};

  render () {
    const {pokemon, match} = this.props;

    return (
      <div className="base-page">
        <PokemonDetails pokemon={pokemon.findById(match.params.id)}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pokemon: getPokemon(state)
});

export default compose(
  dataFetch(ACTIONS.FETCH_ALL_POKEMON),
  connect(mapStateToProps),
)(PokemonDetailsRoute);
