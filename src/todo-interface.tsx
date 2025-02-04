//Detta interface används på många ställen för att typsäkra att inlägg följer typer

interface Todo {

    id?: number;
    title: string;
    description: string;
    date?: Date;
    isCompleted: string;

  }

  export default Todo