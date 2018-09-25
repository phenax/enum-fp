
import EnumType from '../src';

describe('EnumType', () => {
    describe('constructor', () => {
        it('should return an instance without errors', () => {
            const instance = EnumType([ 'Action1', 'Action2' ]);
        });
    });

    describe('instance', () => {
        it('should create constructors for each of the actions', () => {
            const instance = EnumType([ 'Action1', 'Action2' ]);

            expect(instance.Action1).toBeInstanceOf(Function);
            expect(instance.Action2).toBeInstanceOf(Function);

            instance.Action1();
            instance.Action2();
        });
    });

    describe('matching', () => {
        it('should match the correct function and call it', () => {
            const Type = EnumType([ 'Add', 'Delete' ]);

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
            const Type = EnumType([ 'Add', 'Delete' ]);

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
            const Type = EnumType([ 'Add', 'Delete' ]);

            const action = Type.Delete();

            expect(() => Type.match(action, {
                Add: () => 'Adding',
            })).toThrowError();
        });
    });
});

