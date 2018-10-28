
import { useReducer } from 'react';

export default (reducer, initialState) => useReducer((state, action) => reducer(action)(state), initialState);
