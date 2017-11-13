import Expression from './expressions/expression';
import InterfaceVariable from './interfacevariable';
import Set from './util/set';
import SyntaxNode from './syntaxnode';
import Type from './type';

export default class ReturnStatement implements Expression {
    private expression: Expression;

    constructor(expression: Expression) {
        this.expression = expression;
    }

    public source(): string {
        return `return ${this.expression.source()};`;
    }

    public returnType(): Type {
        return this.expression.returnType();
    }
}
