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

  const [formTitle, setFormTitle] = useState<string>("Lägg till");

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


    setFormData({ title: "", description: "", isCompleted: "ej påbörjad" });

  }

  const submitBtn = document.getElementById("submit");
  const updateBtn = document.getElementById("update");
  const deleteBtn = document.getElementById("delete");
  const cancelBtn = document.getElementById("cancel");

  const editPost = (event: React.MouseEvent) => {

    setFormTitle("Redigera inlägg");

    const target = parseInt((event.currentTarget as HTMLDivElement).id);
    console.log(target);

    const todo = todos.find(todo => todo.id === target);

    console.log(todo);


    if (todo) {
      setFormData(todo);
      updateBtn!.style.display = "block";
      deleteBtn!.style.display = "block";
      cancelBtn!.style.display = "block";
      submitBtn!.style.display = "none";
    }

  }

  const updatePost = (event: React.MouseEvent) => {


    cancelPost(event);
  }

  const deletePost = (event: React.MouseEvent) => {

    cancelPost(event);
  }

  const cancelPost = (event: React.MouseEvent) => {
    updateBtn!.style.display = "none";
    deleteBtn!.style.display = "none";
    cancelBtn!.style.display = "none";
    submitBtn!.style.display = "block";
    setFormData({ title: "", description: "", isCompleted: "ej påbörjad" });
    setFormTitle("Lägg till");
  }

  return (
    <section className='section'>


      <form onSubmit={postForm} className='form'>
        <h2>{formTitle}</h2>
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

        <input id="submit" type="submit" value="Skicka" className='submit-button' />
        <input id="update" type="button" value="Uppdatera" className='submit-button' onClick={updatePost} />
        <input id="delete" type="button" value="Ta bort" className='submit-button' onClick={deletePost} />
        <input id="cancel" type="button" value="Avbryt åtgärd" className='submit-button' onClick={cancelPost} />
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
