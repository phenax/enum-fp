
import EnumType from '../src/EnumType';
import { reduceTypeConstructors, ConstructorDescription } from '../src/utils';

const TestType = EnumType([ 'Action1', 'Action2', 'Action3' ]);

describe('utils', () => {

    describe('reduceTypeConstructors', () => {

        it('should map all the passed tokens to object of constructors', () => {
            const tokens = [
                ConstructorDescription({ name: 'Action1' }),
                ConstructorDescription({ name: 'Action2' }),
                ConstructorDescription({ name: 'Action3' }),
            ];
    
            const result = reduceTypeConstructors(TestType, tokens);
    
            expect(result.Action1).toBeInstanceOf(Function);
            expect(result.Action2).toBeInstanceOf(Function);
            expect(result.Action3).toBeInstanceOf(Function);
        });
    });
});
