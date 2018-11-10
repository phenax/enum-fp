
import { reduceTypeConstructors, prop, normalizeSumType, matchToDefault } from './utils';
import { matchPattern, isConstructor as isConstr } from './common-utils';

// type Pattern = Object (a -> b);

// (constructor)
// Enum :: Array String | Object * -> Enum
const Enum = sumTypeBody => {
    const constructors = normalizeSumType(sumTypeBody);
    const types = constructors.map(prop(['name']));

    // isConstructor :: String ~> Boolean
    const isConstructor = isConstr(types);
    // isPatternKey :: String -> Boolean
    const isPatternKey = c => c === '_' || isConstructor(c);
    // isValidPattern :: Pattern -> Boolean
    const isValidPattern = p => !!Object.keys(p).filter(isPatternKey).length;

    // cata :: Pattern ~> EnumTagType -> b
    const cata = pattern => instance => {
        if (!instance || !instance.name)
            throw new Error('Invalid instance passed to match');
        if(!isValidPattern(pattern))
            throw new Error('Invalid constructor name in pattern');
        return matchPattern(instance, pattern);
    };

    let self = {
        // match :: EnumTagType ~> Pattern -> b
        match: (instance, pattern) => cata(pattern)(instance),
        cata,
        caseOf: cata,
        reduce: cata,
        isConstructor,
    };

    return {
        // {String} :: TypeConstructor
        ...reduceTypeConstructors(self, constructors),
        ...self,
    };
};

export default Enum;
