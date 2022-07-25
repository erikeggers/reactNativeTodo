import React, {useContext} from 'react';
import {TodoContextType} from '../types';
import {TodoContext} from '../context/todo_context';
import {StyleSheet, FlatList} from 'react-native';
import {TodoItem} from '../components/todo_item';

export const TodoList = () => {
  const {
    todos,
    handleRemoveTodo,
    toggleTodoCompleted,
    handleUpdateTodo,
    handleTodoSelectedForUpdate,
  } = useContext(TodoContext) as TodoContextType;

  return (
    // Render todo list
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.todoListContainer}
      data={todos}
      renderItem={({item}) => (
        <TodoItem
          todo={item}
          toggleTodoCompleted={toggleTodoCompleted}
          handleRemoveTodo={handleRemoveTodo}
          handleUpdateTodo={handleUpdateTodo}
          handleTodoSelectedForUpdate={handleTodoSelectedForUpdate}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  todoListContainer: {
    marginTop: 24,
    paddingBottom: 100,
  },
});
