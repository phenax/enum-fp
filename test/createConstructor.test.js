
import Enum from '../src/Enum';
import createConstructor from '../src/createConstructor';
import { Constructor as Constr } from '../src/utils';

const TestType = Enum([ 'Type', 'TypeWithArgs', 'Tag', 'NewTag' ]);

describe('createConstructor', () => {

    describe('#constructor', () => {

        it('should have name, props and args', () => {
            const Tag = createConstructor(TestType, Constr({ name: 'Type' }));
            const TagWithArgs = createConstructor(TestType, Constr({
                name: 'TypeWithArgs',
                props: [ 'id', 'message' ],
            }));

            const tag = Tag();
            const tagWithArgs = TagWithArgs(5, 'Hello world');

            expect(tag.name).toBe('Type');
            expect(tag.props).toBeFalsy();
            expect(tag.args).toHaveLength(0);

            expect(tagWithArgs.name).toBe('TypeWithArgs');
            expect(tagWithArgs.props).toHaveLength(2);
            expect(tagWithArgs.args).toHaveLength(2);
        });

        it('should throw error if there is a mismatch in the props and arguements length', () => {
            const Tag = createConstructor(TestType, Constr({
                name: 'Type',
                props: [ 'a', 'b' ],
            }));

            expect(() => Tag(1, 2)).not.toThrowError();
            expect(() => Tag()).toThrowError();
            expect(() => Tag(1)).toThrowError();
            expect(() => Tag(1, 2, 3)).toThrowError();
        });

        // it('should validate types and throw error for invalid ones (basic types)', () => {
        //     const Tag = createConstructor(TestType, Constr({
        //         name: 'Type',
        //         props: [ T.Number(), T.String() ],
        //     }));

        //     expect(() => Tag(0, '')).toThrowError();
        //     expect(() => Tag(1, 'Helo world')).toThrowError();
        //     expect(() => Tag(1, 2)).not.toThrowError();
        //     expect(() => Tag()).toThrowError();
        //     expect(() => Tag(1)).toThrowError();
        //     expect(() => Tag(1, 2, 3)).toThrowError();
        // });
    });

    describe('#is', () => {
        
        it('should return true for equivalent tokens and false otherwise', () => {

            const Tag = createConstructor(TestType, Constr({ name: 'Tag' }));
            const Tag1 = createConstructor(TestType, Constr({ name: 'Tag' }));
            const Tag2 = createConstructor(TestType, Constr({ name: 'NewTag' }));

            expect(Tag().is(Tag1())).toBeTruthy();
            expect(Tag().is(Tag2())).not.toBeTruthy();
        });
    });

    describe('#match', () => {
        
        it('should match the correct function and call it', () => {
            const Type = Enum([ 'Add', 'Delete' ]);

            const action = Type.Add();

            const onAdd = jest.fn(() => 'Adding');
            const result = action.match({
                Add: onAdd,
                Delete: () => 'Deleting',
                _: () => 'Default',
            });

            expect(result).toBe('Adding');
            expect(onAdd).toHaveBeenCalledTimes(1);
        });

        it('should call the default function when the action is not specified', () => {
            const Type = Enum([ 'Add', 'Delete' ]);

            const action = Type.Delete();

            const handleDefault = jest.fn(() => 'Default');
            const result = action.match({
                Add: () => 'Adding',
                _: handleDefault,
            });

            expect(result).toBe('Default');
            expect(handleDefault).toHaveBeenCalledTimes(1);
        });

        it('should call the default function when the action is not specified', () => {
            const Type = Enum([ 'Add', 'Delete' ]);

            const action = Type.Delete();

            expect(() => action.match({
                Add: () => 'Adding',
            })).toThrowError();
        });

        it('should match the correct function and call it with the constructor arguements', () => {
            const Type = Enum([ 'Add', 'Delete' ]);

            const action = Type.Add('Hello', 'World');

            const onAdd = jest.fn((str1, str2) => `Adding - ${str1} ${str2}`);
            const result = action.match({
                Add: onAdd,
                Delete: () => 'Deleting',
                _: () => 'Default',
            });

            expect(result).toBe('Adding - Hello World');
            expect(onAdd).toHaveBeenCalledTimes(1);
        });

        it('should match the correct function and call it with the constructor arguements', () => {
            const Type = Enum({
                Add: [ 'id', 'text' ],
                Delete: [ 'id' ],
            });

            const pattern = {
                Add: jest.fn((id, name) => `Adding - [${id}] ${name}`),
                Delete: jest.fn(id => `Deleting - [${id}]`),
            };
            const resultOnAdd = Type.Add(5, 'Hello World').match(pattern);
            const resultOnDelete = Type.Delete(5).match(pattern);

            expect(resultOnAdd).toBe('Adding - [5] Hello World');
            expect(pattern.Add).toHaveBeenCalledTimes(1);
            expect(resultOnDelete).toBe('Deleting - [5]');
            expect(pattern.Delete).toHaveBeenCalledTimes(1);
        });
    });
});
