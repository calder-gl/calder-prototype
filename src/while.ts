import Block from './block';
import Expression from './expressions/expression';
import InterfaceVariable from './interface';
import Set from './util/set';
import Type from './type';
import Kind from './kind';

export default class While implements Expression {
    protected condition: Expression;
    protected loopBlock: Block;

    constructor(condition: Expression, loopBlock: Block) {
        this.condition = condition;
        this.loopBlock = loopBlock;
    }

    public returnType(): Type {
        return new Type(Kind.Void);
    }

    public dependencies(): Set<InterfaceVariable> {
        return this.condition.dependencies().union(this.loopBlock.dependencies());
    }

    public source(): string {
        return `while (${this.condition.source()})` +
            this.loopBlock.source();
    }
}
