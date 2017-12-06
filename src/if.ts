import Block from './block';
import Expression from './expressions/expression';
import InterfaceVariable from './interfacevariable';
import Set from './util/set';
import Type from './type';
import Kind from './kind';

export default class If implements Expression {
    private condition: Expression;
    private thenBlock: Block;
    private elseBlock: Block;

    constructor(condition: Expression, thenBlock: Block, elseBlock: Block = new Block()) {
        this.condition = condition;
        this.thenBlock = thenBlock;
        this.elseBlock = elseBlock;
    }

    public returnType(): Type {
        return new Type(Kind.Void);
    }

    public source(): string {
        let src = `if (${this.condition.source()})` + this.thenBlock.source();
        if (!this.elseBlock.isEmpty()) {
            src += `else` + this.elseBlock.source();
        }
        return src;
    }
}
