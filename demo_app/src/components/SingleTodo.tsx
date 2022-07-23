import { type } from '@testing-library/user-event/dist/type';
import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import './style.css'
import TodoList from './TodoList';
import { Draggable } from 'react-beautiful-dnd'

type Props = {
  index: number;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todo: Todo;
}

const SingleTodo = ({ todo, todos, setTodos, index }: Props) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)

  const handleDone = (id: number) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
  }
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) =>
      todo.id !== id
    ))
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit])

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(todos.map((todo) => (
      todo.id === id ? { ...todo, todo: editTodo } : todo
    )))
    setEdit(false)
  }

  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided) => (
          <form 
          className='todos__single' 
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
            {
              edit ? (
                <input
                  ref={inputRef}
                  value={editTodo}
                  onChange={(e) =>
                    setEditTodo(e.target.value)}
                  className='todos__single-input'
                />
              ) : todo.isDone ? (
                <s className="todos__single-text">{todo.todo}</s>
              ) : (
                <span className="todos__single-text">{todo.todo}</span>
              )
            }
            <div>
              <span className='icon' onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}>
                <CreateIcon />
              </span>
              <span className='icon' onClick={() => handleDelete(todo.id)}>
                <DeleteIcon />
              </span>
              <span className='icon' onClick={() => handleDone(todo.id)}>
                <DoneIcon />
              </span>
            </div>
          </form >
        )
      }
    </Draggable>
  )
}

export default SingleTodo