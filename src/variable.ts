export enum Qualifier {
    Attribute = 'attribute',
    Uniform = 'uniform',
    Varying = 'varying',
    Const = 'const',
    In = 'in',
    Out = 'out',
    InOut = 'inout'
}

export class Variable {
    public readonly name: string;
    public readonly qualifier: Qualifier;
    public readonly kind: string;

    // TODO: typecheck kind
    constructor(qualifier: Qualifier, kind: string, name: string) {
        this.kind = kind;
        this.qualifier = qualifier;
        this.name = name;
    }

    public declaration(): string {
        return `${this.qualifier} ${this.kind} ${this.name};`;
    }
}
