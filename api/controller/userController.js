'use strict';

var Promise = require('bluebird');

const responses = require('./../generics/responses.js');

const constants = require('./../generics/constants.js');

const userDal = require('./../dal/userDal.js');

const crypto = require('crypto');

const jwt = require('./../generics/jwt');

exports.createUser = function(req, res){

	console.log("createUser:"+JSON.stringify(req.body));
	let request = {};
		request.userRequest = req.body;

	Promise.coroutine(function *(){

		if(!request.userRequest.userName){
			return responses.sendError(res, 'userName is mandatory', constants.failure);
		}
		if(!request.userRequest.password){
			return responses.sendError(res, 'password is mandatory', constants.failure);
		}
			let userCreation = yield userDal.userCreation(request);
				console.log("userCreation---->>>>:",userCreation);
				let finalResponse = {
					'userId' : userCreation.userId,
					'userName' : userCreation.userName
				};
		return responses.sendResponse(res, constants.messages.createUserSuccess, constants.success, finalResponse);
	 })().catch(function (error) {
		 console.log('error',error);
		return responses.sendError(res, error, constants.failure);
    });
}

exports.loginUser = function(req, res){

	console.log("inside loginUser ::::", req.body);

	let request = {};
		request = req.body;

	Promise.coroutine(function *(){

		if(!request.userName){
			return responses.sendError(res, 'userName is mandatory', constants.failure);
		}
		if(!request.password){
			return responses.sendError(res, 'password is mandatory', constants.failure);
		}

		let userDetails = yield userDal.getUserDetails(request);
			if(userDetails && userDetails.length){
				if(userDetails[0].password 
					&& crypto.createHmac('sha256', req.body.password).digest('hex') === userDetails[0].password){
						let finalResponse = {};
							finalResponse.userName = userDetails[0].userName;
							finalResponse.email = userDetails[0].officialEmail;
							finalResponse.userId = userDetails[0].userId;
							finalResponse.jwtToken = jwt.generateToken(userDetails[0].userName);
					return responses.sendResponse(res, constants.messages.loginValid, constants.success, finalResponse);
				}else{
					return responses.sendError(res, constants.messages.loginInvalid, constants.failure);
				}
			}else{
				return responses.sendError(res, constants.messages.loginInvalid, constants.failure);
			}
	 })().catch(function (error) {
    	return responses.sendError(res, error, constants.failure);
    });
}

exports.deleteUser = function(req, res){

	let request = {};
		request = req.body;

	Promise.coroutine(function *(){

		if(!request.userName){
			return responses.sendError(res, 'userName is mandatory', constants.failure);
		}

		let user = yield userDal.deleteUser(request);

		console.log("user:",user);

		return responses.sendResponse(res, constants.messages.deleteSuccess, constants.success, {});
	})().catch(function(err){
		console.log(err);
		return responses.sendError(res, err, constants.failure);
	})
}

exports.createTodoItem = function(req, res){
	
	let request = {};
		request = req.body;

	Promise.coroutine(function *(){

		let todoItem = yield userDal.insertTodoItem(request);

		console.log("todoItem:",todoItem);

		return responses.sendResponse(res, constants.messages.success, constants.success, todoItem);
	})().catch(function(err){
		return responses.sendError(res, err, constants.failure);
	})
}

exports.getTodoItem = function(req, res){

	let request = {};
		request = req.query;

	Promise.coroutine(function *(){

		let todoItem = yield userDal.searchTodoItem(request);

		console.log("todoItem:",todoItem);

		return responses.sendResponse(res, constants.messages.success, constants.success, todoItem);
	})().catch(function(err){
		return responses.sendError(res, err, constants.failure);
	})
}

exports.getItemsList = function(req, res){

	let request = {};
		request = req.body;

	Promise.coroutine(function *(){

		let todoItems = yield userDal.getTodoItemsList(request);

		console.log("todoItems:",todoItems);

		return responses.sendResponse(res, constants.messages.success, constants.success, todoItems);
	})().catch(function(err){
		return responses.sendError(res, err, constants.failure);
	})
}

exports.updateTodoItem = function(req, res){

	let request = {};
		request = req.body;

	Promise.coroutine(function *(){

		if(!request.taskId){
			return responses.sendError(res, 'taskId is mandatory', constants.failure);
		}

		let todoItem = yield userDal.updateTodoItem(request);

		console.log("todoItem:",todoItem);

		return responses.sendResponse(res, constants.messages.updateSuccess, constants.success, {});
	})().catch(function(err){
		console.log(err);
		return responses.sendError(res, err, constants.failure);
	})
}

exports.deleteTodoItem = function(req, res){

	let request = {};
		request = req.body;

	Promise.coroutine(function *(){

		if(!request.taskId){
			return responses.sendError(res, 'taskId is mandatory', constants.failure);
		}

		let todoItem = yield userDal.deleteTodoItem(request);

		console.log("todoItem:",todoItem);

		return responses.sendResponse(res, constants.messages.deleteSuccess, constants.success, {});
	})().catch(function(err){
		console.log(err);
		return responses.sendError(res, err, constants.failure);
	})
}


