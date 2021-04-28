import React, { useCallback } from 'react'
import Todos from '../components/Todos'
import { connect } from 'react-redux'
import { addTodo, toggleTodo } from '../modules/todos'

function TodosContainer ({ todos, addTodo, toggleTodo }) {
  const onCreate = useCallback(text => addTodo(text), [addTodo])
  const onToggle = useCallback(id => toggleTodo(id), [toggleTodo])

  return (
    <Todos
      todos={todos}
      onCreate={onCreate}
      onToggle={onToggle}
    />
  )
}
export default connect(
  state => ({ todos: state.todos }),
  {
    addTodo,
    toggleTodo
  }
)(TodosContainer)
