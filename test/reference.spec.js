import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('Reference', () => {
    describe('dependencies', () => {
        it('references the contained variable', () => {
            const ref = new cgl.Reference(
                new cgl.Variable(cgl.Qualifier.In, cgl.Type.Vec4, 'test')
            );

            expect(
                [...ref.dependencies()].map(dep => dep.name)
            ).to.eql(['test']);
        });
    });
});
