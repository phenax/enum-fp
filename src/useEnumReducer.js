
import { useReducer } from 'react';

// useReducer :: (Reducer, State) -> [ State, EnumTagType -> () ]
export default (reducer, initialState) => useReducer((state, action) => reducer(action)(state), initialState);
