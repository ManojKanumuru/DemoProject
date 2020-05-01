'use strict';

var crypto = require('crypto');

var objectId = require('mongodb').ObjectID;

var constants = require('./../generics/constants');

var baseQuery = require('./../../libs/baseQuery');

let formCreateUserObj = function(params){

    console.log("inside formCreateUserObj:");

	var userObj = {
		"userName"				: params.userName.toLowerCase() || null,
		"password"				: params.password ? crypto.createHmac('sha256', params.password).digest('hex') : null,
        "firstName"				: params.firstName || null,
		"lastName"				: params.lastName || null,    
        "officialEmail"			: params.officialEmail ? params.officialEmail.toLowerCase() : null,
		"contactPhone"	        : params.contactPhone || null,
        "createdBy"				: params.createdBy || null,
		"createdDate"			: new Date()
	}
    return userObj;
}

exports.userCreation = function(params){

    console.log("inside dal:",params);
    
    return new Promise(function(resolve, reject) {
        
        let queryObj = {};
            queryObj.dbName = 'demoProject';
            queryObj.collectionName = 'users';
            queryObj.condition = {
                userName : params.userRequest.userName.toLowerCase()
            };
        
        baseQuery.readData(queryObj).then(function(userData){
            console.log("userData",userData);
            if(userData.length > 0){
                return reject('user already created');
            }else{
                queryObj.requestBody = formCreateUserObj(params.userRequest);
                baseQuery.insertData(queryObj).then(function(insertedData) {
                    let userId = constants.userCode + insertedData.ops[0]._id.toString();
                    let updateQueryObj = {};
                        updateQueryObj.condition = {_id : new objectId(insertedData.ops[0]._id)};
                        updateQueryObj.update = {
                            $set : {
                                'userId' : userId
                            }
                        };
                        updateQueryObj.ops = {};
                        updateQueryObj.dbName = 'demoProject';
                        updateQueryObj.collectionName = 'users';
                    baseQuery.updateData(updateQueryObj).then(function(updatedData) {
                        console.log("after updated",updatedData);
                        return resolve(updatedData);
                    }).catch(function(error) {
                        return reject(error);
                    })
                }).catch(function(err) {
                    return reject(err);
                });
            }
        }).catch(function(err){
            return reject(err);
        });
    });
}

exports.getUserDetails = function(params){

    console.log("inside dal:",params);
    
    return new Promise(function(resolve, reject) {
        
        let queryObj = {};
            queryObj.dbName = 'demoProject';
            queryObj.collectionName = 'users';
            queryObj.condition = {
                userName : params.userName.toLowerCase()
            };
        
        baseQuery.readData(queryObj).then(function(userData){
            console.log("userData",userData);
            return resolve(userData);
        }).catch(function(error){
            return reject(error);
        });
    })
}

let formToDoItemObj = function(params){
    
    return {
        'taskName'  : params.taskName || null,
        'time'      : new Date(params.time) || new Date(),
        'notes'     : params.notes || null,
        'ownerEmail': params.ownerEmail || null
    }
};

exports.insertTodoItem = function(params){

    return new Promise(function(resolve, reject){

        let queryObj = {};
            queryObj.dbName = 'demoProject';
            queryObj.collectionName = 'todoList';
            queryObj.requestBody = formToDoItemObj(params);
        baseQuery.insertData(queryObj).then(function(insertedData){
            if(insertedData.ops && insertedData.ops.length > 0){
                let taskId = constants.todoCode + insertedData.ops[0]._id.toString();
                    let updateQueryObj = {};
                        updateQueryObj.condition = {_id : new objectId(insertedData.ops[0]._id)};
                        updateQueryObj.update = {
                            $set : {
                                'taskId' : taskId
                            }
                        };
                        updateQueryObj.ops = {};
                        updateQueryObj.dbName = 'demoProject';
                        updateQueryObj.collectionName = 'todoList'
                    baseQuery.updateData(updateQueryObj).then(function(updatedData) {
                        console.log("after updated",updatedData);
                        return resolve(updatedData);
                    }).catch(function(error) {
                        return reject(error);
                    })
            }else{
                return resolve([]);
            }
        }).catch(function(err){
            return reject(err);
        });
    })
}

exports.searchTodoItem = function(params){

    console.log("inside dal:",params);
    
    return new Promise(function(resolve, reject) {
        
        let queryObj = {};
            queryObj.dbName = 'demoProject';
            queryObj.collectionName = 'todoList';
            queryObj.condition = {
                taskId : params.taskId
            };
        
        baseQuery.readData(queryObj).then(function(task){
            return resolve(task);
        }).catch(function(error){
            return reject(error);
        });
    })
}

exports.getTodoItemsList = function(params){

    console.log("inside getTodoItemsList dal:",params);
    
    return new Promise(function(resolve, reject) {
        
        let queryObj = {};
            queryObj.dbName = 'demoProject';
            queryObj.collectionName = 'todoList';
            queryObj.condition = {
                taskId : {
                    $in : params.taskIds
                } 
            };
        
        baseQuery.readData(queryObj).then(function(task){
            return resolve(task);
        }).catch(function(error){
            return reject(error);
        });
    })
}


exports.updateTodoItem = function(params){

    console.log("inside updateTodoItem dal:",params);
    
    return new Promise(function(resolve, reject) {
        
        let queryObj = {};
            queryObj.dbName = 'demoProject';
            queryObj.collectionName = 'todoList';
            queryObj.condition = {
                taskId : params.taskId
            };

            queryObj.update = {
                $set : params.updateKeys
            };
            queryObj.ops = {};
        
        baseQuery.updateData(queryObj).then(function(task){
            return resolve(task);
        }).catch(function(error){
            return reject(error);
        });
    })
}


exports.deleteTodoItem = function(params){

    console.log("inside deleteTodoItem dal:",params);
    
    return new Promise(function(resolve, reject) {
        
        let queryObj = {};
            queryObj.dbName = 'demoProject';
            queryObj.collectionName = 'todoList';
            queryObj.condition = {
                'taskId' : params.taskId
            };
        
        baseQuery.removeData(queryObj).then(function(task){
            return resolve(task);
        }).catch(function(error){
            return reject(error);
        });
    })
}

exports.deleteUser = function(params){

    console.log("inside deleteUser dal:",params);
    
    return new Promise(function(resolve, reject) {
        
        let queryObj = {};
            queryObj.dbName = 'demoProject';
            queryObj.collectionName = 'users';
            queryObj.condition = {
                'userName' : params.userName
            };
        
        baseQuery.removeData(queryObj).then(function(task){
            return resolve(task);
        }).catch(function(error){
            return reject(error);
        });
    })
}