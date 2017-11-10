import Qualifier from './qualifier';
import Type from './type';
import Hashable from './util/hashable';

export default class Variable implements Hashable {
    public readonly name: string;
    public readonly qualifier: Qualifier;
    public readonly kind: Type;

    // TODO: typecheck kind
    constructor(qualifier: Qualifier, kind: Type, name: string) {
        this.kind = kind;
        this.qualifier = qualifier;
        this.name = name;
    }

    public declaration(): string {
        return `${this.qualifier} ${this.kind} ${this.name};`;
    }

    public hashCode(): string {
        return this.declaration();
    }
}
