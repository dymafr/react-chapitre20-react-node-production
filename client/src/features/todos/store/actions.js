import apiNode from '../../../config/api.node';

export const TRY_DELETE_TODO = 'try delete todo';
export const DELETE_TODO_SUCCESS = 'delete todo success';
export const DELETE_TODO_ERROR = 'delete todo error';

export const TRY_ADD_TODO = 'try add todo';
export const ADD_TODO_SUCCESS = 'add todo success';
export const ADD_TODO_ERROR = 'add todo error';

export const REQUEST_TODO = 'request todo';
export const FETCH_TODO = 'fetch todo';
export const FETCH_TODO_SUCCESS = 'fetch todo success';
export const FETCH_TODO_ERROR = 'fetch todo error';

export const EDIT_TODO = 'try edit to do';
export const EDIT_TODO_SUCCESS = 'edit to do success';
export const EDIT_TODO_ERROR = 'edit to do error';

export const tryAddTodo = (todo) => {
  return dispatch => {
    return apiNode.post('/api/todos', todo).then(
      response => dispatch(addTodoSuccess(response.data)),
      error => dispatch(addTodoError(error))
    )
  }
}

export const addTodoSuccess = (todo) => {
  return {
    type: ADD_TODO_SUCCESS,
    todo
  }
}

export const addTodoError = (error) => {
  return {
    type: ADD_TODO_ERROR,
    error
  }
} 

export const tryEditTodo = (todo) => {
  return (dispatch) => {
    return apiNode.put('/api/todos', {
      _id: todo._id,
      name: todo.newname,
      done: todo.done
    }).then(
      response => dispatch(editTodoSuccess(response.data)),
      error => dispatch(editTodoError(error))
    )
  }
}

export const editTodoSuccess = (todo) => {
  return {
    type: EDIT_TODO_SUCCESS,
    todo
  }
}

export const editTodoError = (error) => {
  return {
    type: EDIT_TODO_ERROR,
    error
  }
} 


export const tryDeleteTodo = (id) => {
  return (dispatch) => {
    return apiNode.delete(`/api/todos/${ id }`).then(
      response => dispatch(deleteTodoSuccess(id)),
      error => dispatch(deleteTodoError(error))
    )
  }
}


export const deleteTodoSuccess = (id) => {
  return {
    type: DELETE_TODO_SUCCESS,
    id
  }
}

export const deleteTodoError = (err) => {
  return {
    type: DELETE_TODO_ERROR,
    err
  }
}

export const requestTodo = () => {
  return {
    type: REQUEST_TODO
  }
}

export const fetchTodoSuccess = (todos) => {
  return {
    type: FETCH_TODO_SUCCESS,
    todos
  }
}

export const fetchTodoError = (error) => {
  return {
    type: FETCH_TODO_ERROR,
    error
  }
}

export const fetchTodo = () => {
  return (dispatch) => {
    dispatch(requestTodo());
    return apiNode.get('/api/todos').then(
      (response) => {
        dispatch(fetchTodoSuccess(response.data));
      },
      (error) => {
        dispatch(fetchTodoError(error));
      }
    )
  }
}


