// Import the library
import server = require('server');
import { Context } from 'server';
import * as express from 'express';

// Answers to any request
server((ctx: Context) => 'Hello world');

server({ port: 3000 }, ctx => 'Hello 世界');

const { get, post, socket } = server.router;
const { render, json, status, send } = server.reply;

server([
    get('/', ctx => render('index.hbs')),
    post('/', ctx => json(ctx.data)),
    get(ctx => status(404))
]);

const setname = (ctx: Context) => { ctx.user = 'Francisco'; };
const sendname = (ctx: Context) => send(ctx.user);
server(setname, sendname);

server(async (ctx: Context) => {
    console.log('I am first');
}, ctx => {
    console.log('I am second');
});

const legacyMiddlewareConverted: server.Handler = server.utils.modern((req: express.Request, res: express.Response, next: express.NextFunction) => next());

server((ctx: Context) => 'Hello world').then(ctx => {
    console.log(`Server launched on http://localhost:${ctx.options.port}/`);
});

// Update everyone with the current user count
const updateCounter = (ctx: Context) => {
  ctx.io.emit('count', Object.keys(ctx.io.sockets.sockets).length);
};

// Send the new message to everyone
const sendMessage = (ctx: Context) => {
  ctx.io.emit('message', ctx.data);
};

server([
  get('/', ctx => render('index.html')),
  socket('connect', updateCounter),
  socket('disconnect', updateCounter),
  socket('message', sendMessage)
]);
