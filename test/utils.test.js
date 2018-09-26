
import { reduceTypeConstructors, EnumToken } from '../src/utils';

describe('utils', () => {

    describe('reduceTypeConstructors', () => {

        it('should map all the passed tokens to object of constructors', () => {
            const tokens = [
                EnumToken({ name: 'Action1' }),
                EnumToken({ name: 'Action2' }),
                EnumToken({ name: 'Action3' }),
            ];
    
            const result = reduceTypeConstructors(tokens);
    
            expect(result.Action1).toBeInstanceOf(Function);
            expect(result.Action2).toBeInstanceOf(Function);
            expect(result.Action3).toBeInstanceOf(Function);
        });
    });
});
