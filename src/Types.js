import Enum from './Enum';

// Cant use Type to define Type
const Type = Enum([
    'String',
    'Number',

    'List',
    'Map',
    'Record',

    'Enum',

    'Any', // Avoid using (use description instead)
    'Optional',
    'OneOf',
]);

const all = (list, fn) => list.length === [...list].filter(fn).length;
const getValues = obj => Object.keys(obj).sort().map(k => obj[k]);

const log = (...label) => data => {
    console.log(...label, data);
    return data;
};

// Not just for arrays. TODO: Check for iteratability
const isList = list => Array.isArray(list);
const isObject = obj => obj && obj.toString() === '[object Object]';

const validateList = (innerType, list) =>
    isList(list) && (
        (innerType && list.length > 0)
            ? all(list, isOfType(innerType))
            : true
    );

const validateRecord = (shape, obj) => validateTypes(getValues(shape), getValues(obj));

export const isOfType = type => value => {
    // Dynamic argument description
    if(typeof type === 'string' && value !== undefined)
        return true;

    if (Type.isConstructor(type)) {
        return !!Type.match(type, {
            String: () => typeof value === 'string',
            Number: () => typeof value === 'number',

            List: innerType => validateList(innerType, value),
            Map: innerType => innerType && isObject(value) && validateList(innerType, getValues(value)),
            Record: shape => isObject(value) && (shape ? validateRecord(shape, value) : true),
            _: () => false,
        });
    }

    return true;
};

export const validateTypes = ([type, ...types], [value, ...values]) => {
    if(!isOfType(type)(value)) return false;
    return types.length > 0 ? validateTypes(types, values) : true;
};

export default Type;

