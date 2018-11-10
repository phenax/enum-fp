
import { matchPattern, listToObject, isConstructor } from './common-utils';

// Tiny Enum to bypass the circular dependency shithole
const Enum = typeNames => ({
    match: matchPattern,
    isConstructor: isConstructor(typeNames),
    ...listToObject(
        name => name,
        name => (...args) => ({ name, args }),
        typeNames,
    ),
});

export default Enum;
