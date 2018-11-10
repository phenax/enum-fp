
import { reduceTypeConstructors, prop, normalizeSumType, match } from './utils';

// type Pattern = Object (a -> b);

// (constructor)
// Enum :: Array String | Object * -> Enum
const Enum = sumTypeBody => {
    const constructors = normalizeSumType(sumTypeBody);
    const types = constructors.map(prop(['name']));

    // isConstructor :: String ~> Boolean
    const isConstructor = c => types.indexOf(c) !== -1 || types.indexOf(c.name) !== -1;

    // cata :: Pattern ~> EnumTagType -> b
    const cata = pattern => instance => match(instance, pattern);

    let self = {
        match,
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
