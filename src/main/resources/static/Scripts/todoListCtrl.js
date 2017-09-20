/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for
 * license information.
 */

'use strict';
angular.module('todoApp')
    .controller('todoListCtrl', ['$scope', '$location', 'todoListSvc', 'adalAuthenticationService', function ($scope, $location, todoListSvc, adalService) {
        $scope.error = '';
        $scope.loadingMessage = '';
        $scope.todoList = null;
        $scope.editingInProgress = false;
        $scope.newTodoCaption = '';

        $scope.login = function () {
            adalService.login();
        };
        $scope.logout = function () {
            adalService.logOut();
        };
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.editInProgressTodo = {
            description: '',
            id: 0,
            finish: false
        };

        $scope.finishSwitch = function (todo) {
            todoListSvc.putItem(todo).error(function (err) {
                todo.finished = !todo.finished;
                $scope.error = err;
                $scope.loadingMessage = '';
            })
        };

        $scope.editSwitch = function (todo) {
            todo.edit = !todo.edit;
            if (todo.edit) {
                $scope.editInProgressTodo.description = todo.description;
                $scope.editInProgressTodo.id = todo.id;
                $scope.editInProgressTodo.finished = todo.finished;
                $scope.editingInProgress = true;
            } else {
                $scope.editingInProgress = false;
            }
        };

        $scope.populate = function () {
            todoListSvc.getItems().success(function (results) {
                $scope.todoList = results;
            }).error(function (err) {
                $scope.error = err;
                $scope.loadingMessage = '';
            })
        };

        $scope.delete = function (id) {
            todoListSvc.deleteItem(id).success(function (results) {
                $scope.populate();
                $scope.loadingMessage = 'deleteItem: ' + results;
                $scope.error = '';
            }).error(function (err) {
                $scope.error = err;
                $scope.loadingMessage = '';
            })
        };

        $scope.update = function (todo) {
            todoListSvc.putItem($scope.editInProgressTodo).success(function (results) {
                $scope.populate();
                $scope.editSwitch(todo);
                $scope.loadingMessage = 'putItem: ' + results;
                $scope.error = '';
            }).error(function (err) {
                $scope.error = err;
                $scope.loadingMessage = '';
            })
        };
        
        $scope.add = function () {
            function getUser() {
                var user = localStorage.getItem('user') || 'unknown';
                localStorage.setItem('user', user);
                return user;
            }

            todoListSvc.postItem({
                'description': $scope.newTodoCaption,
                'owner': adalService.userInfo.userName,
                'finish': 'false'
            }).success(function (results) {
                $scope.newTodoCaption = '';
                $scope.populate();
                $scope.loadingMessage = 'postItem: ' + results;
                $scope.error = '';
            }).error(function (err) {
                $scope.error = err;
                $scope.loadingMsg = '';
            })
        };
    }]);