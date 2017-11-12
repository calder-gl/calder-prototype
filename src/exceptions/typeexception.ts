export default class TypeException extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, TypeException.prototype);
    }
}
