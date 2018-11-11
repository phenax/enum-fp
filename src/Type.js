import { isList, isObject, listToObject, isConstructor, createEnumConstructor } from './utils';

// Tiny ArgLessEnum to bypass the circular dependency shithole
const ArgLessEnum = createEnumConstructor({
    createConstructor: (Type, constr) => (...args) => ({ ...constr, args }),
});

export const values = obj => Object.keys(obj).sort().map(k => obj[k]);

// type Type = Type|String;

// Cant use Type to define Type so ArgLessEnum
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

// validateList :: (Type, [a]) -> Boolean
const validateList = (innerType, list) =>
    isList(list) && (
        (innerType && list.length > 0)
            ? list.length === [...list].filter(isOfType(innerType)).length
            : true
    );

// validateRecord :: Object Type -> Object a -> Boolean
export const validateRecord = (shape, obj) => validateArgs(values(shape), values(obj));

// isOfType :: Type -> a -> Boolean
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

    return false;
};

// validateArgs :: ([Type], [a]) -> Bool
export const validateArgs = (typeList, valueList) => {
    if(typeList.length !== valueList.length) return false;

    const [type, ...types] = typeList;
    const [val, ...vals] = valueList;

    if(!isOfType(type)(val)) return false;

    return types.length > 0 ? validateArgs(types, vals) : true;
}

export default Type;

