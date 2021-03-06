import { createEnumFactory } from './utils';
import T, { validateArgs } from './Type';

// type TypeConstructor = ...a -> EnumTagType

// createConstructor :: (Enum, ConstructorDescription) -> TypeConstructor
export const createConstructor = (Type, { name, props }) => (...args) => {
    if(props ? !validateArgs(props, args) : false)
        throw new TypeError(`Invalid number of args passed to constructor ${name}`);

    const self = {
        // args :: Array *
        args,
        // name :: String
        name,
        // props :: ?Array String
        props,
        // is :: String | EnumTagType | ConstructorDescription ~> Boolean
        is: otherType => [otherType, otherType.name].indexOf(name) !== -1,
        // match :: Object (* -> b) ~> b
        match: pattern => Type.match(self, pattern),
    };
    return self;
};

// Enum :: Array String | Object * -> Enum
export default createEnumFactory({ createConstructor });

// Type
export { T };