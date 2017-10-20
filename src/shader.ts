import { Variable } from './variable';
import Function from './function';

export default class Shader {
    public main: Function;

    constructor(main: Function = new Function('main')) {
        this.main = main;
    } 

    public source(): string {
        return `${this.header()}\n${this.main.source()}`;
    }

    private header(): string {
        return [...this.main.dependencies()]
            .map(dependency => dependency.declaration())
            .join('\n');
    }
}
