import Variable from './variable';

/**
 * struct type-name {
 *   members
 * } struct-name[]; // Optionally an array
 */
export default class Struct implements SyntaxNode {
    public readonly name: string;
    private members: Variable[];
    private isArray: boolean;

    constructor(name: string, members: Variable[], isArray: boolean = false) {
        this.name = name;
        this.members = members;
        this.isArray = false;
    }

    public dependencies(): Set<Variable> {
        return new Set(this.members);
    }

    public source(): string {
        return `struct ${this.name}` +
            this.members
                .map(member => member.declaration())
                .join('\n') +
            `${this.name + this.arraySuffix()}};`;
    }

    private arraySuffix(): void {
        (this.isArray) ? '[]' : '';
    }
}
