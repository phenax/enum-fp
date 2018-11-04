
# Enum-FP
Functional Enum type / Sum type for javascript with simple pattern matching

[![CircleCI](https://img.shields.io/circleci/project/github/phenax/enum-fp/master.svg?style=for-the-badge)](https://circleci.com/gh/phenax/enum-fp)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/enum-fp.svg?style=for-the-badge)](https://www.npmjs.com/package/enum-fp)
[![Codecov](https://img.shields.io/codecov/c/github/phenax/enum-fp.svg?style=for-the-badge)](https://codecov.io/gh/phenax/enum-fp)


[Checkout the docs for more information](./docs)

[Medium article on SumTypes using EnumFP](https://medium.com/@phenax5/writing-cleaner-and-safer-javascript-with-sum-types-bec9c68ba7aa)

## Install

#### To add the project to your project
```bash
yarn add enum-fp
```

## Usage

#### Import it to your file
```js
import EnumType from 'enum-fp';
```

#### Create an enum type
```js
const Action = EnumType([ 'Add', 'Edit', 'Delete', 'Get' ]);

// Or with a fixed number of arguments
const Maybe = EnumType({
    Just: [ 'value' ],
    Nothing: [],
});
```

#### Create an instance of the type using one of the contructors
```js
const action = Action.Edit(2, 'Hello world');
```

#### Pattern matching
```js
const Action = EnumType([ 'Add', 'Edit', 'Delete', 'DeleteAll', 'Get' ]);

const logMessage = action => console.log('>>', 
  Action.match(action, {
    Edit: (id, message) => `Editing [${id}] to "${message}"`,
    Add: message => `Adding "${message}"`,
    Delete: id => `Deleting [${id}]`,
    DeleteAll: () => 'Deleting all entries',
    _: () => 'Unknown action', // To handle default cases, use _
  })
);

logMessage(Action.Add('Earth'));      // >> Adding "Earth"
logMessage(Action.Add('Earth 2'));    // >> Adding "Earth 2"
logMessage(Action.Add('Pluto'));      // >> Adding "Pluto"
logMessage(Action.Edit(1, 'Mars'));   // >> Editing [2] to "Mars"
logMessage(Action.Delete(2));         // >> Deleting [3]
logMessage(Action.Add('Pluto'));      // >> Adding "Pluto"
logMessage(Action.DeleteAll());       // >> Deleting all entries

// As Get action is not handled in the pattern, it will execute the default
logMessage(Action.Get());             // >> Unknown action
```

#### Using reducerComponent in React - Counter Example
```js
import EnumType from 'enum-fp';
import reducerComponent from 'enum-fp/reducerComponent';

const Action = EnumType({
  Increment: ['by'],
  Decrement: ['by'],
});

const state = { count: 0 };

const reducer = Action.caseOf({
  Increment: by => ({ count }) => ({ count: count + by }),
  Decrement: by => reducer(Action.Increment(-by)),
});

const CounterComponent = reducerComponent({ state, reducer })(
  ({ state: { count }, dispatch }) => (
    <div>
      <div>{count}</div>
      <button onClick={() => dispatch(Action.Decrement(1))}>Decrement</button>
      <button onClick={() => dispatch(Action.Increment(1))}>Increment</button>
    </div>
  ),
);
```


### Enum use cases

#### In the react world

* Reducer Component ([Docs](./docs/react.md))
```js
import reducerComponent from 'enum-fp/reducerComponent';
```

* Using the new react-hooks (`useEnumReducer`)  ([Docs](./docs/react.md))
```js
import useEnumReducer from 'enum-fp/useReducer';
```

#### Safely work with empty/invalid states

* Working with invalid values
```js
// Just an example. You should use `Maybe` functor in cases like these
const Value = EnumType({ Invalid: [], Valid: ['value'] });

const getName = user => user && user.name
  ? Value.Valid(user.name)
  : Value.Invalid();

const splitBySpace = Value.caseOf({
  Valid: name => name.split(' '),
  Invalid: () => [],
});

const [ firstName, lastName ] = compose(splitBySpace, getName, getUser)();
```

#### In the functional world

* Maybe
```js
const Maybe = EnumType({
  Just: [ 'value' ],
  Nothing: [],
});

const fmap = (fn, a) => Maybe.match(a, {
  Just: value => Maybe.Just(fn(value)),
  Nothing: () => a,
});
```

* Either
```js
const Either = EnumType({
  Left: [ 'error' ],
  Right: [ 'value' ],
});

const fmap = (fn, a) => Maybe.match(a, {
  Left: () => a,
  Right: value => Maybe.Right(fn(value)),
});
const fmapL = (fn, a) => Maybe.match(a, {
  Left: value => Maybe.Right(fn(value)),
  Right: () => a,
});

```
