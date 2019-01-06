
# Types
The types module can be used directly to validate records, function arguments, lists, single values, etc.

You can import it as
```javascript
import T, { validateRecord } from 'enum-fp/types';
```

The Type module exposes the following -

* [T](#type-sum-type)
* [isOfType](#isOfType)
* [validateRecord](#validateRecord)


## Type sum-type
```haskell
data T = Any | String | Number | Bool | Record (Object T) | Map T | List T? | Enum EnumType | OneOf [T];
```

You can check if a value is of a particular type by using the isOfType function (Refer to section below for more info about isOfType)

```javascript
const isString = isOfType(T.String());

isString('Hello world') // > true
isString(1) // > false
```

## isOfType
```haskell
isOfType :: T -> a -> Boolean
```

You can use this function to write helper functions for validating types

```javascript
const isString = isOfType(T.String());
const isNumber = isOfType(T.Number());

const isUser = isOfType(T.Record({
    name: T.String(),
    age: T.Number(),
}));

isUser({ name: 'Akshay Nair', age: 21 }); // > true
isUser({ name: 'Akshay Nair', age: '21' }); // > false
isUser({ name: 'Akshay Nair' }); // > false
```


## validateRecord
```haskell
validateRecord :: (Object T, a) -> Boolean
```

Validates if the passed object is of the specified shape. The check is strict so missing fields in an object means the object is invalid. (Kind of an alternate api for `isOfType(T.Record({ /* shape */ }))`)

Here's the above isOfType example for user
```javascript
const isUser = user => validateRecord({
    name: T.String(),
    age: T.Number(),
}, user);
```


[#### Next topic](./react.md)