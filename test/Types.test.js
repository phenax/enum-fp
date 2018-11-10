import T, { isOfType, validateTypes } from '../src/Types';

describe('Types', () => {

    describe('Create types', () => {
        it('should allow to create instances using all constructors', () => {
            expect(T.String().name).toBe('String');
            expect(T.Number().name).toBe('Number');
            expect(T.List().name).toBe('List');
            expect(T.Map().name).toBe('Map');
            expect(T.Record().name).toBe('Record');
            expect(T.Optional().name).toBe('Optional');
            expect(T.Enum().name).toBe('Enum');
            expect(T.Any().name).toBe('Any');
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
        });

        describe('Record types', () => {
            it('should match List (record types)', () => {
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

            it('should match Map (record types)', () => {
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
    
            it('should match Record (record types)', () => {
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
    });
});
