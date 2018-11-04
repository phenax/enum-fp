
import { useReducer } from 'react';

// useReducer :: (Reducer, State) -> [ State, EnumTagType -> () ]
export default createHook(useReducer);

// useReducer :: (Reducer, State) -> [ State, EnumTagType -> () ]
export const createHook = ({ useReducer }) =>
    (reducer, initialState) => useReducer((state, action) => reducer(action)(state), initialState);
