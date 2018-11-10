# Create a react hook (React > 16.7) [Recommended]

## Usage

```javascript
// A wrapper for React's useReducer react hook
import { useReducer as useReactReducer } from 'react';

export const useReducer = (reducer, initialState) =>
  useReactReducer((state, action) => reducer(action)(state), initialState);
```

## API

```haskell
useReducer :: (SubType -> State, State) -> [State, SubType -> ()]
```

## Example usage

```javascript
const Action = Enum({
  Increment: ['by'],
  Decrement: ['by'],
});

const initialState = { count: 0 };

const reducer = Action.caseOf({
  Increment: by => ({ count }) => ({ count: count + by }),
  Decrement: by => reducer(Action.Increment(-by)),
});

const CounterComponent = () => {
  const [{ count }, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => dispatch(Action.Decrement(1))}>Decrement</button>
      <button onClick={() => dispatch(Action.Increment(1))}>Increment</button>
    </div>
  );
}
```


# reducerComponent HOC

## Usage

```javascript
export const reducerComponent = (reducer, state) => Component =>
  class ReducerComponent extends React.Component {
    static displayName = `ReducerComponent(${Component.displayName || Component.name || 'Unknown'})`;

    state = { ...state };
    dispatch = action => this.setState(reducer(action));
    render = () => <Component {...this.props} dispatch={this.dispatch} state={this.state} />;
  };
```

## API

```haskell
reducerComponent :: (State -> State, State) -> Component -> Component
```

The passed component will receive the following additional props

* `state` The current state of the component
```haskell
state :: State
```
* `dispatch` Dispatch an action. This calls the reducer and sets the next state of the application.
```haskell
dispatch :: SubType -> ()
```

## Example usage

```javascript
const Action = Enum({
  Increment: ['by'],
  Decrement: ['by'],
});

const initialState = { count: 0 };

const reducer = Action.caseOf({
  Increment: by => ({ count }) => ({ count: count + by }),
  Decrement: by => reducer(Action.Increment(-by)),
});

const CounterComponent = reducerComponent({ state: initialState, reducer })(
  ({ state: { count }, dispatch }) => (
    <div>
      <div>{count}</div>
      <button onClick={() => dispatch(Action.Decrement(1))}>Decrement</button>
      <button onClick={() => dispatch(Action.Increment(1))}>Increment</button>
    </div>
  ),
);
```