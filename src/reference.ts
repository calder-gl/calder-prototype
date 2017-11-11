import Expression from './expression';
import InterfaceVariable from './interface';
import Set from './util/set';
import Type from './type';

export default class Reference implements Expression {
    private variable: InterfaceVariable;

    constructor(variable: InterfaceVariable) {
        this.variable = variable;
    }

    public dependencies(): Set<InterfaceVariable> {
        return new Set([this.variable]);
    }

    public source(): string {
        return this.variable.name;
    }

    public returnType(): Type {
        return this.variable.kind;
    }
}
