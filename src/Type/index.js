import { isList, isObject, matchPattern, listToObject } from '../common-utils';

export const all = (list, fn) => list.length === [...list].filter(fn).length;
export const some = (list, fn) => !![...list].filter(fn).length;
export const values = obj => Object.keys(obj).sort().map(k => obj[k]);

// Tiny Enum to bypass the 
const Enum = typeNames => ({
    match: matchPattern,
    isConstructor: t => typeNames.indexOf(t) !== -1 || typeNames.indexOf(t.name) !== -1,
    ...listToObject(
        name => name,
        name => (...args) => ({ name, args }),
        typeNames,
    ),
});

// Cant use Type to define Type
const Type = Enum([
    'Any',
    'String',
    'Number',
    'Bool',

    'List',
    'Map',
    'Record',

    'Func',
    'Enum',
    'OneOf',
]);

const validateList = (innerType, list) =>
    isList(list) && (
        (innerType && list.length > 0)
            ? all(list, isOfType(innerType))
            : true
    );

export const validateRecord = (shape, obj) => validateArgs(values(shape), values(obj));

export const isOfType = type => value => {
    // Dynamic argument description
    if(typeof type === 'string' && value !== undefined)
        return true;

    if (Type.isConstructor(type)) {
        return !!Type.match(type, {
            Any: () => true,
            String: () => typeof value === 'string',
            Number: () => typeof value === 'number',
            Bool: () => typeof value === 'boolean',
            Func: () => typeof value === 'function',

            List: innerType => validateList(innerType, value),
            Map: innerType => innerType && isObject(value) && validateList(innerType, values(value)),
            Record: shape => isObject(value) && (shape ? validateRecord(shape, value) : true),

            OneOf: typeList => some(typeList, type => isOfType(type)(value)),
            Enum: InnerType => value && InnerType.isConstructor(value),
        });
    }

    return true;
};

export const validateArgs = ([type, ...types], [val, ...vals]) => {
    if(!isOfType(type)(val)) return false;
    return types.length > 0 ? validateArgs(types, vals) : true;
};

export default Type;

