import { useState } from "react"
import TodoInterface from "../todo-interface"
import './Table.css'
import Form from "./Form"

//Child som tar emot props enligt interface Todo
function Table({ todo }: { todo: TodoInterface }) {

   

    const [form, setForm] = useState<TodoInterface>({ title: "", description: "", isCompleted: "ej påbörjad" })



    const editThisPost = (event: any) => {
        editPost();
    }

    //Tar emot props och skriver ut värden på rätt plats med Vilkor för att bestäma stil och text som skrivs ut.
    // Kan ändra om klar eller ej med funktionen changeIfCompleted och dess id.
    return (
        <div>


            

            <article className="article" id={(todo.id?.toString())}>
                <h2>{todo.title}</h2>
                <p><b>Beskrivning: </b> <span contentEditable onInput={(event) => setForm({ ...form, description: event.currentTarget.textContent || "" })}>{todo.description}</span></p>
                <p><b>Datum: </b>{todo.date?.toString().substring(0, 10)}</p>
                <p><b>Utförd: </b>{todo.isCompleted}</p>
                <button onClick={editThisPost}>Ändra</button>
            </article>
        </div>
    )
}

export default Table