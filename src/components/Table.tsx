import TodoInterface from "../todo-interface"
import './Table.css'


interface TableProps {
    todo: TodoInterface;
    editPost: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void;
};

//Child som tar emot props enligt interface Todo
const Table: React.FC<TableProps> = ({ todo, editPost }) => {
   
    //Tar emot props och skriver ut värden på rätt plats med Vilkor för att bestäma stil och text som skrivs ut.
    // Kan ändra om klar eller ej med funktionen changeIfCompleted och dess id.
    return (
        <article className="article" key={todo.id} style={{ backgroundColor: 
            todo.isCompleted === "avklarad" ? "yellowgreen" : 
            todo.isCompleted === "påbörjad" ? "lightblue" : 
            todo.isCompleted === "ej påbörjad" ? "salmon" : 
            "white" }}>
            <h2>{todo.title}</h2>
            <p><b>Beskrivning: </b> {todo.description}</p>
            <p><b>Datum: </b>{todo.date?.toString().substring(0, 10)}</p>
            <p><b>Utförd: </b>{todo.isCompleted}</p>
            <button id={(todo.id?.toString())} onClick={(event) => editPost(event, parseInt(todo.id as unknown as string))}>Ändra</button>
          </article>
    )
}

export default Table