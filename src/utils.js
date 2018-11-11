
import createConstructor from './createConstructor';

// TODO: Sanitize name to alphanumeric value
// type Constructor = { name :: String, props :: [String] };
export const Constructor = x => x;

// reduceTypeConstructors :: (Enum, Array Constructor) -> Object EnumAction
export const reduceTypeConstructors = (Type, constrDescrs) =>
    constrDescrs.reduce((obj, constr) => ({
        ...obj,
        [constr.name]: createConstructor(Type, constr),
    }), {});

// prop :: Array -> Object
export const prop = (path, defaultVal) => obj =>
    path.reduce((newObj, key) =>
        (newObj || {}).hasOwnProperty(key) ? newObj[key] : defaultVal,
    obj
    );

// isArray :: * -> Boolean
export const isArray = arr => ({}).toString.call(arr) === '[object Array]';

// match :: EnumTagType -> Pattern -> b
export const match = (instance, pattern) => {
    if (!instance || !instance.name) throw new Error('Invalid instance passed');

    const action = pattern[instance.name] || pattern._;

    if(!action) throw new Error('Non-Exhaustive pattern. You must pass fallback case `_` in the pattern');

    return action(...instance.args);
};

// normalizeSumType :: Array String | Object [a] -> Constructor
export const normalizeSumType = sumType =>
    isArray(sumType)
        ? sumType.map(name => Constructor({ name }))
        : Object.keys(sumType)
            .map(name => Constructor({ name, props: sumType[name] }));
