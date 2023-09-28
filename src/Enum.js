import { createEnumFactory } from './utils';
import T, { validateArgs } from './Type';

// type TypeConstructor = ...a -> EnumTagType

// createConstructor :: (Enum, ConstructorDescription) -> TypeConstructor
export const createConstructor = (Type, { name, props }) => (...args) => {
    if(props ? !validateArgs(props, args) : false)
        throw new TypeError(`Invalid number of args passed to constructor ${name}`);

    const self = {
        // args :: Array *
        args,
        // name :: String
        name,
        // props :: ?Array String
        props,
        // is :: String | EnumTagType | ConstructorDescription ~> Boolean
        is: otherType => [otherType, otherType.name].indexOf(name) !== -1,
        // match :: Object (* -> b) ~> b
        match: pattern => Type.match(self, pattern),
    };
    return self;
};
// Maybe
const Maybe = createEnumFactory({
    createConstructor: (Type, constr) => value => {
        if (value === null || value === undefined) {
            return Type.Nothing();
        }
        return { ...constr, args: [value] };
    },
})(['Just', 'Nothing']);

// Either
const Either = createEnumFactory({
    createConstructor: (Type, constr) => value => ({
        ...constr,
        args: [value],
        isLeft: true,
        isRight: false,
        fold: (leftFn, rightFn) => leftFn(value),
    }),
})(['Left', 'Right']);

// Exporting Maybe and Either
export { Maybe, Either };

// Enum :: Array String | Object * -> Enum
export default createEnumFactory({ createConstructor });

// Type
export { T };
