import InterfaceVariable from './interfacevariable';
import Set from './util/set';
import SyntaxNode from './syntaxnode';

export default class ReturnStatement implements SyntaxNode {
    private node: SyntaxNode;

    constructor(node: SyntaxNode) {
        this.node = node;
    }

    public source(): string {
        return `return ${this.node.source()};`;
    }
}
