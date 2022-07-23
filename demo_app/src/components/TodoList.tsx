import React from 'react'
import './style.css'
import { Todo } from '../model'
import SingleTodo from '../components/SingleTodo'
import { Droppable } from 'react-beautiful-dnd'

interface Props {
     todos: Todo[];
     setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
     completedTodos: Todo[];
     setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
     return (
          <div className='container'>
               <Droppable droppableId="TodosList">
                    {
                         (provided) => (
                              <div className='todos'
                                   ref={provided.innerRef}
                                   {...provided.droppableProps}>
                                   <span className='todos__heading'>
                                        Active Tasks
                                   </span>
                                   {
                                        todos.map((todoed, index) => (
                                             <SingleTodo
                                                  index={index}
                                                  todo={todoed}
                                                  todos={todos}
                                                  key={todoed.id}
                                                  setTodos={setTodos}
                                             />
                                        ))
                                   }
                                   {provided.placeholder}
                              </div>
                         )
                    }

               </Droppable>
               <Droppable droppableId="TodosList">
                    {
                         (provided) => (
                              <div className='todos remove'
                                   ref={provided.innerRef}
                                   {...provided.droppableProps}>
                                   <span className='todos__heading'>
                                        Completed Tasks
                                   </span>
                                   {
                                        completedTodos.map((todoed, index) => (
                                             <SingleTodo
                                                  index={index}
                                                  todo={todoed}
                                                  todos={completedTodos}
                                                  key={todoed.id}
                                                  setTodos={setCompletedTodos}
                                             />
                                        ))
                                   }
                                   {provided.placeholder}
                              </div>
                         )
                    }

               </Droppable>

          </div>
     )
}

export default TodoList