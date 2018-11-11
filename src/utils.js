// data Constructor = { name: String, props: [Type|String] };
export const Constructor = x => x;

// prop :: Array -> Object
export const prop = (path, defaultVal) => obj => path.reduce(
    (o, key) => (o || {}).hasOwnProperty(key) ? o[key] : defaultVal,
    obj,
);

// normalizeSumType :: Array String | Object [a] -> Constructor
const normalizeSumType = sumType =>
    isList(sumType)
        ? sumType.map(name => Constructor({ name }))
        : Object.keys(sumType)
            .map(name => Constructor({ name, props: sumType[name] }));

// match :: EnumTagType -> Pattern -> b
const match = (instance, pattern) => {
    if (!instance || !instance.name) throw new Error('Invalid instance passed');

    const action = pattern[instance.name] || pattern._;

    if(!action) throw new Error('Non-Exhaustive pattern. You must pass fallback case `_` in the pattern');

    return action(...instance.args);
};

// listToObject :: (a -> String, a -> b, [a]) -> Object b
const listToObject = (toKey, toValue, list) =>
    list.reduce((obj, item) => ({ ...obj, [toKey(item)]: toValue(item) }), {});

// createEnumFactory :: Options -> Array String | Object Type -> Enum
export const createEnumFactory = options => sumTypeBody => {
    const constructors = normalizeSumType(sumTypeBody);
    const { createConstructor } = options;

    const typeNames = constructors.map(prop(['name']));
    const isConstr = t =>
        typeNames.indexOf(t) !== -1 || typeNames.indexOf(t.name) !== -1;

    // cata :: Pattern ~> EnumTagType -> b
    const cata = pattern => instance => match(instance, pattern);

    let self = {
        match,
        cata,
        caseOf: cata,
        reduce: cata,

        // isConstructor :: String ~> Boolean
        isConstructor: isConstr,
    };

    return {
        // {String} :: TypeConstructor
        ...listToObject(
            prop(['name']),
            constr => createConstructor(self, constr),
            constructors,
        ),
        ...self,
    };
};


const isObjectOfType = typeName => a => ({}).toString.call(a) === `[object ${typeName}]`;
// isList :: * -> Boolean
export const isList = isObjectOfType('Array');
// isObject:: * -> Boolean[object 
export const isObject = isObjectOfType('Object');

export const values = obj => Object.keys(obj).sort().map(k => obj[k]);
