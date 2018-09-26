
import { reduceTypeConstructors, reduceTypeNames, prop, error, EnumToken } from './utils';

// EnumType :: Array String | Object * -> EnumType
const EnumType = enumTokens => {
    const types = enumTokens.map(name => EnumToken({ name }));

    const self = {
        // {String} :: EnumAction
        ...reduceTypeConstructors(types),

        // types :: Array String
        types: types.map(prop(['name'])),

        // matchToDefault :: Object (...a -> b) -> Array a ~> b
        matchToDefault: (patternMap, args = []) => {
            const defaultAction = patternMap._;
            if(!defaultAction) return error('Missing default case _ for match');
            return defaultAction(...args);
        },

        // match :: EnumTagType ~> Object (a -> b) -> b
        match: (token, patternMap) => {
            if (!token) return error('Invalid token passed to match');
            if (!token.name) return error('Invalid token passed to match');

            const action = patternMap[token.name];
            const args = token.args || [];

            if (!action) return self.matchToDefault(patternMap, args);
            return action(...args);
        },

        // caseOf :: Object (a -> b) ~> EnumTagType -> b
        caseOf: patternMap => token => self.match(token, patternMap),
    };

    return self;
};

export default EnumType;
