import { validateArgs } from './Type';

// type TypeConstructor = ...a -> EnumTagType

const validate = (props, args) =>
    props.length === args.length && validateArgs(props, args);

// createConstructor :: (Enum, ConstructorDescription) -> TypeConstructor
export const createConstructor = (Type, { name, props }) => (...args) => {
    if(props ? !validate(props, args) : false)
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

export default createConstructor;
