import InterfaceVariable from './interface';
import Qualifier from './qualifier';
import Set from './util/set';
import SyntaxNode from './syntaxnode';
import Variable from './variable';
import Type from './type';
import MetaKind from './metakind';

/**
 * struct type-name {
 *   members
 * };
 */
export default class DeclareStruct implements SyntaxNode {
    public readonly name: string;
    private members: Variable[];

    constructor(name: string, members: Variable[]) {
        this.name = name;
        this.members = members;
    }

    public dependencies(): Set<InterfaceVariable> {
        return new Set<InterfaceVariable>();
    }

    public type(): Type {
        return new Type(this.name, MetaKind.Struct, this.members.map(member => member.type));
    }

    public source(): string {
        return `struct ${this.name} {` +
            this.members
                .map(member => member.declaration())
                .join('\n') +
            '};';
    }
}
