
// type EnumAction = ...a -> EnumTagType

const checkType = (props, args) =>
    !props? true : props.length === args.length;

// EnumTag :: String -> ?Array String -> ...a -> EnumTagType
export const EnumTag = (name, props) => (...args) => {
    if(!checkType(props, args)) {
        throw new Error(`Constructor ${name} expected ${props.length} arguments, ${args.length} passed`);
    }

    return {
        // args :: Array *
        args,
        // name :: String
        name,
        // props :: ?Array String
        props,
        // is :: String | EnumTagType | EnumToken ~> Boolean
        is: otherType => typeof otherType === 'string'
            ? (name === otherType)
            : (name === otherType.name),
    };
};

export default EnumTag;
