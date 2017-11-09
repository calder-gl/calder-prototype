import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('Block', () => {
    describe('dependencies', () => {
        it('references all included statements', () => {
            const block = new cgl.Block([
                new cgl.Reference(
                    new cgl.Variable(cgl.Qualifier.In, cgl.Type.Vec4, 'a')
                ),
                new cgl.Reference(
                    new cgl.Variable(cgl.Qualifier.In, cgl.Type.Vec4, 'b')
                )
            ]);

            expect(
                [...block.dependencies()].map(dep => dep.name).sort()
            ).to.eql(['a', 'b']);
        });

        it('handles an empty block', () => {
            const block = new cgl.Block();

            expect(
                [...block.dependencies()].map(dep => dep.name).sort()
            ).to.eql([]);
        });
    });

    describe('source', () => {
        it('references all included statements', () => {
            const block = new cgl.Block([
                new cgl.Statement(
                    new cgl.Reference(
                        new cgl.Variable(cgl.Qualifier.In, cgl.Type.Vec4, 'a')
                    )
                ),
                new cgl.Statement(
                    new cgl.Reference(
                        new cgl.Variable(cgl.Qualifier.In, cgl.Type.Vec4, 'b')
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
                        new cgl.Variable(cgl.Qualifier.In, cgl.Type.Vec4, 'a')
                    )
                ),
                new cgl.Statement(
                    new cgl.Reference(
                        new cgl.Variable(cgl.Qualifier.In, cgl.Type.Vec4, 'b')
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
