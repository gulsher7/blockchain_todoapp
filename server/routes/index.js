var express = require('express');
var rootRouter = express.Router();

let posts = require('./post.routes')

rootRouter.use('/', posts)

module.exports = rootRouter;