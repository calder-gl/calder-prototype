import Interface from './interface';
import Qualifier from './qualifier';
import Set from './util/set';
import SyntaxNode from './syntaxnode';
import Variable from './variable';

/**
 * struct type-name {
 *   members
 * } struct-name;
 */
export default class Struct implements SyntaxNode {
    public readonly name: string;
    public readonly qualifier: Qualifier;
    private members: Variable[];

    constructor(qualifier: Qualifier, name: string, members: Variable[]) {
        this.qualifier = qualifier
        this.name = name;
        this.members = members;
    }

    public dependencies(): Set<Interface> {
        return new Set<Interface>();
    }

    public source(): string {
        return `${this.qualifier} struct ${this.name} {` +
            this.members
                .map(member => member.declaration())
                .join('\n') +
            `} ${this.name};`;
    }
}
