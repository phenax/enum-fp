
import Enum from '../src/Enum';

describe('Enum', () => {
    describe('constructor', () => {
        it('should return an instance without errors', () => {
            const instance = Enum([ 'Action1', 'Action2' ]);
        });

        it('should create constructors for each of the actions', () => {
            const instance = Enum([ 'Action1', 'Action2' ]);

            expect(instance.Action1).toBeInstanceOf(Function);
            expect(instance.Action2).toBeInstanceOf(Function);

            instance.Action1();
            instance.Action2();
        });
    });

    describe('#match', () => {
        it('should match the correct function and call it', () => {
            const Type = Enum([ 'Add', 'Delete' ]);

            const action = Type.Add();

            const onAdd = jest.fn(() => 'Adding');
            const result = Type.match(action, {
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
            const result = Type.match(action, {
                Add: () => 'Adding',
                _: handleDefault,
            });

            expect(result).toBe('Default');
            expect(handleDefault).toHaveBeenCalledTimes(1);
        });

        it('should call the default function when the action is not specified', () => {
            const Type = Enum([ 'Add', 'Delete' ]);

            const action = Type.Delete();

            expect(() => Type.match(action, {
                Add: () => 'Adding',
            })).toThrowError();
        });

        it('should match the correct function and call it with the constructor arguements', () => {
            const Type = Enum([ 'Add', 'Delete' ]);

            const action = Type.Add('Hello', 'World');

            const onAdd = jest.fn((str1, str2) => `Adding - ${str1} ${str2}`);
            const result = Type.match(action, {
                Add: onAdd,
                Delete: () => 'Deleting',
                _: () => 'Default',
            });

            expect(result).toBe('Adding - Hello World');
            expect(onAdd).toHaveBeenCalledTimes(1);
        });

        it('should throw error when the action is invalid', () => {
            const Type = Enum([ 'Add', 'Delete' ]);

            expect(() => Type.match(null, {})).toThrowError();
        });

        it('should throw error when the pattern is not defined', () => {
            const Type = Enum([ 'Add', 'Delete' ]);
            const OtherType = Enum([ 'Hello', 'World' ]);

            expect(() => Type.match(OtherType.Hello(), {})).toThrowError();
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
            const resultOnAdd = Type.match(Type.Add(5, 'Hello World'), pattern);
            const resultOnDelete = Type.match(Type.Delete(5), pattern);

            expect(resultOnAdd).toBe('Adding - [5] Hello World');
            expect(pattern.Add).toHaveBeenCalledTimes(1);
            expect(resultOnDelete).toBe('Deleting - [5]');
            expect(pattern.Delete).toHaveBeenCalledTimes(1);
        });
    });

    describe('#caseOf', () => {
        it('should match the correct function and call it', () => {
            const Type = Enum([ 'Add', 'Delete' ]);

            const action = Type.Add();

            const onAdd = jest.fn(() => 'Adding');
            const result = Type.caseOf({
                Add: onAdd,
                Delete: () => 'Deleting',
                _: () => 'Default',
            })(action);

            expect(result).toBe('Adding');
            expect(onAdd).toHaveBeenCalledTimes(1);
        });
    });
});

