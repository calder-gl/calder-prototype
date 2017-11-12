import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('Type', () => {
    describe('basic types', () => {
        it('recognizes equal types', () => {
            const intType1 = new cgl.Type(cgl.Kind.Int);
            const intType2 = new cgl.Type(cgl.Kind.Int);

            expect(intType1.checkEquals(intType2)).to.be.true;
        });

        it('recognizes unequal types', () => {
            const intType = new cgl.Type(cgl.Kind.Int);
            const floatType = new cgl.Type(cgl.Kind.Float);

            expect(intType.checkEquals(floatType)).to.be.false;
        });

        it('cannot have any children types', () => {
            let childrenTypes = [new cgl.Type(cgl.Kind.Int)];

            expect(() => {
                let invalidArray = new cgl.Type('', cgl.MetaKind.Basic, childrenTypes);
            }).to.throw(cgl.TypeException, 'Basic kind cannot have any children types.');
        });
    });

    describe('array types', () => {
        it('recognizes equal types', () => {
            const intArrayType1 = new cgl.Type('', cgl.MetaKind.Array, [new cgl.Type(cgl.Kind.Int)]);
            const intArrayType2 = new cgl.Type('', cgl.MetaKind.Array, [new cgl.Type(cgl.Kind.Int)]);

            expect(intArrayType1.checkEquals(intArrayType2)).to.be.true;
        });

        it('recognizes unequal types', () => {
            const intArrayType = new cgl.Type('', cgl.MetaKind.Array, [new cgl.Type(cgl.Kind.Int)]);
            const floatArrayType = new cgl.Type('', cgl.MetaKind.Array, [new cgl.Type(cgl.Kind.Float)]);

            expect(intArrayType.checkEquals(floatArrayType)).to.be.false;
        });

        it('must have exactly one child type upon initialization', () => {
            let childrenTypes = [new cgl.Type(cgl.Kind.Int), new cgl.Type(cgl.Kind.Float)];

            expect(() => {
                let invalidArray = new cgl.Type('', cgl.MetaKind.Array, childrenTypes);
            }).to.throw(cgl.TypeException, 'Array kind must have exactly one child type.');
        });
    });

    describe('struct types', () => {
        it('recognizes equal types', () => {
            const structType1 = new cgl.Type('aStruct', cgl.MetaKind.Struct, [new cgl.Type(cgl.Kind.Int), new cgl.Type(cgl.Kind.Bool)]);
            const structType2 = new cgl.Type('aStruct', cgl.MetaKind.Struct, [new cgl.Type(cgl.Kind.Int), new cgl.Type(cgl.Kind.Bool)]);

            expect(structType1.checkEquals(structType2)).to.be.true;
        });

        it('recognizes unequal types', () => {
            const structType1 = new cgl.Type('aStruct', cgl.MetaKind.Struct, [new cgl.Type(cgl.Kind.Int), new cgl.Type(cgl.Kind.Bool)]);
            const structType2 = new cgl.Type('aStruct', cgl.MetaKind.Struct, [new cgl.Type(cgl.Kind.Int)]);

            expect(structType1.checkEquals(structType2)).to.be.false;
        });
    });
});
