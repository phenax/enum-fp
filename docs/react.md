# useEnumReducer react hook (React 16.7)

## Usage

```javascript
import useEnumReducer from 'enum-fp/useEnumReducer';
const Component = () => {
    const [state, dispatch] = useEnumReducer(reducer, initialState);
    return /* whatever */;
};
```

## API

```haskell
useEnumReducer :: (SubType -> State, State) -> [State, SubType -> ()]
```

## Example usage

```javascript
import EnumType from 'enum-fp';
import useEnumReducer from 'enum-fp/useReducer';

const Action = EnumType({
  Increment: ['by'],
  Decrement: ['by'],
});

const initialState = { count: 0 };

const reducer = Action.caseOf({
  Increment: by => ({ count }) => ({ count: count + by }),
  Decrement: by => reducer(Action.Increment(-by)),
});

const CounterComponent = () => {
  const [{ count }, dispatch] = useEnumReducer(reducer, initialState);
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
import reducerComponent from 'enum-fp/reducerComponent';
reducerComponent({ state, reducer })(Component);
```

## API

```haskell
type Config = { state: State, reducer: State -> State }
reducerComponent :: Config -> Component -> Component
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
import EnumType from 'enum-fp';
import reducerComponent from 'enum-fp/reducerComponent';

const Action = EnumType({
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