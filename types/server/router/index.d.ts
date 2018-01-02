// Type definitions for server 1.0
// Project: https://serverjs.io/
// Definitions by: A.J.J. Lyman <https://github.com/ALyman>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

import { Loadable } from "loadware";
import { Files } from "formidable";
import "socket.io";

declare namespace router {
    type Path = string | RegExp;

    type Handler<TParams extends object = object, TQuery extends object = object, TSession extends object = object, TData extends object = object> =
        (ctx: Context<TParams, TQuery, TSession, TData>) => Reply | Promise<Reply> | void | Promise<void>;
    type HandlerList = Loadable<Handler>;

    interface Options {
        port: number;
        secret: string;
        public: string;
        views: string;
        engine: string;
        env: string;
        favicon: false | string;
        parse: object;
        session: object;
        security: object;
        log: string;
    }

    interface Context<TParams extends object = object, TQuery extends object = object, TSession extends object = object, TData extends object = object> {
        options: Options;
        data: TData;
        params: TParams;
        query: TQuery;
        session: TSession;
        headers: { [key: string]: string; };
        cookie: { [key: string]: string; };
        files: Files;
        ip: string;
        url: string;
        method: 'GET' | 'POST' | 'PUT' | 'DELETE';
        path: string;
        secure: boolean;
        xhr: boolean;

        io: SocketIO.Server;

        [key: string]: any;
    }

    interface ReplyComplete {
        __ReplyCompleteMarker__: undefined;
    }

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

    type Reply = string | ReplyComplete;


    export function get(path: Path, ...handlers: HandlerList[]): Handler;
    export function get(...handlers: HandlerList[]): Handler;

    export function post(path: Path, ...handlers: HandlerList[]): Handler;
    export function post(...handlers: HandlerList[]): Handler;

    export function put(path: Path, ...handlers: HandlerList[]): Handler;
    export function put(...handlers: HandlerList[]): Handler;

    export function del(path: Path, ...handlers: HandlerList[]): Handler;
    export function del(...handlers: HandlerList[]): Handler;

    export function error(name: string, ...handlers: HandlerList[]): Handler;
    export function sub(domain: string, ...handlers: HandlerList[]): Handler;

    export function socket<TData extends object = object>(event: string, ...handlers: HandlerList[]): Handler;
}

export = router;
