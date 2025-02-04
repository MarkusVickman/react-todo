import { useState } from "react"
import TodoInterface from "../todo-interface"
import './Table.css'
import Form from "./Form"

//Child som tar emot props enligt interface Todo
function Table({ todo }: { todo: TodoInterface }) {

    const editPost = (event: any) => {

    }

    const [form, setForm] = useState<TodoInterface>({ title: "", description: "", isCompleted: "ej påbörjad" })

    //Tar emot props och skriver ut värden på rätt plats med Vilkor för att bestäma stil och text som skrivs ut.
    // Kan ändra om klar eller ej med funktionen changeIfCompleted och dess id.
    return (
        <div>


            

            <article className="article" id={(todo.id?.toString())}>
                <h2>{todo.title}</h2>
                <p><b>Beskrivning: </b>{todo.description}</p>
                <p><b>Datum: </b>{todo.date?.toString().substring(0, 10)}</p>
                <p><b>Utförd: </b>{todo.isCompleted}</p>
                <button onClick={editPost}>Ändra</button>
            </article>
        </div>
    )
}

export default Table