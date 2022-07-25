export interface IAuth {
  onAuthenticate: () => void;
}

export interface ITodo {
  id: string;
  task: string;
  completed: boolean;
}

export type TodoItem = {
  todo: ITodo;
  handleRemoveTodo: (id: string) => void;
  toggleTodoCompleted: (id: string) => void;
  handleUpdateTodo: (id: string) => void;
  handleTodoSelectedForUpdate: (id: string) => void;
};

export type TodoContextType = {
  todos: ITodo[];
  textInput: string;
  isUpdatingTodo: boolean;
  selectedTodoId: string;
  handleCreateTodo: () => void;
  handleTextChange: (text: string) => void;
  toggleTodoCompleted: (id: string) => void;
  handleTodoSelectedForUpdate: (id: string) => void;
  handleUpdateTodo: (id: string) => void;
  handleRemoveTodo: (id: string) => void;
};
