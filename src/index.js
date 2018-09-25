
import { reduceTypeConstructors, reduceTypeNames, prop, error, EnumToken } from './utils';

// type Config = Array | Object *

// EnumType :: Config -> EnumType
export const EnumType = enumTokens => {
    // TODO: Allow passing object instead of array

    const types = enumTokens.map(name => EnumToken({ name }));

    const self = {
        ...reduceTypeConstructors(types),

        // types :: Array String
        types: types.map(prop(['name'])),

        // match :: EnumTag ~> Object (a -> b) -> b
        match: (token, patternMap) => {
            if (!token.name) return error('Invalid token passed to match');

            const { [token.name]: action, _: defaultAction } = patternMap;

            const args = token.args || [];
            const fn = action || defaultAction;

            if (!fn) return error('Missing default case _ for match');
            return fn(...args);
        },

        // caseOf :: Object (a -> b) ~> EnumTag -> b
        caseOf: patternMap => token => self.match(token, patternMap),
    };

    return self;
};

export default EnumType;

/*

// -- Ideas

TODO: Add specify predicate to validate value as well

EnumType({
    Add: message => typeof message === 'string',
});

OR

EnumType({
    Add: [ 'string' ],
});

OR

EnumType({
    Add: {
        Todo: todo => todo && typeof todo.name === 'string',
        NewTodo: name => typeof name === 'string',
    },
})
*/
