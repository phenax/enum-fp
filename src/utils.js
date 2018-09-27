
import EnumTag from './EnumTag';

// TODO: Sanitize name to alphanumeric value
// EnumToken :: Object -> EnumToken
export const EnumToken = ({ name, props }) => ({ name, props });

// reduceTypeConstructors :: Array EnumToken -> Object EnumAction
export const reduceTypeConstructors = types =>
    types.reduce((obj, type) => ({
        ...obj,
        [type.name]: EnumTag(type.name, type.props),
    }), {});

// error :: String -> ()
export const error = msg => { throw new Error(msg); };

// prop :: Array -> Object
export const prop = path => obj =>
    path.reduce((o, key) => ({ ...o, [key]: o[key] }), obj);

export const isArray = arr =>
    Object.prototype.toString.call(arr) === '[object Array]';
