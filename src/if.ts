import Variable from './variable';
import Expression from './expression';
import Block from './block';
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

    public dependencies(): Set<Variable> {
        return new Set([
            ...this.condition.dependencies(),
            ...this.thenBlock.dependencies(),
            ...this.elseBlock.dependencies()
        ]);
    }

    public source(): string {
        return `if (${this.condition.source()})` +
            this.thenBlock.source() +
            ' else ' +
            this.elseBlock.source();
    }
}
