import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('Block', () => {
    describe('source', () => {
        it('references all included statements', () => {
            const block = new cgl.Block([
                new cgl.Statement(
                    new cgl.Reference(
                        new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'a'))
                    )
                ),
                new cgl.Statement(
                    new cgl.Reference(
                        new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'b'))
                    )
                )
            ]);

            expect(block.source()).to.equalIgnoreSpaces('{a; b;}');
        });

        it('handles an empty block', () => {
            const block = new cgl.Block();

            expect(block.source()).to.equalIgnoreSpaces('{}');
        });
    });

    describe('isEmpty', () => {
        it('correctly detects a non-empty block', () => {
            const block = new cgl.Block([
                new cgl.Statement(
                    new cgl.Reference(
                        new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'a'))
                    )
                ),
                new cgl.Statement(
                    new cgl.Reference(
                        new cgl.InterfaceVariable(cgl.Qualifier.In, new cgl.VariableSource(new cgl.Type(cgl.Kind.Vec4), 'b'))
                    )
                )
            ]);

            expect(!block.isEmpty());
        });

        it('correctly detects an empty block', () => {
            const block = new cgl.Block();

            expect(block.isEmpty());
        });
    });
});
