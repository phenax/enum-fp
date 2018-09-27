
import EnumTag from '../src/EnumTag';

describe('EnumTag', () => {

    describe('#constructor', () => {

        it('should have name, props and args', () => {
            const Tag = EnumTag('Type');
            const TagWithArgs = EnumTag('TypeWithArgs', [ 'id', 'message' ]);

            const tag = Tag();
            const tagWithArgs = TagWithArgs(5, 'Hello world');

            expect(tag.name).toBe('Type');
            expect(tag.props).toBeFalsy();
            expect(tag.args).toHaveLength(0);

            expect(tagWithArgs.name).toBe('TypeWithArgs');
            expect(tagWithArgs.props).toHaveLength(2);
            expect(tagWithArgs.args).toHaveLength(2);
        });

        it('should throw error if there is a mismatch in the props and arguements', () => {
            const Tag = EnumTag('Type', [ 'a', 'b' ]);

            expect(() => Tag(1, 2)).not.toThrowError();
            expect(() => Tag()).toThrowError();
            expect(() => Tag(1)).toThrowError();
            expect(() => Tag(1, 2, 3)).toThrowError();
        });
    });

    // describe('#is', () => {
        
    //     it('should return true for equivalent tokens and false otherwise', () => {

    //         const Tag = EnumTag('Tag');
    //         const Tag1 = EnumTag('Tag');
    //         const Tag2 = EnumTag('NewTag');

    //         expect(Tag().is(Tag1())).toBeTruthy();
    //         expect(Tag().is(Tag2())).not.toBeTruthy();
    //     });
    // });
});
