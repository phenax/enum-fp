
import { useReducer } from 'react';

// type Config = { useReducer :: React.Hook };


// useReducer :: Config -> (Reducer, State) -> [ State, EnumTagType -> () ]
export const createHook = ({ useReducer }) =>
    (reducer, initialState) => useReducer((state, action) => reducer(action)(state), initialState);

// useReducer :: (Reducer, State) -> [ State, EnumTagType -> () ]
export default createHook({ useReducer });
