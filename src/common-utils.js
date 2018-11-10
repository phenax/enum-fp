
// isArray :: * -> Boolean
export const isArray = arr => Object.prototype.toString.call(arr) === '[object Array]';

export const isObject = obj => obj && obj.toString() === '[object Object]';

// match :: EnumTagType -> Pattern -> b
export const match = (instance, pattern) => {
    if (!instance || !instance.name) throw new Error('Invalid instance passed');

    const action = pattern[instance.name] || pattern._;

    if(!action) throw new Error('Non-Exhaustive pattern. You must pass fallback case `_` in the pattern');

    return action(...instance.args);
};

// TODO: Make it not just for arrays but also other kinds of lists. Check for iteratability
export const isList = isArray;

// listToObject :: (a -> String, a -> b, [a]) -> Object b
export const listToObject = (toKey, toValue, list) =>
    list.reduce((obj, item) => ({ ...obj, [toKey(item)]: toValue(item) }), {});

export const isConstructor = constructors => t => constructors.indexOf(t) !== -1 || constructors.indexOf(t.name) !== -1
