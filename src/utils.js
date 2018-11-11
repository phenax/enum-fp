
// TODO: Sanitize name to alphanumeric value
// type Constructor = { name: String, props: [Type|String] };
export const Constructor = x => x;

// prop :: Array -> Object
export const prop = (path, defaultVal) => obj =>
    path.reduce((newObj, key) =>
        (newObj || {}).hasOwnProperty(key) ? newObj[key] : defaultVal,
        obj
    );

// normalizeSumType :: Array String | Object [a] -> Constructor
export const normalizeSumType = sumType =>
    isList(sumType)
        ? sumType.map(name => Constructor({ name }))
        : Object.keys(sumType)
            .map(name => Constructor({ name, props: sumType[name] }));


const isObjectOfType = typeName => a => ({}).toString.call(a) === `[object ${typeName}]`;

// isList :: * -> Boolean
export const isList = isObjectOfType('Array');

// isObject:: * -> Boolean[object 
export const isObject = isObjectOfType('Object');

// match :: EnumTagType -> Pattern -> b
export const match = (instance, pattern) => {
    if (!instance || !instance.name) throw new Error('Invalid instance passed');

    const action = pattern[instance.name] || pattern._;

    if(!action) throw new Error('Non-Exhaustive pattern. You must pass fallback case `_` in the pattern');

    return action(...instance.args);
};

// listToObject :: (a -> String, a -> b, [a]) -> Object b
export const listToObject = (toKey, toValue, list) =>
    list.reduce((obj, item) => ({ ...obj, [toKey(item)]: toValue(item) }), {});

export const isConstructor = constructors => t => constructors.indexOf(t) !== -1 || constructors.indexOf(t.name) !== -1


export const createEnumConstructor = options => sumTypeBody => {
    const constructors = normalizeSumType(sumTypeBody);
    const { createConstructor } = options;

    const isConstr = isConstructor(constructors.map(prop(['name'])));

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
