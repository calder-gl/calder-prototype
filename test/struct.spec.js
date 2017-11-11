import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('Struct', () => {
    describe('source', () => {
        const a = new cgl.Variable(cgl.Type.Bool, 'a');
        const b = new cgl.Variable(cgl.Type.Bool, 'b');

        it('is well formed', () => {
            const structure = new cgl.Struct('structName', [a, b]);

            expect(structure.source()).to.equalIgnoreSpaces(
                `struct structName {
                    bool a;
                    bool b;
                } structName;`
            );
        });
    });
});
