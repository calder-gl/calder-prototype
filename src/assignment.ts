import SyntaxNode from './syntaxnode';
import { Variable } from './variable';
import Reference from './reference';

export default class Assignment implements SyntaxNode {
    private lhs: Reference;
    private rhs: SyntaxNode;

    constructor(lhs: Reference, rhs: SyntaxNode) {
        this.lhs = lhs;
        this.rhs = rhs;
    }

    public dependencies(): Set<Variable> {
        return this.rhs.dependencies();
    }

    public source(): string {
        return `${this.lhs.source()} = ${this.rhs.source()};`;
    }
}
