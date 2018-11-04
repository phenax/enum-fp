
import { reduceTypeConstructors, prop, error, ConstructorDescription, isArray } from './utils';

// matchToDefault :: Object (...a -> b) -> Array a ~> b
const matchToDefault = (patternMap, args = []) => {
    const defaultAction = patternMap._;
    if(!defaultAction) return error('Missing default case _ for match');
    return defaultAction(...args);
};

// (constructor)
// Enum :: Array String | Object * -> Enum
const Enum = sumTypeBody => {
    const constructors = isArray(sumTypeBody)
        ? sumTypeBody.map(name => ConstructorDescription({ name }))
        : Object.keys(sumTypeBody)
            .map(name => ConstructorDescription({ name, props: sumTypeBody[name] }));

    const types = constructors.map(prop(['name']));

    let self = {
        // isConstructor :: String -> Boolean
        isConstructor: c => c === '_' || (types.indexOf(c) !== -1),

        // match :: EnumTagType ~> Object (a -> b) -> b
        match: (token, patternMap) => {
            if (!token || !token.name) return error('Invalid token passed to match');

            const isValidPattern = !!Object.keys(patternMap).filter(self.isConstructor).length;

            // console.log('>> patternMap', types, Object.keys(patternMap), Object.keys(patternMap).filter(self.isConstructor));

            if(!isValidPattern) return error('Invalid constructor in pattern');

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
    };;
};

export default Enum;
