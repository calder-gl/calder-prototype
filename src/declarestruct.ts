import InterfaceVariable from './interfacevariable';
import Qualifier from './qualifier';
import Set from './util/set';
import SyntaxNode from './syntaxnode';
import Type from './type';
import MetaKind from './metakind';
import VariableSource from './variablesource';

/**
 * struct type-name {
 *   members
 * };
 */
export default class DeclareStruct implements SyntaxNode {
    public readonly name: string;
    private members: VariableSource[];

    constructor(name: string, members: VariableSource[]) {
        this.name = name;
        this.members = members;
    }

    public dependencies(): Set<InterfaceVariable> {
        return new Set<InterfaceVariable>();
    }

    public type(): Type {
        return new Type(this.name, MetaKind.Struct, this.members.map(member => member.srcType));
    }

    public source(): string {
        return `struct ${this.name} {` +
            this.members
                .map(member => member.declaration())
                .join('\n') +
            '};';
    }
}
