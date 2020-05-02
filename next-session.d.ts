// Type definitions for next-session 3.1
// Project: https://github.com/hoangvvo/next-session#readme
// Definitions by: tanerochris <https://github.com/me>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'next-session' {
    export class MemoryStore {
        constructor(...args: any[]);

        all(...args: any[]): void;

        destroy(...args: any[]): void;

        get(...args: any[]): void;

        set(...args: any[]): void;

        touch(...args: any[]): void;

    }

    export function Store(): void;

    export function applySession(req: any, res: any, opts: any): any;

    export function promisifyStore(store: any): any;

    export function session(opts: any): any;

    export function withSession(handler: any, options: any): any;
};