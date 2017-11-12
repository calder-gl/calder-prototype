import Expression from './expressions/expression';
import Qualifier from './qualifier';
import InterfaceVariable from './interfacevariable';
import Set from './util/set';
import Type from './type';

export default class Reference implements Expression {
    public readonly qualifier: Qualifier;
    private variable: InterfaceVariable;

    constructor(variable: InterfaceVariable) {
        this.qualifier = variable.qualifier;
        this.variable = variable;
    }

    public dependencies(): Set<InterfaceVariable> {
        return new Set([this.variable]);
    }

    public source(): string {
        return this.variable.name();
    }

    public returnType(): Type {
        return this.variable.type();
    }
}
