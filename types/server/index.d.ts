// Type definitions for server 1.0
// Project: https://serverjs.io/
// Definitions by: A.J.J. Lyman <https://github.com/ALyman>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

import { Loadable } from "loadware";
import { Files } from "formidable";
import * as express from "express";
import "socket.io";

import * as Router from "./router";
import * as Reply from "./reply";

declare function server(...routes: server.HandlerList[]): Promise<server.Context>;
declare function server(options: Partial<server.Options>, ...routes: server.HandlerList[]): Promise<server.Context>;

declare namespace server {
    const router: typeof Router;
    const reply: typeof Reply;
    const utils: Utilities;

    type Path = string | RegExp;

    type Handler<TParams extends object = object, TQuery extends object = object, TSession extends object = object, TData extends object = object> =
        (ctx: Context<TParams, TQuery, TSession, TData>) => Reply.Reply | Promise<Reply.Reply> | void | Promise<void>;
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

    interface Utilities {
        modern(middleware: express.Handler): Handler;
    }
}

export = server;