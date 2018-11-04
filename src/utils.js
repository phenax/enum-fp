
import createConstructor from './createConstructor';

// TODO: Sanitize name to alphanumeric value
// ConstructorDescription :: Object -> ConstructorDescription
export const ConstructorDescription = ({ name, props }) => ({ name, props });

// reduceTypeConstructors :: (Enum, Array ConstructorDescription) -> Object EnumAction
export const reduceTypeConstructors = (Type, subTypes) =>
    subTypes.reduce((obj, subtype) => ({
        ...obj,
        [subtype.name]: createConstructor(subtype.name, Type, subtype.props),
    }), {});

// prop :: Array -> Object
export const prop = ([key, ...path], defaultVal) => obj =>
    (obj || {}).hasOwnProperty(key)
        ? (path.length ? prop(path, defaultVal)(obj[key]) : obj[key])
        : defaultVal;

// isArray :: * -> Boolean
export const isArray = arr =>
    Object.prototype.toString.call(arr) === '[object Array]';

// matchToDefault :: Object (...a -> b) -> [a] -> b
export const matchToDefault = (patternMap, args) => {
    const defaultAction = patternMap._;
    if(!defaultAction) throw new Error('Missing default case _ for match');
    return defaultAction(...args);
};

// normalizeSumType :: Array String | Object [a] -> ConstructorDescription
export const normalizeSumType = sumType =>
    isArray(sumType)
        ? sumType.map(name => ConstructorDescription({ name }))
        : Object.keys(sumType)
            .map(name => ConstructorDescription({ name, props: sumType[name] }));
