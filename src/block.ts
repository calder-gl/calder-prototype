import Variable from './variable';
import Expression from './expression';
import Statement from './statement';
import Type from './type';
import Set from './util/set';

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

    public dependencies(): Set<Variable> {
        return this.statements.reduce((union, statement) => (
                union.addAll(statement.dependencies())
            ),
            new Set<Variable>()
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
