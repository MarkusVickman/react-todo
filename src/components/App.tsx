import './App.css'
import TodoInterface from "../todo-interface"
import { FormEvent, useEffect, useState } from 'react';
import Table from './Table';


function App() {


  const [todos, setToDos] = useState<TodoInterface[] | []>([]);
  const [formData, setFormData] = useState<TodoInterface>({ title: "", description: "", isCompleted: "ej påbörjad" })
  const [formTitle, setFormTitle] = useState<string>("Lägg till");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorTitle, setErrorTitle] = useState<string>("");
  const [errorDescription, setErrorDescription] = useState<string>("");

  useEffect(() => {
    getTodos();
  })


  const errorDiv = document.getElementById("error-message");
  const submitBtn = document.getElementById("submit");
  const updateBtn = document.getElementById("update");
  const deleteBtn = document.getElementById("delete");
  const cancelBtn = document.getElementById("cancel");




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
    catch (Error) {
      error(`Det gick inte att hämta att göra-listan`);
    }
  }


  const postForm = async (event: FormEvent) => {
    event.preventDefault();
    if (checkInput()) {
      try {
        const response = await fetch("https://m2-react-todo-backend-nest-js-1050979898493.europe-north1.run.app/api", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          throw Error;
        } else {
          useEffect;
          error(`Att göra med namn ${formData.title} är skapat`);
          setFormData({ title: "", description: "", isCompleted: "ej påbörjad" });
        }
      } catch (Error) {
        error(`Det gick inte att skapa ett att göra-inlägg`);
        console.log(Error);
      }
    }
  }


  const updatePost = async (id: number, event: React.MouseEvent) => {
    event.preventDefault();
    if (checkInput()) {
      try {
        const response = await fetch(`https://m2-react-todo-backend-nest-js-1050979898493.europe-north1.run.app/api/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw Error;
        } else {
          useEffect;
          error(`Att göra med ID:${id} är uppdaterad`);
          cancelPost();
        }
      }
      catch (Error) {
        error(`Det gick inte att uppdatera att göra-inlägg med ID${id}`);
      }
    }
  }


  const deletePost = async (id: number, event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://m2-react-todo-backend-nest-js-1050979898493.europe-north1.run.app/api/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw Error;
      } else {
        useEffect;
        error(`Att göra med ID:${id} är borttaget`);
        cancelPost();
      }
    }
    catch (Error) {
      error(`Det gick inte att ta bort att göra-inlägg med ID:${id}`);
    }
  }


  const editPost = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setFormTitle("Redigera inlägg");


    const target = parseInt((event.currentTarget as HTMLButtonElement).id);
    const todo = todos.find(todo => todo.id === target);


    if (todo) {
      setFormData(todo);
      updateBtn!.style.display = "block";
      deleteBtn!.style.display = "block";
      cancelBtn!.style.display = "block";
      submitBtn!.style.display = "none";
    }
  }


  const cancelPost = () => {
    updateBtn!.style.display = "none";
    deleteBtn!.style.display = "none";
    cancelBtn!.style.display = "none";
    submitBtn!.style.display = "block";
    setFormData({ title: "", description: "", isCompleted: "ej påbörjad" });
    setFormTitle("Lägg till");
  }

  const error = (error: string) => {

    setErrorMessage(error);

    errorDiv!.style.display = "block";

    setTimeout(() => {
      errorDiv!.style.display = "none";
      setErrorMessage("");
    }, 3000);

  }


  const checkInput = () => {
    let validationErrors: boolean = true;
    if (formData.title.length < 3) {
      validationErrors = false;

      setErrorTitle("Titels längd måste vara mellan 3 och 200 tecken lång");
    }
    if (formData.description.length > 200) {
      validationErrors = false;
      setErrorDescription("Beskrivningen får inte vara längre än 200 tecken");
    }
    if (validationErrors) {
      setErrorTitle("");
      setErrorTitle("");
      return true
    } else {
      return false
    }
  }

  return (
    <section className='section'>
      <form onSubmit={postForm} className='form'>
        <h2>{formTitle}</h2>
        <label htmlFor="title">Titel</label>
        <input type="text" name="title" id="title" value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} />
        <p>{errorTitle}</p>

        <label htmlFor="description">Beskrivning</label>
        <textarea name="description" id="description" value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} />
        <p>{errorDescription}</p>

        <label htmlFor="status">Avklarad status?</label>

        <select name="status" id="status" value={formData.isCompleted} onChange={(event) => setFormData({ ...formData, isCompleted: event.target.value })} >
          <option value="avklarad">Avklarad</option>
          <option value="påbörjad">Påbörjad</option>
          <option value="ej påbörjad">Ej påbörjad</option>
        </select>

        <input id="submit" type="submit" value="Skicka" className='submit-button' onClick={postForm} />
        <input id="update" type="button" value="Uppdatera" className='submit-button' onClick={(event) => updatePost(parseInt(formData.id as unknown as string), event)} />
        <input id="delete" type="button" value="Ta bort" className='submit-button' onClick={(event) => deletePost(parseInt(formData.id as unknown as string), event)} />
        <input id="cancel" type="button" value="Avbryt åtgärd" className='submit-button' onClick={cancelPost} />
      </form>

      <h2 className='text-center'>Att göra-lista</h2>
      {todos.map((todo: TodoInterface) => <Table todo={todo} key={todo.id} editPost={editPost}/>
      )}

      <div id="error-message"><p>{errorMessage}</p></div>
    </section>
  )
}

export default App
