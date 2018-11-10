import Enum from '../src/Enum';
import T, { isOfType, validateTypes } from '../src/Types';

describe('Types', () => {

    describe('Create types', () => {
        it('should allow to create instances using all constructors', () => {
            expect(T.Any().name).toBe('Any');
            expect(T.String().name).toBe('String');
            expect(T.Number().name).toBe('Number');

            expect(T.List().name).toBe('List');
            expect(T.Map().name).toBe('Map');
            expect(T.Record().name).toBe('Record');

            expect(T.Enum().name).toBe('Enum');
            expect(T.OneOf().name).toBe('OneOf');
        });
    });

    describe('isOfType', () => {

        describe('Basic types', () => {
            it('should match ANY', () => {
                expect(isOfType(T.Any())('Hello world')).toBe(true);
                expect(isOfType(T.Any())(5)).toBe(true);
                expect(isOfType(T.Any())(undefined)).toBe(true);
                expect(isOfType(T.Any())(null)).toBe(true);
                expect(isOfType(T.Any())(NaN)).toBe(true);
                expect(isOfType(T.Any())(Infinity)).toBe(true);
                expect(isOfType(T.Any())({})).toBe(true);
                expect(isOfType(T.Any())([])).toBe(true);
            });

            it('should match string', () => {
                expect(isOfType(T.String())('Hello world')).toBe(true);
                expect(isOfType(T.String())(5)).toBe(false);
                expect(isOfType(T.String())(undefined)).toBe(false);
                expect(isOfType(T.String())(null)).toBe(false);
                expect(isOfType(T.String())(NaN)).toBe(false);
                expect(isOfType(T.String())(Infinity)).toBe(false);
                expect(isOfType(T.String())({})).toBe(false);
                expect(isOfType(T.String())([])).toBe(false);
            });
    
            it('should match number', () => {
                expect(isOfType(T.Number())('Hello world')).toBe(false);
                expect(isOfType(T.Number())(5)).toBe(true);
                expect(isOfType(T.Number())(undefined)).toBe(false);
                expect(isOfType(T.Number())(null)).toBe(false);
                expect(isOfType(T.Number())(NaN)).toBe(true);
                expect(isOfType(T.Number())(Infinity)).toBe(true);
                expect(isOfType(T.Number())({})).toBe(false);
                expect(isOfType(T.Number())([])).toBe(false);
            });
            it('should match boolean', () => {
                expect(isOfType(T.Bool())(true)).toBe(true);
                expect(isOfType(T.Bool())(false)).toBe(true);
                expect(isOfType(T.Bool())(5)).toBe(false);
                expect(isOfType(T.Bool())(undefined)).toBe(false);
                expect(isOfType(T.Bool())(null)).toBe(false);
                expect(isOfType(T.Bool())(NaN)).toBe(false);
                expect(isOfType(T.Bool())(Infinity)).toBe(false);
                expect(isOfType(T.Bool())({})).toBe(false);
                expect(isOfType(T.Bool())([])).toBe(false);
            });
        });

        describe('Record types', () => {
            it('should match List', () => {
                expect(isOfType(T.List())([])).toBe(true);
                expect(isOfType(T.List())([null])).toBe(true);
                expect(isOfType(T.List())([undefined])).toBe(true);
                expect(isOfType(T.List())(['wow'])).toBe(true);
                expect(isOfType(T.List())([1, 'wow'])).toBe(true);
    
                expect(isOfType(T.List(T.String()))([])).toBe(true);
                expect(isOfType(T.List(T.String()))(['Hello'])).toBe(true);
                expect(isOfType(T.List(T.String()))([1, 'HEllo'])).toBe(false);
                expect(isOfType(T.List(T.String()))([[]])).toBe(false);
                expect(isOfType(T.List(T.String()))([null])).toBe(false);
                expect(isOfType(T.List(T.String()))([undefined])).toBe(false);
    
                expect(isOfType(T.List())(null)).toBe(false);
                expect(isOfType(T.List())(undefined)).toBe(false);
                expect(isOfType(T.List())('Hello')).toBe(false);
                expect(isOfType(T.List())(23)).toBe(false);
                expect(isOfType(T.List())({})).toBe(false);
            });

            it('should match Map', () => {
                expect(isOfType(T.Map(T.String()))({})).toBe(true);
                expect(isOfType(T.Map(T.String()))({ v: 'Hello' })).toBe(true);
                expect(isOfType(T.Map(T.String()))({ v: 1 })).toBe(false);
                expect(isOfType(T.Map(T.String()))({ a: '4', b: 3 })).toBe(false);
                expect(isOfType(T.Map(T.String()))([{ a: undefined }])).toBe(false);
                expect(isOfType(T.Map(T.String()))([{ a: null }])).toBe(false);
    
                // No innerType will return false for all values
                expect(isOfType(T.Map())(null)).toBe(false);
                expect(isOfType(T.Map())(undefined)).toBe(false);
                expect(isOfType(T.Map())('Hello')).toBe(false);
                expect(isOfType(T.Map())(23)).toBe(false);
                expect(isOfType(T.Map())({})).toBe(false);
            });
    
            it('should match Record', () => {
                expect(isOfType(T.Record())([])).toBe(false);
                expect(isOfType(T.Record())({})).toBe(true);
                expect(isOfType(T.Record())(null)).toBe(false);
                expect(isOfType(T.Record())(undefined)).toBe(false);
                expect(isOfType(T.Record())('Hello')).toBe(false);
                expect(isOfType(T.Record())(23)).toBe(false);
    
                const shape = {
                    name: T.String(),
                    age: T.Number(),
                };
                expect(isOfType(T.Record(shape))({})).toBe(false);
                expect(isOfType(T.Record(shape))([])).toBe(false);
                expect(isOfType(T.Record(shape))({
                    name: 'Hello world',
                    age: 50,
                })).toBe(true);
                expect(isOfType(T.Record(shape))({
                    name: 'Hello world',
                    age: '50',
                })).toBe(false);
                expect(isOfType(T.Record(shape))({
                    name: {},
                    age: '50',
                })).toBe(false);
                expect(isOfType(T.Record(shape))({ name: 'Hllo world' })).toBe(false);
            });
        });

        describe('Compound types', () => {
            it('should match OneOf', () => {
                const numOrStr = T.OneOf([ T.String(), T.Number() ]);
                expect(isOfType(numOrStr)(5)).toBe(true);
                expect(isOfType(numOrStr)('Hello world')).toBe(true);
                expect(isOfType(numOrStr)([1, 'HEllo'])).toBe(false);
                expect(isOfType(numOrStr)({})).toBe(false);
                expect(isOfType(numOrStr)(null)).toBe(false);
                expect(isOfType(numOrStr)(undefined)).toBe(false);
            });

            it('should match Enum', () => {
                const Maybe = Enum([ 'Just', 'Nothing' ]);
                const maybeType = T.Enum(Maybe);

                expect(isOfType(maybeType)(Maybe.Just(5))).toBe(true);
                expect(isOfType(maybeType)(Maybe.Just())).toBe(true);
                expect(isOfType(maybeType)(Maybe.Nothing())).toBe(true);

                expect(isOfType(maybeType)('Hello world')).toBe(false);
                expect(isOfType(maybeType)(1)).toBe(false);
                expect(isOfType(maybeType)([1, 'HEllo'])).toBe(false);
                expect(isOfType(maybeType)([])).toBe(false);
                expect(isOfType(maybeType)({})).toBe(false);
                expect(isOfType(maybeType)(NaN)).toBe(false);
                expect(isOfType(maybeType)(null)).toBe(false);
                expect(isOfType(maybeType)(undefined)).toBe(false);
            });
        });
    });
});
