
export const reduceTypeConstructors = typeList =>
typeList.reduce((acc, key) => ({
...acc,
[key]: (...args) => EnumTag(key, args)
}), {});

export const reduceTypeNames = typeList => [...typeList];

export const error = msg => {
    throw new Error(msg);
};
