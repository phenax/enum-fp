
import Enum from '../src/Enum';
import { prop } from '../src/utils';

const TestType = Enum([ 'Action1', 'Action2', 'Action3' ]);

describe('utils', () => {

    describe('prop', () => {

        it('should return property value', () => {
    
           const obj = { a: 'b', c: 'd' };

           expect(prop(['a'])(obj)).toBe('b');
           expect(prop(['c'])(obj)).toBe('d');
           expect(prop(['unknown'])(obj)).toBeUndefined();
        });

        it('should return property value for nested object', () => {
            const obj = { a: { b: { c: 'd' } } };
 
            expect(prop(['a', 'b'])(obj)).toEqual({ c: 'd' });
            expect(prop(['a', 'b', 'c'])(obj)).toBe('d');
        });

        it('should return default value for non-existant properties', () => {
            const obj = { a: { b: 'c' } };

            expect(prop(['a', 'b'])(obj)).toBe('c');
            expect(prop(['a', 'some', 'unknown', 'territory'], 'UNKNOWN')(obj)).toBe('UNKNOWN');
            expect(prop(['prop','here','non'], 'NOPE')()).toBe('NOPE');
            expect(prop(['prop','here','non'], 'NOPE')(null)).toBe('NOPE');
            expect(prop(['prop','here','non'], 'NOPE')(0)).toBe('NOPE');
            expect(prop(['prop','here','non'], 'NOPE')(6)).toBe('NOPE');
            expect(prop(['prop','here','non'], 'NOPE')('Wow')).toBe('NOPE');
        });
    });
});
