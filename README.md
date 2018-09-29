
# Enum-FP
Functional enum type / Union Type for javascript with simple pattern matching

[![CircleCI](https://img.shields.io/circleci/project/github/phenax/enum-fp/master.svg?style=for-the-badge)](https://circleci.com/gh/phenax/enum-fp)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/enum-fp.svg?style=for-the-badge)](https://www.npmjs.com/package/enum-fp)


[Read the wiki for more information](https://github.com/phenax/enum-fp/wiki)

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
```

#### Create an instance of an action
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
