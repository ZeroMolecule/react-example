import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PokemonListModel from 'models/PokemonList';
import PokemonListItem from 'components/PokemonList/PokemonListItem';
import PokemonListItemCreate from 'components/PokemonList/PokemonListItemCreate';

export default class PokemonList extends PureComponent {
  static propTypes = {
    pokemon: PropTypes.instanceOf(PokemonListModel).isRequired,
    onItemClick: PropTypes.func,
  };

  static defaultProps = {
    onItemClick: () => {}
  };

  componentDidUpdate (prevProps) {
    const {pokemon, onItemClick} = this.props;
    if ((prevProps.pokemon.length !== pokemon.length) && pokemon.length === 1) {
      onItemClick(pokemon.findBy(''));
    }
  }

  renderItem = (item) => <PokemonListItem key={item.id} pokemon={item}/>;

  render () {
    return (
      <div className="pokemon-list">
        <PokemonListItemCreate/>
        {this.props.pokemon.getList().map(this.renderItem)}
      </div>
    );
  }
}
