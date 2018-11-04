
import { reduceTypeConstructors, prop, normalizeSumType, matchToDefault } from './utils';

// type Pattern = Object (a -> b);

// (constructor)
// Enum :: Array String | Object * -> Enum
const Enum = sumTypeBody => {
    const constructors = normalizeSumType(sumTypeBody);
    const types = constructors.map(prop(['name']));

    // isConstructor :: String ~> Boolean
    const isConstructor = c => types.indexOf(c) !== -1 || types.indexOf(c.name) !== -1;
    // isPatternKey :: String -> Boolean
    const isPatternKey = c => c === '_' || isConstructor(c);
    // isValidPattern :: Pattern -> Boolean
    const isValidPattern = p => !!Object.keys(p).filter(isPatternKey).length;

    // cata :: Pattern ~> EnumTagType -> b
    const cata = patternMap => token => {
        if (!token || !token.name)       throw new Error('Invalid token passed to match');
        if(!isValidPattern(patternMap))  throw new Error('Invalid constructor in pattern');

        const action = patternMap[token.name];
        const args = token.args;

        if (!action) return matchToDefault(patternMap, args);
        return action(...args);
    };

    let self = {
        // match :: EnumTagType ~> Pattern -> b
        match: (token, pattern) => cata(pattern)(token),
        cata,
        caseOf: cata,
        isConstructor,
    };

    return {
        // {String} :: TypeConstructor
        ...reduceTypeConstructors(self, constructors),
        ...self,
    };
};

export default Enum;
