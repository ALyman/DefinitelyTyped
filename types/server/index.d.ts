// Type definitions for server 1.0
// Project: https://serverjs.io/
// Definitions by: A.J.J. Lyman <https://github.com/ALyman>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

import { Loadable } from "loadware";
import { Files } from "formidable";
import * as express from "express";
import "socket.io";

declare function server(options: Partial<server.Options>, ...routes: server.HandlerList[]): Promise<server.Context>;
declare function server(...routes: server.HandlerList[]): Promise<server.Context>;

declare namespace server {
    const router: Router;
    const reply: ReplyBuilder;
    const utils: Utilities;

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

    interface ReplyBodies {
        download(localPath: string, fileName?: string): ReplyComplete;
        json(data: object | any[]): ReplyComplete;
        jsonp(data: object | any[]): ReplyComplete;
        render(view: string, locals?: any): ReplyComplete;
        send(body: string): ReplyComplete;
    }

    interface ReplyStatus {
        status(status: number): ReplyHeaders & ReplyBodies & ReplyComplete;

        redirect(status: number, path: string): ReplyComplete;
        redirect(path: string): ReplyComplete;
    }

    interface ReplyHeaders {
        cookie(name: string, value: string, opts?: CookieOptions): ReplyHeaders & ReplyBodies;
        header(field: string, value: string): ReplyHeaders & ReplyBodies;
        type(type: string): ReplyHeaders & ReplyBodies;
    }

    interface ReplyComplete {
        __ReplyCompleteMarker__: undefined;
    }

    type ReplyBuilder = ReplyStatus & ReplyHeaders & ReplyBodies;

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

    interface Router {
        get(path: Path, ...handlers: HandlerList[]): Handler;
        get(...handlers: HandlerList[]): Handler;

        post(path: Path, ...handlers: HandlerList[]): Handler;
        post(...handlers: HandlerList[]): Handler;

        put(path: Path, ...handlers: HandlerList[]): Handler;
        put(...handlers: HandlerList[]): Handler;

        del(path: Path, ...handlers: HandlerList[]): Handler;
        del(...handlers: HandlerList[]): Handler;

        error(name: string, ...handlers: HandlerList[]): Handler;
        sub(domain: string, ...handlers: HandlerList[]): Handler;

        socket<TData extends object = object>(event: string, ...handlers: HandlerList[]): Handler;
    }

    interface Utilities {
        modern(middleware: express.Handler): Handler;
    }
}

export = server;
