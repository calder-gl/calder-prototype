import Variable from './variable';
import Expression from './expression';
import Block from './block';
import Type from './type';

export default class While implements Expression {
    private condition: Expression;
    private loopBlock: Block;

    constructor(condition: Expression, loopBlock: Block) {
        this.condition = condition;
        this.loopBlock = thenBlock;

    public returnType(): Type {
        return Type.Void;
    }

    public dependencies(): Set<Variable> {
        return new Set([
            ...this.condition.dependencies(),
            ...this.loopBlock.dependencies(),
        ]);
    }

    public source(): string {
        return `while (${this.condition.source()})` +
            this.loopBlock.source();
    }
}
