
import { reduceTypeConstructors, reduceTypeNames, prop, error, EnumToken, isArray } from './utils';

// EnumType :: Array String | Object * -> EnumType
const EnumType = enumTokens => {
    const types = isArray(enumTokens)
        ? enumTokens.map(name => EnumToken({ name }))
        : Object.keys(enumTokens).map(name => EnumToken({ name, props: enumTokens[name] }));

    let self = {
        // types :: Array String
        types: types.map(prop(['name'])),

        // isValidConstructor :: String -> Boolean
        isValidConstructor: c => c === '_' || !!self[c],

        // matchToDefault :: Object (...a -> b) -> Array a ~> b
        matchToDefault: (patternMap, args = []) => {
            const defaultAction = patternMap._;
            if(!defaultAction) return error('Missing default case _ for match');
            return defaultAction(...args);
        },

        // match :: EnumTagType ~> Object (a -> b) -> b
        match: (token, patternMap) => {
            if (!token || !token.name) return error('Invalid token passed to match');

            const isValidPattern = !!Object.keys(patternMap).filter(self.isValidConstructor).length;

            if(!isValidPattern) return error('Invalid constructor in pattern');

            const action = patternMap[token.name];
            const args = token.args || [];

            if (!action) return self.matchToDefault(patternMap, args);
            return action(...args);
        },

        // caseOf :: Object (a -> b) ~> EnumTagType -> b
        caseOf: patternMap => token => self.match(token, patternMap),
    };

    self = {
        // {String} :: EnumAction
        ...reduceTypeConstructors(self, types),
        ...self,
    };

    return self;
};

export default EnumType;
