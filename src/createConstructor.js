
// type TypeConstructor = ...a -> EnumTagType

// createConstructor :: (Enum, ConstructorDescription) -> TypeConstructor
const createConstructor = (Type, { name, props }) => (...args) => {
    if(props ? props.length !== args.length : false)
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
