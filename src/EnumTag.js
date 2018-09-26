
// type EnumAction = ...a -> EnumTagType

// EnumTag :: String -> ...a -> EnumTagType
export const EnumTag = name => (...args) => ({
    // args :: Array *
    args,
    // name :: String
    name,

    // is :: String | EnumTagType | EnumToken ~> Boolean
    is: otherType => typeof otherType === 'string'
        ? (name === otherType)
        : (name === otherType.name),
});

export default EnumTag;
