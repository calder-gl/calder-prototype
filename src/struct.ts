import Interface from './interface';
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
    private members: Variable[];

    constructor(name: string, members: Variable[]) {
        this.name = name;
        this.members = members;
    }

    public dependencies(): Set<Interface> {
        return new Set();
    }

    public source(): string {
        return `struct ${this.name} {` +
            this.members
                .map(member => member.declaration())
                .join('\n') +
            `} ${this.name};`;
    }
}
