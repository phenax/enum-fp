import React from 'react';

export const reducerComponent = ({ state, reducer }) => Component => {
    class ReducerComponent extends React.Component {
        state = { ...state };
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
