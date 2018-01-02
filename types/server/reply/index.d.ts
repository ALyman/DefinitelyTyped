// Type definitions for server 1.0
// Project: https://serverjs.io/
// Definitions by: A.J.J. Lyman <https://github.com/ALyman>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

import { Loadable } from "loadware";
import { Files } from "formidable";
import "socket.io";

declare namespace reply {

    type Reply = string | void;

    interface CookieOptions {
        domain?: string;
        encode?: typeof encodeURIComponent;
        expires?: Date;
        httpOnly?: boolean;
        maxAge?: number;
        path?: string;
        secure?: boolean;
        signed?: boolean;
        sameSite?: string | boolean;
    }

    export function download(localPath: string, fileName?: string): void;
    export function json(data: object | any[]): void;
    export function jsonp(data: object | any[]): void;
    export function render(view: string, locals?: any): void;
    export function send(body: string): typeof reply & void;

    export function status(status: number): typeof reply & void;

    export function redirect(status: number, path: string): void;
    export function redirect(path: string): void;

    export function cookie(name: string, value: string, opts?: CookieOptions): typeof reply;
    export function header(field: string, value: string): typeof reply;
    export function type(type: string): typeof reply;
}

export = reply;
