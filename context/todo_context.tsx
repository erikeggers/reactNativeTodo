import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {TodoContextType, ITodo} from '../types';

export const TodoContext = createContext<TodoContextType | null>(null);

export const TodoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [textInput, setTextInput] = useState<string>('');
  const [isUpdatingTodo, setIsUpdatingTodo] = useState<boolean>(false);
  const [selectedTodoId, setSelectedTodoId] = useState<string>('');
  // Get todos from storage
  useEffect(() => {
    async function getTodosFromStorage() {
      // Try to get todos from storage
      try {
        const savedTodos = await AsyncStorage.getItem('todos');
        if (savedTodos !== null) {
          setTodos(JSON.parse(savedTodos));
        }
        // If there is an error, log it
      } catch (error) {
        console.log(error);
      }
    }
    getTodosFromStorage();
  }, []);

  // Save todos to storage
  useEffect(() => {
    async function saveTodosToStorage() {
      // Try to save todos to storage
      try {
        const stringifyedTodos = JSON.stringify(todos);
        AsyncStorage.setItem('todos', stringifyedTodos);
        // If there is an error, log it
      } catch (error) {
        console.log(error);
      }
    }
    saveTodosToStorage();
  }, [todos]);

  // Handle input text change
  const handleTextChange = (text: string) => {
    setTextInput(text);
  };
  // Handle create todo
  const handleCreateTodo = () => {
    // Throw error if textInput is empty
    if (textInput === '') {
      Alert.alert('Error', 'Please enter a todo');
    } else {
      // Build new todo
      const newTodo: ITodo = {
        id: `${Date.now()}`,
        task: textInput,
        completed: false,
      };
      // Add todo to list
      setTodos([...todos, newTodo]);
      setTextInput('');
    }
  };

  // Handle toggle todo
  const toggleTodoCompleted = (id: string) => {
    // Find todo by id
    const todo = todos.find(t => t.id === id);
    // Throw error if todo not found
    if (!todo) {
      Alert.alert('Error', 'Todo not found');
    } else {
      // Toggle todo completed
      todo.completed = !todo.completed;
      // Update todo list
      setTodos([...todos]);
    }
  };

  // Handle the selected todo for updating
  const handleTodoSelectedForUpdate = (id: string) => {
    // Find todo by id
    const todo = todos.find(t => t.id === id);
    // Set input text to todo task
    if (todo) {
      setTextInput(todo.task);
      setSelectedTodoId(todo.id);
      setIsUpdatingTodo(true);
    }
  };

  const handleUpdateTodo = (id: string) => {
    // Find todo by id
    const todo = todos.find(t => t.id === id);
    // Update todo task
    if (todo) {
      todo.task = textInput;
      setTodos([...todos]);
      setTextInput('');
      setIsUpdatingTodo(false);
    }
  };

  // Handle remove todo
  const handleRemoveTodo = (id: string) => {
    // Find todo by id
    const todo = todos.find(t => t.id === id);
    // Throw error if todo not found
    if (!todo) {
      Alert.alert('Error', 'Todo not found');
    } else {
      // Remove todo from list
      setTodos(todos.filter(t => t.id !== id));
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        handleCreateTodo,
        toggleTodoCompleted,
        handleTextChange,
        textInput,
        handleTodoSelectedForUpdate,
        handleUpdateTodo,
        isUpdatingTodo,
        selectedTodoId,
        handleRemoveTodo,
      }}>
      {children}
    </TodoContext.Provider>
  );
};
