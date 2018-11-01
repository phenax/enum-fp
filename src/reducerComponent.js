import React from 'react';

// type State = Object *;
// type Reducer = EnumTagType -> (State | State -> State);
// type Config = { state :: State, reducer :: Reducer };

// reducerComponent :: Config -> React.Component -> React.Component
export const reducerComponent = ({ state, reducer }) => Component => {
    class ReducerComponent extends React.Component {
        state = { ...state };
        // dispatch :: EnumTagType ~> ()
        dispatch = action => this.setState(reducer(action));
        render = () => React.createElement(Component, {
            ...this.props,
            dispatch: this.dispatch,
            state: this.state,
        });
    }

    ReducerComponent.displayName =
        `ReducerComponent(${Component.displayName || Component.name || 'Unknown'})`;

    return ReducerComponent;
};

export default reducerComponent;
