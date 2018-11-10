
import createConstructor from './createConstructor';
import { isArray, listToObject } from './common-utils';

// TODO: Sanitize name to alphanumeric value
// type Constructor = { name: String, props: [Type|String] };
export const Constructor = x => x;

// reduceTypeConstructors :: (Enum, Array Constructor) -> Object EnumAction
export const reduceTypeConstructors = (Type, constrDescrs) =>
    listToObject(
        prop(['name']),
        constr => createConstructor(Type, constr),
        constrDescrs,
    );

// prop :: Array -> Object
export const prop = (path, defaultVal) => obj =>
    path.reduce((newObj, key) =>
        (newObj || {}).hasOwnProperty(key) ? newObj[key] : defaultVal,
        obj
    );

// normalizeSumType :: Array String | Object [a] -> Constructor
export const normalizeSumType = sumType =>
    isArray(sumType)
        ? sumType.map(name => Constructor({ name }))
        : Object.keys(sumType)
            .map(name => Constructor({ name, props: sumType[name] }));
