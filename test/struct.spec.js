import { expect } from 'chai';
import * as cgl from '../src/calder';

describe('Struct', () => {
    describe('dependencies', () => {
        it('includes all variable declarations', () => {
            const variable1 = new cgl.Variable(cgl.Qualifier.In, cgl.Type.Bool, 'variable1');
            const variable2 = new cgl.Variable(cgl.Qualifier.In, cgl.Type.Bool, 'variable2');
            const structure = new cgl.Struct('structName', [variable1, variable2]);

            const dependencyNames = [...structure.dependencies()]
                  .map(dependency => dependency.name)
                  .sort();
            expect(dependencyNames).to.eql(['variable1', 'variable2']);
        });
    });

    describe('source', () => {
        const a = new cgl.Variable(cgl.Qualifier.In, cgl.Type.Bool, 'a');
        const b = new cgl.Variable(cgl.Qualifier.In, cgl.Type.Bool, 'b');

        describe('regular struct', () => {
            it('is well formed', () => {
                const structure = new cgl.Struct('structName', [a, b]);

                expect(structure.source()).to.equalIgnoreSpaces(
                    `struct structName {
                      in bool a;
                      in bool b;
                    } structName;`
                );
            });
        });

        describe('array struct', () => {
            it('is well formed', () => {
                const structure = new cgl.Struct('structName', [a, b], true);

                expect(structure.source()).to.equalIgnoreSpaces(
                    `struct structName {
                      in bool a;
                      in bool b;
                    } structName[];`
                );
            });
        });
    });
});
