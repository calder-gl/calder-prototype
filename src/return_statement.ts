import InterfaceVariable from './interfacevariable';
import Kind from './kind';
import Set from './util/set';
import SyntaxNode from './syntaxnode';

export default class ReturnStatement implements SyntaxNode {
    private node: SyntaxNode;
    public readonly returnType: Kind;

    constructor(node: SyntaxNode, returnType: Kind) {
        this.node = node;
        this.returnType = returnType;
    }

    public source(): string {
        return `return ${this.node.source()};`;
    }
}
