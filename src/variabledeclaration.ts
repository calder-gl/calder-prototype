import Variable from './variable';
import Expression from './expressions/expression';
import Type from './type';

export default class VariableDeclaration<V extends Variable> implements Expression {
    public readonly variable: V;

    constructor(variable: V) {
        this.variable = variable;
    }

    public source(): string {
        return this.variable.declaration();
    }

    public returnType(): Type {
        return this.variable.type();
    }
}
