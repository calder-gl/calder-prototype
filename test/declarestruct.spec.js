import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('DeclareStruct', () => {
    describe('source', () => {
        const a = new cgl.Variable(new cgl.Type(cgl.Kind.Bool), 'a');
        const b = new cgl.Variable(new cgl.Type(cgl.Kind.Bool), 'b');

        it('is well formed', () => {
            const structureDeclaration = new cgl.DeclareStruct('structName', [a, b]);

            expect(structureDeclaration.source()).to.equalIgnoreSpaces(
                `struct structName {
                    bool a;
                    bool b;
                };`
            );
        });
    });
});
