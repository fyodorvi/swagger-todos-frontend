import * as React from 'react';
import * as update from 'immutability-helper';
import './App.css';

class App extends React.Component<
  {},
  { todos: Array<{ title: string; resolved: boolean }> }
> {
  constructor() {
    super();

    this.state = {
      todos: [],
    };
  }

  private titleInput: HTMLInputElement;

  addTodo(title: string) {
    const todo = {
      title,
      resolved: false,
    };
    this.setState({ todos: [todo, ...this.state.todos] });
  }

  removeToDo(index: number) {
    this.setState({
      todos: update(this.state.todos, { $splice: [[index, 1]] }),
    });
  }

  doneToDo(index: number) {
    this.setState({
      todos: update(this.state.todos, {
        [index]: { resolved: { $set: true } },
      }),
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
                  <button onClick={() => this.doneToDo(index)}>Done</button>
                )}
                <button onClick={() => this.removeToDo(index)}>
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
