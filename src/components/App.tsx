import './App.css'
import TodoInterface from "../todo-interface"
import { useEffect, useState } from 'react';
import Table from './Table';


function App() {

  const [todos, setToDos] = useState<TodoInterface[] | []>([]);

  useEffect(() => {
    getTodos();
  }, [])

  const getTodos = async () => {
    try {

      const respons = await fetch("https://m2-react-todo-backend-nest-js-1050979898493.europe-north1.run.app/api");
      if (!respons.ok) {
        throw Error;
      } else {
        const data = await respons.json();

        setToDos(data);
      }
    }
    catch (error) {


    }
  }


  const [formData, setFormData] = useState<TodoInterface>({ title: "", description: "", isCompleted: "ej påbörjad" })

  const postForm = (event: any) => {
    event.preventDefault();
    /* try {
 
       const respons = await fetch("https://m2-react-todo-backend-nest-js-1050979898493.europe-north1.run.app/api");
       if (!respons.ok) {
         throw Error;
       } else {
         const data = await respons.json();
 
         setToDos(data);
       }
     }
     catch(error) {
 
 
     }*/

    console.log(formData);
  }


  return (
    <>


      <form onSubmit={postForm}>
        <h2>Lägg till</h2>
        <label htmlFor="title">Titel</label>
        <input type="text" name="title" id="title" value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} />

        <label htmlFor="description">Beskrivning</label>
        <input type="text" name="description" id="description" value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} />

        <label htmlFor="status">Avklarad status?</label>
        <select name="status" id="status" value={formData.isCompleted} onChange={(event) => setFormData({ ...formData, isCompleted: event.target.value })} >

          <option value="avklarad">Avklarad</option>
          <option value="påbörjad">Påbörjad</option>
          <option value="ej påbörjad">Ej påbörjad</option>

        </select>

        <input type="submit" value="Skicka" />

      </form>


      <section className='big-container'>

        <h2>Att göra-lista</h2>
        {todos.map((todo: TodoInterface) => <Table todo={todo} key={todo.id} />)}

      </section>
    </>
  )
}

export default App
