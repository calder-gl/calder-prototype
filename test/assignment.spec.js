import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('Assignment', () => {
    describe('dependencies', () => {
        it('references both the left and right hand sides', () => {
            const assignment = new cgl.Assignment(
                new cgl.Reference(
                    new cgl.Variable(cgl.Qualifier.In, cgl.Type.Vec4, 'lhs')
                ),
                new cgl.Reference(
                    new cgl.Variable(cgl.Qualifier.In, cgl.Type.Vec4, 'rhs')
                )
            );

            expect(
                [...assignment.dependencies()].map(dep => dep.name).sort()
            ).to.eql(['lhs', 'rhs']);
        });
    });
});
