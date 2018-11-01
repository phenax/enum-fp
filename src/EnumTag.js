
// type EnumAction = ...a -> EnumTagType


// validateArguments :: (?Array String, [a]) -> Boolean
const validateArguments = (props, args) =>
    !props? true : props.length === args.length;

// EnumTag :: (String, EnumType, ?Array String) -> ...a -> EnumTagType
export const EnumTag = (name, Type, props) => (...args) => {
    if(!validateArguments(props, args))
        throw new TypeError(`Invalid number of arguments passed to constructor ${name}`);

    const self = {
        // args :: Array *
        args,
        // name :: String
        name,
        // props :: ?Array String
        props,
        // is :: String | EnumTagType | EnumToken ~> Boolean
        is: otherType => [otherType, otherType.name].indexOf(name) !== -1,
    };

    // match :: Object (* -> b) ~> b
    self.match = pattern => Type.match(self, pattern);

    return self;
};

export default EnumTag;
