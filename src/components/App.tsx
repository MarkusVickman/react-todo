import './App.css'

import TodoInterface from "../todo-interface"


function App() {

  return (
    <>
      <section className='big-container'>
    
        <h2>Att göra-lista</h2>
        {todo.map((todo: TodoInterface) => <Todo todo={todo} key={todo.id} />)}

      </section>
    </>
  )
}

export default App
