import Type from './type';
import MetaKind from './metakind';
import Hashable from './util/hashable';

export default class Variable implements Hashable {
    public readonly name: string;
    public readonly type: Type;

    constructor(type: Type, name: string) {
        this.type = type;
        this.name = name;
    }

    public declaration(): string {
        switch (this.type.metakind) {
            case MetaKind.Basic:
            case MetaKind.Struct:
                return `${this.type.name} ${this.name};`;
            case MetaKind.Array:
                return `${this.type.children[0].name} ${this.name}[];`;
        }
    }

    public hashCode(): string {
        return this.declaration();
    }
}
