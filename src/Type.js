import { isList, isObject, listToObject, isConstructor } from './common-utils';
import ArgLessEnum from './ArgLessEnum';

export const values = obj => Object.keys(obj).sort().map(k => obj[k]);

// Cant use Type to define Type
const Type = ArgLessEnum([
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
            ? list.length === [...list].filter(isOfType(innerType)).length
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

            OneOf: typeList => !![...typeList].filter(type => isOfType(type)(value)).length,
            Enum: InnerType => value && InnerType.isConstructor(value),
        });
    }

    return true;
};

export const validateArgs = ([type, ...types], [val, ...vals]) =>
    !isOfType(type)(val)
        ? false
        : types.length > 0
            ? validateArgs(types, vals)
            : true;

export default Type;

