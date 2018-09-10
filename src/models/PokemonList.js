import List from 'models/List';
import toNumber from 'lodash/toNumber';

export default class PokemonList extends List {
  filterBySearch = (value = '') => {
    const hasHash = value[0] === '#';
    const number = value.slice(1);

    return this.filter((item) => {
      if (hasHash) {
        if (number === '') {
          return true;
        }
        return toNumber(number) === toNumber(item.id);
      }
      return new RegExp(`^${value.toLowerCase()}`).test(item.name.toLowerCase());
    });
  };
}
