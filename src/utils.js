
import createConstructor from './createConstructor';
import { isArray, listToObject } from './common-utils';

// TODO: Sanitize name to alphanumeric value
// type ConstructorDescription = { name: String, props: [Type|String] };

// prop :: Array -> Object
export const prop = ([key, ...path], defaultVal) => obj =>
    (obj || {}).hasOwnProperty(key)
        ? (path.length ? prop(path, defaultVal)(obj[key]) : obj[key])
        : defaultVal;

// reduceTypeConstructors :: (Enum, Array ConstructorDescription) -> Object EnumAction
export const reduceTypeConstructors = (Type, constrDescrs) =>
    listToObject(
        prop(['name']),
        constr => createConstructor(Type, constr),
        constrDescrs,
    );

// normalizeSumType :: Array String | Object [a] -> ConstructorDescription
export const normalizeSumType = sumType =>
    isArray(sumType)
        ? sumType.map(name => ({ name }))
        : Object.keys(sumType)
            .map(name => ({ name, props: sumType[name] }));
