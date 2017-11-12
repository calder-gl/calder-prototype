import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('Variable', () => {
    describe('declaration', () => {
        it('declares basic-type variables correctly', () => {
            const newVar = new cgl.Variable(new cgl.Type(cgl.Kind.Bool), 'someVar');
            expect(newVar.declaration()).to.equal('bool someVar;');
        });

        it('declares struct-type variables correctly', () => {
            const newVar = new cgl.Variable(new cgl.Type('aStruct', cgl.MetaKind.Struct, [
                new cgl.Type(cgl.Kind.Bool),
                new cgl.Type(cgl.Kind.Int)
            ]), 'someVar');
            expect(newVar.declaration()).to.equal('aStruct someVar;');
        });

        it('declares array-type variables correctly', () => {
            const newVar = new cgl.Variable(new cgl.Type('', cgl.MetaKind.Array, [new cgl.Type(cgl.Kind.Int)]), 'someVar');
            expect(newVar.declaration()).to.equal('int someVar[];');
        });
    });
});
