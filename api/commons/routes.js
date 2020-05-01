'use strict';

var express = require('express');

let apiRoutes = express.Router();

const jwt = require('./../generics/jwt');

const userController = require('./../controller/userController');

function IsAuthenticated(req,res,next){	
	
	function onVerify(err, data) {
		if(err){
		    //if(err.name == 'JsonWebTokenError' || err.name=='TokenExpiredError')   
			console.log(err);
	        res.status(401).send(err);
	    }else{
			console.log(data);	
	        next();
	    }
	}
	jwt.verifyToken(req.headers.authorization, onVerify);
}

module.exports = function(app){

	/*user apis*/
	apiRoutes.post('/user/createUser', userController.createUser);
	apiRoutes.post('/user/login', userController.loginUser);
	apiRoutes.delete('/user/deleteUser', userController.deleteUser);
	
	/*TODO List apis*/
	apiRoutes.post('/todo/createList', IsAuthenticated, userController.createTodoItem);

	apiRoutes.get('/todo/getItem', IsAuthenticated, userController.getTodoItem);

	apiRoutes.post('/todo/itemList', IsAuthenticated, userController.getItemsList);

	apiRoutes.put('/todo/updateItem', IsAuthenticated, userController.updateTodoItem);

	apiRoutes.delete('/todo/deleteItem', IsAuthenticated, userController.deleteTodoItem);

	app.use('/api', apiRoutes);
}