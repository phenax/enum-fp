
import EnumType from '../src';

describe('EnumType', () => {
    describe('constructor', () => {
        it('should return an instance without errors', () => {
            const instance = EnumType([ 'Action1', 'Action2' ]);
        });
    });
});

