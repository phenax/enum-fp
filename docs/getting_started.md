# Enum-FP
Functional enum type for javascript with pattern matching

[Read more about SumTypes using EnumFP in this blog post](https://medium.com/@phenax5/writing-cleaner-and-safer-javascript-with-sum-types-bec9c68ba7aa)

## Getting started
**To add this package to your project**
```bash
yarn add enum-fp
```
Or if you are one of those npm or pnpm nuts
```bash
npm i --save enum-fp
```
```bash
pnpm i --save enum-fp
```
**Import it to your file**
```javascript
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
const action = Action.Edit(2, 'Hello world');
```

[Next topic >](./enum_type.md)
