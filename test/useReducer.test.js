// import React from 'react';

import Enum from '../src/Enum';
import { createHook } from '../src/react/useReducer';

// mockReducerHook :: (a -> a) -> a -> [a, Action -> (), () -> a]
const mockReducerHook = (reducer, _state) => {
    let state = _state;
    const dispatch = action => state = reducer(state, action);
    return [ state, dispatch, () => state ];
};

const useReducer = createHook({ useReducer: mockReducerHook });

const Actions = Enum([ 'A1', 'A2', 'A3' ]);

describe('React', () => {

    describe('useReducer', () => {

        it('should update state with dispatches', () => {

            const reducer = Actions.caseOf({
                A1: by => state => state + by,
                A2: by => state => state - by,
                _: () => state => state,
            });

            const [ _, dispatch, getState ] = useReducer(reducer, 0);
            
            expect(getState()).toBe(0);

            dispatch(Actions.A1(5));
            dispatch(Actions.A1(7));
            dispatch(Actions.A2(2));
            dispatch(Actions.A3(5));
            dispatch(Actions.A2(1));

            expect(getState()).toBe(9);
        });

        it('should throw an error for invalid action', () => {

            const reducer = Actions.caseOf({
                _: () => state => state,
            });

            const [ _, dispatch ] = useReducer(reducer, 0);

            expect(() => dispatch(Actions.InvalidAction())).toThrowError();
            expect(() => dispatch(null)).toThrowError();
            expect(() => dispatch(undefined)).toThrowError();
            expect(() => dispatch({})).toThrowError();
            expect(() => dispatch(1)).toThrowError();
            expect(() => dispatch('1')).toThrowError();
            expect(() => dispatch()).toThrowError();
        });
    });
});
