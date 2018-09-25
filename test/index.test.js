
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
});

