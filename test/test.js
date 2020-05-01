'use strict';

var request = require('request');

require('should');

var fixtures = require('./fixtures.js');

let headers = {
  'Authorization': '' 
};

let createUserRequest = {
  uri : fixtures.url.createUser.localUrl,
  method : fixtures.method.post,
  json : true,
  body : fixtures.createUser
};

let loginUserRequest = {
  uri : fixtures.url.loginUser.localUrl,
  method : fixtures.method.post,
  json : true,
  body : {
    "userName" : "test12345",
    "password" : "test"
  }
};

let deleteUserRequest = {
  uri : fixtures.url.deleteUser.localUrl,
  method : fixtures.method.delete,
  json : true,
  body : {
    "userName" : "test12345"
  }
};

let ToDoItemRequest = {
  uri : fixtures.url.createToDoItem.localUrl,
  method : fixtures.method.post,
  json : true,
  body : fixtures.createToDoItem,
  headers: {}
};

describe(fixtures.messages.createUser, function() {
  it('create user successfully',function(done){
    this.timeout(30000);
    request(createUserRequest, function(err,response){
      response.body.status.should.be.eql(200);
        done();
    });
  });
});

describe(fixtures.messages.loginUser, function() {
    it('Login User Success',function(done){
      this.timeout(30000);
      request(loginUserRequest, function(err,response){
        response.body.status.should.be.eql(200) 
          && response.body.message.should.be.eql("login credentials are valid");
        headers.Authorization = response.body.data.jwtToken;
        done();
      });
    });
});

describe(fixtures.messages.createToDoItem, function() {
  it('create ToDo item success',function(done){
    this.timeout(30000);
    ToDoItemRequest.headers = headers;
    request(ToDoItemRequest, function(err,response){
      ToDoItemRequest.body.taskId = response.body.data.taskId;
      response.body.status.should.be.eql(200);
      console.log(ToDoItemRequest);
      done();
    });
  });
});

describe(fixtures.messages.updateToDoItem, function() {
  it('update ToDo item success',function(done){
    this.timeout(30000);
    ToDoItemRequest.uri = fixtures.url.updateToDoItem.localUrl,
    ToDoItemRequest.headers = headers;
    ToDoItemRequest.method = fixtures.method.put,
    ToDoItemRequest.body.updateKeys = {
      'taskName' : 'test updated',
      'notes'   : 'test notes updated'
    };
    request(ToDoItemRequest, function(err,response){
      response.body.status.should.be.eql(200)
       && response.body.message.should.be.eql("update success");
      done();
    });
  });
});

describe(fixtures.messages.deleteToDoItem, function() {
  it('delete ToDo item success',function(done){
    this.timeout(30000);
    ToDoItemRequest.uri = fixtures.url.deleteToDoItem.localUrl,
    ToDoItemRequest.headers = headers;
    ToDoItemRequest.method = fixtures.method.delete,
    console.log('updateRequest is',ToDoItemRequest);
    request(ToDoItemRequest, function(err,response){
      response.body.status.should.be.eql(200);
      done();
    });
  });
});

describe(fixtures.messages.deleteUser, function() {
  it('Delete User Success',function(done){
    this.timeout(30000);
    request(deleteUserRequest, function(err,response){
      response.body.status.should.be.eql(200) 
        && response.body.message.should.be.eql("delete success");
      headers.Authorization = '';
      done();
    });
  });
});
  