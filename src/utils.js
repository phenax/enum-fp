
// TODO: Sanitize name to alphanumeric value
// EnumToken :: Options -> EnumTag
export const EnumToken = ({ name }) =>
    ({ name });

// EnumTag :: String -> (...*) -> EnumTag
export const EnumTag = name => (...args) => ({
    args,
    name,
    is: otherType => name === otherType.name,
});

// reduceTypeConstructors :: Array EnumToken -> Object EnumTag
export const reduceTypeConstructors = types =>
    types.reduce((o, type) => ({ ...o, [type.name]: EnumTag(type.name) }), {});

// error :: String -> ()
export const error = msg => { throw new Error(msg); };

// prop :: Array -> Object
export const prop = path => obj =>
    path.reduce((o, key) => ({ ...o, [key]: o[key] }), obj);
