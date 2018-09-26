
import EnumTag from '../src/EnumTag';

describe('EnumTag', () => {

    describe('#constructor', () => {

        it('should have name and args', () => {
            const Tag = EnumTag('Type');
            const instance = Tag();

            expect(instance.name).toBe('Type');
            expect(instance.args).toHaveLength(0);

            const instance2 = Tag('Hello', 'Wold');

            expect(instance2.args).toHaveLength(2);
        });
    });

    describe('#is', () => {
        
        it('should return true for equivalent tokens and false otherwise', () => {

            const Tag = EnumTag('Tag');
            const Tag1 = EnumTag('Tag');
            const Tag2 = EnumTag('NewTag');

            expect(Tag().is(Tag1())).toBeTruthy();
            expect(Tag().is(Tag2())).not.toBeTruthy();
        });
    });
});
