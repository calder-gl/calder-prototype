import Expression from './expression';
import Interface from './interface';
import Set from './util/set';
import Statement from './statement';
import Type from './type';

export default class Block implements Expression {
    private statements: Statement[];

    // TODO: add local variables
    constructor(statements: Statement[] = []) {
        this.statements = statements;
    }

    public isEmpty(): boolean {
        return (this.statements.length == 0);
    }

    public returnType(): Type {
        return Type.Void;
    }

    public dependencies(): Set<Interface> {
        return this.statements.reduce((union, statement) => (
                union.addAll(statement.dependencies())
            ),
            new Set<Interface>()
        );
    }

    public source(): string {
        return '{' +
            this.statements
                .map(statement => statement.source())
                .join('\n') +
            '}';
    }
}
