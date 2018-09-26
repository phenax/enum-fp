
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
const action = Action.Edit(2, 'Hello world');
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
logMessage(Action.Add('Earth 2'));    // >> Adding "Earth 2"
logMessage(Action.Add('Pluto'));      // >> Adding "Pluto"
logMessage(Action.Edit(1, 'Mars'));   // >> Editing [2] to "Mars"
logMessage(Action.Delete(2));         // >> Deleting [3]
logMessage(Action.Add('Pluto'));      // >> Adding "Pluto"
logMessage(Action.DeleteAll());       // >> Deleting all entries

// As Get action is not handled in the pattern, it will execute the default
logMessage(Action.Get());                   // >> Unknown action

```

#### React Todo App Example
```js

const Action = EnumType(['Add', 'EditInput', 'ToggleCheck', 'Delete']);

const execute = Action.caseOf({
  Add: () => ({ tasks, message }) => ({
    message: '',
    tasks: [ ...tasks,
      { message, isChecked: false, key: `${Math.random()}` },
    ],
  }),

  EditInput: message => ({ message }),

  ToggleCheck: id => ({ tasks }) => {
    const taskList = [ ...tasks ];
    taskList[id] = { ...taskList[id], isChecked: !taskList[id].isChecked };
    return { tasks: taskList };
  },

  Delete: id => ({ tasks }) => {
    const taskList = [ ...tasks ];
    taskList.splice(id, 1);
    return { tasks: taskList };
  },
});

class TodoApp extends React.Component {
  state = { tasks: [], message: '' };

  execute = action => this.setState(execute(action));

  render() {
    const { state: { message, tasks } } = this;
    return (
      <div>
        <InputForm
          onInputChange={value => this.execute(Action.EditInput(value))}
          onSubmit={() => this.execute(Action.Add())}
        />
        <div>
          {tasks.map((task, index) => ( // Pardon the index, im lazy
            <TodoItem
              task={task}
              key={task.key}
              onCheck={() => this.execute(Action.ToggleCheck(index))}
              onDelete={() => this.execute(Action.Delete(index))}
            />
          ))}
        </div>
      </div>
    );
  }
}

```


## Running tests locally
Run `yarn test`
