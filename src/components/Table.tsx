import TodoInterface from "../todo-interface"
import './Table.css'

//Child som tar emot props enligt interface Todo
function Table({ todo }: { todo: TodoInterface }) {

    //Tar emot props och skriver ut värden på rätt plats med Vilkor för att bestäma stil och text som skrivs ut.
    // Kan ändra om klar eller ej med funktionen changeIfCompleted och dess id
    return (<article className="article" id={(todo.id).toString()}>
        <h2>{todo.title}</h2>
        <p><b>Beskrivning: </b>{todo.description}</p>
        <p><b>Datum: </b>{todo.date.toDateString()}</p>
        <p><b>Utförd: </b>{todo.isCompleted}</p>
    </article>

    )
}

export default Table