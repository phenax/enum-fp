
import EnumType from './EnumType';

export default EnumType;

/*

TODO: Allow passing object instead of array
TODO: Add specify predicate to validate value

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
