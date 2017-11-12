import Variable from './variable';
import Expression from './expressions/expression';
import Type from './type';

export default class VariableDeclaration implements Expression {
    public readonly variable: Variable;
    
    constructor(variable: Variable) {
        this.variable = variable;
    }

    public source(): string {
        return this.variable.declaration();
    }

    public returnType(): Type {
        return this.variable.type();
    }
}
