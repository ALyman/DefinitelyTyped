// Type definitions for server 1.0
// Project: https://serverjs.io/
// Definitions by: A.J.J. Lyman <https://github.com/ALyman>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

import { Loadable } from "loadware";
import { Files } from "formidable";
import "socket.io";

import * as server from "../";

declare namespace router {
    type Path = string | RegExp;

    export function get(path: Path, ...handlers: server.HandlerList[]): server.Handler;
    export function get(...handlers: server.HandlerList[]): server.Handler;

    export function post(path: Path, ...handlers: server.HandlerList[]): server.Handler;
    export function post(...handlers: server.HandlerList[]): server.Handler;

    export function put(path: Path, ...handlers: server.HandlerList[]): server.Handler;
    export function put(...handlers: server.HandlerList[]): server.Handler;

    export function del(path: Path, ...handlers: server.HandlerList[]): server.Handler;
    export function del(...handlers: server.HandlerList[]): server.Handler;

    export function error(name: string, ...handlers: server.HandlerList[]): server.Handler;
    export function sub(domain: string, ...handlers: server.HandlerList[]): server.Handler;

    export function socket<TData extends object = object>(event: string, ...handlers: server.HandlerList[]): server.Handler;
}

export = router;
