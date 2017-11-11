import Expression from './expression';
import Interface from './interface';
import Set from './util/set';
import Type from './type';

export default class Reference implements Expression {
    private variable: Interface;

    constructor(variable: Interface) {
        this.variable = variable;
    }

    public dependencies(): Set<Interface> {
        return new Set([this.variable]);
    }

    public source(): string {
        return this.variable.name;
    }

    public returnType(): Type {
        return this.variable.kind;
    }
}
