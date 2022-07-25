import React from 'react';
import {TodoListScreen} from '../screens/todo_list_screen';
import {render, fireEvent} from '@testing-library/react-native';
import {CreateTodo} from '../components/create_todo';
import {TodoItem} from '../components/todo_item';
import {TodoContext} from '../context/todo_context';

const todoContext = {
  todos: [{id: '1', task: 'test', completed: false}],
  textInput: 'test',
  isUpdatingTodo: false,
  selectedTodoId: '',
  handleCreateTodo: jest.fn(),
  handleTextChange: jest.fn(),
  handleRemoveTodo: jest.fn(),
  toggleTodoCompleted: jest.fn(),
  handleTodoSelectedForUpdate: jest.fn(),
  handleUpdateTodo: jest.fn(),
};

describe('<TodoListScreen/>', () => {
  it('renders correctly', () => {
    render(
      <TodoContext.Provider value={todoContext}>
        <TodoListScreen />
      </TodoContext.Provider>,
    );
  });
  it('the create todo input receives the text input, the add button is clicked', () => {
    const {getByTestId} = render(
      <TodoContext.Provider value={todoContext}>
        <CreateTodo />
      </TodoContext.Provider>,
    );
    const textInput = getByTestId('createTodoInput');
    fireEvent.changeText(textInput, todoContext.textInput);
    const addButton = getByTestId('addTodoButton');
    fireEvent.press(addButton);
    expect(todoContext.handleCreateTodo).toHaveBeenCalled();
  });
  it('the todo list item renders correctly', () => {
    const {getByTestId} = render(
      <TodoContext.Provider value={todoContext}>
        <TodoItem
          todo={todoContext.todos[0]}
          toggleTodoCompleted={todoContext.toggleTodoCompleted}
          handleRemoveTodo={todoContext.handleRemoveTodo}
          handleTodoSelectedForUpdate={todoContext.handleTodoSelectedForUpdate}
          handleUpdateTodo={todoContext.handleUpdateTodo}
        />
      </TodoContext.Provider>,
    );
    const todoItem = getByTestId('todoItem');
    expect(todoItem).toBeTruthy();
  });
  it('the todo item can be removed', () => {
    const {getByTestId} = render(
      <TodoContext.Provider value={todoContext}>
        <TodoItem
          todo={todoContext.todos[0]}
          toggleTodoCompleted={todoContext.toggleTodoCompleted}
          handleRemoveTodo={todoContext.handleRemoveTodo}
          handleTodoSelectedForUpdate={todoContext.handleTodoSelectedForUpdate}
          handleUpdateTodo={todoContext.handleUpdateTodo}
        />
      </TodoContext.Provider>,
    );
    const removeButton = getByTestId('removeTodoButton');
    fireEvent.press(removeButton);
    expect(todoContext.handleRemoveTodo).toHaveBeenCalled();
  });
});
