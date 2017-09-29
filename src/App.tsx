import * as React from 'react';
import axios from 'axios';
import './App.css';

interface Todo {
  id: string;
  title: string;
  resolved: boolean;
}

class App extends React.Component<{}, { todos: Array<Todo> }> {
  private titleInput: HTMLInputElement;

  private apiUrl: string = 'http://localhost:3001';

  constructor() {
    super();

    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    axios.get(this.apiUrl + '/get-todos').then(res => {
      this.setState({ todos: res.data });
    });
  }

  addTodo(title: string) {
    const todo = {
      title,
      resolved: false,
    };

    axios.post(this.apiUrl + '/add-todo', todo).then(res => {
      this.setState({ todos: res.data });
    });
  }

  removeToDo(id: string) {
    axios.delete(this.apiUrl + '/remove-todo/' + id).then(res => {
      this.setState({ todos: res.data });
    });
  }

  doneToDo(id: string) {
    axios.put(this.apiUrl + '/resolve-todo/' + id).then(res => {
      this.setState({ todos: res.data });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Todo List</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.addTodo(this.titleInput.value);
            this.titleInput.value = '';
          }}
        >
          <input
            ref={node => {
              if (node !== null) {
                this.titleInput = node;
              }
            }}
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {this.state.todos.map((todo, index) => {
            return (
              <li
                key={index}
                style={{
                  textDecoration: todo.resolved ? 'line-through' : 'none',
                }}
              >
                {!todo.resolved && (
                  <button onClick={() => this.doneToDo(todo.id)}>Done</button>
                )}
                <button onClick={() => this.removeToDo(todo.id)}>
                  Delete
                </button>{' '}
                {todo.title}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
