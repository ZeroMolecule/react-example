import Loadable from 'react-loadable';

const loadable = (loader, loading = null) => {
  return Loadable({
    loader,
    loading: loading || (() => null),
  });
};

export const paths = {
  index: () => '/',
  pokemonList: () => '/pokemon',
  pokemonCreate: () => '/pokemon/create',
  pokemonDetails: id => `/pokemon/${id || ':id'}`,
  signIn: () => '/sign-in',
  about: () => '/about'
};

export const Components = {
  PokemonList: loadable(() => import('components/PokemonList')),
  PokemonCreate: loadable(() => import('components/PokemonCreateRoute')),
  PokemonDetails: loadable(() => import('components/PokemonDetails/PokemonDetailsRoute')),
  NoMatch: loadable(() => import('components/NoMatchRoute')),
  SignIn: loadable(() => import('components/SignInRoute'))
};
