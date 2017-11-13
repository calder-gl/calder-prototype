import Kind from './kind';
import Set from './util/set';
import Statement from './statement';
import SyntaxNode from './syntaxnode';

export default class Function implements SyntaxNode {
    public readonly name: string;
    public readonly returnType: Kind;
    private statements: Statement[];

    constructor(name: string, statements: Statement[] = [], returnType: Kind = Kind.Void) {
        this.name = name;
        this.statements = statements;
        this.returnType = returnType;
    }

    public source(): string {
        return `${this.returnType} ${this.name}() {\n
            ${this.statements
                .map(statement => statement.source())
                .join('\n')}\n
        }`;
    }
}
