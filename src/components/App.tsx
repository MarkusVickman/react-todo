import './App.css'
import TodoInterface from "../todo-interface"
import { useEffect, useState } from 'react';
import Table from './Table';
import Todo from '../todo-interface';


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

  const editPost = (event: React.MouseEvent) => {

    const target = parseInt((event.currentTarget as HTMLDivElement).id);
    console.log(target);

    const todo = todos.find(todo => todo.id === target);
    
    console.log(todo);

    if (todo) {
      setFormData(todo);
    }

  }

  return (
    <section className='section'>


      <form onSubmit={postForm} className='form'>
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

        <input type="submit" value="Skicka" className='submit-button' />
        <input type="button" value="uppdatera" className='submit-button' />
        <input type="button" value="Ta bort" className='submit-button' />

      </form>




      <h2 className='text-center'>Att göra-lista</h2>
      {todos.map((todo: TodoInterface) => /*<Table todo={todo} key={todo.id} />*/

        <article className="article" key={todo.id} >
          <h2>{todo.title}</h2>
          <p><b>Beskrivning: </b> {todo.description}</p>
          <p><b>Datum: </b>{todo.date?.toString().substring(0, 10)}</p>
          <p><b>Utförd: </b>{todo.isCompleted}</p>
          <button id={(todo.id?.toString())} onClick={editPost}>Ändra</button>
        </article>

      )}

    </section>

  )
}

export default App
