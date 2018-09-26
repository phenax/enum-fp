
import EnumTag from './EnumTag';

// TODO: Sanitize name to alphanumeric value
// EnumToken :: Object -> EnumToken
export const EnumToken = ({ name }) => ({ name });

// reduceTypeConstructors :: Array EnumToken -> Object EnumAction
export const reduceTypeConstructors = types =>
    types.reduce((o, type) => ({
        ...o,
        [type.name]: EnumTag(type.name),
    }), {});

// error :: String -> ()
export const error = msg => { throw new Error(msg); };

// prop :: Array -> Object
export const prop = path => obj =>
    path.reduce((o, key) => ({ ...o, [key]: o[key] }), obj);
