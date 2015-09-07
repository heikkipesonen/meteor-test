'use strict';

var restify = require('restify');

function Server(config){
	var self = this;

	self.config = config;
	self.api = restify.createServer({
		name: self.config.name, log: self.log });

	self.api.use(restify.CORS());
	self.api.use(restify.gzipResponse());
	self.api.use(restify.bodyParser());
}

Server.prototype = {

};


// vamma

new Server({
	port:process.env.PORT,
	name:'joni'
});