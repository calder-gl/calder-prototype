import Block from './block';
import Expression from './expressions/expression';
import InterfaceVariable from './interface';
import Set from './util/set';
import Type from './type';

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
        return Type.Void;
    }

    public dependencies(): Set<InterfaceVariable> {
        return this.condition.dependencies()
            .union(this.thenBlock.dependencies())
            .union(this.elseBlock.dependencies());
    }

    public source(): string {
        let src = `if (${this.condition.source()})` +
            this.thenBlock.source();
        if (!this.elseBlock.isEmpty()) {
            src += `else (${this.elseBlock.source()})`;
        }
        return src;
    }
}
