
import { reduceTypeConstructors, reduceTypeNames, error } from './utils';

export const EnumTag = (name, args = []) => ({
    args,
    name,
    is: otherType => name === otherType,
});

export const EnumType = unionMap => {
    // TODO: Allow passing object instead of array

    const types = [ ...unionMap ];
    const self = {
        ...reduceTypeConstructors(types),
        types: reduceTypeNames(types),
        match: (action, patternMap) => {
            if(!action.name)
                return error('Invalid action passed to match');

            // TODO: Add check to check if all cases are covered in pattern

            const {
            [action.name]: actor,
            _: defaultActor
            } = patternMap;

            const args = action.args || [];
            const fn = actor || defaultActor || (() => error('Missing default case _'));

            return fn(...args);
        },
        caseOf: patternMap => action => self.match(action, patternMap),
    };

    return self;
};

export default EnumType;


/*

// -- Use

const Action = EnumType([ 'Add', 'Delete', 'Edit' ]);

const actn = Action.Add('Hello world');

Action.match(actn, {
    Add: name => `Adding ${name}`,
    Delete: () => 'Deleteing',
    _: () => 'Default case',
});

*/

/*

// -- Ideas

TODO: Add specify predicate to validate value as well
EnumType({
    Add: todo => todo && typeof todo.name === 'string',
});
OR
EnumType({
    Add: {
    Todo: todo => todo && typeof todo.name === 'string',
    NewTodo: name => typeof name === 'string',
    },
})
*/
