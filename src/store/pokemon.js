import PokemonAPI from 'api/PokemonAPI';
import Pokemon from 'models/Pokemon';
import PokemonList from 'models/PokemonList';
import { shouldFetch } from 'store/status';

// Actions
const GET_POKEMON_PENDING = 'GET_POKEMON_PENDING';
const GET_POKEMON_FULFILLED = 'GET_POKEMON_FULFILLED';
const GET_POKEMON_REJECTED = 'GET_POKEMON_REJECTED';

// Reducer
export default function reducer (state = [], action = {}) {
  const {type, payload} = action;
  switch (type) {
    case GET_POKEMON_FULFILLED:
      return payload;
    default:
      return state;
  }
}

// Action Creators
export const getPokemonPending = () => {
  return {type: GET_POKEMON_PENDING};
};

export const getPokemonFulfilled = (data) => {
  return {type: GET_POKEMON_FULFILLED, payload: data};
};

export const getPokemonRejected = (err) => {
  return {type: GET_POKEMON_REJECTED, payload: err};
};

// Side effects
export const fetchPokemon = (refresh = false) => async (dispatch, getState) => {
  if (shouldFetch(getState(), 'GET_POKEMON') || refresh) {
    dispatch(getPokemonPending());
    try {
      const data = await PokemonAPI.getAll();
      return dispatch(getPokemonFulfilled(data));
    } catch (e) {
      return dispatch(getPokemonRejected(e));
    }
  }
  return Promise.resolve();
};

// Selectors
export const getPokemon = (state) => {
  const data = (state.pokemon || []).map(item => new Pokemon(item));
  return new PokemonList(data);
};

