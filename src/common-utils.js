
// isArray :: * -> Boolean
export const isArray = arr => Object.prototype.toString.call(arr) === '[object Array]';

export const isObject = obj => obj && obj.toString() === '[object Object]';

// matchPattern ::  (EnumTagType, Object (a -> b)) -> b
export const matchPattern = (t, pattern) => {
    const action = pattern[t.name] || pattern._;
    if(!action) throw new Error('Pattern passed is non exhaustive. Please pass a fallback case `_`.');
    return action(...t.args);
};

// TODO: Make it not just for arrays but also other kinds of lists. Check for iteratability
export const isList = isArray;

// listToObject :: (a -> String, a -> b, [a]) -> Object b
export const listToObject = (toKey, toValue, list) =>
    list.reduce((obj, item) => ({ ...obj, [toKey(item)]: toValue(item) }), {});

export const isConstructor = constructors => t => constructors.indexOf(t) !== -1 || constructors.indexOf(t.name) !== -1
