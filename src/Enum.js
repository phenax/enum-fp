
import { reduceTypeConstructors, prop, normalizeSumType } from './utils';
import { match, isConstructor as isConstr } from './common-utils';

// type Pattern = Object (a -> b);

// (constructor)
// Enum :: Array String | Object * -> Enum
const Enum = sumTypeBody => {
    const constructors = normalizeSumType(sumTypeBody);

    // isConstructor :: String ~> Boolean
    const isConstructor = isConstr(constructors.map(prop(['name'])));

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
