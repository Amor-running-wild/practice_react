import { Component } from "react";

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Add Tasks to see here'],
      inputVal: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.length === 1 && state.todos[0] == 'Add Tasks to see here' ?
      [state.inputVal]
      :state.todos.concat(state.inputVal),
      inputVal: "",
    }));
  }

  handleDelete(toDel) { 
    this.setState((state) => ({
      todos: state.todos.filter(todo => todo !== toDel)
    }))
  }
  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            id="task-entry"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        <div>
          {this.state.todos.map((todo) => (
            <div key={todo}>
            <p>
              {todo}
            </p>
             <button
                type='button' 
                onClick={() => this.handleDelete(todo)}
              >Delete</button>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default ClassInput;
