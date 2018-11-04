
import { reduceTypeConstructors, prop, error, ConstructorDescription, isArray } from './utils';

// matchToDefault :: Object (...a -> b) -> [a] -> b
const matchToDefault = (patternMap, args = []) => {
    const defaultAction = patternMap._;
    if(!defaultAction) return error('Missing default case _ for match');
    return defaultAction(...args);
};

// normalizeSumType :: Array String | Object [a] -> ConstructorDescription
const normalizeSumType = sumType =>
    isArray(sumType)
        ? sumType.map(name => ConstructorDescription({ name }))
        : Object.keys(sumType)
            .map(name => ConstructorDescription({ name, props: sumType[name] }));

// (constructor)
// Enum :: Array String | Object * -> Enum
const Enum = sumTypeBody => {
    const constructors = normalizeSumType(sumTypeBody);
    const types = constructors.map(prop(['name']));
    const isConstructor = c => c === '_' || (types.indexOf(c) !== -1);
    const isValidPattern = p => !!Object.keys(p).filter(isConstructor).length;

    let self = {
        isConstructor,

        // match :: EnumTagType ~> Object (a -> b) -> b
        match: (token, patternMap) => {
            if (!token || !token.name)       throw new Error('Invalid token passed to match');
            if(!isValidPattern(patternMap))  throw new Error('Invalid constructor in pattern');

            const action = patternMap[token.name];
            const args = token.args || [];

            if (!action) return matchToDefault(patternMap, args);
            return action(...args);
        },

        // caseOf :: Object (a -> b) ~> EnumTagType -> b
        caseOf: patternMap => token => self.match(token, patternMap),
    };

    return {
        // {String} :: TypeConstructor
        ...reduceTypeConstructors(self, constructors),
        ...self,
    };
};

export default Enum;
