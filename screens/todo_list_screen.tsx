import React, {useContext} from 'react';
import {TodoContextType} from '../types';
import {TodoContext} from '../context/todo_context';

import {COLORS} from '../assets/colors';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {TodoList} from '../components/todo_list';
import {CreateTodo} from '../components/create_todo';
import {TodoZeroState} from '../components/todo_zero_state';

export const TodoListScreen = () => {
  const {todos} = useContext(TodoContext) as TodoContextType;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.todosWrapper}>
          <Text style={styles.title}>Your Todos</Text>
          {
            // If there are no todos show zero state
            todos.length === 0 ? (
              <TodoZeroState />
            ) : (
              // Render todo list
              <TodoList />
            )
          }
        </View>
      </SafeAreaView>
      <CreateTodo />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  todosWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
    maxHeight: '88%',
  },
  title: {
    color: COLORS.secondary,
    fontSize: 24,
    fontWeight: '800',
  },
});
