import Hashable from './util/hashable';
import Qualifier from './qualifier';
import Type from './type';
import Variable from './variable';

export default class InterfaceVariable implements Hashable {
    public readonly name: string;
    public readonly qualifier: Qualifier;
    public readonly kind: Type;
    private variable: Variable;

    // TODO: typecheck kind
    constructor(qualifier: Qualifier, variable: Variable) {
        this.qualifier = qualifier;
        this.name = variable.name;
        this.kind = variable.kind;
        this.variable = variable;
    }

    public declaration(): string {
        return `${this.qualifier} ${this.variable.declaration()}`;
    }

    public hashCode(): string {
        return this.declaration();
    }
}
