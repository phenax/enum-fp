import Enum from './Enum';

// Cant use Type to define Type
const Type = Enum([
    'Any', // Avoid using (use description instead)
    'String',
    'Number',
    'Bool',

    'List',
    'Map',
    'Record',

    'Enum',
    'OneOf',
]);

const all = (list, fn) => list.length === [...list].filter(fn).length;
const some = (list, fn) => !![...list].filter(fn).length;
const getValues = obj => Object.keys(obj).sort().map(k => obj[k]);

const log = (...label) => data => {
    console.log(...label, data);
    return data;
};

// TODO: Make it not just for arrays but also other kinds of lists. Check for iteratability
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
            Any: () => true,
            String: () => typeof value === 'string',
            Number: () => typeof value === 'number',
            Bool: () => typeof value === 'boolean',

            List: innerType => validateList(innerType, value),
            Map: innerType => innerType && isObject(value) && validateList(innerType, getValues(value)),
            Record: shape => isObject(value) && (shape ? validateRecord(shape, value) : true),

            OneOf: typeList => some(typeList, type => isOfType(type)(value)),
            Enum: Type => value && Type.isConstructor(value),

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

