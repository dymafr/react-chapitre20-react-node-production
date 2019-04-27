import React, { Component } from 'react';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';
import { tryDeleteTodo, fetchTodo, tryEditTodo } from '../store/actions';
import { filteredTodoDataSelector } from '../store/selectors';

class TodoList extends Component {
  constructor(props) {
    super(props);
    props.fetchTodo();
  }

  render() {
    const { todos, tryDeleteTodo, tryEditTodo } = this.props;
    return (
      <ul className="list-group">
        { todos && todos.map( (t, i) => (
          <TodoItem 
            key={ t._id } 
            todo={ t } 
            tryDeleteTodo={ () => tryDeleteTodo(t._id) } 
            tryEditTodo={ (todo) => tryEditTodo(todo) }
          />
        )) }
      </ul>
    )
  }
}

export default connect((state, ownProps) => {
  const filter = ownProps.match.params.filter;
  return {
    todos: filteredTodoDataSelector(state, filter)
  }
}, {
  tryDeleteTodo,
  fetchTodo,
  tryEditTodo,
})(TodoList);