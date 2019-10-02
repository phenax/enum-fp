
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
import Enum from 'enum-fp';
```

#### Create an enum type
```js
const Action = Enum([ 'Add', 'Edit', 'Delete', 'Get' ]);

// Or with a fixed number of arguments
const Maybe = Enum({
    Just: [ 'value' ],
    Nothing: [],
});
```

#### Create an instance of the type using one of the contructors
```js
const action = Action.Edit(2, 'Hello world and India');
```

#### Pattern matching
```js
const Action = Enum([ 'Add', 'Edit', 'Delete', 'DeleteAll', 'Get' ]);

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
logMessage(Action.Add('Pluto'));
logMessage(Action.Add('Pluto'));       // >> Adding "Pluto1"
logMessage(Action.Edit(1, 'Mars'));   // >> Editing [2] to "Mars"
logMessage(Action.Delete(2));         // >> Deleting [3]
logMessage(Action.Add('Pluto'));      // >> Adding "Pluto"
logMessage(Action.DeleteAll());       // >> Deleting all entries

// As Get action is not handled in the pattern, it will execute the default
logMessage(Action.Get());             // >> Unknown action
```

#### Type validation
You can add strict type validation instead of argument descriptions. You can read more about types module [here](./docs/react.md)

```js
import T from 'enum-fp/types';

const TodoAction = Enum({
  Add: [ T.String('message') ],
  SetChecked: [ T.Number('id'), T.Bool('isChecked') ],
  Delete: [ T.Number('id') ],
  Edit: [ T.Number('id'), T.String('message') ],
  DeleteAll: [],
});
```

NOTE: The string passed to the functions are just for documentation purposes and are optional. It won't affect the behavior of the type in any way.




### Enum use cases

#### In the react world
`You can use it to manage react component state!` [Checkout the documentation](./docs/react.md)


#### Safely work with empty/invalid states

* Working with invalid values
```js
// Just an example. You should use `Maybe` functor in cases like these
const Value = Enum({ Invalid: [], Valid: ['value'] });

const extractName = user => user && user.name
  ? Value.Valid(user.name)
  : Value.Invalid();

const splitBySpace = Value.cata({
  Valid: name => name.split(' '),
  Invalid: () => [],
});

const getNameSplit = compose(splitBySpace, extractName);

const [ firstName, lastName ] = getNameSplit({ name: 'Akshay Nair' }); // >> returns ['Akshay','Nair']
```


#### In the functional world
If you are unfamiliar with `functors`, you can read [Functors in JS](https://hackernoon.com/functors-in-javascript-20a647b8f39f) blog post.

* **Maybe**

`Maybe` functor is used to handle null.

```js
const Maybe = Enum({ Just: ['value'], Nothing: [] });

const fmap = fn => Maybe.cata({
  Just: compose(Maybe.Just, fn),
  Nothing: Maybe.Nothing,
});
```

* **Either**

`Either` functor is used for handling exceptions

```js
const Either = Enum({ Left: ['error'], Right: ['value'] });

const fmap = fn => Either.cata({
  Left: Either.Left,
  Right: compose(Either.Right, fn),
});
const fmapFail = fn => Either.cata({
  Left: compose(Either.Left, fn),
  Right: Either.Right,
});
```
