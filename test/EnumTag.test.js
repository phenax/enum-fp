
import EnumType from '../src/EnumType';
import EnumTag from '../src/EnumTag';

const TestType = EnumType([ 'Type', 'TypeWithArgs', 'Tag', 'NewTag' ]);

describe('EnumTag', () => {

    describe('#constructor', () => {

        it('should have name, props and args', () => {
            const Tag = EnumTag('Type', TestType);
            const TagWithArgs = EnumTag('TypeWithArgs', TestType, [ 'id', 'message' ]);

            const tag = Tag();
            const tagWithArgs = TagWithArgs(5, 'Hello world');

            expect(tag.name).toBe('Type');
            expect(tag.props).toBeFalsy();
            expect(tag.args).toHaveLength(0);

            expect(tagWithArgs.name).toBe('TypeWithArgs');
            expect(tagWithArgs.props).toHaveLength(2);
            expect(tagWithArgs.args).toHaveLength(2);
        });

        it('should throw error if there is a mismatch in the props and arguements', () => {
            const Tag = EnumTag('Type', TestType, [ 'a', 'b' ]);

            expect(() => Tag(1, 2)).not.toThrowError();
            expect(() => Tag()).toThrowError();
            expect(() => Tag(1)).toThrowError();
            expect(() => Tag(1, 2, 3)).toThrowError();
        });
    });

    describe('#is', () => {
        
        it('should return true for equivalent tokens and false otherwise', () => {

            const Tag = EnumTag('Tag', TestType);
            const Tag1 = EnumTag('Tag', TestType);
            const Tag2 = EnumTag('NewTag', TestType);

            expect(Tag().is(Tag1())).toBeTruthy();
            expect(Tag().is(Tag2())).not.toBeTruthy();
        });
    });

    describe('#match', () => {
        
        it('should match the correct function and call it', () => {
            const Type = EnumType([ 'Add', 'Delete' ]);

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
            const Type = EnumType([ 'Add', 'Delete' ]);

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
            const Type = EnumType([ 'Add', 'Delete' ]);

            const action = Type.Delete();

            expect(() => action.match({
                Add: () => 'Adding',
            })).toThrowError();
        });

        it('should match the correct function and call it with the constructor arguements', () => {
            const Type = EnumType([ 'Add', 'Delete' ]);

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
            const Type = EnumType({
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
