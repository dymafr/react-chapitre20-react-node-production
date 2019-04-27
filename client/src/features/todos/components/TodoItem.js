import React, { Fragment } from 'react';

class TodoItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      todo: { ...this.props.todo, newname: this.props.todo.name }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.todo !== prevState.todo) {
      return {
        todo: { 
          ...prevState.todo,
          ...nextProps.todo 
        }
      };
    }
  }

  edit = (bool) => {
    this.setState({ edit: bool });
  }

  handleInput = (e) => {
    const todo = this.state.todo;
    this.setState({ todo: { 
      ...todo,
      newname: e.target.value
    }})
  }

  updateTodo = (todo) => {
    this.props.tryEditTodo({ ...todo });
    const edit = this.state.edit;
    if (edit) { this.setState({ edit: false })};
  }

  render() {
    const { tryDeleteTodo } = this.props;
    const { todo } = this.state;
    return (
      <li  className="list-group-item d-flex flex-row justify-content-between align-items-center" >
        { this.state.edit ? (
          <input value={ todo.newname } type="text" onChange={ this.handleInput } className="form-control" />
        ) : (
          <span>{ todo.name }</span>
        )}
        { this.state.edit ? ( 
          <Fragment>
            <button className="btn btn-sm btn-secondary mx-3" onClick={ () => this.updateTodo({ ...todo }) } >Sauvegarder</button>
            <button className="btn btn-sm btn-secondary" onClick={ () => this.edit(false) }>Annuler</button>
          </Fragment>
        ) : (
          <span>
            <input className="mx-3" checked={ this.state.todo.done } onChange={ () => {
              this.updateTodo({ ...this.state.todo, done: !this.state.todo.done })
            } } type="checkbox" />
            <button onClick={ tryDeleteTodo } className="btn btn-sm btn-danger mx-3">delete</button>
            <button onClick={ () => this.edit(true) } className="btn btn-sm btn-primary">Edit</button>
          </span>
        )}
      </li>
    )
  }
}

export default TodoItem;