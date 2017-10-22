import Variable from './variable';
import Type from './type';
import Expression from './expression';

export default class Reference implements Expression {
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

    public returnType(): Type {
        return this.variable.kind;
    }
}
