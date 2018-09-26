
# Enum
Functional enum type for javascript with simple pattern matching

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
const editHelloAction = Action.Edit(2, 'Hello world');
```

#### Pattern matching
```js

const Action = EnumType([ 'Add', 'Edit', 'Delete', 'DeleteAll', 'Get' ]);

const logMessage = action =>
    console.log('>>', 
        Action.match(action, {
            Edit: (id, message) => `Editing [${id}] to "${message}"`,
            Add: message => `Adding "${message}"`,
            Delete: id => `Deleting [${id}]`,
            DeleteAll: () => 'Deleting all entries',
            _: () => 'Unknown action', // To handle default cases, use _
        })
    );

logMessage(Action.Add('Earth'));      // >> Adding "Earth"
logMessage(Action.Add('Mars'));       // >> Adding "Mars"
logMessage(Action.Add('Venusa'));     // >> Adding "Venusa"
logMessage(Action.Add('Pluto'));      // >> Adding "Pluto"
logMessage(Action.Edit(2, 'Venus'));  // >> Editing [2] to "Venus"
logMessage(Action.Delete(3));         // >> Deleting [3]
logMessage(Action.DeleteAll(3));      // >> Deleting all entries
logMessage(Action.Add('Pluto'));      // >> Adding "Pluto"

// As Get action is not handled in the pattern, it will execute the default
logMessage(Action.Get());                   // >> Unknown action

```

## Running tests locally
Run `yarn test`
