import React, {useContext} from 'react';
import {COLORS} from '../assets/colors';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {TodoContext} from '../context/todo_context';
import {TodoContextType} from '../types';

export const CreateTodo = () => {
  const {
    handleCreateTodo,
    textInput,
    handleTextChange,
    selectedTodoId,
    handleUpdateTodo,
    isUpdatingTodo,
  } = useContext(TodoContext) as TodoContextType;
  // Handle update using the todo id, toggles the button text as well
  const handleButton = (id: string) => {
    if (isUpdatingTodo) {
      handleUpdateTodo(id);
    } else {
      handleCreateTodo();
    }
  };
  return (
    // Allows the keyboard to push the input up so the user can see the input
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.createTodoContainer}>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Create a new todo"
          placeholderTextColor={COLORS.text}
          value={textInput}
          onChangeText={text => handleTextChange(text)}
          testID="createTodoInput"
        />
        <TouchableOpacity onPress={() => handleButton(selectedTodoId)}>
          <View style={styles.createTodoButton}>
            <Text style={styles.createTodoButtonText} testID="addTodoButton">
              {isUpdatingTodo ? 'Update' : 'Add'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

// CreateTodo styles
const styles = StyleSheet.create({
  createTodoContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 40,
    paddingHorizontal: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  createTodoButton: {
    alignItems: 'center',
    width: 80,
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 20,
  },
  createTodoButtonText: {
    fontSize: 16,
    color: COLORS.secondary,
  },
});
