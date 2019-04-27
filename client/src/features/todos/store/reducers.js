import * as actions from './actions';

// {
//   todos: {
//     data: [],
//     loading: false,
//     error: null
//   },
// }

export const todosReducer = (state = {
  data: [],
  loading: false,
  error: null
}, action) => {
  switch(action.type) {
    case actions.ADD_TODO_SUCCESS: {
      return {
        ...state,
        data: [ ...state.data, action.todo ]
      } 
    }
    case actions.ADD_TODO_ERROR: {
      return {
        ...state,
        error: action.error
      }
    }
    case actions.DELETE_TODO_SUCCESS: {
      return {
        ...state,
        data: state.data.filter( t => t._id !== action.id )
      } 
    }
    case actions.REQUEST_TODO: {
      return {
        ...state,
        loading: true
      }
    }
    case actions.EDIT_TODO_SUCCESS: {
      const todo = action.todo;
      const todos = [ ...state.data ].map( t => t._id === todo._id ? todo : t);
      return {
        ...state,
        data: [ ...todos ]
      }
    }
    case actions.FETCH_TODO_SUCCESS: {
      if (action.todos) {
        return {
          ...state,
          data: [ ...action.todos ],
          loading: false,
          error: null
        }
      } else {
        return {
          ...state,
          loading: false
        }
      }
      
    }
    case actions.EDIT_TODO_ERROR:
    case actions.DELETE_TODO_ERROR:
    case actions.FETCH_TODO_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }
    default: {
      return state
    }
  }
}
