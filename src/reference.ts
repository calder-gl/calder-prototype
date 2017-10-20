import { Variable } from './variable';
import SyntaxNode from './syntaxnode';

export default class Reference implements SyntaxNode {
    private variable: Variable;

    constructor(variable: Variable) {
        this.variable = variable;
    }

    public dependencies(): Set<Variable> {
        return new Set([this.variable]);
    }

    public source(): string {
        return this.variable.name;
    }
}
