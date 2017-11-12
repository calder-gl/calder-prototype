import Expression from './expressions/expression';
import Qualifier from './qualifier';
import InterfaceVariable from './interfacevariable';
import Variable from './variable';
import Set from './util/set';
import Type from './type';

export default class Reference implements Expression {
    private variable: Variable;

    constructor(variable: Variable) {
        this.variable = variable;
    }

    public source(): string {
        return this.variable.name();
    }

    public returnType(): Type {
        return this.variable.type();
    }
}
