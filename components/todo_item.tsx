import React from 'react';
import {ITodo} from '../types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../assets/colors';

type Props = {
  todo: ITodo;
  handleRemoveTodo: (id: string) => void;
  toggleTodoCompleted: (id: string) => void;
  handleUpdateTodo: (id: string) => void;
  handleTodoSelectedForUpdate: (id: string) => void;
};

export const TodoItem = ({
  todo: {task, completed, id},
  toggleTodoCompleted,
  handleTodoSelectedForUpdate,
  handleRemoveTodo,
}: Props) => {
  return (
    <View style={styles.todoContainer} testID="todoItem">
      <View style={styles.todoTextContainer}>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => toggleTodoCompleted(id)}>
          <Text style={styles.completeButtonText}>{completed ? '√' : ''}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTodoSelectedForUpdate(id)}>
          <Text
            style={[
              styles.todoText,
              // eslint-disable-next-line react-native/no-inline-styles
              {textDecorationLine: completed ? 'line-through' : 'none'},
            ]}
            testID="todoText">
            {task}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveTodo(id)}
        testID="removeTodoButton">
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

// TodoItem styles
const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    marginBottom: 18,
    padding: 16,
  },
  todoTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoText: {
    color: COLORS.text,
    fontSize: 18,
  },
  removeButtonText: {
    color: COLORS.text,
  },
  completeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    height: 24,
    width: 24,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonText: {
    color: COLORS.secondary,
    fontWeight: 'bold',
    fontSize: 10,
  },
});
