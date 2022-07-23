import { useReducer } from "react";

export interface Todo {
     id: number;
     todo: string;
     isDone: boolean;
}
type Actions =
     | { type: 'add'; payLoad: string }
     | { type: 'remove'; payLoad: number }
     | { type: 'done'; payLoad: number }

const TodoReducer = (state: Todo[], action: Actions) => {
     switch (action.type) {
          case 'add':
               return [
                    ...state,
                    { id: Date.now(), todo: action.payLoad, isDone: false },
               ];
          case 'remove':
               return state.filter((todo) => todo.id !== action.payLoad);
          case 'done':
               return state.map((todo) =>
                    todo.id !== action.payLoad ?
                         {
                              ...todo,
                              isDone: !todo.isDone
                         }: todo
               );
          default:
               return state;
     }
}
const ReducerExample = () => {

     const [state, dispatch] = useReducer(TodoReducer, [])
     return (
          <div></div>
     )
}