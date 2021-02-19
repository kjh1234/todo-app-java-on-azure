/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for
 * license information.
 */
package com.microsoft.azure.sample.dao;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import com.microsoft.azure.sample.model.TodoItem;

@Transactional
public interface TodoItemRepository extends CrudRepository<TodoItem, String> {
}
