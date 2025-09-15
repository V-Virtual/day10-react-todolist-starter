export const initialState = [
  {id: 1, text: "This is the first thing I need to do", done: false},
  {id: 2, text: "This is the second thing I need to do", done: false},
];

// reducer is a pure function that define and gather all state update logic
export const todoReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD':
      return action.todos || [];
    case 'DONE':
      return state.map(todo => {
        if (action.id === todo.id) {
          const done = !todo.done;
          return {
            ...todo,
            done: done
          };
        }
        return todo;
      })
    case 'ADD':
      const newId = state.length ? Math.max(...state.map(todo => todo.id)) + 1 : 1;
      return [
        ...state,
        {
          id: newId,
          text: action.text,
          done: false
        }
      ];
    case 'DELETE':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};
