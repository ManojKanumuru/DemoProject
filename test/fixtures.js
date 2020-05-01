'use strict';

module.exports = {
    'createUser' : {
        "userName": "test12345",
        "password": "test",
        "firstName": "manoj",
        "lastName": "kanumuru",
        "officialEmail": "manojreddy@gmail.com"
    },
    'createToDoItem': {
        "taskName"  : "test",
        "time"      : "01/05/2020",
        "notes"     : "test notes",
        "ownerEmail": "kanumurumanoj@gmail.com"
    },
    'url' : {
        'createUser' : {
            'localUrl' : 'http://localhost:3000/api/user/createUser',
            'remoteUrl': ''
        },
        'loginUser': {
            'localUrl' : 'http://localhost:3000/api/user/login',
            'remoteUrl': ''
        },
        'deleteUser' : {
            'localUrl' : 'http://localhost:3000/api/user/deleteUser',
            'remoteUrl': ''    
        },
        'createToDoItem' : {
            'localUrl' : 'http://localhost:3000/api/todo/createList',
            'remoteUrl': ''    
        },
        'updateToDoItem' : {
            'localUrl' : 'http://localhost:3000/api/todo/updateItem',
            'remoteUrl': ''    
        },
        'deleteToDoItem' : {
            'localUrl' : 'http://localhost:3000/api/todo/deleteItem',
            'remoteUrl': ''    
        }
    },
    'method' : {
        'post'  : 'POST',
        'put'   :  'PUT',
        'get'   :  'GET',
        'delete':  'DELETE'
    },
    'messages' : {
        'createUser'    : 'create user API',
        'loginUser'     : 'login user API',
        'deleteUser'    : 'delete user API',
        'createToDoItem': 'create todo Item',
        'updateToDoItem': 'update todo Item',
        'deleteToDoItem': 'delete todo Item'
    }
}