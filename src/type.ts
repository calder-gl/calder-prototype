import Kind from './kind';
import MetaKind from './metakind';
import TypeException from './exceptions/typeexception';

export default class Type {
    public readonly name: string;
    public readonly metakind: MetaKind;
    public readonly children: Type[];

    constructor(name: string, metakind: MetaKind = MetaKind.Basic, children: Type[] = []) {
        this.name = name;
        this.metakind = metakind;
        this.children = children;

        // Validate children types
        switch (metakind) {
            case MetaKind.Basic: {
                if (children.length != 0) {
                    throw new TypeException('Basic kind cannot have any children types.');
                }
                break;
            }
            case MetaKind.Array: {
                if (children.length != 1) {
                    throw new TypeException('Array kind must have exactly one child type.');
                }
                break;
            }
            default: {
                break;
            }
        }
    }

    // Equality Helper Methods

    public checkEquals(otherType: Type): boolean {
        // Note: for structs, this only verifies that they have the same structure (i.e. same # and types
        // of child types), but doesn't check that the variable names in the struct are identical.

        if (this.name !== otherType.name) return false;
        if (this.metakind !== otherType.metakind) return false;
        if (this.children.length !== otherType.children.length) return false;

        const childrenPairs = this.children.map((child, idx) => [child, otherType.children[idx]]);
        for (const [myChild, otherChild] of childrenPairs) {
            if (!myChild.checkEquals(otherChild)) return false;
        }

        return true;
    }

    public checkVectorEquals(otherType: Type): boolean {
        return (this.checkEquals(new Type(Kind.Vec2)) && this.checkEquals(otherType))
            || (this.checkEquals(new Type(Kind.Vec3)) && this.checkEquals(otherType))
            || (this.checkEquals(new Type(Kind.Vec4)) && this.checkEquals(otherType))
            || (this.checkEquals(new Type(Kind.BVec2)) && this.checkEquals(otherType))
            || (this.checkEquals(new Type(Kind.BVec3)) && this.checkEquals(otherType))
            || (this.checkEquals(new Type(Kind.BVec4)) && this.checkEquals(otherType))
            || (this.checkEquals(new Type(Kind.IVec2)) && this.checkEquals(otherType))
            || (this.checkEquals(new Type(Kind.IVec3)) && this.checkEquals(otherType))
            || (this.checkEquals(new Type(Kind.IVec4)) && this.checkEquals(otherType));
    }

    public checkMatrixEquals(otherType: Type): boolean {
        return (this.checkEquals(new Type(Kind.Mat2)) && this.checkEquals(otherType))
            || (this.checkEquals(new Type(Kind.Mat3)) && this.checkEquals(otherType))
            || (this.checkEquals(new Type(Kind.Mat4)) && this.checkEquals(otherType));
    }

    // Type Checking Helper Methods

    public isScalarType(): boolean {
        return this.checkEquals(new Type(Kind.Int))
            || this.checkEquals(new Type(Kind.Float));
    }

    public isMatrixType(): boolean {
        return this.checkEquals(new Type(Kind.Mat2))
            || this.checkEquals(new Type(Kind.Mat3))
            || this.checkEquals(new Type(Kind.Mat4));
    }

    public isVectorType(): boolean {
        return this.checkEquals(new Type(Kind.Vec2))
            || this.checkEquals(new Type(Kind.Vec3))
            || this.checkEquals(new Type(Kind.Vec4))
            || this.checkEquals(new Type(Kind.BVec2))
            || this.checkEquals(new Type(Kind.BVec3))
            || this.checkEquals(new Type(Kind.BVec4))
            || this.checkEquals(new Type(Kind.IVec2))
            || this.checkEquals(new Type(Kind.IVec3))
            || this.checkEquals(new Type(Kind.IVec4));
    }
}
